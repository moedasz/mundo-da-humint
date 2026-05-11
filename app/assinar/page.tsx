import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: `Assinar · ${SITE.name}`,
  description:
    "Acesso completo às operações documentadas, casos históricos e análises exclusivas. Assinatura anual do Mundo da HUMINT.",
}

const BENEFITS = [
  "Acesso completo a todas as operações documentadas",
  "Análises exclusivas de casos históricos",
  "Reconstituição de método e análise de consequências",
  "Novos casos adicionados mensalmente",
  "Acesso antecipado a novos conteúdos",
  "Sem anúncios ou interrupções",
]

export default function AssinarPage() {
  return (
    <main className="bg-paper min-h-screen">
      <div className="container-editorial py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-gold-active mb-3">
            Assinatura anual
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-ink mb-4 text-balance">
            Acesso completo ao arquivo de operações
          </h1>
          <p className="text-ink-muted text-base md:text-lg leading-relaxed">
            Casos históricos documentados, reconstituição de método, análise de erro e consequência.
            Material para quem trabalha com investigação, segurança ou compliance.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-paper-strong border border-line p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted mb-2">
              Plano anual
            </p>
            <p className="font-display text-4xl md:text-5xl font-bold text-ink">
              R$ 297
              <span className="text-lg font-normal text-ink-muted">/ano</span>
            </p>
            <p className="text-sm text-ink-muted mt-2">
              Equivale a menos de R$ 25 por mês
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {BENEFITS.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink-soft">
                <Check className="w-4 h-4 text-gold-active shrink-0 mt-0.5" />
                {benefit}
              </li>
            ))}
          </ul>

          <button
            type="button"
            disabled
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-on-gold px-6 py-3.5 text-sm font-semibold opacity-60 cursor-not-allowed"
          >
            Em breve
          </button>
          <p className="text-center text-xs text-ink-muted mt-4">
            A assinatura será liberada em breve. Entre na{" "}
            <Link href="/livro" className="text-gold-active hover:underline">
              lista de espera do livro
            </Link>{" "}
            para ser avisado.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-sm text-ink-muted">
            Dúvidas?{" "}
            <Link href="/contato" className="text-gold-active hover:underline">
              Entre em contato
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
