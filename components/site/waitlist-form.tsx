"use client"

import Link from "next/link"
import { useState } from "react"
import { track } from "@/lib/analytics"

type Status = "idle" | "loading" | "success" | "error"

type FormState = {
  nome: string
  email: string
  whatsapp: string
  consent: boolean
}

const INITIAL: FormState = {
  nome: "",
  email: "",
  whatsapp: "",
  consent: false,
}

export function WaitlistForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function validate(): boolean {
    const errs: Partial<Record<keyof FormState, string>> = {}
    if (form.nome.trim().length < 2) errs.nome = "Informe seu nome."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Informe um e-mail válido."
    const digits = form.whatsapp.replace(/\D/g, "")
    if (digits.length < 10) errs.whatsapp = "Informe um WhatsApp válido com DDD."
    if (!form.consent) errs.consent = "É necessário concordar para entrar na lista."
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!validate()) return
    setStatus("loading")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Não foi possível enviar.")
      track("book_waitlist_submit", { source: "livro" })
      setStatus("success")
      setForm(INITIAL)
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Erro desconhecido.")
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-paper-strong border border-gold p-6 sm:p-8"
      >
        <p className="eyebrow-gold mb-2">Confirmado</p>
        <h3 className="font-display text-2xl font-semibold text-ink text-balance">
          Você entrou na lista do livro.
        </h3>
        <p className="mt-3 text-ink-soft leading-relaxed">
          Em breve enviaremos a confirmação por e-mail e novidades de
          lançamento, prévias e materiais relacionados. Você pode revogar seu
          consentimento a qualquer momento.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-nome" className="text-sm font-medium text-ink">
          Nome <span aria-hidden className="text-gold-active">*</span>
        </label>
        <input
          id="wl-nome"
          type="text"
          required
          autoComplete="name"
          value={form.nome}
          onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
          aria-invalid={!!fieldErrors.nome}
          aria-describedby={fieldErrors.nome ? "wl-nome-err" : undefined}
          className="bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
        />
        {fieldErrors.nome && (
          <p id="wl-nome-err" role="alert" className="text-xs text-alert">
            {fieldErrors.nome}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-email" className="text-sm font-medium text-ink">
          E-mail <span aria-hidden className="text-gold-active">*</span>
        </label>
        <input
          id="wl-email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          aria-invalid={!!fieldErrors.email}
          aria-describedby={fieldErrors.email ? "wl-email-err" : undefined}
          className="bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
        />
        {fieldErrors.email && (
          <p id="wl-email-err" role="alert" className="text-xs text-alert">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-wa" className="text-sm font-medium text-ink">
          WhatsApp <span aria-hidden className="text-gold-active">*</span>
        </label>
        <input
          id="wl-wa"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(11) 90000-0000"
          value={form.whatsapp}
          onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
          aria-invalid={!!fieldErrors.whatsapp}
          aria-describedby={fieldErrors.whatsapp ? "wl-wa-err" : undefined}
          className="bg-paper-strong border border-line px-3 py-2.5 text-ink focus:outline-none focus:border-gold"
        />
        {fieldErrors.whatsapp && (
          <p id="wl-wa-err" role="alert" className="text-xs text-alert">
            {fieldErrors.whatsapp}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="wl-consent" className="flex items-start gap-3 text-sm text-ink-soft leading-relaxed cursor-pointer">
          <input
            id="wl-consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
            aria-invalid={!!fieldErrors.consent}
            aria-describedby={fieldErrors.consent ? "wl-consent-err" : undefined}
            className="mt-1 h-4 w-4 accent-[var(--color-gold)] shrink-0"
          />
          <span>
            Concordo em receber comunicações do Mundo da HUMINT sobre o
            lançamento do livro, conteúdos editoriais e futuras formações.
            Posso revogar meu consentimento a qualquer momento. Li a{" "}
            <Link
              href="/politica-de-privacidade"
              className="underline text-gold-active hover:text-gold-hover"
            >
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {fieldErrors.consent && (
          <p id="wl-consent-err" role="alert" className="text-xs text-alert">
            {fieldErrors.consent}
          </p>
        )}
      </div>

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
        {status === "loading" ? "Enviando…" : "Entrar na lista de espera"}
      </button>

      <p className="text-xs text-ink-muted leading-relaxed">
        Seus dados são tratados conforme nossa Política de Privacidade. Não
        compartilhamos com terceiros para fins comerciais.
      </p>
    </form>
  )
}
