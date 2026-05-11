import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArticleCard } from "@/components/site/article-card"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { JsonLd } from "@/components/site/json-ld"
import { ShareButtons } from "@/components/site/share-buttons"
import {
  ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/content/articles"
import { formatDateLongBR } from "@/lib/format"
import { blogPostingSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"
import { SITE } from "@/lib/site"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "Artigo não encontrado" }
  return pageMetadata({
    title: article.title,
    description: article.description,
    path: `/artigos/${article.slug}`,
    image: article.heroImage,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt ?? article.publishedAt,
    authors: [article.author],
  })
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug, 3)
  const url = `${SITE.url}/artigos/${article.slug}`
  const originalInstagramUrl =
    article.instagramUrl ??
    (article.instagramShortCode
      ? `https://www.instagram.com/p/${article.instagramShortCode}/`
      : undefined)

  return (
    <article>
      <JsonLd
        data={blogPostingSchema({
          title: article.title,
          description: article.description,
          slug: article.slug,
          image: article.heroImage,
          author: article.author,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
        })}
      />

      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs
          items={[
            { label: "Artigos", href: "/artigos" },
            { label: article.categoryLabel, href: `/artigos?categoria=${article.category}` },
          ]}
        />
      </section>

      <header className="container-editorial pt-8 pb-10 md:pb-12">
        <p className="eyebrow-gold">{article.categoryLabel}</p>
        <h1 className="mt-3 font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-balance leading-[1.1] max-w-4xl">
          {article.title}
        </h1>
        <p className="mt-5 text-lg md:text-xl text-ink-soft leading-relaxed prose-measure">
          {article.description}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-widest text-ink-muted hairline-t pt-5">
          <span>Por {article.author}</span>
          <span>·</span>
          <span>Publicado em {formatDateLongBR(article.publishedAt)}</span>
          {article.updatedAt && article.updatedAt !== article.publishedAt && (
            <>
              <span>·</span>
              <span className="text-gold-active">Atualizado em {formatDateLongBR(article.updatedAt)}</span>
            </>
          )}
          <span>·</span>
          <span>{article.readingTime} de leitura</span>
        </div>
      </header>

      <div className="container-editorial">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-deep">
          <Image
            src={article.heroImage}
            alt={article.heroAlt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-editorial py-12 md:py-16 grid gap-10 lg:grid-cols-12">
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <div>
              <p className="eyebrow mb-3">Compartilhar</p>
              <ShareButtons url={url} title={article.title} />
            </div>
            <div className="hairline-t pt-5">
              <p className="eyebrow mb-3">Tags</p>
              <ul className="flex flex-wrap gap-1.5">
                {article.tags.map((t) => (
                  <li key={t}>
                    <span className="inline-block bg-paper-strong border border-line px-2 py-0.5 text-[11px] font-mono uppercase tracking-widest text-ink-soft">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9 order-1 lg:order-2">
          <div className="article-prose max-w-[68ch]">
            {article.body.map((block, i) => {
              switch (block.type) {
                case "p":
                  return <p key={i}>{block.text}</p>
                case "h2":
                  return <h2 key={i}>{block.text}</h2>
                case "h3":
                  return <h3 key={i}>{block.text}</h3>
                case "ul":
                  return (
                    <ul key={i}>
                      {block.items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ul>
                  )
                case "ol":
                  return (
                    <ol key={i}>
                      {block.items.map((it, j) => (
                        <li key={j}>{it}</li>
                      ))}
                    </ol>
                  )
                case "quote":
                  return (
                    <blockquote key={i}>
                      {block.text}
                      {block.cite && (
                        <cite className="block mt-3 text-sm font-mono uppercase tracking-widest text-ink-muted not-italic">
                          — {block.cite}
                        </cite>
                      )}
                    </blockquote>
                  )
                case "note":
                  return (
                    <aside
                      key={i}
                      className="my-6 bg-paper-strong border-l-4 border-gold p-5 text-ink-soft"
                    >
                      <p className="eyebrow-gold mb-1.5">Nota</p>
                      <p className="leading-relaxed text-ink">{block.text}</p>
                    </aside>
                  )
                default:
                  return null
              }
            })}
          </div>

          {/* Transparência metodológica */}
          {article.methodology && (
            <div className="mt-12 bg-paper-deep p-6 md:p-8 max-w-[68ch]">
              <p className="eyebrow-gold mb-2">Transparência metodológica</p>
              <p className="text-ink-soft leading-relaxed">{article.methodology}</p>
            </div>
          )}

          {/* Fontes */}
          {article.sources && article.sources.length > 0 && (
            <div className="mt-8 max-w-[68ch]">
              <h2 className="font-display text-xl font-semibold mb-3">Fontes e referências</h2>
              <ul className="space-y-2 text-sm text-ink-soft">
                {article.sources.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    {s.type && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-1 shrink-0">
                        {s.type}
                      </span>
                    )}
                    {s.url ? (
                      <a href={s.url} className="underline text-gold-active hover:text-gold-hover">
                        {s.label}
                      </a>
                    ) : (
                      <span>{s.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Correções */}
          {article.corrections && article.corrections.length > 0 && (
            <div className="mt-8 max-w-[68ch] hairline-t pt-5">
              <p className="eyebrow mb-3">Correções</p>
              <ul className="space-y-2 text-sm text-ink-soft">
                {article.corrections.map((c, i) => (
                  <li key={i}>
                    <span className="font-mono text-xs text-ink-muted">{c.date}: </span>
                    {c.note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Author card */}
          <div className="mt-12 bg-paper-strong p-6 md:p-8 hairline-y max-w-[68ch] flex items-start gap-5">
            <div className="w-14 h-14 bg-deep text-paper flex items-center justify-center font-display text-lg shrink-0">
              {article.author
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <p className="eyebrow mb-1">Sobre o autor</p>
              <h3 className="font-display text-lg font-semibold">{article.author}</h3>
              <p className="mt-1.5 text-sm text-ink-muted leading-relaxed">{article.authorBio}</p>
            </div>
          </div>

          {originalInstagramUrl && (
            <div className="mt-10 max-w-[68ch] border border-line bg-paper-strong p-6 md:p-7">
              <p className="eyebrow-gold">Post original</p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                Veja a publicação que originou este artigo.
              </h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                O link abre o post respectivo no Instagram, preservando a fonte
                original do acervo.
              </p>
              <a
                href={originalInstagramUrl}
                target="_blank"
                rel="noreferrer nofollow"
                className="mt-5 inline-flex items-center justify-center border border-ink px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Abrir post no Instagram
              </a>
            </div>
          )}

          <div className="mt-8 bg-deep text-paper p-6 md:p-8 max-w-[68ch]">
            <p className="eyebrow-gold">Membro VIP</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-balance">
              Aprofunde sua leitura com a assinatura do Mundo da HUMINT.
            </h3>
            <p className="mt-2 text-[var(--color-warm-text)] leading-relaxed">
              Entre para a área de membros e acompanhe análises, aulas e estudos
              exclusivos sobre inteligência humana aplicada.
            </p>
            <Link
              href="/assinar"
              className="mt-6 inline-flex items-center justify-center bg-gold px-5 py-3 text-sm font-semibold text-deep transition-colors hover:bg-gold-hover"
            >
              Virar membro VIP
            </Link>
          </div>
        </div>
      </div>

      {/* Artigos relacionados */}
      {related.length > 0 && (
        <section className="bg-paper-deep" aria-labelledby="related-title">
          <div className="container-editorial py-16 md:py-20">
            <div className="mb-10 hairline-b pb-4 flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow-gold mb-2">Leia também</p>
                <h2 id="related-title" className="font-display text-2xl md:text-3xl font-semibold">
                  Outros artigos relacionados
                </h2>
              </div>
              <Link href="/artigos" className="hidden sm:inline-flex text-sm text-ink-soft hover:text-ink">
                Ver todos
              </Link>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
