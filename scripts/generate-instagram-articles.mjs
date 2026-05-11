import fs from "node:fs"
import path from "node:path"

const projectRoot = process.cwd()
const fallbackExportPath = path.join(projectRoot, "data", "instagram-export.json")
const exportPath = process.env.INSTAGRAM_EXPORT_PATH
  ? path.resolve(process.env.INSTAGRAM_EXPORT_PATH)
  : fallbackExportPath
const auditPath = path.join(projectRoot, "data", "editorial-audit.json")
const outputPath = path.join(
  projectRoot,
  "lib",
  "content",
  "instagram-articles.generated.ts",
)

const categoryLabels = {
  "fundamentos-de-humint": "Fundamentos de HUMINT",
  "engenharia-social": "Engenharia Social",
  contrainteligencia: "Contrainteligência",
  opsec: "OPSEC",
  "psicologia-comportamental": "Psicologia Comportamental",
  "osint-e-humint": "OSINT e HUMINT",
  "casos-historicos": "Casos Históricos",
  "geopolitica-e-inteligencia": "Geopolítica e Inteligência",
  "seguranca-corporativa": "Segurança Corporativa",
  "metodos-e-tradecraft": "Métodos e Tradecraft",
  "influencia-e-percepcao": "Influência e Percepção",
  "tecnologia-poder-e-estrategia": "Tecnologia, Poder e Estratégia",
}

const categoryHeroImages = {
  "fundamentos-de-humint": {
    src: "/images/editorial/humint-fundamentals.jpg",
    alt: "Caderno de campo aberto com anotações sobre inteligência humana.",
  },
  "engenharia-social": {
    src: "/images/editorial/social-engineering-hero.jpg",
    alt: "Mesa de trabalho com sinais de investigação e engenharia social.",
  },
  contrainteligencia: {
    src: "/images/dossiers/counterintelligence.jpg",
    alt: "Ambiente escuro de análise com documentos e sinais de contrainteligência.",
  },
  opsec: {
    src: "/images/dossiers/opsec.jpg",
    alt: "Elementos de segurança operacional e proteção de informações.",
  },
  "psicologia-comportamental": {
    src: "/images/editorial/source-validation.jpg",
    alt: "Fichas e registros usados para leitura comportamental e validação.",
  },
  "osint-e-humint": {
    src: "/images/editorial/osint-humint-integration.jpg",
    alt: "Mapa com anotações e camadas de dados conectando OSINT e HUMINT.",
  },
  "casos-historicos": {
    src: "/images/dossiers/default-dossier.jpg",
    alt: "Dossiê histórico com documentos e materiais de pesquisa.",
  },
  "geopolitica-e-inteligencia": {
    src: "/images/cases/unit-29155.jpg",
    alt: "Mapa com rotas e pontos de interesse para análise geopolítica.",
  },
  "seguranca-corporativa": {
    src: "/images/editorial/method-diagram.jpg",
    alt: "Diagrama de método aplicado à segurança corporativa.",
  },
  "metodos-e-tradecraft": {
    src: "/images/editorial/method-diagram.jpg",
    alt: "Diagrama de método e tradecraft aplicado à inteligência humana.",
  },
  "influencia-e-percepcao": {
    src: "/images/cases/operation-ajax.jpg",
    alt: "Documento e fotografia histórica ligados a operações de influência.",
  },
  "tecnologia-poder-e-estrategia": {
    src: "/images/editorial/osint-humint-integration.jpg",
    alt: "Camadas de dados e estratégia em análise de inteligência.",
  },
}

const tagDisplay = {
  humint: "HUMINT",
  osint: "OSINT",
  opsec: "OPSEC",
  cia: "CIA",
  fbi: "FBI",
  kgb: "KGB",
  mi6: "MI6",
  mossad: "Mossad",
  psyops: "PSYOPS",
  brasil: "Brasil",
  china: "China",
  russia: "Rússia",
  instagram: "Instagram",
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"))
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
}

function smartTrim(value, maxLength) {
  const normalized = value.replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) return normalized

  const cut = normalized.slice(0, maxLength - 3)
  const lastSentence = Math.max(cut.lastIndexOf("."), cut.lastIndexOf("?"), cut.lastIndexOf("!"))
  if (lastSentence > 45) return `${cut.slice(0, lastSentence + 1).trim()}`

  return `${cut.replace(/\s+\S*$/, "").trim()}...`
}

function stripLinksAndHandles(value) {
  return value
    .replace(/https?:\/\/\S+/gi, "")
    .replace(/@\w+/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function removeHashtagCloudLines(caption) {
  return caption
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => {
      const words = line.trim().split(/\s+/).filter(Boolean)
      if (words.length === 0) return true

      const hashtagWords = words.filter((word) => word.startsWith("#")).length
      if (hashtagWords === 0) return true
      if (hashtagWords === words.length) return false
      return hashtagWords / words.length < 0.6
    })
    .join("\n")
    .trim()
}

function cleanText(value) {
  return stripLinksAndHandles(value)
    .replace(/#[\p{L}\p{N}_]+/gu, "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
}

function extractTitle(post) {
  const caption = removeHashtagCloudLines(post.caption ?? "")
  const lines = caption
    .split("\n")
    .map((line) => cleanText(line))
    .filter((line) => line.length >= 8)

  const source = lines[0] ?? cleanText(caption)
  if (!source) return `Registro HUMINT ${post.shortCode}`

  return smartTrim(source.replace(/^[^\p{L}\p{N}]+/u, ""), 92)
}

function extractDescription(post, title) {
  const caption = cleanText(removeHashtagCloudLines(post.caption ?? ""))
  if (!caption) {
    return `Registro do acervo editorial do Mundo da HUMINT publicado originalmente no Instagram.`
  }

  const withoutTitle = caption.startsWith(title) ? caption.slice(title.length).trim() : caption
  return smartTrim(withoutTitle || caption, 165)
}

function humanizeTag(tag) {
  const clean = String(tag ?? "")
    .replace(/^#/, "")
    .trim()
  if (!clean) return ""

  const lower = clean.toLowerCase()
  if (tagDisplay[lower]) return tagDisplay[lower]

  return clean
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function extractTags(post, category) {
  const ignored = new Set(["mundodahumint", "reels", "explore", "viral"])
  const tags = []

  for (const rawTag of post.hashtags ?? []) {
    const key = String(rawTag).replace(/^#/, "").toLowerCase()
    if (!key || ignored.has(key)) continue

    const display = humanizeTag(rawTag)
    if (display && !tags.some((tag) => tag.toLowerCase() === display.toLowerCase())) {
      tags.push(display)
    }
  }

  const categoryLabel = categoryLabels[category] ?? "HUMINT"
  if (!tags.some((tag) => tag.toLowerCase() === categoryLabel.toLowerCase())) {
    tags.unshift(categoryLabel)
  }

  return tags.slice(0, 8)
}

function captionToBlocks(post) {
  const normalizedCaption = removeHashtagCloudLines(post.caption ?? "")
  const chunks = normalizedCaption
    .split(/\n\s*\n/g)
    .flatMap((chunk) => {
      const trimmed = chunk.trim()
      if (!trimmed) return []
      if (trimmed.length > 420 && trimmed.includes("\n")) {
        return trimmed.split("\n").map((line) => line.trim()).filter(Boolean)
      }
      return [trimmed.replace(/\n+/g, " ")]
    })
    .map(cleanText)
    .filter(Boolean)

  const blocks = []

  if (chunks.length === 0) {
    blocks.push({
      type: "p",
      text:
        "Este registro foi importado sem legenda disponível. Mantemos a página para preservar o acervo completo e o vínculo com a publicação original.",
    })
    return blocks
  }

  for (const chunk of chunks) {
    const bulletLines = chunk.split(/\s*[-•]\s+/).map((item) => item.trim()).filter(Boolean)
    if (bulletLines.length > 2 && chunk.includes("•")) {
      blocks.push({ type: "ul", items: bulletLines })
    } else {
      blocks.push({ type: "p", text: chunk })
    }
  }

  return blocks
}

function wordsCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length
}

function categoryByShortCode(audit) {
  const map = new Map()
  for (const [category, shortCodes] of Object.entries(audit.categorizedPosts ?? {})) {
    for (const shortCode of shortCodes) map.set(shortCode, category)
  }
  return map
}

function inferCategory(post) {
  const haystack = `${post.caption ?? ""} ${(post.hashtags ?? []).join(" ")}`.toLowerCase()

  if (/(opsec|segurança operacional|vazamento|privacidade)/i.test(haystack)) return "opsec"
  if (/(contraintelig|espionagem|cia|kgb|mossad|mi6|agente duplo)/i.test(haystack)) return "contrainteligencia"
  if (/(engenharia social|manipula|elicita|rapport|golpe)/i.test(haystack)) return "engenharia-social"
  if (/(psicologia|viés|comportamento|gaslighting|percepção)/i.test(haystack)) return "psicologia-comportamental"
  if (/(osint|fonte aberta|dados abertos)/i.test(haystack)) return "osint-e-humint"
  if (/(operação|história|segunda guerra|guerra fria|caso)/i.test(haystack)) return "casos-historicos"
  if (/(geopolítica|rússia|china|eua|israel|irã|guerra)/i.test(haystack)) return "geopolitica-e-inteligencia"
  if (/(influência|desinformação|propaganda|percepção)/i.test(haystack)) return "influencia-e-percepcao"
  if (/(ia|tecnologia|algoritmo|vigilância)/i.test(haystack)) return "tecnologia-poder-e-estrategia"
  if (/(método|tradecraft|fonte humana|recrutamento)/i.test(haystack)) return "metodos-e-tradecraft"

  return "fundamentos-de-humint"
}

function buildArticle(post, categoryMap) {
  const category = categoryMap.get(post.shortCode) ?? inferCategory(post)
  const categoryLabel = categoryLabels[category] ?? categoryLabels["fundamentos-de-humint"]
  const hero = categoryHeroImages[category] ?? categoryHeroImages["fundamentos-de-humint"]
  const title = extractTitle(post)
  const slugBase = slugify(title).slice(0, 72) || "registro"
  const publishedAt = post.timestamp ? String(post.timestamp).slice(0, 10) : "2026-05-10"
  const fullText = cleanText(removeHashtagCloudLines(post.caption ?? ""))
  const minutes = Math.max(1, Math.ceil(wordsCount(fullText) / 220))

  return {
    slug: `instagram-${String(post.shortCode).toLowerCase()}-${slugBase}`,
    title,
    description: extractDescription(post, title),
    category,
    categoryLabel,
    tags: extractTags(post, category),
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt,
    updatedAt: "2026-05-11",
    readingTime: `${minutes} min`,
    heroImage: hero.src,
    heroAlt: hero.alt,
    instagramShortCode: post.shortCode,
    instagramUrl: post.url || `https://www.instagram.com/p/${post.shortCode}/`,
    body: captionToBlocks(post),
  }
}

function main() {
  const posts = readJson(exportPath)
  const audit = readJson(auditPath)
  const categoryMap = categoryByShortCode(audit)

  if (!Array.isArray(posts)) {
    throw new Error(`O arquivo ${exportPath} não contém uma lista de posts.`)
  }

  const articles = posts.map((post) => buildArticle(post, categoryMap))
  const uniqueSlugs = new Set(articles.map((article) => article.slug))
  if (uniqueSlugs.size !== articles.length) {
    throw new Error("Foram gerados slugs duplicados para os posts do Instagram.")
  }

  const sourceLabel = path.relative(projectRoot, exportPath).replace(/\\/g, "/")
  const output = `// Arquivo gerado por scripts/generate-instagram-articles.mjs\n// Fonte: ${sourceLabel}\n\nimport type { Article } from "./articles"\n\nexport const INSTAGRAM_ARTICLE_COUNT = ${articles.length}\n\nexport const INSTAGRAM_ARTICLES = ${JSON.stringify(
    articles,
    null,
    2,
  )} satisfies Article[]\n`

  fs.writeFileSync(outputPath, output)
  console.log(`Gerados ${articles.length} artigos em ${path.relative(projectRoot, outputPath)}`)
}

main()
