import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { InterestForm } from "@/components/site/interest-form"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Formação Mundo da HUMINT: em breve",
  description:
    "Programas, workshops e aulas abertas em desenvolvimento. Entre na lista de interesse para receber acesso antecipado.",
  path: "/formacao",
})

const FUTURE_PROGRAMS = [
  {
    title: "Fundamentos de HUMINT aplicada",
    summary:
      "Programa introdutório voltado a profissionais que tomam decisão com base em pessoas. Foco em método, escuta e ética.",
    format: "Programa curto · Online",
  },
  {
    title: "Entrevista e elicitação na prática",
    summary:
      "Workshop intensivo sobre preparação, condução, registro e revisão de entrevistas profissionais.",
    format: "Workshop · Híbrido",
  },
  {
    title: "Validação de fontes humanas",
    summary:
      "Treinamento prático sobre avaliação de credibilidade, motivação e consistência, com casos reais e roleplay.",
    format: "Treinamento · Online",
  },
  {
    title: "HUMINT em compliance e integridade",
    summary:
      "Programa avançado para times de compliance, integridade e investigação interna.",
    format: "Programa corporativo · Sob demanda",
  },
]

export default function FormacaoPage() {
  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Formação", href: "/formacao" }]} />
      </section>

      {/* HERO */}
      <section className="container-editorial py-10 md:py-16">
        <span className="inline-block bg-warm-deep text-paper px-2.5 py-1 text-[11px] font-mono uppercase tracking-widest mb-5">
          Em breve
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight max-w-4xl">
          Formação Mundo da HUMINT
        </h1>
        <p className="mt-5 text-lg md:text-xl text-ink-soft leading-relaxed prose-measure">
          Estamos finalizando nossos primeiros programas. Entre na lista para
          receber acesso antecipado a turmas, aulas abertas e novos materiais.
        </p>
      </section>

      {/* HONEST DISCLOSURE */}
      <section className="bg-paper-deep">
        <div className="container-editorial py-12 md:py-16 grid gap-8 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-display text-2xl md:text-3xl font-semibold">
              Sem turma aberta. Sem promessa vazia.
            </h2>
          </div>
          <div className="lg:col-span-7 prose-measure text-ink-soft leading-relaxed space-y-4 text-lg">
            <p>
              A formação está em desenvolvimento. Antes de abrir turma, queremos
              ter o método consolidado, o material maduro e o convite certo
              para quem leva HUMINT a sério.
            </p>
            <p>
              A lista de interesse não é cobrança. É como organizamos o acesso
              antecipado a workshops, aulas abertas e novos programas, sem
              vender nada antes da hora.
            </p>
          </div>
        </div>
      </section>

      {/* TEMAS FUTUROS */}
      <section className="container-editorial py-16 md:py-20">
        <div className="mb-10 hairline-b pb-3">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">
            Programas previstos
          </h2>
        </div>
        <div className="grid gap-px bg-line md:grid-cols-2">
          {FUTURE_PROGRAMS.map((p) => (
            <article key={p.title} className="bg-paper-strong p-6 md:p-8 flex flex-col gap-3">
              <p className="eyebrow">{p.format}</p>
              <h3 className="font-display text-xl md:text-2xl font-semibold text-balance">{p.title}</h3>
              <p className="text-ink-muted leading-relaxed">{p.summary}</p>
            </article>
          ))}
        </div>
      </section>

      {/* INTEREST FORM */}
      <section className="bg-deep text-paper">
        <div className="container-editorial py-16 md:py-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 min-w-0">
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-paper text-balance leading-tight">
              Acesso antecipado às próximas turmas.
            </h2>
            <p className="mt-5 text-[var(--color-warm-text)] leading-relaxed">
              Avisamos com antecedência sobre aulas abertas, workshops e
              abertura de programas, na ordem em que forem confirmados.
            </p>
          </div>
          <div className="lg:col-span-7 min-w-0 bg-paper p-6 md:p-10">
            <InterestForm />
          </div>
        </div>
      </section>
    </>
  )
}
