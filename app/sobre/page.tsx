import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Sobre o Mundo da HUMINT",
  description:
    "Uma plataforma editorial e educacional dedicada à inteligência humana aplicada. Por que existimos, o que publicamos e como trabalhamos.",
  path: "/sobre",
})

export default function SobrePage() {
  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Sobre", href: "/sobre" }]} />
      </section>

      <section className="container-editorial py-10 md:py-16">
        <p className="eyebrow-gold">Sobre o projeto</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight max-w-4xl">
          Uma plataforma editorial e educacional dedicada à inteligência humana
          aplicada.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-ink-soft leading-relaxed prose-measure">
          O Mundo da HUMINT existe para ocupar o espaço editorial que falta em
          pt-BR: um lugar sério para quem investiga, verifica e decide com base
          no que outras pessoas dizem.
        </p>
      </section>

      <section className="bg-paper-deep">
        <div className="container-editorial py-16 md:py-20 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow-gold">Manifesto</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance">
              Por que existimos.
            </h2>
          </div>
          <div className="lg:col-span-8 prose-measure text-ink-soft text-lg leading-relaxed space-y-5">
            <p>
              Inteligência humana aplicada é uma disciplina exigente. Mal
              traduzida, vira sensacionalismo. Mal ensinada, vira intuição
              disfarçada. Mal praticada, vira dano.
            </p>
            <p>
              Acreditamos que profissionais de segurança, compliance,
              jornalismo, pesquisa e análise merecem material editorial denso,
              honesto e útil, em português, com contexto local.
            </p>
            <p className="font-display text-2xl text-ink leading-snug text-pretty">
              Método antes de técnica. Contexto antes de conclusão. Ética antes
              de tudo.
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-20 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow-gold">Como trabalhamos</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance">
            O que sustenta cada publicação.
          </h2>
        </div>
        <div className="lg:col-span-8 grid gap-6 sm:grid-cols-2">
          {[
            { t: "Rigor", d: "Distinção clara entre evidência, inferência e hipótese, em todo texto publicado." },
            { t: "Contexto", d: "Nenhum fato existe no vácuo. Leitura contextual é parte do método." },
            { t: "Discrição", d: "Proteção de fontes e proporcionalidade no uso de informação." },
            { t: "Transparência", d: "Notas metodológicas, datas de atualização e log de correções." },
            { t: "Ética", d: "Limites legais, profissionais e morais explícitos." },
            { t: "Independência", d: "Sem patrocínio que comprometa a linha editorial." },
          ].map((p) => (
            <div key={p.t} className="bg-paper-strong p-5 md:p-6 hairline-y">
              <h3 className="font-display text-lg font-semibold text-ink">{p.t}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-deep text-paper">
        <div className="container-editorial py-16 md:py-20 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow-gold">Transparência</p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance leading-tight">
              O que você precisa saber para confiar no que lê aqui.
            </h2>
            <ul className="mt-6 space-y-3 text-[var(--color-warm-text)]">
              <li>· Identificamos autor e revisor em cada texto.</li>
              <li>· Datas de publicação e atualização são visíveis.</li>
              <li>· Correções factuais são registradas no rodapé do artigo.</li>
              <li>· IA generativa não é usada para inventar fatos, citações ou fontes.</li>
              <li>· Conflitos de interesse, quando existirem, são declarados.</li>
            </ul>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <Link
              href="/principios-editoriais"
              className="block bg-paper text-ink p-6 hover:bg-paper-deep transition-colors"
            >
              <p className="eyebrow-gold">Documento</p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                Princípios editoriais e éticos
              </h3>
              <p className="mt-1 text-sm text-ink-muted">
                Compromissos, políticas de fontes, IA e correções.
              </p>
            </Link>
            <Link
              href="/contato"
              className="block bg-paper text-ink p-6 hover:bg-paper-deep transition-colors"
            >
              <p className="eyebrow-gold">Contato</p>
              <h3 className="mt-2 font-display text-xl font-semibold">Imprensa, parcerias e dúvidas</h3>
              <p className="mt-1 text-sm text-ink-muted">
                Fale com a equipe editorial.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
