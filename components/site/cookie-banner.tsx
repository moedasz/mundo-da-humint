"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

const STORAGE_KEY = "mh:cookie-consent"

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) setShow(true)
    } catch {
      // ignore
    }
  }, [])

  function setConsent(value: "all" | "essential") {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: new Date().toISOString() }),
      )
    } catch {
      // ignore
    }
    setShow(false)
  }

  if (!show) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
    >
      <div className="mx-auto max-w-4xl bg-deep text-warm shadow-lg">
        <div className="p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-sm leading-relaxed flex-1">
            Usamos cookies essenciais para o funcionamento do site. Cookies
            opcionais ajudam a entender a leitura e melhorar conteúdos. Você
            decide.{" "}
            <Link
              href="/politica-de-privacidade"
              className="underline text-gold hover:text-[var(--color-gold-soft)]"
            >
              Política de privacidade
            </Link>
            .
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setConsent("essential")}
              className="px-3 py-2 text-sm border border-[var(--color-warm-text)] text-[var(--color-warm-text)] hover:bg-[var(--color-deep-2)]"
            >
              Apenas essenciais
            </button>
            <button
              type="button"
              onClick={() => setConsent("all")}
              className="px-3 py-2 text-sm bg-gold"
              style={{ color: "var(--color-on-gold)" }}
            >
              Aceitar todos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
