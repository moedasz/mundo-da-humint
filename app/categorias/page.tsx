import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { pageMetadata } from "@/lib/seo"
import { breadcrumbSchema } from "@/lib/schema"
import { JsonLd } from "@/components/site/json-ld"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { categories } from "@/lib/content/categories"
import { getArticlesByCategory } from "@/lib/content/articles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = pageMetadata({
  title: "Categorias | Mundo da HUMINT",
  description:
    "Explore os artigos do Mundo da HUMINT organizados por categoria: HUMINT, engenharia social, contrainteligência, OPSEC, psicologia e mais.",
  path: "/categorias",
})

export default function CategoriasPage() {
  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Categorias", href: "/categorias" },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8"><Breadcrumbs items={breadcrumbs} /></div>

          <header className="mb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">Navegue por tema</p>
            <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Categorias</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink-soft">
              Explore os artigos do Mundo da HUMINT organizados por área de conhecimento.
            </p>
          </header>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const articleCount = getArticlesByCategory(category.slug).length
              return (
                <Card key={category.slug} className="group transition-shadow hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="font-display text-xl">
                      <Link href={`/artigos?categoria=${category.slug}`} className="hover:text-gold">
                        {category.name}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {articleCount > 0
                        ? `${articleCount} ${articleCount === 1 ? "artigo publicado" : "artigos publicados"}`
                        : "Trilha em desenvolvimento"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-ink-muted line-clamp-3">{category.description}</p>
                    <Link
                      href={`/artigos?categoria=${category.slug}`}
                      className="inline-flex items-center text-sm font-medium text-gold hover:underline"
                    >
                      {articleCount > 0 ? "Ver artigos" : "Acompanhar tema"}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
