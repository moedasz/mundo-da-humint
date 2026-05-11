/**
 * Camada simples de analytics.
 *
 * Em produção, conecte com o provedor desejado (Vercel Analytics, Plausible,
 * GA4 etc.). Aqui ficam apenas os nomes canônicos de eventos.
 */

export type AnalyticsEvent =
  | "newsletter_signup"
  | "book_waitlist_submit"
  | "course_interest_submit"
  | "article_share"
  | "article_read_progress"
  | "outbound_click"
  | "contact_submit"
  | "search_used"
  | "filter_used"

declare global {
  interface Window {
    // Vercel Analytics expõe window.va; outros provedores podem ser plugados aqui.
    va?: (event: string, props?: Record<string, unknown>) => void
    dataLayer?: Array<Record<string, unknown>>
  }
}

export function track(
  event: AnalyticsEvent,
  props: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return
  try {
    if (typeof window.va === "function") {
      window.va("event", { name: event, ...props })
    }
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props })
    }
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[analytics]", event, props)
    }
  } catch {
    // silencioso
  }
}
