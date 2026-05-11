"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { NAV, SITE } from "@/lib/site"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/site/brand-logo"

/**
 * Cabecalho no estilo portal editorial (referencia: Brasil Paralelo):
 * - Logo a esquerda
 * - Navegacao central com 4 itens (Analises / Casos / Metodos / Formacao)
 * - A direita: busca e CTA dourado de assinatura
 *
 * Em telas <lg, exibe apenas logo + CTA dourado + menu hamburguer.
 */
export function SiteHeader() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
    return () => {
      document.documentElement.style.overflow = ""
    }
  }, [open])

  const isActive = (href: string) => {
    const [basePath, query] = href.split("?")

    if (query) {
      if (pathname !== basePath) return false
      const expected = new URLSearchParams(query)
      return Array.from(expected.entries()).every(
        ([key, value]) => searchParams.get(key) === value,
      )
    }

    if (basePath === "/artigos") {
      return (
        pathname.startsWith("/artigos") &&
        !searchParams.get("categoria") &&
        !searchParams.get("tag")
      )
    }

    return pathname === basePath || (basePath !== "/" && pathname.startsWith(`${basePath}/`))
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        scrolled
          ? "bg-paper/95 backdrop-blur-sm border-b border-line"
          : "bg-paper border-b border-line",
      )}
    >
      <div className="container-editorial flex h-16 lg:h-[72px] items-center justify-between gap-4 lg:gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label={`${SITE.name}, página inicial`}
        >
          <BrandLogo variant="black" priority className="h-8 sm:h-9" />
        </Link>

        {/* Navegacao central */}
        <nav
          className="hidden lg:flex flex-1 items-center justify-center gap-8"
          aria-label="Principal"
        >
          {NAV.primary.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[15px] font-medium transition-colors",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Acoes a direita */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <Link
            href="/artigos"
            aria-label="Buscar análises"
            className="hidden md:inline-flex items-center justify-center w-10 h-10 text-ink-muted hover:text-ink transition-colors"
          >
            <Search className="w-[18px] h-[18px]" />
          </Link>

          <Link
            href="/assinar"
            className="inline-flex items-center justify-center bg-gold hover:bg-gold-active text-on-gold px-3 py-2 text-sm font-semibold transition-colors sm:px-4"
          >
            Assine
          </Link>

          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 text-ink"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto border-t border-line bg-paper shadow-[0_24px_60px_rgba(14,17,22,0.18)]"
        >
          <nav
            className="container-editorial py-6 flex flex-col"
            aria-label="Principal mobile"
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-2">
              Navegar
            </p>
            {NAV.primary.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "py-3 border-b border-line font-medium text-lg",
                    active ? "text-ink" : "text-ink-muted",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mt-8 mb-2">
              Mais
            </p>
            {NAV.meta.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 border-b border-line text-base text-ink-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contato"
              className="py-3 border-b border-line text-base text-ink-muted"
            >
              Contato
            </Link>

            <Link
              href="/artigos"
              className="mt-6 inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-ink border border-ink/80"
            >
              Ver artigos
            </Link>
            <Link
              href="/assinar"
              className="mt-3 inline-flex items-center justify-center bg-gold text-on-gold px-4 py-3 text-sm font-semibold"
            >
              Assine
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
