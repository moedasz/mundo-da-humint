import type { Metadata } from "next"
import { SITE } from "./site"

type PageMetaInput = {
  title: string
  description: string
  path: string
  image?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  noIndex?: boolean
}

export function pageMetadata({
  title,
  description,
  path,
  image = "/images/hero-home.jpg",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = path.startsWith("http") ? path : `${SITE.url}${path}`
  return {
    title,
    description,
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
    alternates: {
      canonical: path,
      languages: { "pt-BR": path },
    },
    openGraph: {
      type,
      locale: "pt_BR",
      url,
      siteName: SITE.name,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
