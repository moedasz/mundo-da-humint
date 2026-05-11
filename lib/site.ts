import type { CategorySlug } from "@/lib/content/categories"

export const SITE = {
  name: "Mundo da HUMINT",
  shortName: "HUMINT",
  tagline: "Inteligência humana aplicada, com método.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mundodahumint.com.br",
  description:
    "Plataforma editorial e educacional dedicada à inteligência humana aplicada. Feita para quem investiga, verifica e decide com método, contexto e ética.",
  email: "contato@mundodahumint.com.br",
  social: {
    instagram: "https://www.instagram.com/mundodahumint",
    linkedin: "https://www.linkedin.com/company/mundodahumint",
    x: "https://x.com/mundodahumint",
  },
  founded: 2024,
} as const

export const NAV = {
  // 4 itens centrais no cabecalho (paralelo a Noticias/Artigos/Videos/Catalogo).
  primary: [
    { label: "Artigos", href: "/artigos" },
    { label: "Casos", href: "/artigos?categoria=casos-historicos" },
    { label: "Métodos", href: "/metodos" },
    { label: "Assinatura", href: "/assinar" },
  ],
  // Acessos auxiliares (visiveis no menu mobile e no rodape).
  meta: [
    { label: "Fundamentos", href: "/humint" },
    { label: "Formação", href: "/formacao" },
    { label: "Recursos", href: "/recursos" },
    { label: "Sobre", href: "/sobre" },
  ],
  secondary: [
    { label: "Contato", href: "/contato" },
    { label: "Princípios editoriais", href: "/principios-editoriais" },
    { label: "Política de privacidade", href: "/politica-de-privacidade" },
  ],
  categories: [
    { label: "Engenharia Social", href: "/artigos?categoria=engenharia-social" },
    { label: "OPSEC", href: "/artigos?categoria=opsec" },
    { label: "OSINT + HUMINT", href: "/artigos?categoria=osint-e-humint" },
    { label: "Contrainteligência", href: "/artigos?categoria=contrainteligencia" },
    { label: "Psicologia Comportamental", href: "/artigos?categoria=psicologia-comportamental" },
    { label: "Casos Históricos", href: "/artigos?categoria=casos-historicos" },
  ],
} as const

export const DOSSIERS = [
  {
    slug: "fundamentos-de-humint",
    title: "Fundamentos de HUMINT",
    description: "O que é inteligência humana, como funciona e onde se aplica.",
    href: "/artigos?categoria=fundamentos-de-humint",
  },
  {
    slug: "engenharia-social",
    title: "Engenharia Social",
    description: "Quando a informação é entregue, não roubada.",
    href: "/artigos?categoria=engenharia-social",
  },
  {
    slug: "fontes-humanas",
    title: "Fontes Humanas",
    description: "Recrutamento, validação, proteção e gestão de fontes.",
    href: "/artigos?tag=fontes-humanas",
  },
  {
    slug: "opsec",
    title: "OPSEC",
    description: "Segurança operacional e proteção de informações críticas.",
    href: "/artigos?categoria=opsec",
  },
  {
    slug: "contrainteligencia",
    title: "Contrainteligência",
    description: "Detecção, prevenção e neutralização de ameaças.",
    href: "/artigos?categoria=contrainteligencia",
  },
] as const

export const ARTICLE_CATEGORIES: ReadonlyArray<{ slug: CategorySlug; label: string }> = [
  { slug: "fundamentos-de-humint", label: "Fundamentos" },
  { slug: "metodos-e-tradecraft", label: "Métodos" },
  { slug: "casos-historicos", label: "Casos históricos" },
  { slug: "contrainteligencia", label: "Contrainteligência" },
  { slug: "engenharia-social", label: "Engenharia social" },
  { slug: "opsec", label: "OPSEC" },
  { slug: "osint-e-humint", label: "OSINT + HUMINT" },
  { slug: "psicologia-comportamental", label: "Psicologia" },
  { slug: "geopolitica-e-inteligencia", label: "Geopolítica" },
  { slug: "influencia-e-percepcao", label: "Influência" },
  { slug: "seguranca-corporativa", label: "Segurança corporativa" },
  { slug: "tecnologia-poder-e-estrategia", label: "Tecnologia e poder" },
]

export type ArticleCategorySlug = CategorySlug
