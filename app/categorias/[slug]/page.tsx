import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

import { categories, getCategoryBySlug } from "@/lib/content/categories"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    return { title: "Categoria não encontrada" }
  }

  return {
    title: `${category.name} | Mundo da HUMINT`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  // Redirecionar para a página de artigos com filtro de categoria
  redirect(`/artigos?categoria=${slug}`)
}
