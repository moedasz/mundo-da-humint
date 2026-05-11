import type { MetadataRoute } from "next"
import { SITE } from "@/lib/site"
import { ARTICLES } from "@/lib/content/articles"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticPaths = [
    "",
    "/artigos",
    "/metodos",
    "/livro",
    "/formacao",
    "/sobre",
    "/contato",
    "/recursos",
    "/principios-editoriais",
    "/politica-de-privacidade",
  ]

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : 0.7,
  }))

  const articleEntries: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE.url}/artigos/${a.slug}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticEntries, ...articleEntries]
}
