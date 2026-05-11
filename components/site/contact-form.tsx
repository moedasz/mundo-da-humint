"use client"

import { useState } from "react"
import { track } from "@/lib/analytics"

const INTENTS = [
  { value: "imprensa", label: "Imprensa" },
  { value: "parcerias", label: "Parcerias" },
  { value: "convites", label: "Convites e palestras" },
  { value: "formacao", label: "Treinamento futuro" },
  { value: "duvidas", label: "Dúvidas gerais" },
] as const

type Status = "idle" | "loading" | "success" | "error"

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    intencao: "duvidas",
    mensagem: "",
    consent: false,
  })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!form.consent) {
      setError("É necessário concordar com o tratamento dos dados.")
      return
    }
    if (form.mensagem.trim().length < 10) {
      setError("Conte um pouco mais sobre o que precisa (mínimo 10 caracteres).")
      return
    }
    setStatus("loading")
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Erro ao enviar.")
      track("contact_submit", { intent: form.intencao })
      setStatus("success")
      setForm({ nome: "", email: "", intencao: "duvidas", mensagem: "", consent: false })
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
          Sua mensagem chegou aqui.
        </h3>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Responderemos no e-mail informado. Para imprensa e prazos curtos,
          inclua isso no assunto.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-nome" className="text-sm font-medium text-ink">
            Nome <span aria-hidden className="text-gold-active">*</span>
          </label>
          <input
            id="ct-nome"
            type="text"
            required
            value={form.nome}
            onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
            className="bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="ct-email" className="text-sm font-medium text-ink">
            E-mail <span aria-hidden className="text-gold-active">*</span>
          </label>
          <input
            id="ct-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="ct-intencao" className="text-sm font-medium text-ink">
          Sobre o que é?
        </label>
        <select
          id="ct-intencao"
          value={form.intencao}
          onChange={(e) => setForm((f) => ({ ...f, intencao: e.target.value }))}
          className="bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
        >
          {INTENTS.map((i) => (
            <option key={i.value} value={i.value}>
              {i.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="ct-msg" className="text-sm font-medium text-ink">
          Mensagem <span aria-hidden className="text-gold-active">*</span>
        </label>
        <textarea
          id="ct-msg"
          required
          rows={6}
          value={form.mensagem}
          onChange={(e) => setForm((f) => ({ ...f, mensagem: e.target.value }))}
          className="bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold resize-y"
        />
      </div>

      <label htmlFor="ct-consent" className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed cursor-pointer">
        <input
          id="ct-consent"
          type="checkbox"
          checked={form.consent}
          onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
          className="mt-1 h-4 w-4 accent-[var(--color-gold)] shrink-0"
        />
        <span>
          Concordo com o uso dos meus dados para responder a esta solicitação,
          conforme nossa Política de Privacidade.
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
        {status === "loading" ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  )
}
