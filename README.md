# Mundo da HUMINT

Plataforma editorial e educacional dedicada à inteligência humana aplicada.

## Stack Técnica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS v4
- **Componentes:** shadcn/ui
- **Validação:** Zod
- **Ícones:** Lucide React
- **Deploy:** Vercel

## Estrutura do Projeto

```
/app                    # Rotas e páginas (App Router)
  /artigos              # Blog e listagem de artigos
  /humint               # Página pilar sobre HUMINT
  /metodos              # Biblioteca de métodos
  /livro                # Waitlist do livro
  /formacao             # Lista de interesse para cursos
  /sobre                # Sobre a marca
  /contato              # Formulário de contato
  /recursos             # Glossário, bibliografia, guias
  /principios-editoriais
  /politica-de-privacidade
  /categorias           # Navegação por categoria
  /api                  # API Routes (waitlist, newsletter, contato)

/components
  /site                 # Componentes específicos do site
  /ui                   # Componentes shadcn/ui

/lib
  /content              # Dados de artigos, categorias, métodos
  /seo.ts               # Helpers de metadata
  /schema.ts            # JSON-LD schemas
  /site.ts              # Configurações do site
  /analytics.ts         # Helpers de analytics

/data
  instagram-export.json # Export do Instagram (298 posts)
  editorial-audit.json  # Análise editorial automatizada

/scripts
  import-instagram.ts   # Importa posts do JSON
  generate-articles.ts  # Gera drafts MDX

/content                # Conteúdo gerado (briefs, articles)

/public
  /images               # Imagens do site
```

## Começando

### Instalação

```bash
# Instalar dependências
corepack pnpm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Rodar em desenvolvimento
corepack pnpm dev
```

### Validação

```bash
corepack pnpm typecheck
corepack pnpm build
```

### Scripts de Conteúdo

```bash
# Importar posts do Instagram para briefs editoriais
npx tsx scripts/import-instagram.ts

# Gerar drafts MDX dos melhores briefs
npx tsx scripts/generate-articles.ts
```

## Arquitetura de Conteúdo

### Fluxo Editorial

```
Instagram JSON → Brief editorial → Draft MDX → Revisão factual → Publicado
```

### Status de Artigos

- `imported`: Importado do JSON, sem tratamento
- `brief`: Brief editorial gerado
- `draft`: Draft MDX criado
- `needs_fact_check`: Requer verificação factual
- `ready_to_review`: Pronto para revisão editorial
- `published`: Publicado no site

### Categorias

1. Fundamentos de HUMINT
2. Engenharia Social
3. Contrainteligência
4. OPSEC
5. Psicologia Comportamental
6. OSINT e HUMINT
7. Casos Históricos
8. Geopolítica e Inteligência
9. Segurança Corporativa
10. Métodos e Tradecraft
11. Influência e Percepção
12. Tecnologia, Poder e Estratégia

## SEO Técnico

### Implementado

- [x] Next.js Metadata API
- [x] Title template
- [x] Meta description
- [x] Canonical URLs
- [x] Open Graph
- [x] Twitter Cards
- [x] JSON-LD (Organization, WebSite, Article, BlogPosting, BreadcrumbList, FAQPage)
- [x] Sitemap dinâmico
- [x] Robots.txt
- [x] hreflang pt-BR
- [x] Imagens otimizadas (next/image)
- [x] Alt text semântico

### Schemas JSON-LD

- `Organization`: Dados da marca
- `WebSite`: Estrutura do site
- `Article`/`BlogPosting`: Artigos individuais
- `BreadcrumbList`: Navegação estruturada
- `FAQPage`: Perguntas frequentes

## Formulários

### Endpoints

- `POST /api/newsletter`: Cadastro na newsletter
- `POST /api/waitlist`: Lista de espera do livro
- `POST /api/contato`: Formulário de contato

### Validação

Todos os formulários usam:
- Validação client-side (Zod + React Hook Form)
- Validação server-side (Zod)
- Honeypot anti-spam
- Checkbox LGPD obrigatório

### Integrações (configuráveis)

- Webhooks genéricos
- ConvertKit / Mailchimp
- Supabase para persistência
- SMTP para notificações

## Performance

- Mobile-first
- Server Components por padrão
- Imagens com next/image e sizes
- Lazy loading abaixo da dobra
- Fontes otimizadas (next/font)
- Minimal client JS

## Acessibilidade

- Skip links
- Foco visível (focus-visible)
- Landmarks semânticos
- ARIA labels
- Alt text
- Contraste AA

## Deploy

### Vercel (recomendado)

```bash
# Via CLI
vercel

# Ou conectar repositório GitHub no dashboard Vercel
```

### Variáveis de Ambiente

Copie `.env.example` para `.env.local` no desenvolvimento e configure no dashboard Vercel:
- `NEXT_PUBLIC_SITE_URL`
- Webhooks dos formulários
- Chaves de analytics (opcional)

## Roadmap

### MVP (concluído)

- [x] Homepage editorial
- [x] Sistema de artigos
- [x] Páginas pilar (HUMINT, Métodos)
- [x] Waitlist do livro
- [x] Lista de interesse (formação)
- [x] Newsletter
- [x] SEO técnico completo
- [x] LGPD/cookies

### Próximas Fases

- [ ] Integração com CMS (Sanity/Contentful)
- [ ] Sistema de busca avançado
- [ ] Área de membros
- [ ] Cursos (quando lançados)
- [ ] Versão em inglês

## Licença

Conteúdo editorial © Mundo da HUMINT. Todos os direitos reservados.
Código sob MIT License.

---

Desenvolvido com rigor editorial e atenção ao método.
