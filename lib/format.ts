export function formatDateBR(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(".", "")
}

export function formatDateLongBR(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date)
}

/**
 * Formato editorial cronológico, inspirado em portais jornalísticos:
 * "08 de mai. de 2026"
 */
export function formatDateTimelineBR(iso: string): string {
  const date = new Date(iso)
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/\.$/, "")
  return formatted
}
