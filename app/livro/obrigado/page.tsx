import type { Metadata } from "next"
import Link from "next/link"
import { Check } from "lucide-react"
import { pageMetadata } from "@/lib/seo"

export const metadata: Metadata = pageMetadata({
  title: "Inscrição confirmada · Lista do livro",
  description:
    "Sua inscrição na lista de espera do livro Mundo da HUMINT foi recebida.",
  path: "/livro/obrigado",
  noIndex: true,
})

export default function ObrigadoLivroPage() {
  return (
    <section className="container-editorial py-20 md:py-28">
      <div className="max-w-2xl">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gold text-on-gold">
          <Check className="h-6 w-6" />
        </div>
        <p className="eyebrow-gold mt-6">Inscrição confirmada</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance leading-tight">
          Você está na lista.
        </h1>
        <p className="mt-6 text-lg text-ink-soft leading-relaxed text-pretty">
          Em breve você receberá um e-mail de confirmação. Quando o livro
          estiver disponível para pré-venda, os inscritos terão prioridade no
          aviso, com brindes editoriais reservados para a primeira janela.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            href="/artigos"
            className="inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Ler artigos enquanto isso
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-ink text-ink px-6 py-3 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </section>
  )
}
