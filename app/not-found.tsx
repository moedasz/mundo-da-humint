import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <section className="container-editorial py-24 md:py-32">
      <p className="eyebrow-gold">Erro 404</p>
      <h1 className="mt-4 font-display text-5xl md:text-6xl font-semibold tracking-tight text-balance">
        A trilha some aqui.
      </h1>
      <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed text-pretty">
        A página que você procurou não existe, foi movida ou nunca esteve onde
        a memória sugere. Voltar à apuração é sempre uma boa decisão.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-ink-soft transition-colors"
        >
          Voltar para a Home
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/artigos"
          className="inline-flex items-center justify-center gap-2 border border-ink text-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
        >
          Ver artigos
        </Link>
      </div>
    </section>
  )
}
