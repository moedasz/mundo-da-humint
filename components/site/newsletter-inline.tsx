"use client"

import { useId, useState } from "react"
import { track } from "@/lib/analytics"

type Props = {
  variant?: "light" | "dark"
  placeholder?: string
}

export function NewsletterInline({ variant = "light", placeholder = "seu@email.com" }: Props) {
  const emailId = useId()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Erro ao inscrever")
      track("newsletter_signup", { source: "inline" })
      setStatus("success")
      setMessage("Inscrição confirmada. Em breve você receberá nossos envios.")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Não foi possível inscrever.")
    }
  }

  const isDark = variant === "dark"

  return (
    <form onSubmit={onSubmit} className="w-full" aria-label="Assinar newsletter">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
        <label htmlFor={emailId} className="sr-only">
          E-mail
        </label>
        <input
          id={emailId}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          className={
            isDark
              ? "flex-1 bg-transparent border border-[var(--color-warm-text)] text-paper placeholder:text-[var(--color-warm-text)]/60 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
              : "flex-1 bg-paper-strong border border-line text-ink placeholder:text-ink-muted px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
          }
          aria-invalid={status === "error"}
          disabled={status === "loading" || status === "success"}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="bg-gold hover:bg-[var(--color-gold-hover)] disabled:bg-[var(--color-gold-disabled)] px-4 py-2.5 text-sm font-medium transition-colors"
          style={{ color: "var(--color-on-gold)" }}
        >
          {status === "loading" ? "Enviando…" : status === "success" ? "Inscrito" : "Assinar"}
        </button>
      </div>
      {message && (
        <p
          role={status === "error" ? "alert" : "status"}
          className={
            isDark
              ? "mt-2 text-xs " + (status === "error" ? "text-[var(--color-copper)]" : "text-[var(--color-warm-text)]")
              : "mt-2 text-xs " + (status === "error" ? "text-alert" : "text-ink-muted")
          }
        >
          {message}
        </p>
      )}
      <p
        className={
          "mt-2 text-[11px] leading-relaxed " +
          (isDark ? "text-[var(--color-warm-text)]/70" : "text-ink-muted")
        }
      >
        Ao assinar, você concorda com nossa{" "}
        <a
          href="/politica-de-privacidade"
          className={isDark ? "underline text-[var(--color-warm-text)]" : "underline text-ink-soft"}
        >
          Política de Privacidade
        </a>
        .
      </p>
    </form>
  )
}
