"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Crown } from "lucide-react"
import { useRef } from "react"

export type MemberExclusiveItem = {
  title: string
  description: string
  href: string
  image: string
  imageAlt: string
}

type Props = {
  items: MemberExclusiveItem[]
}

export function MemberExclusives({ items }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  function scroll(direction: "prev" | "next") {
    const scroller = scrollerRef.current
    if (!scroller) return
    const amount = Math.round(scroller.clientWidth * 0.82)
    scroller.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    })
  }

  return (
    <section className="bg-[#f3f4f6] border-b border-line" aria-labelledby="member-exclusives-title">
      <div className="container-editorial py-8 md:py-10">
        <div className="mb-7 flex items-center justify-between gap-4">
          <h2
            id="member-exclusives-title"
            className="font-display text-2xl md:text-[1.65rem] font-bold text-[#07142a]"
          >
            Exclusivo para membros
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Ver exclusivos anteriores"
              onClick={() => scroll("prev")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d9dde5] text-[#9aa3b2] hover:border-[#b9c0cb] hover:text-[#07142a] transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Ver próximos exclusivos"
              onClick={() => scroll("next")}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfd5df] text-[#07142a] hover:border-[#07142a] transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group w-[345px] max-w-[calc(100vw-2rem)] shrink-0 snap-start md:w-[345px]"
            >
              <article>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-ink">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="345px"
                    loading={item.image === "/images/editorial/china-cia-cover.jpg" ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute left-3 top-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#20c7a4] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                      <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                      Exclusivo
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-[#07142a] group-hover:text-gold-active transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#657083]">
                  {item.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
