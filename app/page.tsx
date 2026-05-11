import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { HeroCarousel, type HeroSlide } from "@/components/site/hero-carousel"
import { MemberExclusives, type MemberExclusiveItem } from "@/components/site/member-exclusives"
import { ARTICLES, getArticleBySlug, getLatestArticles, type Article } from "@/lib/content/articles"
import { formatDateTimelineBR } from "@/lib/format"

const COVER_STORY = {
  category: "CONTRAINTELIGÊNCIA",
  title: "A rede que a CIA perdeu em Pequim",
  subtitle: "O caso que reescreveu o manual de contrainteligência hostil.",
  href: "/artigos/como-china-desmantelou-rede-cia-contrainteligencia",
  image: "/images/editorial/china-cia-cover.jpg",
  imageAlt:
    "Homem em terno cinza observa as luzes de Pequim através da janela de um quarto de hotel à noite.",
}

const HERO_SLIDES: HeroSlide[] = [
  {
    category: COVER_STORY.category,
    title: COVER_STORY.title,
    subtitle: COVER_STORY.subtitle,
    href: COVER_STORY.href,
    ctaLabel: "Ler análise",
    image: COVER_STORY.image,
    imageAlt: COVER_STORY.imageAlt,
    imagePosition: "center 35%",
  },
  {
    category: "ENGENHARIA SOCIAL",
    title: "O ponto vulnerável é humano",
    subtitle: "Como a informação é entregue antes de ser roubada.",
    href: "/artigos/engenharia-social-ponto-vulneravel-humano",
    ctaLabel: "Ver caso",
    image: "/images/editorial/social-engineering-hero.jpg",
    imageAlt:
      "Homem de terno cinza e mulher de vestido verde conversam em uma mesa de bar de hotel.",
    imagePosition: "center 30%",
  },
  {
    category: "MÉTODO",
    title: "Validar uma fonte humana",
    subtitle: "Credibilidade, motivação, consistência e registro.",
    href: "/artigos/validacao-de-fontes-humanas",
    ctaLabel: "Ver protocolo",
    image: "/images/editorial/source-validation.jpg",
    imageAlt:
      "Oficial de inteligência examina uma fotografia em preto e branco sob a luz de um abajur.",
    imagePosition: "center 30%",
  },
]

const FEATURED_SLUGS = [
  "como-china-desmantelou-rede-cia-contrainteligencia",
  "validacao-de-fontes-humanas",
  "humint-e-osint-complementaridade-e-limites",
  "unidade-29155-operacoes-encoberto-gru",
  "engenharia-social-ponto-vulneravel-humano",
]

const MOST_READ_SLUGS = [
  "como-china-desmantelou-rede-cia-contrainteligencia",
  "engenharia-social-ponto-vulneravel-humano",
  "psicologia-gaslighting-alterar-percepcao",
]

const MEMBER_EXCLUSIVES: MemberExclusiveItem[] = [
  {
    title: "Rede CIA na China",
    description:
      "Como uma rede humana foi comprometida em ambiente hostil, e o que o caso ensina sobre comunicação, fontes e contrainteligência.",
    href: "/assinar",
    image: "/images/editorial/china-cia-cover.jpg",
    imageAlt: "Homem observa as luzes de Pequim pela janela de um quarto à noite.",
  },
  {
    title: "Sergei Skripal",
    description:
      "O ciclo completo de uma fonte: recrutamento, captura, troca de prisioneiros e risco residual após a operação.",
    href: "/assinar",
    image: "/images/cases/skripal.jpg",
    imageAlt: "Homem sentado em banco de parque inglês sob neblina.",
  },
  {
    title: "Unidade 29155",
    description:
      "Operações atribuídas ao GRU na Europa, falhas de OPSEC e o papel de investigadores independentes na exposição.",
    href: "/assinar",
    image: "/images/cases/unit-29155.jpg",
    imageAlt: "Homem de sobretudo caminha por viela europeia molhada.",
  },
  {
    title: "Operação Ajax",
    description:
      "Influência, narrativa e efeitos de longo prazo em uma operação que ainda molda leituras geopolíticas.",
    href: "/assinar",
    image: "/images/cases/operation-ajax.jpg",
    imageAlt: "Homem iraniano com chapéu em um bazar nos anos 1950.",
  },
  {
    title: "Projeto Azorian",
    description:
      "Arquitetura de cobertura, negação plausível e engenharia operacional em uma das ações mais ambiciosas da Guerra Fria.",
    href: "/assinar",
    image: "/images/cases/project-azorian.jpg",
    imageAlt: "Oficial observa o oceano a partir da ponte de um navio.",
  },
  {
    title: "John Walker Jr.",
    description:
      "Traição, rotina pessoal e vulnerabilidades exploradas em um caso clássico de segurança e fontes humanas.",
    href: "/assinar",
    image: "/images/cases/john-walker.jpg",
    imageAlt: "Homem deposita pacote em árvore oca sob neblina.",
  },
]

export default function HomePage() {
  const latest = getLatestArticles(6)
  const featured = FEATURED_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    Boolean,
  ) as Article[]
  const mostRead = MOST_READ_SLUGS.map((slug) => getArticleBySlug(slug)).filter(
    Boolean,
  ) as Article[]
  const lead = featured[0] ?? ARTICLES[0]
  const secondary = featured.slice(1, 5)

  return (
    <>
      <HeroCarousel slides={HERO_SLIDES} autoPlayMs={6000} />

      <section className="bg-paper-strong border-b border-line" aria-labelledby="home-news-title">
        <div className="container-editorial py-9 md:py-11 grid gap-9 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <SectionHeader
              eyebrow="Destaques"
              title="Análises essenciais"
              href="/artigos"
              linkLabel="Ver arquivo"
              id="home-news-title"
            />

            <div className="grid gap-px bg-line border border-line lg:grid-cols-[1.1fr_0.9fr]">
              <LeadArticle article={lead} />
              <div className="grid gap-px bg-line">
                {secondary.map((article) => (
                  <FeatureRow key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </div>

          <aside aria-labelledby="most-read-title">
            <div className="border-b border-line-strong pb-3">
              <h2 id="most-read-title" className="font-display text-2xl font-bold text-ink">
                Mais lidas
              </h2>
            </div>
            <ol className="divide-y divide-line">
              {mostRead.map((article, index) => (
                <li key={article.slug}>
                  <Link
                    href={`/artigos/${article.slug}`}
                    className="grid grid-cols-[2rem_1fr] gap-3 py-4 group"
                  >
                    <span className="font-mono text-sm text-gold-active">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block font-display text-base font-semibold leading-snug text-ink group-hover:text-gold-active transition-colors">
                        {article.title}
                      </span>
                      <span className="mt-1 block text-[11px] font-mono uppercase text-ink-muted">
                        {article.categoryLabel} · {article.readingTime}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="bg-paper border-b border-line" aria-labelledby="latest-title">
        <div className="container-editorial py-9 md:py-11">
          <SectionHeader
            eyebrow="Últimas publicadas"
            title="Arquivo recente"
            href="/artigos"
            linkLabel="Ver todas"
            id="latest-title"
          />
          <div className="grid gap-px bg-line border border-line md:grid-cols-2">
            {latest.map((article) => (
              <LatestItem key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <MemberExclusives items={MEMBER_EXCLUSIVES} />
    </>
  )
}

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
  id,
  dark = false,
}: {
  eyebrow: string
  title: string
  href: string
  linkLabel: string
  id: string
  dark?: boolean
}) {
  return (
    <header className="flex items-end justify-between gap-4 mb-6 border-b border-line-strong pb-3">
      <div>
        <p className="eyebrow-gold">{eyebrow}</p>
        <h2
          id={id}
          className={`font-display text-2xl md:text-3xl font-bold mt-1 ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-medium ${
          dark ? "text-warm-text hover:text-paper" : "text-ink-muted hover:text-ink"
        } transition-colors`}
      >
        {linkLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </header>
  )
}

function LeadArticle({ article }: { article: Article }) {
  return (
    <Link href={`/artigos/${article.slug}`} className="group bg-paper-strong">
      <article>
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-deep">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            loading="eager"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-5 md:p-6">
          <p className="eyebrow-gold mb-2">{article.categoryLabel}</p>
          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight text-ink group-hover:text-gold-active transition-colors text-balance">
            {article.title}
          </h3>
          <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed line-clamp-2">
            {article.description}
          </p>
          <p className="mt-4 text-[11px] font-mono uppercase text-ink-muted">
            {formatDateTimelineBR(article.publishedAt)} · {article.readingTime}
          </p>
        </div>
      </article>
    </Link>
  )
}

function FeatureRow({ article }: { article: Article }) {
  return (
    <Link href={`/artigos/${article.slug}`} className="group bg-paper-strong p-4 grid grid-cols-[96px_1fr] gap-4">
      <div className="relative aspect-square overflow-hidden bg-paper-deep">
        <Image
          src={article.heroImage}
          alt=""
          fill
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <article>
        <p className="font-mono text-[10px] uppercase text-gold-active mb-1">
          {article.categoryLabel}
        </p>
        <h3 className="font-display text-base font-semibold leading-snug text-ink group-hover:text-gold-active transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="mt-2 text-[11px] font-mono uppercase text-ink-muted">
          {formatDateTimelineBR(article.publishedAt)}
        </p>
      </article>
    </Link>
  )
}

function LatestItem({ article }: { article: Article }) {
  return (
    <Link href={`/artigos/${article.slug}`} className="group bg-paper p-4 md:p-5">
      <article>
        <p className="font-mono text-[10px] uppercase text-gold-active mb-1">
          {article.categoryLabel}
        </p>
        <h3 className="font-display text-lg font-semibold leading-snug text-ink group-hover:text-gold-active transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-[11px] font-mono uppercase text-ink-muted">
          {formatDateTimelineBR(article.publishedAt)} · {article.readingTime}
        </p>
      </article>
    </Link>
  )
}
