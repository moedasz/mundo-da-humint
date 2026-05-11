"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type HeroSlide = {
  /**
   * Categoria curta (ex.: "ANÁLISES", "CONTRAINTELIGÊNCIA"). Vira:
   *  - badge dourado no mobile
   *  - parte do kicker no desktop ("EM DESTAQUE NO MUNDO DA HUMINT · {CATEGORY}")
   */
  category: string
  /** Manchete (serifa, grande). Mantenha curto — quanto menor, mais cinematográfico. */
  title: string
  href: string
  image: string
  imageAlt: string
  /**
   * object-position da imagem (CSS). Util para enquadrar corretamente rostos
   * e elementos no recorte 24:9 do desktop. Ex.: "center 30%", "70% center".
   * Default: "center".
   */
  imagePosition?: string
  /** Linha descritiva no desktop (sob o titulo). Mantenha curta — 1 linha. */
  subtitle?: string
  /** Texto da CTA pill no desktop. Default: "Ler analise completa". */
  ctaLabel?: string
}

type Props = {
  slides: HeroSlide[]
  /** Intervalo do autoplay em ms. Passe 0 para desativar. Default: 7000. */
  autoPlayMs?: number
}

/**
 * Hero carrossel editorial inspirado em portal jornalístico de referência
 * (Brasil Paralelo). Renderiza duas variantes via CSS responsivo, mantendo a
 * mesma mecânica de scroll-snap:
 *
 * - Mobile (< lg): imagem retrato 3:4, badge dourado da categoria e manchete
 *   sobreposta no rodapé. Sem CTA, sem chevrons. Dots de paginação.
 *
 * - Desktop (lg+): imagem landscape full-bleed (24:9), overlay centralizado
 *   com kicker em mono, título massivo em serifa, subtitle, note e CTA pill
 *   clara. Chevrons circulares nas laterais. Dots no rodapé.
 *
 * Autoplay com pause em hover, foco e quando a aba está oculta.
 * Sem dependências externas.
 */
export function HeroCarousel({ slides, autoPlayMs = 7000 }: Props) {
  const [active, setActive] = useState(0)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)
  const pausedRef = useRef(false)

  const handleScroll = useCallback(() => {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      const el = scrollerRef.current
      if (el) {
        const idx = Math.round(el.scrollLeft / el.clientWidth)
        setActive((prev) => (prev === idx ? prev : idx))
      }
      ticking.current = false
    })
  }, [])

  const scrollToIndex = useCallback(
    (idx: number) => {
      const el = scrollerRef.current
      if (!el) return
      const safe = ((idx % slides.length) + slides.length) % slides.length
      el.scrollTo({ left: safe * el.clientWidth, behavior: "smooth" })
    },
    [slides.length],
  )

  // Autoplay com pause em hover/foco/aba oculta.
  useEffect(() => {
    if (!autoPlayMs || slides.length <= 1) return
    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return
      scrollToIndex(active + 1)
    }, autoPlayMs)
    return () => window.clearInterval(id)
  }, [active, autoPlayMs, scrollToIndex, slides.length])

  useEffect(() => {
    const onResize = () => handleScroll()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [handleScroll])

  return (
    <section
      aria-label="Manchetes em destaque"
      className="relative bg-ink"
      onMouseEnter={() => {
        pausedRef.current = true
      }}
      onMouseLeave={() => {
        pausedRef.current = false
      }}
      onFocus={() => {
        pausedRef.current = true
      }}
      onBlur={() => {
        pausedRef.current = false
      }}
    >
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: "none" }}
        role="region"
        aria-roledescription="carrossel"
      >
        {slides.map((slide, i) => {
          const ctaLabel = slide.ctaLabel ?? "Ler análise completa"
          return (
            <article
              key={i}
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} de ${slides.length}: ${slide.title}`}
              aria-hidden={active !== i}
              className="relative w-full shrink-0 snap-center"
            >
              <div className="relative w-full aspect-[3/4] lg:aspect-[24/9]">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  preload={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: slide.imagePosition ?? "center" }}
                />

                {/* Overlay MOBILE — gradiente para o rodapé (legibilidade da manchete) */}
                <div
                  aria-hidden="true"
                  className="lg:hidden absolute inset-0 bg-gradient-to-t from-ink via-ink/55 via-40% to-transparent"
                />

                {/* Overlay DESKTOP — vinheta cinematografica sutil, sem escurecer o centro */}
                <div
                  aria-hidden="true"
                  className="hidden lg:block absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 via-50% to-ink/15"
                />

                {/* -------------------- MOBILE: badge + manchete no rodapé -------------------- */}
                <Link
                  href={slide.href}
                  tabIndex={active === i ? 0 : -1}
                  className="lg:hidden absolute inset-x-0 bottom-0 px-5 pb-12 pt-16 block"
                >
                  <span className="inline-block bg-gold-active text-on-gold font-mono text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 mb-3">
                    {slide.category}
                  </span>
                  <h2 className="font-display font-bold text-paper text-[1.65rem] leading-[1.1] text-balance max-w-[20ch]">
                    {slide.title}
                  </h2>
                </Link>

                {/* -------------------- DESKTOP: overlay enxuto, ancorado embaixo -------------------- */}
                <div className="hidden lg:flex absolute inset-0 items-end justify-center pb-24 xl:pb-28">
                  <div className="container-editorial w-full">
                    <div className="mx-auto max-w-3xl text-center">
                      <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-gold-active">
                        {slide.category}
                      </p>

                      <h2 className="mt-5 font-display font-bold text-paper text-balance tracking-tight leading-[1.02] text-5xl xl:text-6xl drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
                        {slide.title}
                      </h2>

                      {slide.subtitle ? (
                        <p className="mt-5 text-paper/85 text-base xl:text-lg leading-snug max-w-xl mx-auto text-pretty">
                          {slide.subtitle}
                        </p>
                      ) : null}

                      <Link
                        href={slide.href}
                        tabIndex={active === i ? 0 : -1}
                        className="inline-flex items-center gap-2 mt-8 bg-paper text-ink px-7 h-11 text-sm font-semibold hover:bg-paper/90 transition-colors"
                      >
                        {ctaLabel}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Chevrons desktop — circulares, sutis, na altura media */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Manchete anterior"
            onClick={() => scrollToIndex(active - 1)}
            className="hidden lg:inline-flex absolute left-6 xl:left-10 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-ink/45 hover:bg-ink/70 backdrop-blur-sm text-paper border border-paper/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Próxima manchete"
            onClick={() => scrollToIndex(active + 1)}
            className="hidden lg:inline-flex absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-11 h-11 rounded-full bg-ink/45 hover:bg-ink/70 backdrop-blur-sm text-paper border border-paper/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots — sobre a imagem nos dois breakpoints */}
      {slides.length > 1 && (
        <div
          className="absolute inset-x-0 bottom-4 lg:bottom-7 z-10 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Selecionar manchete"
        >
          {slides.map((_, i) => {
            const isActive = active === i
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir para slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  // Mobile: barras horizontais (formato editorial original).
                  // Desktop: dots circulares, padrao portal.
                  "transition-all duration-300 rounded-full",
                  "h-[3px] lg:h-2",
                  isActive
                    ? "w-8 lg:w-6 bg-gold-active lg:bg-paper"
                    : "w-5 lg:w-2 bg-paper/35 hover:bg-paper/60",
                )}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}
