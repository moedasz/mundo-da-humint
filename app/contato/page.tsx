import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { ContactForm } from "@/components/site/contact-form"
import { SITE } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Contato",
  description:
    "Fale com a equipe editorial do Mundo da HUMINT: imprensa, parcerias, convites e dúvidas gerais.",
  path: "/contato",
})

const FAQ = [
  {
    q: "Vocês aceitam pautas?",
    a: "Sim, com critério editorial. Envie um resumo claro do que quer apresentar e qual o ângulo proposto.",
  },
  {
    q: "Posso usar conteúdo do site?",
    a: "Sim, com atribuição clara e link. Para uso comercial ou reprodução integral, fale com a equipe editorial.",
  },
  {
    q: "Vocês fazem palestras e treinamentos in-company?",
    a: "Em breve. Por enquanto, registre o interesse pelo formulário e entraremos em contato quando o programa abrir.",
  },
]

export default function ContatoPage() {
  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Contato", href: "/contato" }]} />
      </section>

      <section className="container-editorial py-10 md:py-16">
        <p className="eyebrow-gold">Contato</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight max-w-3xl">
          Fale com a equipe editorial.
        </h1>
        <p className="mt-5 text-lg text-ink-soft leading-relaxed prose-measure">
          Imprensa, parcerias, convites e dúvidas gerais. Respondemos em até
          alguns dias úteis.
        </p>
      </section>

      <section className="container-editorial pb-16 md:pb-20 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-paper-strong p-6 hairline-y">
            <p className="eyebrow-gold">E-mail</p>
            <a href={`mailto:${SITE.email}`} className="mt-1 inline-block font-display text-xl font-semibold text-ink hover:text-gold-active">
              {SITE.email}
            </a>
            <p className="mt-2 text-sm text-ink-muted">Para a maioria dos casos, prefira o formulário ao lado.</p>
          </div>
          <div className="bg-paper-strong p-6 hairline-y">
            <p className="eyebrow-gold">Imprensa</p>
            <p className="mt-1 text-sm text-ink-soft leading-relaxed">
              Se você está em prazo de matéria, indique isso no assunto. Citações pedem aprovação prévia da equipe editorial.
            </p>
          </div>
          <div className="bg-paper-strong p-6 hairline-y">
            <p className="eyebrow-gold">Parcerias</p>
            <p className="mt-1 text-sm text-ink-soft leading-relaxed">
              Avaliamos parcerias que respeitem a linha editorial. Não publicamos conteúdo patrocinado disfarçado de editorial.
            </p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="container-editorial py-16 md:py-20">
          <p className="eyebrow-gold">Perguntas frequentes</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance">
            Antes de escrever.
          </h2>
          <dl className="mt-10 grid gap-8 md:grid-cols-3">
            {FAQ.map((f) => (
              <div key={f.q} className="hairline-t pt-5">
                <dt className="font-display text-lg font-semibold">{f.q}</dt>
                <dd className="mt-2 text-ink-soft leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
