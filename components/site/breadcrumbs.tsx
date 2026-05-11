import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { breadcrumbSchema } from "@/lib/schema"
import { JsonLd } from "./json-ld"

type Crumb = { label: string; href: string }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full: Crumb[] = [{ label: "Início", href: "/" }, ...items]
  return (
    <>
      <nav aria-label="Trilha de navegação" className="text-xs font-mono uppercase tracking-widest text-ink-muted">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {full.map((c, i) => {
            const isLast = i === full.length - 1
            return (
              <li key={i} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-ink-soft">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="hover:text-ink">
                      {c.label}
                    </Link>
                    <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(full)} />
    </>
  )
}
