import type { Metadata } from "next"
import Link from "next/link"
import { ArticleCard } from "@/components/site/article-card"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { NewsletterInline } from "@/components/site/newsletter-inline"
import { ARTICLES, articleMatchesCategory, articleMatchesTag } from "@/lib/content/articles"
import { ARTICLE_CATEGORIES } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

type Props = {
  searchParams: Promise<{ categoria?: string; pagina?: string; q?: string; tag?: string }>
}

const ARTICLES_PER_PAGE = 24

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams
  const cat = sp.categoria
  const tag = sp.tag
  const title = cat
    ? `Artigos · ${ARTICLE_CATEGORIES.find((c) => c.slug === cat)?.label ?? cat}`
    : tag
      ? `Artigos · ${tag}`
    : "Artigos, dossiês e análises sobre inteligência humana aplicada"
  return pageMetadata({
    title,
    description:
      "Centro editorial do Mundo da HUMINT: análises, dossiês, casos e fundamentos sobre inteligência humana aplicada. Para quem investiga, verifica e decide.",
    path: "/artigos",
  })
}

export default async function ArtigosPage({ searchParams }: Props) {
  const sp = await searchParams
  const cat = sp.categoria
  const tag = sp.tag
  const q = (sp.q ?? "").toLowerCase().trim()
  const requestedPage = Number(sp.pagina ?? "1")

  let filtered = ARTICLES.slice().sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  )
  if (cat) filtered = filtered.filter((a) => articleMatchesCategory(a, cat))
  if (tag) filtered = filtered.filter((a) => articleMatchesTag(a, tag))
  if (q) {
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE))
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(1, Math.floor(requestedPage)), totalPages)
    : 1
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE
  const visibleArticles = filtered.slice(startIndex, startIndex + ARTICLES_PER_PAGE)
  const rangeStart = filtered.length === 0 ? 0 : startIndex + 1
  const rangeEnd = Math.min(startIndex + ARTICLES_PER_PAGE, filtered.length)

  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Artigos", href: "/artigos" }]} />
      </section>

      <section className="container-editorial pt-6 pb-10 md:pb-14">
        <p className="eyebrow-gold">Publicação editorial</p>
        <h1 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight max-w-4xl">
          Artigos, dossiês e análises sobre inteligência humana aplicada
        </h1>
        <p className="mt-5 text-lg text-ink-soft prose-measure leading-relaxed">
          Conteúdo original e contextual, escrito com método. Filtre por área
          ou busque por tema.
        </p>
      </section>

      {/* Filtros */}
      <section className="hairline-y bg-paper-strong sticky top-16 z-30">
        <div className="container-editorial py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <form
            action="/artigos"
            method="get"
            role="search"
            className="flex items-center gap-2 w-full md:max-w-sm"
          >
            {cat && <input type="hidden" name="categoria" value={cat} />}
            {tag && <input type="hidden" name="tag" value={tag} />}
            <label htmlFor="q" className="sr-only">
              Buscar
            </label>
            <input
              type="search"
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Buscar por título, tema, tag…"
              className="flex-1 bg-paper-deep border border-line px-3 py-2 text-sm focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="px-3 py-2 text-sm border border-ink text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              Buscar
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto -mx-1 px-1">
            <CategoryChip label="Todos" href="/artigos" active={!cat} />
            {ARTICLE_CATEGORIES.map((c) => (
              <CategoryChip
                key={c.slug}
                label={c.label}
                href={`/artigos?categoria=${c.slug}`}
                active={cat === c.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lista */}
      <section className="container-editorial py-12 md:py-16">
        {filtered.length === 0 ? (
          <div className="bg-paper-strong p-10 text-center hairline-y">
            <p className="eyebrow-gold mb-3">Nada encontrado</p>
            <h2 className="font-display text-2xl font-semibold">
              Nenhum artigo corresponde a essa busca.
            </h2>
            <p className="mt-2 text-ink-muted">
              Tente outro termo ou{" "}
              <Link href="/artigos" className="underline text-gold-active">
                limpar os filtros
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-col gap-2 border-b border-line pb-4 text-sm text-ink-muted md:flex-row md:items-end md:justify-between">
              <p>
                {filtered.length} artigos encontrados. Mostrando {rangeStart}-{rangeEnd}.
              </p>
              {totalPages > 1 && (
                <p className="font-mono text-xs uppercase tracking-widest">
                  Página {currentPage} de {totalPages}
                </p>
              )}
            </div>

            <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {visibleArticles.map((a, index) => (
                <ArticleCard key={a.slug} article={a} priority={index < 3} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Paginação de artigos"
                className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6"
              >
                {currentPage > 1 ? (
                  <Link
                    href={articlesPageHref({ cat, tag, q, page: currentPage - 1 })}
                    className="inline-flex items-center justify-center border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    Anterior
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center border border-line px-4 py-2 text-sm text-ink-muted opacity-40">
                    Anterior
                  </span>
                )}
                <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                  {currentPage} / {totalPages}
                </span>
                {currentPage < totalPages ? (
                  <Link
                    href={articlesPageHref({ cat, tag, q, page: currentPage + 1 })}
                    className="inline-flex items-center justify-center border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                  >
                    Próxima
                  </Link>
                ) : (
                  <span className="inline-flex items-center justify-center border border-line px-4 py-2 text-sm text-ink-muted opacity-40">
                    Próxima
                  </span>
                )}
              </nav>
            )}
          </>
        )}
      </section>

      <section className="container-editorial pb-16 md:pb-24">
        <div className="bg-paper-strong p-8 md:p-10 hairline-y">
          <p className="eyebrow-gold">Newsletter</p>
          <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-balance max-w-xl">
            Receba os próximos artigos por e-mail.
          </h2>
          <div className="mt-5 max-w-md">
            <NewsletterInline />
          </div>
        </div>
      </section>
    </>
  )
}

function articlesPageHref({
  cat,
  page,
  q,
  tag,
}: {
  cat?: string
  page: number
  q?: string
  tag?: string
}) {
  const params = new URLSearchParams()
  if (cat) params.set("categoria", cat)
  if (tag) params.set("tag", tag)
  if (q) params.set("q", q)
  if (page > 1) params.set("pagina", String(page))

  const query = params.toString()
  return query ? `/artigos?${query}` : "/artigos"
}

function CategoryChip({
  label,
  href,
  active,
}: {
  label: string
  href: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "shrink-0 px-3 py-1.5 text-xs font-mono uppercase tracking-widest bg-ink text-paper"
          : "shrink-0 px-3 py-1.5 text-xs font-mono uppercase tracking-widest border border-line text-ink-soft hover:bg-paper-deep hover:text-ink transition-colors"
      }
    >
      {label}
    </Link>
  )
}
