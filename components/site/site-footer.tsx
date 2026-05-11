import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { NAV, SITE, DOSSIERS } from "@/lib/site"
import { NewsletterInline } from "./newsletter-inline"
import { BrandLogo } from "@/components/site/brand-logo"

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Rodapé
      </h2>
      
      <div className="container-editorial py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <BrandLogo variant="white" className="h-10 md:h-12" />
              <p className="mt-3 text-[10px] font-mono uppercase tracking-widest text-warm-text">
                Publicação editorial
              </p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-warm-text mb-6">
              {SITE.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={SITE.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-deep-2 flex items-center justify-center text-warm-text hover:text-paper hover:border-paper transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE.social.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-deep-2 flex items-center justify-center text-warm-text hover:text-paper hover:border-paper transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="E-mail"
                className="w-8 h-8 border border-deep-2 flex items-center justify-center text-warm-text hover:text-paper hover:border-paper transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">
              Navegar
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {NAV.primary.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-warm-text hover:text-paper transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dossiers */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">
              Dossiês
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {DOSSIERS.slice(0, 6).map((dossier) => (
                <li key={dossier.slug}>
                  <Link
                    href={dossier.href}
                    className="text-warm-text hover:text-paper transition-colors"
                  >
                    {dossier.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">
              Institucional
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="text-warm-text hover:text-paper transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-warm-text hover:text-paper transition-colors"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/principios-editoriais"
                  className="text-warm-text hover:text-paper transition-colors"
                >
                  Princípios editoriais
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-warm-text hover:text-paper transition-colors"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/recursos"
                  className="text-warm-text hover:text-paper transition-colors"
                >
                  Recursos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-deep-2">
          <div className="grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-widest text-gold mb-1">
                Newsletter
              </p>
              <p className="text-sm text-warm-text">
                Receba novos dossiês e análises diretamente no seu e-mail.
              </p>
            </div>
            <div className="lg:col-span-7">
              <NewsletterInline variant="dark" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-deep-2">
        <div className="container-editorial py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-warm-text">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.
          </p>
          <p className="font-mono uppercase tracking-widest text-[10px]">
            Análise · Fontes · Método · Casos
          </p>
        </div>
      </div>
    </footer>
  )
}
