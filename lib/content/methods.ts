export type Method = {
  slug: string
  title: string
  description: string
  level: "Introdução" | "Intermediário" | "Avançado"
  group: string
  startHere?: boolean
}

export const METHODS: Method[] = [
  {
    slug: "fundamentos-de-humint",
    title: "Fundamentos de HUMINT",
    description:
      "O que é, o que não é, e onde ela entra no fluxo de decisão profissional.",
    level: "Introdução",
    group: "Fundamentos",
    startHere: true,
  },
  {
    slug: "fontes-humanas-e-validacao",
    title: "Fontes humanas e validação",
    description:
      "Acesso, motivação e consistência: um protocolo mínimo para calibrar confiança.",
    level: "Introdução",
    group: "Fundamentos",
  },
  {
    slug: "entrevista-e-elicitacao",
    title: "Entrevista e elicitação",
    description:
      "Preparação, escuta, perguntas abertas e o que registrar antes que a memória se reescreva.",
    level: "Intermediário",
    group: "Prática",
  },
  {
    slug: "etica-e-limites",
    title: "Ética e limites",
    description:
      "Proporcionalidade, proteção de fontes e o que diferencia método de manipulação.",
    level: "Introdução",
    group: "Princípios",
  },
  {
    slug: "humint-e-osint",
    title: "HUMINT e OSINT: relação",
    description:
      "Complementaridade real, fricção produtiva e o que cada camada não entrega.",
    level: "Intermediário",
    group: "Análise",
  },
  {
    slug: "boas-praticas-de-pesquisa",
    title: "Boas práticas de pesquisa",
    description:
      "Registro, rastreabilidade e separação entre evidência, inferência e hipótese.",
    level: "Intermediário",
    group: "Prática",
  },
  {
    slug: "leitura-de-contexto",
    title: "Leitura de contexto",
    description:
      "Como reconstruir o ambiente em que um relato faz ou deixa de fazer sentido.",
    level: "Avançado",
    group: "Análise",
  },
  {
    slug: "ciclo-de-inteligencia-aplicado",
    title: "Ciclo de inteligência aplicado",
    description:
      "Direção, coleta, processamento, análise e disseminação no mundo civil.",
    level: "Avançado",
    group: "Análise",
  },
]

export const METHOD_GROUPS = Array.from(new Set(METHODS.map((m) => m.group)))
