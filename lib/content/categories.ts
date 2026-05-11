// Categorias editoriais derivadas da análise do Instagram
export type CategorySlug =
  | "fundamentos-de-humint"
  | "engenharia-social"
  | "contrainteligencia"
  | "opsec"
  | "psicologia-comportamental"
  | "osint-e-humint"
  | "casos-historicos"
  | "geopolitica-e-inteligencia"
  | "seguranca-corporativa"
  | "metodos-e-tradecraft"
  | "influencia-e-percepcao"
  | "tecnologia-poder-e-estrategia"

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  shortDescription: string
  pillarPage?: string // se tiver página-pilar associada
  color?: string
}

export const categories: Category[] = [
  {
    slug: "fundamentos-de-humint",
    name: "Fundamentos de HUMINT",
    description:
      "Conceitos essenciais de inteligência humana: o que é HUMINT, como funciona, princípios fundamentais e aplicações práticas.",
    shortDescription: "Conceitos essenciais de inteligência humana",
    pillarPage: "/humint",
    color: "gold",
  },
  {
    slug: "engenharia-social",
    name: "Engenharia Social",
    description:
      "Técnicas de manipulação e influência interpessoal usadas em operações de inteligência, fraudes e ataques cibernéticos. Análise de casos reais e defesa.",
    shortDescription: "Manipulação, influência e defesa",
    color: "copper",
  },
  {
    slug: "contrainteligencia",
    name: "Contrainteligência",
    description:
      "Métodos de proteção contra espionagem, detecção de ameaças internas, análise de vulnerabilidades e prevenção de vazamentos de informação.",
    shortDescription: "Proteção contra espionagem e vazamentos",
    pillarPage: "/metodos#boas-praticas-de-pesquisa",
    color: "deep",
  },
  {
    slug: "opsec",
    name: "OPSEC",
    description:
      "Segurança operacional: proteção de informações críticas, gestão de riscos, procedimentos de segurança e prevenção de exposição.",
    shortDescription: "Segurança operacional e proteção de informações",
    pillarPage: "/metodos#etica-e-limites",
    color: "alert",
  },
  {
    slug: "psicologia-comportamental",
    name: "Psicologia Comportamental",
    description:
      "Fundamentos psicológicos por trás de decisões, vulnerabilidades cognitivas, vieses e comportamento humano em contextos de inteligência.",
    shortDescription: "Vieses, decisões e comportamento humano",
    pillarPage: "/metodos#leitura-de-contexto",
    color: "amber",
  },
  {
    slug: "osint-e-humint",
    name: "OSINT e HUMINT",
    description:
      "Integração entre inteligência de fontes abertas (OSINT) e inteligência humana. Complementaridade, diferenças e aplicações combinadas.",
    shortDescription: "Integração de fontes abertas e humanas",
    color: "cool",
  },
  {
    slug: "casos-historicos",
    name: "Casos Históricos",
    description:
      "Análises de operações de inteligência históricas, espionagem, fracassos e sucessos que moldaram o campo da HUMINT.",
    shortDescription: "Operações históricas e lições aprendidas",
    color: "warm",
  },
  {
    slug: "geopolitica-e-inteligencia",
    name: "Geopolítica e Inteligência",
    description:
      "Relação entre inteligência e política internacional. Conflitos, diplomacia, guerra híbrida e o papel da HUMINT no cenário global.",
    shortDescription: "Inteligência no cenário geopolítico",
    color: "surface",
  },
  {
    slug: "seguranca-corporativa",
    name: "Segurança Corporativa",
    description:
      "Aplicação de princípios de HUMINT em ambientes empresariais: due diligence, proteção de executivos, investigações internas.",
    shortDescription: "HUMINT aplicada ao ambiente empresarial",
    color: "gold",
  },
  {
    slug: "metodos-e-tradecraft",
    name: "Métodos e Tradecraft",
    description:
      "Técnicas operacionais de inteligência: elicitação, rapport, recrutamento, comunicação segura e procedimentos de campo.",
    shortDescription: "Técnicas operacionais de inteligência",
    pillarPage: "/metodos",
    color: "copper",
  },
  {
    slug: "influencia-e-percepcao",
    name: "Influência e Percepção",
    description:
      "Operações de influência, desinformação, guerra psicológica (PSYOPS) e gestão de percepção em contextos de inteligência.",
    shortDescription: "Desinformação e operações de influência",
    color: "amber",
  },
  {
    slug: "tecnologia-poder-e-estrategia",
    name: "Tecnologia, Poder e Estratégia",
    description:
      "Interseção entre tecnologia, poder e inteligência. IA, vigilância, privacidade e o futuro da HUMINT.",
    shortDescription: "Tecnologia e o futuro da inteligência",
    color: "cool",
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug
}

// Mapeamento do audit JSON para slugs internos
export const auditCategoryMap: Record<string, CategorySlug> = {
  "engenharia-social": "engenharia-social",
  contrainteligencia: "contrainteligencia",
  "geopolitica-e-inteligencia": "geopolitica-e-inteligencia",
  opsec: "opsec",
  "psicologia-comportamental": "psicologia-comportamental",
  "casos-historicos": "casos-historicos",
  "tecnologia-poder-e-estrategia": "tecnologia-poder-e-estrategia",
  "influencia-e-percepcao": "influencia-e-percepcao",
  "metodos-e-tradecraft": "metodos-e-tradecraft",
  "fundamentos-de-humint": "fundamentos-de-humint",
  "osint-e-humint": "osint-e-humint",
}
