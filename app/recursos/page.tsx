import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { NewsletterInline } from "@/components/site/newsletter-inline"
import { BIBLIOGRAPHY, GLOSSARY, QUICK_GUIDES } from "@/lib/content/resources"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Recursos: glossário, bibliografia e guias",
  description:
    "Recursos para estudar, pesquisar e aplicar HUMINT com mais rigor: glossário, bibliografia recomendada, guias rápidos e templates.",
  path: "/recursos",
})

export default function RecursosPage() {
  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Recursos", href: "/recursos" }]} />
      </section>

      <section className="container-editorial py-10 md:py-16">
        <p className="eyebrow-gold">Toolkit · Recursos</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight max-w-4xl">
          Recursos para estudar, pesquisar e aplicar HUMINT com mais rigor.
        </h1>
        <p className="mt-5 text-lg text-ink-soft leading-relaxed prose-measure">
          Glossário, bibliografia e guias de referência. Material atualizado periodicamente.
        </p>
      </section>

      {/* GUIAS */}
      <section className="container-editorial pb-16 md:pb-20">
        <div className="mb-8 hairline-b pb-3">
          <p className="eyebrow-gold mb-1">Guias rápidos</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Para começar com o pé direito</h2>
        </div>
        <div className="grid gap-px bg-line md:grid-cols-3">
          {QUICK_GUIDES.map((g) => (
            <Link
              key={g.title}
              href={g.href}
              className="group bg-paper-strong p-6 md:p-8 hover:bg-paper-deep transition-colors flex flex-col"
            >
              <h3 className="font-display text-xl font-semibold text-balance">{g.title}</h3>
              <p className="mt-2 text-ink-muted leading-relaxed flex-1">{g.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-active">
                Acessar <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-editorial pb-16 md:pb-20">
        <div className="grid gap-px bg-line">
          {QUICK_GUIDES.map((g) => {
            const id = g.href.split("#")[1]
            return (
              <section
                key={g.href}
                id={id}
                className="scroll-mt-24 bg-paper-strong p-6 md:p-8"
              >
                <p className="eyebrow-gold mb-2">Guia rápido</p>
                <h3 className="font-display text-2xl font-semibold text-balance">
                  {g.title}
                </h3>
                <p className="mt-2 max-w-2xl text-ink-muted leading-relaxed">
                  {g.summary}
                </p>
                <ol className="mt-5 grid gap-3 md:grid-cols-2">
                  {g.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                      <span className="font-mono text-gold-active">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      </section>

      {/* GLOSSÁRIO */}
      <section className="bg-paper-deep" id="glossario">
        <div className="container-editorial py-16 md:py-20">
          <div className="mb-10 hairline-b pb-3">
            <p className="eyebrow-gold mb-1">Glossário</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold">Termos essenciais</h2>
          </div>
          <dl className="grid gap-8 md:grid-cols-2">
            {GLOSSARY.map((g) => (
              <div key={g.term} className="hairline-t pt-5">
                <dt className="font-display text-lg font-semibold text-ink">{g.term}</dt>
                <dd className="mt-2 text-ink-soft leading-relaxed">{g.definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BIBLIOGRAFIA */}
      <section className="container-editorial py-16 md:py-20" id="bibliografia">
        <div className="mb-10 hairline-b pb-3">
          <p className="eyebrow-gold mb-1">Bibliografia</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Leituras recomendadas</h2>
        </div>
        <ul className="grid gap-px bg-line md:grid-cols-2">
          {BIBLIOGRAPHY.map((b) => (
            <li key={b.title} className="bg-paper-strong p-5 md:p-6">
              <p className="eyebrow mb-1">{b.author}</p>
              <h3 className="font-display text-lg font-semibold text-balance">{b.title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{b.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-editorial pb-20">
        <div className="bg-deep text-paper p-8 md:p-12 grid gap-8 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7">
            <p className="eyebrow-gold">Newsletter</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold text-balance">
              Avise quando novos recursos forem publicados.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <NewsletterInline variant="dark" />
          </div>
        </div>
      </section>
    </>
  )
}
