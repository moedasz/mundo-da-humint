import type { Metadata } from "next"
import Image from "next/image"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { JsonLd } from "@/components/site/json-ld"
import { WaitlistForm } from "@/components/site/waitlist-form"
import { faqSchema } from "@/lib/schema"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "O livro do Mundo da HUMINT: lista de espera",
  description:
    "Entre na lista para receber aviso de lançamento, prévia exclusiva e novidades em primeira mão do livro do Mundo da HUMINT.",
  path: "/livro",
  image: "/images/hero-livro.jpg",
})

const FAQ = [
  {
    question: "Para quem é este livro?",
    answer:
      "Profissionais de segurança, compliance, investigação corporativa, jornalismo investigativo, pesquisadores e analistas que tomam decisão a partir do que outras pessoas dizem.",
  },
  {
    question: "Qual é o nível?",
    answer:
      "O livro parte de fundamentos e avança para aplicação prática. Não exige formação prévia em inteligência, mas pressupõe maturidade profissional.",
  },
  {
    question: "Quando será lançado?",
    answer:
      "Ainda não há data pública. Quem entrar na lista de espera recebe primeiro a confirmação de lançamento e a prévia exclusiva.",
  },
  {
    question: "Em quais formatos?",
    answer:
      "Iniciaremos por edição impressa em português do Brasil. Versão digital está prevista, com cronograma confirmado próximo ao lançamento.",
  },
  {
    question: "Vocês compartilham meus dados?",
    answer:
      "Não. Seus dados são tratados conforme nossa Política de Privacidade. Você pode revogar o consentimento a qualquer momento.",
  },
]

const SUMMARY = [
  "Parte I. Fundamentos: o que HUMINT é, o que não é, e onde ela se encaixa.",
  "Parte II. Fontes humanas: acesso, motivação, consistência e calibragem de confiança.",
  "Parte III. Prática: preparação, entrevista, registro, validação cruzada.",
  "Parte IV. Análise: leitura de contexto, distinção entre evidência, inferência e hipótese.",
  "Parte V. Ética e limites: proporcionalidade, proteção e responsabilidade.",
  "Parte VI. HUMINT em sistemas: combinação com OSINT, documental e observacional.",
]

export default function LivroPage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ)} />

      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Livro", href: "/livro" }]} />
      </section>

      {/* HERO */}
      <section className="bg-deep text-paper mt-6">
        <div className="container-editorial py-14 md:py-20 grid gap-10 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow-gold">Em pré-lançamento</p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight">
              O livro do Mundo da HUMINT está chegando.
            </h1>
            <p className="mt-5 text-lg md:text-xl text-[var(--color-warm-text)] leading-relaxed max-w-xl">
              Um livro sobre inteligência humana aplicada, escrito em pt-BR,
              com a profundidade que o tema exige. Entre na lista para receber
              aviso de lançamento, prévia exclusiva e novidades em primeira mão.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/hero-livro.jpg"
                alt="Livro de capa escura sobre mesa, com sombras dramáticas projetadas em diagonal."
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O QUE ESPERAR */}
      <section className="container-editorial py-16 md:py-20 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow-gold">O problema que o livro resolve</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance">
            Quase tudo o que existe sobre HUMINT em português é raso, traduzido
            mal ou orientado a outra realidade.
          </h2>
        </div>
        <div className="lg:col-span-7 prose-measure text-ink-soft text-lg leading-relaxed space-y-5">
          <p>
            O livro coloca a inteligência humana onde ela pertence: como
            disciplina profissional aplicável a investigação, compliance,
            jornalismo, pesquisa e análise de risco, não como folclore de
            espionagem.
          </p>
          <p>
            Você vai encontrar fundamentos, método, prática e ética, com
            exemplos contextualizados ao trabalho real de quem precisa decidir
            com base em pessoas.
          </p>
        </div>
      </section>

      {/* PARA QUEM É / O QUE VAI APRENDER */}
      <section className="bg-paper-deep">
        <div className="container-editorial py-16 md:py-20 grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow-gold">Para quem é</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold">
              Quem decide com base em pessoas.
            </h2>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {[
                "Profissionais de segurança corporativa",
                "Times de compliance e integridade",
                "Investigação corporativa e due diligence",
                "Jornalismo investigativo e verificação",
                "Pesquisadores e analistas",
                "Profissionais de risco e geopolítica",
              ].map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="text-gold mt-1">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow-gold">O que você vai aprender</p>
            <h2 className="mt-3 font-display text-2xl md:text-3xl font-semibold">
              Método antes de técnica.
            </h2>
            <ul className="mt-6 space-y-3 text-ink-soft">
              {[
                "Como separar percepção, inferência e comentário",
                "Como avaliar fontes pelo que cada relato pode sustentar",
                "Como conduzir entrevistas e elicitações com ética",
                "Como ler contexto antes de tirar conclusões",
                "Como combinar HUMINT com OSINT sem produzir falsa segurança",
                "Como registrar e revisar com rastreabilidade",
              ].map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="text-gold mt-1">·</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SUMÁRIO */}
      <section id="sumario" className="container-editorial py-16 md:py-20 scroll-mt-24">
        <p className="eyebrow-gold">Sumário prévio</p>
        <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance max-w-3xl">
          Estrutura geral. O sumário definitivo será divulgado próximo ao lançamento.
        </h2>
        <ol className="mt-8 grid gap-px bg-line md:grid-cols-2">
          {SUMMARY.map((s, i) => (
            <li key={i} className="bg-paper-strong p-5 md:p-6 flex gap-4">
              <span className="font-display text-2xl text-gold-active leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-ink-soft leading-relaxed">{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* WAITLIST */}
      <section id="lista" className="bg-deep text-paper scroll-mt-24">
        <div className="container-editorial py-16 md:py-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow-gold">Lista de espera</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-semibold text-balance leading-tight">
              Entre na lista de espera.
            </h2>
            <p className="mt-5 text-[var(--color-warm-text)] leading-relaxed">
              Você recebe primeiro o aviso de lançamento, prévia exclusiva e
              novidades. Sem ruído, sem spam.
            </p>
          </div>
          <div className="lg:col-span-7 bg-paper p-6 md:p-10">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial py-16 md:py-20" aria-labelledby="faq-title">
        <p className="eyebrow-gold">Perguntas frequentes</p>
        <h2 id="faq-title" className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance">
          Antes de entrar na lista.
        </h2>
        <dl className="mt-10 grid gap-8 md:grid-cols-2">
          {FAQ.map((f) => (
            <div key={f.question} className="hairline-t pt-5">
              <dt className="font-display text-lg font-semibold">{f.question}</dt>
              <dd className="mt-2 text-ink-soft leading-relaxed">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
