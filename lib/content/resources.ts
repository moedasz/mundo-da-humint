export const GLOSSARY = [
  {
    term: "HUMINT",
    definition:
      "Human Intelligence. Inteligência produzida a partir de interação direta com fontes humanas: entrevistas, observação participante, debriefings e cooperação informal, sob método e ética definidos.",
  },
  {
    term: "OSINT",
    definition:
      "Open Source Intelligence. Inteligência produzida a partir de fontes abertas (registros públicos, mídia, redes sociais, dados governamentais, imagens de satélite), sempre observando limites éticos e legais.",
  },
  {
    term: "Elicitação",
    definition:
      "Técnica de obter informação por meio de conversa estruturada, sem caracterizar interrogatório. Depende fortemente de contexto, escuta ativa e ética profissional.",
  },
  {
    term: "Validação cruzada",
    definition:
      "Processo de confirmar uma afirmação através de fontes independentes: outra fonte, documento, registro público ou observação direta.",
  },
  {
    term: "Sinal fraco",
    definition:
      "Indicação inicial e ambígua de mudança, geralmente captada antes do evento público. Em HUMINT, sinais fracos exigem cuidado redobrado de calibragem.",
  },
  {
    term: "Análise contextual",
    definition:
      "Leitura interpretativa que considera ambiente, vínculos, interesses e história ao avaliar um relato ou um fato isolado.",
  },
]

export const BIBLIOGRAPHY = [
  {
    title: "Psychology of Intelligence Analysis",
    author: "Richards J. Heuer Jr.",
    note: "Referência clássica sobre vieses cognitivos no trabalho analítico.",
  },
  {
    title: "Structured Analytic Techniques for Intelligence Analysis",
    author: "Heuer & Pherson",
    note: "Conjunto prático de técnicas para reduzir erro analítico.",
  },
  {
    title: "The Craft of Intelligence",
    author: "Allen Dulles",
    note: "Visão histórica e institucional, útil para contexto.",
  },
  {
    title: "Investigative Interviewing: Psychology and Practice",
    author: "Milne & Bull",
    note: "Base científica para entrevistas em investigação.",
  },
]

export const QUICK_GUIDES = [
  {
    title: "Antes de uma entrevista",
    summary:
      "Checklist mínimo: objetivo, hipóteses, riscos para a fonte, registro previsto.",
    href: "/recursos#guia-pre-entrevista",
    steps: [
      "Escreva a pergunta de inteligência antes de escolher perguntas de entrevista.",
      "Separe fatos que precisam ser confirmados de hipóteses que apenas orientam a conversa.",
      "Avalie riscos para a fonte, para terceiros e para a própria investigação.",
      "Defina como o relato será registrado, protegido e revisado depois.",
    ],
  },
  {
    title: "Como registrar um relato",
    summary:
      "Separar percepção direta, inferência e comentário sobre terceiros desde a primeira linha.",
    href: "/recursos#guia-registro",
    steps: [
      "Marque o que a fonte viu, ouviu ou fez diretamente.",
      "Separe inferências da fonte, inferências do analista e comentários de terceiros.",
      "Registre data, contexto, lacunas e nível de confiança por afirmação.",
      "Preserve a rastreabilidade sem expor identidade além do necessário.",
    ],
  },
  {
    title: "Quando uma fonte deve ser protegida",
    summary:
      "Critérios práticos para anonimização, sigilo e descarte responsável de material sensível.",
    href: "/recursos#guia-protecao",
    steps: [
      "Proteja identidade quando a exposição puder gerar dano profissional, jurídico ou físico.",
      "Use minimização: colete e retenha apenas o necessário para a finalidade declarada.",
      "Defina quem pode acessar dados brutos e por quanto tempo.",
      "Documente correções, descarte e revogação de consentimento quando aplicável.",
    ],
  },
]
