/**
 * Script para gerar artigos MDX a partir dos briefs editoriais
 *
 * Uso: npx tsx scripts/generate-articles.ts
 *
 * Este script:
 * 1. Lê os briefs de maior prioridade
 * 2. Gera drafts MDX estruturados
 * 3. Marca campos que precisam de verificação factual
 */

import * as fs from "fs"
import * as path from "path"

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
  articleType: string
  priority: string
  trafficPotential: string
  factCheckLevel: string
  readiness: string
  recommendedLength: string
  cta: string
  status: string
  likesCount: number
  engagementScore: number
  images: string[]
  createdAt: string
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function generateMDXContent(brief: EditorialBrief): string {
  const now = new Date().toISOString()
  const readingTime = Math.max(calculateReadingTime(brief.fullCaption) + 3, 5)

  const frontmatter = `---
title: "${brief.suggestedTitle.replace(/"/g, '\\"')}"
slug: "${brief.slug}"
description: "${brief.captionExcerpt.replace(/"/g, '\\"').replace(/\n/g, " ")}"
metaTitle: "${brief.suggestedTitle.replace(/"/g, '\\"')} | Mundo da HUMINT"
metaDescription: "${brief.captionExcerpt.slice(0, 155).replace(/"/g, '\\"').replace(/\n/g, " ")}"
category: "${brief.category}"
tags:
${brief.tags.map((t) => `  - "${t}"`).join("\n")}
author: "Mundo da HUMINT"
originalInstagramUrl: "${brief.instagramUrl}"
instagramShortCode: "${brief.instagramShortCode}"
publishedAt: "${now}"
updatedAt: "${now}"
readingTime: "${readingTime} min"
featured: ${brief.priority === "alta"}
needsFactCheck: ${brief.factCheckLevel === "alto"}
status: "draft"
heroImage: "/images/articles/${brief.slug}.jpg"
---`

  // Estruturar o conteúdo do post original
  const paragraphs = brief.fullCaption
    .split("\n\n")
    .filter((p) => p.trim().length > 0)
    .map((p) => p.trim())

  const mainContent = paragraphs.join("\n\n")

  const mdxBody = `

## Resumo Executivo

${brief.captionExcerpt}

[EXPANDIR: adicionar resumo executivo de 2-3 parágrafos]

## Introdução

${paragraphs[0] || "[ADICIONAR: introdução contextualizada]"}

## O Caso ou Conceito Central

${paragraphs.slice(1, 3).join("\n\n") || "[ADICIONAR: desenvolvimento do caso/conceito principal]"}

## O Que Isso Revela Sobre HUMINT

[EXPANDIR: análise das implicações para inteligência humana]

${paragraphs.slice(3, 5).join("\n\n")}

## Aplicação Prática

[ADICIONAR: como aplicar esses conceitos na prática]

- [Ponto prático 1]
- [Ponto prático 2]
- [Ponto prático 3]

## Limites Éticos

[ADICIONAR: considerações éticas relevantes]

## Erros Comuns

[ADICIONAR: erros frequentes relacionados ao tema]

1. [Erro comum 1]
2. [Erro comum 2]
3. [Erro comum 3]

## Conclusão

${paragraphs[paragraphs.length - 1] || "[ADICIONAR: conclusão e próximos passos]"}

---

## Notas Metodológicas

<EditorialNote type="methodology">
Este artigo foi desenvolvido a partir de conteúdo originalmente publicado no Instagram do Mundo da HUMINT. 
O material foi expandido, contextualizado e verificado para publicação no site.
${brief.factCheckLevel === "alto" ? "\n\n**Status de verificação:** Este artigo contém referências históricas ou geopolíticas que requerem verificação factual adicional." : ""}
</EditorialNote>

## Fontes e Leituras Recomendadas

[ADICIONAR FONTES]

- [Fonte 1]
- [Fonte 2]
- [Fonte 3]

${brief.factCheckLevel === "alto" ? "\n<CorrectionBox>\nEste artigo está marcado para revisão factual. Informações históricas e geopolíticas serão verificadas antes da publicação final.\n</CorrectionBox>" : ""}

## Artigos Relacionados

[ADICIONAR LINKS INTERNOS]

---

<NewsletterCTA variant="${brief.cta === "livro" ? "book" : "newsletter"}" />
`

  return frontmatter + mdxBody
}

async function main() {
  console.log("📝 Gerando artigos MDX a partir dos briefs...")

  const contentDir = path.join(process.cwd(), "content")
  const briefsDir = path.join(contentDir, "briefs")
  const articlesDir = path.join(contentDir, "articles")

  // Criar diretório de artigos
  if (!fs.existsSync(articlesDir)) {
    fs.mkdirSync(articlesDir, { recursive: true })
  }

  // Ler índice de briefs
  const indexPath = path.join(contentDir, "briefs-index.json")
  if (!fs.existsSync(indexPath)) {
    console.error("❌ Execute primeiro: npx tsx scripts/import-instagram.ts")
    process.exit(1)
  }

  const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"))
  const topBriefs = index.topBriefs.slice(0, 30) // Top 30 briefs

  console.log(`📊 Gerando ${topBriefs.length} artigos de alta prioridade...`)

  let generatedCount = 0

  for (const briefMeta of topBriefs) {
    const briefPath = path.join(briefsDir, `${briefMeta.slug}.json`)

    if (!fs.existsSync(briefPath)) {
      console.warn(`⚠️ Brief não encontrado: ${briefMeta.slug}`)
      continue
    }

    const brief: EditorialBrief = JSON.parse(fs.readFileSync(briefPath, "utf-8"))
    const mdxContent = generateMDXContent(brief)
    const articlePath = path.join(articlesDir, `${brief.slug}.mdx`)

    fs.writeFileSync(articlePath, mdxContent)

    // Atualizar status do brief
    brief.status = "draft"
    fs.writeFileSync(briefPath, JSON.stringify(brief, null, 2))

    generatedCount++
    console.log(`  ✅ ${brief.slug}`)
  }

  console.log(`\n✅ Geração concluída!`)
  console.log(`   📄 Artigos gerados: ${generatedCount}`)
  console.log(`   📁 Salvos em: ${articlesDir}`)
}

main().catch(console.error)
