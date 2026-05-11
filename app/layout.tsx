import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, IBM_Plex_Mono, Lora } from "next/font/google"
import { Suspense } from "react"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { BrandLogo } from "@/components/site/brand-logo"
import { CookieBanner } from "@/components/site/cookie-banner"
import { OrganizationSchema } from "@/components/site/organization-schema"
import { NAV, SITE } from "@/lib/site"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "HUMINT",
    "inteligência humana",
    "OSINT",
    "investigação",
    "compliance",
    "jornalismo investigativo",
    "verificação de fontes",
    "análise de contexto",
    "contrainteligência",
    "engenharia social",
    "OPSEC",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/" },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/images/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: "Mundo da HUMINT: publicação editorial sobre inteligência humana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images: ["/images/hero-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F1E6" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1116" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable} ${lora.variable} bg-paper`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased text-ink">
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        <Suspense fallback={<HeaderFallback />}>
          <SiteHeader />
        </Suspense>
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieBanner />
        <OrganizationSchema />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}

function HeaderFallback() {
  return (
    <header className="sticky top-0 z-40 w-full bg-paper border-b border-line">
      <div className="container-editorial flex h-16 lg:h-[72px] items-center justify-between gap-4 lg:gap-8">
        <a href="/" className="flex shrink-0 items-center" aria-label={`${SITE.name}, página inicial`}>
          <BrandLogo variant="black" className="h-8 sm:h-9" />
        </a>
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-8" aria-label="Principal">
          {NAV.primary.map((item) => (
            <a key={item.href} href={item.href} className="text-[15px] font-medium text-ink-muted">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="/assinar"
          className="inline-flex items-center bg-gold text-on-gold px-3 py-2 text-sm font-semibold sm:px-4"
        >
          Assine
        </a>
      </div>
    </header>
  )
}
