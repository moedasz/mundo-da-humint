import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { METHODS, METHOD_GROUPS } from "@/lib/content/methods"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Métodos, fundamentos e boas práticas de HUMINT",
  description:
    "Biblioteca viva do Mundo da HUMINT: fundamentos, entrevista, validação, ética e a relação com OSINT. Aprenda com rigor, clareza e responsabilidade.",
  path: "/metodos",
  image: "/images/hero-metodos.jpg",
})

export default function MetodosPage() {
  const startHere = METHODS.find((m) => m.startHere)

  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Métodos", href: "/metodos" }]} />
      </section>

      {/* HERO */}
      <section className="container-editorial py-10 md:py-16 grid gap-10 lg:grid-cols-12 items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow-gold">Métodos · Biblioteca viva</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight">
            Métodos, fundamentos e boas práticas de HUMINT
          </h1>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed prose-measure">
            Referências de método para quem investiga, verifica ou decide com base em fontes humanas. 
            Cada tema inclui definições, critérios práticos e limites explícitos.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/hero-metodos.jpg"
              alt="Caderno aberto com diagramas e anotações manuscritas sobre método de pesquisa."
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* COMECE POR AQUI */}
      {startHere && (
        <section className="container-editorial py-8 md:py-10">
          <Link
            href={`/metodos#${startHere.slug}`}
            className="group block bg-deep text-paper p-8 md:p-12 hover:bg-[var(--color-deep-2)] transition-colors"
          >
            <p className="eyebrow-gold">Comece por aqui</p>
            <h2 className="mt-3 font-display text-2xl md:text-4xl font-semibold text-balance">
              {startHere.title}
            </h2>
            <p className="mt-3 text-lg text-[var(--color-warm-text)] leading-relaxed max-w-2xl">
              {startHere.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm text-gold group-hover:text-amber">
              Iniciar leitura
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </section>
      )}

      {/* GRUPOS */}
      <section className="container-editorial pb-16 md:pb-24 flex flex-col gap-16">
        {METHOD_GROUPS.map((group) => {
          const items = METHODS.filter((m) => m.group === group)
          return (
            <div key={group}>
              <div className="mb-8 hairline-b pb-3">
                <p className="eyebrow-gold mb-1">Grupo</p>
                <h2 className="font-display text-2xl md:text-3xl font-semibold">{group}</h2>
              </div>
              <div className="grid gap-px bg-line md:grid-cols-2">
                {items.map((m) => (
                  <article
                    key={m.slug}
                    id={m.slug}
                    className="bg-paper-strong p-6 md:p-8 hover:bg-paper-deep transition-colors flex flex-col gap-3 scroll-mt-24"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-block bg-paper-deep px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-ink-muted">
                        {m.level}
                      </span>
                      {m.startHere && (
                        <span
                          className="inline-block bg-gold-soft px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest"
                          style={{ color: "var(--color-on-gold)" }}
                        >
                          Comece aqui
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-balance leading-snug">
                      {m.title}
                    </h3>
                    <p className="text-ink-muted leading-relaxed">{m.description}</p>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted">
                      Ver artigos relacionados
                    </span>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* Leitura recomendada */}
      <section className="bg-paper-deep" aria-labelledby="reading-title">
        <div className="container-editorial py-16 md:py-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow-gold">Leitura recomendada</p>
            <h2 id="reading-title" className="mt-3 font-display text-2xl md:text-4xl font-semibold text-balance">
              Comece pelos artigos editoriais.
            </h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Enquanto a biblioteca de métodos cresce, os artigos editoriais já
              cobrem fundamentos, validação de fontes e a relação entre HUMINT
              e OSINT.
            </p>
            <Link
              href="/artigos"
              className="mt-5 inline-flex items-center gap-2 bg-ink text-paper hover:bg-ink-soft px-5 py-3 text-sm font-medium"
            >
              Ir para os artigos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
