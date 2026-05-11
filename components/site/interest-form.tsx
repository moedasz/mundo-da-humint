"use client"

import Link from "next/link"
import { useState } from "react"
import { track } from "@/lib/analytics"

type Status = "idle" | "loading" | "success" | "error"

export function InterestForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    perfil: "",
    interesse: "fundamentos",
    consent: false,
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!form.consent) {
      setError("É necessário concordar com o tratamento dos dados.")
      return
    }
    setStatus("loading")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "formacao" }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Erro ao enviar.")
      track("course_interest_submit", { area: form.interesse })
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Erro desconhecido.")
    }
  }

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="bg-paper-strong border border-gold p-6 sm:p-8">
        <p className="eyebrow-gold mb-2">Recebido</p>
        <h3 className="font-display text-2xl font-semibold text-ink">
          Você está na lista de interesse.
        </h3>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Vamos avisar com antecedência sobre aulas abertas, workshops e abertura de turmas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="if-nome" className="text-sm font-medium text-ink">
            Nome <span aria-hidden className="text-gold-active">*</span>
          </label>
          <input
            id="if-nome"
            required
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            className="w-full bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="if-email" className="text-sm font-medium text-ink">
            E-mail <span aria-hidden className="text-gold-active">*</span>
          </label>
          <input
            id="if-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="if-perfil" className="text-sm font-medium text-ink">
          Sua atuação
        </label>
        <input
          id="if-perfil"
          value={form.perfil}
          onChange={(e) => setForm((f) => ({ ...f, perfil: e.target.value }))}
          placeholder="Ex.: compliance, jornalismo, pesquisa, segurança"
          className="w-full bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="if-interesse" className="text-sm font-medium text-ink">
          Tema de maior interesse
        </label>
        <select
          id="if-interesse"
          value={form.interesse}
          onChange={(e) => setForm((f) => ({ ...f, interesse: e.target.value }))}
          className="w-full bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
        >
          <option value="fundamentos">Fundamentos de HUMINT</option>
          <option value="entrevista">Entrevista e elicitação</option>
          <option value="validacao">Validação de fontes</option>
          <option value="contexto">Leitura de contexto</option>
          <option value="osint">HUMINT e OSINT</option>
        </select>
      </div>

      <label htmlFor="if-consent" className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed cursor-pointer">
        <input
          id="if-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          className="mt-1 h-4 w-4 accent-[var(--color-gold)] shrink-0"
        />
        <span>
          Concordo em receber comunicações sobre a formação do Mundo da HUMINT.
          Posso revogar a qualquer momento. Li a{" "}
          <Link href="/politica-de-privacidade" className="underline text-gold-active hover:text-gold-hover">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {error && (
        <p role="alert" className="text-sm text-alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start bg-gold hover:bg-[var(--color-gold-hover)] disabled:bg-[var(--color-gold-disabled)] px-6 py-3 text-sm font-medium transition-colors"
        style={{ color: "var(--color-on-gold)" }}
      >
        {status === "loading" ? "Enviando…" : "Entrar na lista de interesse"}
      </button>
    </form>
  )
}
