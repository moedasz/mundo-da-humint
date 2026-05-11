import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Princípios editoriais e éticos",
  description:
    "Compromissos, políticas e práticas que sustentam o conteúdo publicado pelo Mundo da HUMINT.",
  path: "/principios-editoriais",
})

const SECTIONS: { id: string; title: string; body: string[] }[] = [
  {
    id: "precisao",
    title: "Compromisso com precisão",
    body: [
      "Cada texto publicado é revisado antes de ir ao ar. Afirmações factuais devem estar sustentadas por evidência verificável ou claramente identificadas como inferência ou hipótese.",
      "Quando um ponto não pode ser confirmado com segurança, dizemos isso no próprio texto, em vez de produzir conclusões mais sólidas do que a evidência permite.",
    ],
  },
  {
    id: "contexto",
    title: "Compromisso com contexto",
    body: [
      "Fato isolado não é análise. Procuramos sempre indicar o contexto em que uma afirmação faz sentido (vínculos, histórico, ambiente) para que o leitor consiga calibrar peso e intenção.",
    ],
  },
  {
    id: "transparencia",
    title: "Transparência metodológica",
    body: [
      "Em textos que envolvem investigação ou análise contextual, incluímos uma nota metodológica indicando como a informação foi obtida, com que tipo de fonte e com que limitações.",
      "Distinguimos, no produto final, entre evidência, inferência e comentário.",
    ],
  },
  {
    id: "imagens",
    title: "Política de uso de imagens",
    body: [
      "Imagens jornalísticas e documentais devem ser autênticas e corretamente atribuídas. Não publicamos imagens fabricadas como se fossem reais.",
      "Imagens podem ter recortes editoriais e overlays para legibilidade, mas nunca alterações que mudem o conteúdo factual da cena.",
    ],
  },
  {
    id: "correcoes",
    title: "Política de correções",
    body: [
      "Erros factuais são corrigidos assim que identificados, com registro datado no rodapé do artigo descrevendo o que foi alterado.",
      "Correções tipográficas e ajustes mínimos podem ser feitos sem log formal, conforme política interna.",
    ],
  },
  {
    id: "conflitos",
    title: "Política de conflitos de interesse",
    body: [
      "Conflitos de interesse, quando existirem entre autores e o tema tratado, devem ser declarados no próprio texto.",
      "Não publicamos conteúdo patrocinado disfarçado de editorial. Conteúdo institucional ou patrocinado é sinalizado de forma inequívoca.",
    ],
  },
  {
    id: "ia",
    title: "Política de uso de IA",
    body: [
      "IA generativa não é usada para inventar fatos, citações, fontes ou imagens jornalísticas. Pode ser usada como apoio operacional interno (revisão, organização, consulta) sempre sob revisão humana integral.",
      "Quando houver uso material de IA em pesquisa interna, isso será divulgado no texto correspondente.",
    ],
  },
  {
    id: "distincao",
    title: "Distinção entre análise, hipótese e fato verificado",
    body: [
      "Análise é interpretação sustentada em evidência. Hipótese é proposição que ainda exige verificação. Fato verificado é o que pode ser confirmado de forma independente.",
      "Esses três níveis aparecem com sinalização linguística clara em qualquer texto que misture os três.",
    ],
  },
]

export default function PrincipiosPage() {
  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Princípios editoriais", href: "/principios-editoriais" }]} />
      </section>

      <section className="container-editorial py-10 md:py-16">
        <p className="eyebrow-gold">Documento institucional</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance leading-tight max-w-4xl">
          Princípios editoriais e éticos
        </h1>
        <p className="mt-5 text-lg text-ink-soft leading-relaxed prose-measure">
          Os compromissos abaixo orientam o que publicamos, como publicamos e o
          que recusamos publicar.
        </p>
      </section>

      <section className="container-editorial pb-16 md:pb-24 grid gap-12 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow-gold mb-3">Nesta página</p>
            <ol className="flex flex-col gap-2 text-sm">
              {SECTIONS.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-ink-soft hover:text-gold-active flex gap-3"
                  >
                    <span className="font-mono text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </aside>
        <div className="lg:col-span-9 article-prose max-w-[68ch]">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2>{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}

          <section className="mt-10 bg-paper-deep p-6 md:p-8 not-prose">
            <p className="eyebrow-gold mb-2">Documento vivo</p>
            <p className="text-ink-soft leading-relaxed">
              Este documento é revisado periodicamente. Sugestões e críticas
              são bem-vindas pelo formulário de contato.
            </p>
          </section>
        </div>
      </section>
    </>
  )
}
