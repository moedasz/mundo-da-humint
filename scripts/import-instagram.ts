/**
 * Script de importação do JSON do Instagram para briefs editoriais
 *
 * Uso: npx tsx scripts/import-instagram.ts
 *
 * Este script:
 * 1. Lê o JSON exportado do Instagram
 * 2. Analisa cada post e extrai metadados
 * 3. Classifica por categoria usando o audit
 * 4. Gera briefs editoriais para os posts aproveitáveis
 * 5. Calcula prioridade editorial
 */

import * as fs from "fs"
import * as path from "path"

interface InstagramPost {
  id: string
  type: "Sidecar" | "Image" | "Video"
  shortCode: string
  caption: string
  hashtags: string[]
  url: string
  likesCount: number
  timestamp: string
  images: string[]
  displayUrl: string
  childPosts?: InstagramPost[]
  videoViewCount?: number
  videoPlayCount?: number
}

interface EditorialAudit {
  totalPosts: number
  categorizedPosts: Record<string, string[]>
  topPostsByEngagement: Array<{
    id: string
    shortCode: string
    likes: number
    captionPreview: string
  }>
  averageLikes: number
  medianLikes: number
}

interface EditorialBrief {
  sourceId: string
  instagramUrl: string
  instagramShortCode: string
  originalDate: string
  captionExcerpt: string
  fullCaption: string
  suggestedTitle: string
  slug: string
  category: string
  tags: string[]
  primaryKeyword: string
  secondaryKeywords: string[]
  articleType: "analise" | "caso" | "conceito" | "guia" | "opiniao"
  priority: "alta" | "media" | "baixa"
  trafficPotential: "alto" | "medio" | "baixo"
  factCheckLevel: "alto" | "medio" | "baixo"
  readiness: "ready" | "needs_expansion" | "needs_research"
  recommendedLength: "curto" | "medio" | "longo"
  cta: string
  status: "imported" | "brief" | "draft" | "needs_fact_check" | "ready_to_review" | "published"
  likesCount: number
  engagementScore: number
  images: string[]
  createdAt: string
}

// Função para criar slug a partir do título
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/-$/, "")
}

// Extrair título sugerido da legenda
function extractTitle(caption: string): string {
  if (!caption) return "Sem título"

  // Pegar primeira frase significativa
  const lines = caption.split("\n").filter((l) => l.trim().length > 0)
  const firstLine = lines[0] || ""

  // Limpar e truncar
  let title = firstLine.replace(/[#@]\w+/g, "").trim()

  // Se muito longo, truncar
  if (title.length > 100) {
    title = title.slice(0, 97) + "..."
  }

  // Se muito curto ou vazio, usar início do caption
  if (title.length < 10) {
    title = caption.slice(0, 100).replace(/\n/g, " ").trim()
    if (title.length > 97) title = title.slice(0, 97) + "..."
  }

  return title || "Sem título"
}

// Determinar tipo de artigo
function determineArticleType(
  caption: string,
  category: string
): "analise" | "caso" | "conceito" | "guia" | "opiniao" {
  const lowerCaption = caption.toLowerCase()

  if (category === "casos-historicos" || lowerCaption.includes("caso") || lowerCaption.includes("operação")) {
    return "caso"
  }
  if (lowerCaption.includes("como ") || lowerCaption.includes("passo") || lowerCaption.includes("checklist")) {
    return "guia"
  }
  if (lowerCaption.includes("o que é") || lowerCaption.includes("definição") || lowerCaption.includes("conceito")) {
    return "conceito"
  }
  if (lowerCaption.includes("análise") || lowerCaption.includes("revela") || lowerCaption.includes("expõe")) {
    return "analise"
  }
  return "analise"
}

// Calcular prioridade editorial
function calculatePriority(
  likes: number,
  avgLikes: number,
  captionLength: number,
  hasHumintTag: boolean
): "alta" | "media" | "baixa" {
  let score = 0

  // Engajamento relativo
  if (likes > avgLikes * 2) score += 3
  else if (likes > avgLikes) score += 2
  else if (likes > avgLikes * 0.5) score += 1

  // Profundidade do conteúdo
  if (captionLength > 800) score += 2
  else if (captionLength > 400) score += 1

  // Relevância HUMINT
  if (hasHumintTag) score += 1

  if (score >= 4) return "alta"
  if (score >= 2) return "media"
  return "baixa"
}

// Determinar nível de fact-check necessário
function determineFactCheckLevel(caption: string, category: string): "alto" | "medio" | "baixo" {
  const lowerCaption = caption.toLowerCase()

  // Casos históricos e geopolíticos precisam de mais verificação
  if (
    category === "casos-historicos" ||
    category === "geopolitica-e-inteligencia" ||
    lowerCaption.includes("19") ||
    lowerCaption.includes("20") ||
    lowerCaption.includes("operação") ||
    lowerCaption.includes("agente") ||
    lowerCaption.includes("cia") ||
    lowerCaption.includes("kgb") ||
    lowerCaption.includes("mossad")
  ) {
    return "alto"
  }

  // Conceitos e métodos precisam de verificação moderada
  if (category === "metodos-e-tradecraft" || category === "fundamentos-de-humint") {
    return "medio"
  }

  return "baixo"
}

// Extrair keywords secundárias dos hashtags
function extractKeywords(hashtags: string[], category: string): string[] {
  const ignored = ["mundodahumint", "humint", "instagram", "reels"]
  return hashtags
    .filter((h) => !ignored.includes(h.toLowerCase()))
    .slice(0, 5)
    .map((h) => h.replace(/([A-Z])/g, " $1").trim())
}

// Determinar CTA apropriado
function determineCTA(category: string, articleType: string): string {
  if (category === "fundamentos-de-humint" || articleType === "conceito") {
    return "newsletter"
  }
  if (category === "casos-historicos" || category === "geopolitica-e-inteligencia") {
    return "livro"
  }
  return "newsletter"
}

async function main() {
  console.log("📚 Iniciando importação do Instagram...")

  // Caminhos
  const dataDir = path.join(process.cwd(), "data")
  const contentDir = path.join(process.cwd(), "content")
  const briefsDir = path.join(contentDir, "briefs")

  // Criar diretórios se não existirem
  if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true })
  if (!fs.existsSync(briefsDir)) fs.mkdirSync(briefsDir, { recursive: true })

  // Ler arquivos
  const postsPath = path.join(dataDir, "instagram-export.json")
  const auditPath = path.join(dataDir, "editorial-audit.json")

  if (!fs.existsSync(postsPath)) {
    console.error("❌ Arquivo instagram-export.json não encontrado em /data")
    process.exit(1)
  }

  const posts: InstagramPost[] = JSON.parse(fs.readFileSync(postsPath, "utf-8"))
  const audit: EditorialAudit = fs.existsSync(auditPath)
    ? JSON.parse(fs.readFileSync(auditPath, "utf-8"))
    : { averageLikes: 2377, categorizedPosts: {} }

  console.log(`📊 Total de posts: ${posts.length}`)
  console.log(`📈 Média de likes: ${audit.averageLikes}`)

  // Criar mapa de shortCode para categoria
  const categoryMap: Record<string, string> = {}
  for (const [category, shortCodes] of Object.entries(audit.categorizedPosts)) {
    for (const code of shortCodes) {
      categoryMap[code] = category
    }
  }

  // Processar posts
  const briefs: EditorialBrief[] = []
  let processedCount = 0
  let skippedCount = 0

  for (const post of posts) {
    // Pular posts sem legenda aproveitável
    if (!post.caption || post.caption.length < 50) {
      skippedCount++
      continue
    }

    const category = categoryMap[post.shortCode] || "engenharia-social"
    const title = extractTitle(post.caption)
    const slug = slugify(title)
    const hasHumintTag = post.hashtags.some((h) => h.toLowerCase().includes("humint"))

    const brief: EditorialBrief = {
      sourceId: post.id,
      instagramUrl: post.url,
      instagramShortCode: post.shortCode,
      originalDate: post.timestamp,
      captionExcerpt: post.caption.slice(0, 200),
      fullCaption: post.caption,
      suggestedTitle: title,
      slug: slug,
      category: category,
      tags: post.hashtags.slice(0, 8),
      primaryKeyword: category.replace(/-/g, " "),
      secondaryKeywords: extractKeywords(post.hashtags, category),
      articleType: determineArticleType(post.caption, category),
      priority: calculatePriority(post.likesCount || 0, audit.averageLikes, post.caption.length, hasHumintTag),
      trafficPotential: post.likesCount > audit.averageLikes ? "alto" : "medio",
      factCheckLevel: determineFactCheckLevel(post.caption, category),
      readiness: post.caption.length > 600 ? "ready" : "needs_expansion",
      recommendedLength: post.caption.length > 800 ? "longo" : post.caption.length > 400 ? "medio" : "curto",
      cta: determineCTA(category, determineArticleType(post.caption, category)),
      status: "imported",
      likesCount: post.likesCount || 0,
      engagementScore: Math.round((post.likesCount || 0) / audit.averageLikes * 100),
      images: post.images || [post.displayUrl],
      createdAt: new Date().toISOString(),
    }

    briefs.push(brief)
    processedCount++
  }

  // Ordenar por prioridade e engajamento
  briefs.sort((a, b) => {
    const priorityOrder = { alta: 0, media: 1, baixa: 2 }
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return b.engagementScore - a.engagementScore
  })

  // Salvar briefs individuais
  for (const brief of briefs) {
    const briefPath = path.join(briefsDir, `${brief.slug}.json`)
    fs.writeFileSync(briefPath, JSON.stringify(brief, null, 2))
  }

  // Salvar índice de briefs
  const indexPath = path.join(contentDir, "briefs-index.json")
  fs.writeFileSync(
    indexPath,
    JSON.stringify(
      {
        total: briefs.length,
        byPriority: {
          alta: briefs.filter((b) => b.priority === "alta").length,
          media: briefs.filter((b) => b.priority === "media").length,
          baixa: briefs.filter((b) => b.priority === "baixa").length,
        },
        byCategory: briefs.reduce(
          (acc, b) => {
            acc[b.category] = (acc[b.category] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        ),
        topBriefs: briefs.slice(0, 30).map((b) => ({
          slug: b.slug,
          title: b.suggestedTitle,
          category: b.category,
          priority: b.priority,
          engagementScore: b.engagementScore,
        })),
        generatedAt: new Date().toISOString(),
      },
      null,
      2
    )
  )

  console.log(`\n✅ Importação concluída!`)
  console.log(`   📝 Briefs gerados: ${processedCount}`)
  console.log(`   ⏭️  Posts pulados: ${skippedCount}`)
  console.log(`   🔥 Alta prioridade: ${briefs.filter((b) => b.priority === "alta").length}`)
  console.log(`   📁 Briefs salvos em: ${briefsDir}`)
  console.log(`   📋 Índice salvo em: ${indexPath}`)
}

main().catch(console.error)
