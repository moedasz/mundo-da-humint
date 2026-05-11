import type { ArticleCategorySlug } from "@/lib/site"
import { getCategoryBySlug } from "@/lib/content/categories"
import { INSTAGRAM_ARTICLES } from "@/lib/content/instagram-articles.generated"

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "note"; text: string }

export type Article = {
  slug: string
  title: string
  description: string
  category: ArticleCategorySlug
  categoryLabel: string
  tags: string[]
  author: string
  authorBio: string
  reviewer?: string
  publishedAt: string
  updatedAt?: string
  readingTime: string
  heroImage: string
  heroAlt: string
  featured?: boolean
  instagramShortCode?: string
  instagramUrl?: string
  body: ArticleBlock[]
  sources?: { label: string; url?: string; type?: "primaria" | "secundaria" | "referencia" }[]
  methodology?: string
  corrections?: { date: string; note: string }[]
}

const EDITORIAL_ARTICLES: Article[] = [
  {
    slug: "o-que-humint-realmente-exige",
    title: "O que HUMINT realmente exige além da coleta de informações",
    description:
      "Uma introdução prática aos fundamentos, limites e aplicações da inteligência humana em contextos profissionais.",
    category: "fundamentos-de-humint",
    categoryLabel: "Fundamentos de HUMINT",
    tags: ["HUMINT", "Fundamentos", "Método"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    reviewer: "Conselho Editorial",
    publishedAt: "2026-04-22",
    updatedAt: "2026-05-08",
    readingTime: "8 min",
    heroImage: "/images/editorial/humint-fundamentals.jpg",
    heroAlt:
      "Caderno de campo aberto sobre mesa de madeira com anotações manuscritas e caneta-tinteiro.",
    featured: true,
    body: [
      {
        type: "p",
        text: "HUMINT (Human Intelligence) é frequentemente reduzida ao ato de \"obter informação com pessoas\". Essa simplificação encobre o que torna a disciplina difícil e o que a separa de uma conversa qualquer: método para fazer perguntas, critério para avaliar respostas, contexto para interpretar silêncios e responsabilidade ética para sustentar tudo isso ao longo do tempo.",
      },
      {
        type: "p",
        text: "Este texto é uma introdução prática para quem investiga, verifica ou decide com base no que outras pessoas dizem: profissionais de segurança, compliance, jornalistas, pesquisadores e analistas. O objetivo não é exaustivo; é estabelecer um piso de rigor.",
      },
      { type: "h2", text: "Não é só o que a fonte diz. É o que a fonte permite saber." },
      {
        type: "p",
        text: "Toda fonte humana entrega, no máximo, três coisas: o que percebeu, o que interpretou e o que decidiu compartilhar. Um relato útil distingue essas camadas. Um relato perigoso as funde. Cabe ao analista perguntar de qual delas vem cada afirmação, e registrar isso por escrito.",
      },
      {
        type: "p",
        text: "Esse exercício parece elementar, mas é onde a maior parte das análises começa a falhar. Aceita-se uma conclusão como se fosse uma observação. Empilham-se inferências sobre inferências. O resultado parece sólido, mas é uma torre frágil.",
      },
      { type: "h2", text: "Três competências que sustentam a prática" },
      { type: "h3", text: "1. Leitura de contexto" },
      {
        type: "p",
        text: "Uma conversa nunca acontece no vácuo. Quem fala tem história, vínculos, interesses e medos. O analista que ignora isso pega frases isoladas e perde sentido. Antes da entrevista, mapeie o contexto: quem é a fonte, com quem se relaciona, o que tem a ganhar ou perder ao falar, qual o ambiente em que fala.",
      },
      { type: "h3", text: "2. Validação cruzada" },
      {
        type: "p",
        text: "Uma fonte não confirma a si mesma. Toda afirmação relevante deveria ser cruzada com pelo menos um vetor independente: outra fonte, um documento, um registro público, uma observação direta. Se a única evidência for o próprio relato, isso precisa estar explícito no produto final.",
      },
      { type: "h3", text: "3. Disciplina ética" },
      {
        type: "p",
        text: "HUMINT lida com pessoas reais, em situações de assimetria de poder. Há limites (legais, profissionais e morais) sobre como abordar, como proteger e como usar o que se obtém. Esses limites não são um obstáculo ao trabalho: são o que torna o trabalho legítimo e sustentável.",
      },
      {
        type: "quote",
        text: "Inteligência humana não é a habilidade de fazer as pessoas falarem. É a habilidade de entender o que faz sentido daquilo que dizem.",
      },
      { type: "h2", text: "Onde a HUMINT entra no fluxo de decisão" },
      {
        type: "p",
        text: "Em investigações corporativas, jornalismo investigativo, análise de risco e segurança, a HUMINT raramente é a única fonte. Ela costuma operar em complemento à OSINT, a registros documentais e a análise de sistemas. O papel dela é específico: trazer o que não está disponível em base de dados, como intenção, contexto, percepção interna e sinais fracos.",
      },
      {
        type: "p",
        text: "Quando bem usada, ela reduz incerteza nas decisões mais importantes. Quando mal usada, fabrica falsa segurança. A diferença entre uma coisa e outra está no método.",
      },
      { type: "h2", text: "Como começar a praticar com responsabilidade" },
      {
        type: "ol",
        items: [
          "Antes de qualquer abordagem, escreva o que você quer saber e por quê.",
          "Defina critérios mínimos para considerar uma informação validada.",
          "Distinga sempre, no produto final, entre evidência, inferência e hipótese.",
          "Registre a metodologia: como obteve, de quem, em que contexto.",
          "Reveja com alguém. A leitura cruzada interna detecta vieses antes que o relatório saia.",
        ],
      },
      { type: "h2", text: "Resumo" },
      {
        type: "p",
        text: "HUMINT não se mede pela quantidade de informações coletadas, mas pela qualidade das decisões que ela sustenta. Método, contexto e ética não são acessórios: são a própria disciplina.",
      },
    ],
    methodology:
      "Este artigo é editorial e não relata um caso específico. Os princípios apresentados refletem prática profissional consolidada em investigação, compliance e análise.",
  },
  {
    slug: "validacao-de-fontes-humanas",
    title: "Validação de fontes humanas: um protocolo mínimo",
    description:
      "Como avaliar credibilidade, motivação e consistência de uma fonte humana sem cair em ingenuidade nem em paranoia.",
    category: "metodos-e-tradecraft",
    categoryLabel: "Métodos e Tradecraft",
    tags: ["Validação", "Fontes humanas", "Método"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-02",
    readingTime: "9 min",
    heroImage: "/images/editorial/source-validation.jpg",
    heroAlt:
      "Fichas de arquivo com texto datilografado e anotações manuscritas sobrepostas.",
    featured: true,
    body: [
      {
        type: "p",
        text: "Uma fonte humana não é uma planilha. Ela esquece, exagera, omite, protege terceiros, mente por hábito ou por estratégia, ou simplesmente reconstrói memórias para que façam sentido depois. Validar uma fonte não significa duvidar de tudo: significa saber o peso real do que cada relato pode sustentar.",
      },
      { type: "h2", text: "Três eixos básicos de avaliação" },
      { type: "h3", text: "Acesso" },
      {
        type: "p",
        text: "A fonte estava em posição de saber o que afirma? Esteve no lugar, no horário, com o nível adequado de proximidade ao fato? Acesso direto e acesso por terceiros são coisas profundamente diferentes, e precisam aparecer separadas no registro.",
      },
      { type: "h3", text: "Motivação" },
      {
        type: "p",
        text: "Toda fonte fala por alguma razão. Algumas razões são legítimas (preocupação, dever profissional, busca de proteção). Outras introduzem viés (vingança, ganho, vaidade). Não cabe ao analista julgar moralmente; cabe entender a motivação e mensurar o efeito dela sobre o relato.",
      },
      { type: "h3", text: "Consistência" },
      {
        type: "p",
        text: "Relatos importantes precisam ser revisitados: a mesma pessoa, ao contar a mesma história em momentos diferentes, mantém o núcleo? Quais detalhes mudam? Mudanças não invalidam; muitas vezes indicam memória natural. O que importa é o padrão.",
      },
      { type: "h2", text: "Protocolo mínimo de quatro passos" },
      {
        type: "ol",
        items: [
          "Antes de ouvir: liste o que essa fonte poderia razoavelmente saber e o que estaria fora do alcance dela.",
          "Durante: separe percepção direta de inferência e de comentário sobre terceiros.",
          "Depois: identifique o que pode ser checado de forma independente (documental, observacional ou por outra fonte).",
          "Ao registrar: marque o nível de confiança de cada afirmação, e não o nível de confiança da fonte como um todo.",
        ],
      },
      {
        type: "note",
        text: "Confiança não é um atributo da pessoa. É um atributo da informação. A mesma fonte pode ser altamente confiável em um ponto e completamente especulativa em outro.",
      },
      { type: "h2", text: "Sinais de alerta sem virar paranoia" },
      {
        type: "ul",
        items: [
          "Detalhes que escalam a cada nova versão do relato.",
          "Excesso de precisão em pontos que normalmente seriam difíceis de lembrar.",
          "Conveniência narrativa: tudo encaixa rápido demais.",
          "Insistência em apontar culpados específicos sem oferecer evidência.",
          "Recusa em retomar pontos previamente confirmados.",
        ],
      },
      {
        type: "p",
        text: "Nenhum desses sinais, isoladamente, condena uma fonte. Em conjunto, eles pedem cautela e cruzamento adicional. O objetivo não é descartar: é calibrar.",
      },
      { type: "h2", text: "Ética não é detalhe" },
      {
        type: "p",
        text: "Validação não é interrogatório. Pressão indevida, manipulação emocional, promessas vazias e exposição de fontes destroem tanto a pessoa quanto a qualidade da informação. Quem trata mal uma fonte termina, mais cedo ou mais tarde, com informação ruim.",
      },
    ],
    methodology:
      "Texto editorial, com base em práticas consolidadas em investigação corporativa, jornalismo investigativo e análise de inteligência. Não relata um caso específico.",
  },
  {
    slug: "humint-e-osint-complementaridade-e-limites",
    title: "HUMINT e OSINT: complementaridade, fricção e limites",
    description:
      "Por que tratar fontes humanas e fontes abertas como camadas distintas, e como combiná-las sem produzir falsa segurança.",
    category: "osint-e-humint",
    categoryLabel: "OSINT e HUMINT",
    tags: ["HUMINT", "OSINT", "Método", "Análise"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-09",
    readingTime: "7 min",
    heroImage: "/images/editorial/osint-humint-integration.jpg",
    heroAlt:
      "Mapa topográfico com anotações a lápis e sobreposições transparentes indicando pontos de dados.",
    featured: true,
    body: [
      {
        type: "p",
        text: "Há uma tentação contemporânea de tratar OSINT como substituta da HUMINT. A lógica parece sedutora: se quase tudo deixa rastro digital, por que continuar dependendo de fontes humanas, com todo o custo, fragilidade e risco que elas trazem?",
      },
      {
        type: "p",
        text: "A resposta curta é que cada camada responde a perguntas diferentes, e nenhuma das duas, sozinha, dá conta da maioria das decisões que importam.",
      },
      { type: "h2", text: "O que OSINT entrega bem" },
      {
        type: "ul",
        items: [
          "Reconstrução cronológica de eventos públicos.",
          "Mapeamento de relações declaradas (societárias, institucionais, geográficas).",
          "Verificação de afirmações públicas contra registros públicos.",
          "Triangulação visual e geoespacial.",
          "Escala: analisar muito, rápido, com baixo custo marginal.",
        ],
      },
      { type: "h2", text: "O que OSINT não entrega" },
      {
        type: "ul",
        items: [
          "Intenção.",
          "Percepção interna de quem decide.",
          "Sinais fracos antes de virarem evento público.",
          "Contexto que nunca foi documentado.",
          "A diferença entre o que foi feito e o que foi pensado.",
        ],
      },
      {
        type: "p",
        text: "É aqui que HUMINT entra. Não para repetir o que OSINT já fez, mas para iluminar a zona em que dados não chegam. Tratada assim, a HUMINT vira camada complementar, não concorrente.",
      },
      { type: "h2", text: "A fricção produtiva entre as duas" },
      {
        type: "p",
        text: "Combinar as camadas não é somar fontes. É confrontá-las. Um relato humano que contradiz um registro público obriga o analista a perguntar: a fonte está errada, o registro está incompleto ou estamos olhando para coisas diferentes? Essa fricção é onde análise séria acontece.",
      },
      {
        type: "quote",
        text: "Quem mistura as camadas sem distinguir o que veio de onde produz um relatório suave por fora e cego por dentro.",
      },
      { type: "h2", text: "Três regras práticas para combinar" },
      {
        type: "ol",
        items: [
          "Registre a origem de cada afirmação no produto final. Não disfarce HUMINT como OSINT, nem o contrário.",
          "Defina, antes da pesquisa, qual pergunta cabe a cada camada responder.",
          "Quando as camadas divergem, descreva a divergência. Não a esconda em prol de uma conclusão limpa.",
        ],
      },
      { type: "h2", text: "Limite ético comum" },
      {
        type: "p",
        text: "Tanto OSINT quanto HUMINT podem violar pessoas, expor inocentes e ampliar danos. O fato de uma informação estar pública não a torna eticamente livre de uso. O fato de uma fonte ter falado não a torna passível de exposição. O critério aqui é o mesmo: proporcionalidade entre o que se obtém e o impacto sobre quem é exposto.",
      },
    ],
    methodology:
      "Análise editorial. Não cobre um caso específico; discute o uso combinado das duas camadas em prática profissional.",
  },
  // Novos artigos derivados dos posts de maior engajamento do Instagram
  {
    slug: "como-china-desmantelou-rede-cia-contrainteligencia",
    title: "Como a China desmantelou a rede da CIA: lições de contrainteligência",
    description:
      "Entre 2010 e 2012, a China comprometeu dezenas de fontes humanas da CIA. O caso revela vulnerabilidades de sistemas técnicos e limites de redes que operam em ambiente hostil.",
    category: "contrainteligencia",
    categoryLabel: "Contrainteligência",
    tags: ["Contrainteligência", "CIA", "China", "OPSEC", "Casos Históricos"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-03-15",
    updatedAt: "2026-05-10",
    readingTime: "12 min",
    heroImage: "/images/editorial/china-cia-cover.jpg",
    heroAlt: "Vista aérea de Pequim ao entardecer com sobreposição de grade cartográfica.",
    featured: false,
    instagramShortCode: "DR0BfdZEZ7K",
    body: [
      {
        type: "p",
        text: "Entre 2010 e 2012, a inteligência chinesa desmantelou grande parte da rede de fontes humanas que a CIA mantinha no país. Reportagens investigativas do New York Times (Mazzetti, Goldman e Schmidt, maio de 2017) e da Foreign Policy (Dorfman e McLaughlin, agosto de 2018) indicam que entre 18 e 30 fontes foram comprometidas. Segundo esses relatos, baseados em ex-oficiais americanos sob anonimato, muitos foram presos; alguns teriam sido executados. Não há confirmação oficial do número exato de mortes.",
      },
      {
        type: "note",
        text: "Nota metodológica: as fontes deste texto são reportagens investigativas, não documentos oficiais. As afirmações sobre execuções e números de fontes comprometidas vêm de ex-oficiais americanos citados sob anonimato. O caso permanece parcialmente classificado.",
      },
      {
        type: "p",
        text: "O episódio é considerado um dos maiores desastres de inteligência americana recente, comparável em escala aos danos causados pelos casos Aldrich Ames e Robert Hanssen durante a Guerra Fria.",
      },
      { type: "h2", text: "O que as reportagens indicam" },
      {
        type: "p",
        text: "Segundo a Foreign Policy, a operação chinesa explorou vulnerabilidades no sistema de comunicação usado pela CIA para contatar fontes no país. A plataforma, originalmente desenvolvida para operações no Oriente Médio, foi adaptada para a China sem ajustes adequados de segurança. Analistas chineses teriam identificado padrões no tráfego de dados que permitiram mapear a rede.",
      },
      {
        type: "p",
        text: "Paralelamente, investigadores americanos suspeitaram de um possível vazamento interno. Em 2018, Jerry Chun Shing Lee, ex-oficial da CIA, foi preso e se declarou culpado de conspiração para espionagem. A conexão direta entre Lee e o desmantelamento da rede na China permanece objeto de investigação.",
      },
      { type: "h2", text: "Hipóteses sobre a falha" },
      {
        type: "p",
        text: "As reportagens apontam duas hipóteses principais, não mutuamente exclusivas:",
      },
      {
        type: "ul",
        items: [
          "Falha técnica: o sistema de comunicação apresentava padrões detectáveis quando analisado em escala por contrainteligência sofisticada.",
          "Vazamento interno: uma fonte humana dentro da comunidade de inteligência americana teria fornecido informações que permitiram identificar agentes.",
        ],
      },
      {
        type: "p",
        text: "Até o momento, não há confirmação pública de qual fator foi determinante. É possível que ambos tenham contribuído.",
      },
      { type: "h2", text: "Implicações para OPSEC" },
      {
        type: "ul",
        items: [
          "Sistemas de comunicação considerados seguros podem apresentar vulnerabilidades quando usados em escala ou em ambientes diferentes do original.",
          "Padrões de comportamento digital podem ser tão reveladores quanto o conteúdo das mensagens.",
          "A segurança de uma rede depende de todos os seus pontos de contato, incluindo a possibilidade de comprometimento interno.",
          "Contrainteligência eficiente combina análise técnica com fontes humanas próprias.",
        ],
      },
      { type: "h2", text: "Limites desta análise" },
      {
        type: "p",
        text: "Este texto se baseia exclusivamente em reportagens jornalísticas. Não temos acesso a documentos classificados, depoimentos diretos de envolvidos ou confirmações oficiais do governo americano ou chinês. As conclusões sobre causas e números são inferências dos jornalistas, não fatos confirmados.",
      },
      {
        type: "p",
        text: "O caso envolve consequências letais. Pessoas morreram. Ao estudar contrainteligência, é essencial manter a perspectiva de que por trás de cada fonte comprometida há uma pessoa real, com família e história própria.",
      },
    ],
    sources: [
      { label: "Mark Mazzetti, Adam Goldman e Michael S. Schmidt. Killing C.I.A. Informants, China Crippled U.S. Spying Operations. New York Times, 20 mai. 2017.", url: "https://www.nytimes.com/2017/05/20/world/asia/china-cia-spies-espionage.html", type: "secundaria" },
      { label: "Zach Dorfman e Jenna McLaughlin. The CIA's Communications Suffered a Catastrophic Compromise. Foreign Policy, 15 ago. 2018.", url: "https://foreignpolicy.com/2018/08/15/botched-cia-communications-system-helped-blow-cover-chinese-agents-intelligence/", type: "secundaria" },
      { label: "Zach Dorfman. The Hunt for the CIA Mole Who Betrayed Agents in China. Yahoo News, 2019.", url: "https://news.yahoo.com/the-hunt-for-the-cia-mole-who-betrayed-agents-in-china-090022564.html", type: "secundaria" },
    ],
    methodology:
      "Análise baseada em reportagens investigativas do New York Times (2017), Foreign Policy (2018) e Yahoo News (2019). Essas reportagens citam ex-oficiais de inteligência americanos sob anonimato. Não há acesso a documentos classificados. As fontes jornalísticas são tratadas como referências secundárias, não como fontes primárias. Afirmações sobre execuções, números de fontes e causas do comprometimento são inferências dos jornalistas, sinalizadas como tal no texto.",
  },
  {
    slug: "caso-sergei-skripal-recrutamento-duplo-agente",
    title: "Sergei Skripal: recrutamento, troca de prisioneiros e retaliação",
    description:
      "O ciclo de vida de um agente duplo, da abordagem pelo MI6 ao envenenamento em Salisbury.",
    category: "casos-historicos",
    categoryLabel: "Casos Históricos",
    tags: ["Recrutamento", "Agente duplo", "MI6", "Rússia", "Casos Históricos"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-03-22",
    updatedAt: "2026-04-15",
    readingTime: "11 min",
    heroImage: "/images/cases/skripal.jpg",
    heroAlt: "Rua de cidade inglesa em dia nublado, arquitetura georgiana.",
    featured: false,
    instagramShortCode: "DSncNTAkc1B",
    body: [
      {
        type: "p",
        text: "Em meados dos anos 1990, Sergei Skripal ainda era um oficial ativo da inteligência militar russa (GRU). Foi nesse período que o MI6 britânico o recrutou como agente duplo, uma relação que duraria anos, renderia informações valiosas sobre operações russas na Europa, e terminaria, décadas depois, em uma tentativa de assassinato por envenenamento em solo britânico.",
      },
      {
        type: "p",
        text: "O caso Skripal é um estudo completo do ciclo de vida de uma fonte humana: identificação, abordagem, recrutamento, gerenciamento, comprometimento, troca de prisioneiros e, finalmente, retaliação.",
      },
      { type: "h2", text: "O recrutamento" },
      {
        type: "p",
        text: "Skripal foi identificado pelo MI6 através de padrões clássicos de vulnerabilidade: acesso a informações valiosas, descontentamento com a situação profissional e necessidade financeira. O processo de recrutamento foi gradual, construído sobre rapport e confiança.",
      },
      {
        type: "p",
        text: "Entre 1995 e 2004, Skripal forneceu ao MI6 informações sobre centenas de oficiais do GRU operando na Europa sob cobertura diplomática. O valor dessa inteligência era imenso: permitiu aos britânicos e seus aliados mapear redes inteiras de espionagem russa.",
      },
      { type: "h2", text: "A captura e a troca" },
      {
        type: "p",
        text: "Em 2004, Skripal foi preso na Rússia, condenado por alta traição e sentenciado a 13 anos de prisão. Em 2010, foi incluído em uma troca de prisioneiros histórica (a maior desde a Guerra Fria) e transferido para o Reino Unido, onde viveu em relativa tranquilidade até 2018.",
      },
      { type: "h2", text: "O envenenamento" },
      {
        type: "p",
        text: "Em março de 2018, Skripal e sua filha Yulia foram encontrados inconscientes em um banco de parque em Salisbury, Inglaterra. A investigação revelou que haviam sido envenenados com Novichok, um agente nervoso de grau militar desenvolvido na União Soviética.",
      },
      {
        type: "p",
        text: "A mensagem era clara: mesmo após uma troca formal, mesmo vivendo sob proteção em outro país, traidores não estão seguros. A Rússia demonstrou disposição de usar armas químicas em solo estrangeiro para enviar esse recado.",
      },
      { type: "h2", text: "Lições para HUMINT" },
      {
        type: "ul",
        items: [
          "O passado de uma fonte nunca desaparece completamente, especialmente em casos de traição percebida.",
          "Trocas de prisioneiros não encerram a relação; podem apenas suspendê-la.",
          "Proteção de fontes é uma responsabilidade de longo prazo, não apenas operacional.",
          "Estados estão dispostos a usar métodos extremos para dissuadir futuros recrutamentos.",
        ],
      },
      {
        type: "quote",
        text: "A série inteira pode ser resumida assim: recrutamento não é um \"convite\". É um sistema. E sistemas não perdoam.",
      },
    ],
    sources: [
      { label: "Bellingcat. Skripal Poisoning Suspect Identified as GRU Colonel Anatoliy Chepiga. 26 set. 2018.", url: "https://www.bellingcat.com/news/uk-and-europe/2018/09/26/skripal-suspect-boshirov-identified-gru-colonel-anatoliy-chepiga/", type: "secundaria" },
      { label: "BBC News. Caso Skripal: cobertura completa. 2018-2019.", url: "https://www.bbc.com/news/topics/c302m85qenvt", type: "secundaria" },
      { label: "OPCW. Report on Technical Assistance Requested by the United Kingdom. 12 set. 2018.", url: "https://www.opcw.org/media-centre/news/2018/09/opcw-issues-report-technical-assistance-requested-united-kingdom", type: "referencia" },
    ],
    methodology:
      "Análise baseada em investigações jornalísticas de OSINT (Bellingcat), cobertura da BBC e Guardian, declarações oficiais do governo britânico e relatórios técnicos da OPCW. O caso é público e extensamente documentado. Afirmações sobre motivações russas são inferências baseadas em padrões, não confirmações oficiais de Moscou.",
  },
  {
    slug: "unidade-29155-operacoes-encoberto-gru",
    title: "Unidade 29155: as operações encobertas do GRU na Europa",
    description:
      "A unidade de operações especiais do GRU projetada para operar no invisível: identidades falsas, assassinatos e desestabilização.",
    category: "geopolitica-e-inteligencia",
    categoryLabel: "Geopolítica e Inteligência",
    tags: ["GRU", "Unidade 29155", "Operações encobertas", "Rússia", "Contrainteligência"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-04-01",
    updatedAt: "2026-05-05",
    readingTime: "10 min",
    heroImage: "/images/cases/unit-29155.jpg",
    heroAlt: "Mapa abstrato da Europa com linhas de rota conectando cidades.",
    featured: false,
    instagramShortCode: "DXNmWMlkWrA",
    body: [
      {
        type: "p",
        text: "A Unidade 29155 era projetada para operar no invisível: identidades falsas, missões no exterior, negação plausível. Mas uma série de falhas operacionais, combinadas ao trabalho meticuloso de investigadores de OSINT, expôs não apenas operações específicas, mas a própria existência da unidade.",
      },
      {
        type: "p",
        text: "Vinculada ao GRU (inteligência militar russa), a 29155 foi responsável por algumas das operações mais agressivas da Rússia na Europa nas últimas décadas: tentativas de assassinato, sabotagem, desestabilização política.",
      },
      { type: "h2", text: "Operações atribuídas" },
      {
        type: "ul",
        items: [
          "Tentativa de assassinato de Sergei Skripal (Reino Unido, 2018)",
          "Envenenamento de Emilian Gebrev (Bulgária, 2015)",
          "Explosões em depósitos de munição (República Tcheca, 2014)",
          "Tentativa de golpe em Montenegro (2016)",
        ],
      },
      { type: "h2", text: "Como foram expostos" },
      {
        type: "p",
        text: "A exposição da Unidade 29155 é um caso exemplar de como OSINT pode penetrar operações de inteligência estatal. Investigadores do Bellingcat, The Insider e outros veículos conseguiram identificar agentes específicos através de vazamentos de dados, análise de registros de viagem, reconhecimento facial e cruzamento de informações públicas.",
      },
      {
        type: "p",
        text: "As falhas de OPSEC dos agentes (uso de passaportes com números sequenciais, registros de carros vinculados a bases militares, ligações telefônicas rastreáveis) demonstram que mesmo serviços de inteligência sofisticados cometem erros quando operam em escala.",
      },
      { type: "h2", text: "Implicações" },
      {
        type: "p",
        text: "A existência pública da 29155 mudou o cálculo de risco para operações encobertas. Estados agora sabem que ações agressivas podem ser atribuídas, e que a negação plausível tem limites quando enfrentam investigadores determinados com acesso a dados abertos.",
      },
      {
        type: "quote",
        text: "O que ocorreu com Emilian Gebrev se encaixa em uma lógica mais ampla de guerra híbrida, onde Estados usam deniable assets para ações que não podem assumir publicamente.",
      },
    ],
    sources: [
      { label: "Bellingcat. Investigações sobre a Unidade 29155. 2018-2020.", url: "https://www.bellingcat.com/tag/unit-29155/", type: "secundaria" },
      { label: "The Insider. Identificação de agentes do GRU. 2019.", url: "https://theins.ru/en/politics/238281", type: "secundaria" },
      { label: "Michael Schwirtz e Ellen Barry. Inside a Russian Units Secret Missions to Destabilize Europe. New York Times, 8 out. 2019.", url: "https://www.nytimes.com/2019/10/08/world/europe/unit-29155-russia-gru.html", type: "secundaria" },
    ],
    methodology:
      "Análise baseada em investigações de OSINT (Bellingcat, The Insider), declarações oficiais de governos europeus e reportagens do New York Times. A existência da unidade foi confirmada por múltiplas fontes governamentais. Atribuições de operações específicas são baseadas em investigações jornalísticas e declarações oficiais, não em confirmações russas.",
  },
  {
    slug: "guerra-golfo-1991-humint-desinformacao",
    title: "Guerra do Golfo 1991: quando HUMINT e desinformação mudaram uma guerra",
    description:
      "A Guerra do Golfo de 1991 é frequentemente lembrada como a primeira grande guerra da era da tecnologia. Mas foi HUMINT que fez a diferença.",
    category: "influencia-e-percepcao",
    categoryLabel: "Influência e Percepção",
    tags: ["Guerra do Golfo", "Desinformação", "HUMINT", "Casos Históricos", "PSYOPS"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-28",
    readingTime: "9 min",
    heroImage: "/images/editorial/osint-humint-integration.jpg",
    heroAlt: "Mapa topográfico com anotações a lápis e marcadores de coordenadas.",
    featured: false,
    instagramShortCode: "DV6p9qZkWGD",
    body: [
      {
        type: "p",
        text: "A Guerra do Golfo de 1991 é frequentemente lembrada como a primeira grande guerra da era da tecnologia: mísseis inteligentes, bombardeios de precisão, imagens de satélite em tempo real. Mas por trás da vitrine tecnológica, foi uma combinação de HUMINT e operações de desinformação que moldou o resultado.",
      },
      { type: "h2", text: "A operação de engano" },
      {
        type: "p",
        text: "A coalizão liderada pelos EUA executou uma das maiores operações de engano militar desde a Segunda Guerra Mundial. O Iraque foi levado a acreditar que o ataque principal viria pelo mar (um desembarque anfíbio no Kuwait) e pela fronteira norte. Na realidade, a ofensiva terrestre veio pelo oeste: o famoso \"Hail Mary\" através do deserto.",
      },
      {
        type: "p",
        text: "Essa percepção errônea foi cultivada através de múltiplos canais: movimentação de tropas visível, comunicações de rádio falsas e, crucialmente, fontes humanas que alimentavam a inteligência iraquiana com informações que pareciam críveis.",
      },
      { type: "h2", text: "O papel da HUMINT" },
      {
        type: "p",
        text: "A HUMINT operou em duas direções neste conflito. De um lado, operadores de inteligência trabalharam para entender as intenções e capacidades iraquianas. Do outro, canais humanos foram usados para plantar desinformação: fazer chegar ao inimigo exatamente o que se queria que ele acreditasse.",
      },
      {
        type: "ul",
        items: [
          "Fontes humanas confirmaram que o Iraque acreditava no cenário falso.",
          "Desertores iraquianos forneceram informações sobre posições de defesa.",
          "Canais de comunicação foram usados para amplificar a narrativa de engano.",
        ],
      },
      { type: "h2", text: "Lições" },
      {
        type: "p",
        text: "A Guerra do Golfo demonstrou que tecnologia não substitui inteligência humana; ela a complementa. As imagens de satélite mostravam onde estavam as tropas; fontes humanas explicavam o que os comandantes iraquianos pensavam que estava acontecendo.",
      },
      {
        type: "quote",
        text: "Por incrível que pareça, muitas vezes o problema é ter informação demais e pouca capacidade de transformá-la em decisão.",
      },
    ],
    sources: [
      { label: "U.S. Air Force. Gulf War Air Power Survey. Relatório desclassificado, 1993.", url: "https://media.defense.gov/2010/Sep/27/2001329801/-1/-1/0/AFD-100927-061.pdf", type: "referencia" },
      { label: "Rick Atkinson. Crusade: The Untold Story of the Persian Gulf War. Boston: Houghton Mifflin, 1993.", type: "secundaria" },
      { label: "Michael R. Gordon e Bernard E. Trainor. The Generals War: The Inside Story of the Conflict in the Gulf. Boston: Little, Brown, 1995.", type: "secundaria" },
    ],
    methodology:
      "Análise histórica baseada em relatórios desclassificados do Departamento de Defesa americano, literatura acadêmica e relatos de participantes. Operações de desinformação são, por natureza, difíceis de documentar com precisão; este texto apresenta o que é publicamente conhecido.",
  },
  {
    slug: "engenharia-social-ponto-vulneravel-humano",
    title: "Engenharia social: o ponto mais vulnerável de qualquer sistema",
    description:
      "Não precisou de invasão sofisticada nem de quebra de criptografia. Houve aproximação, rapport, e perguntas estruturadas para extrair o máximo sem levantar suspeita.",
    category: "engenharia-social",
    categoryLabel: "Engenharia Social",
    tags: ["Engenharia Social", "Vulnerabilidade", "Segurança", "Comportamento Humano"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-05-01",
    readingTime: "7 min",
    heroImage: "/images/dossiers/social-engineering.jpg",
    heroAlt: "Porta-cartões, crachá de visitante e recado telefônico em mesa de escritório.",
    featured: false,
    instagramShortCode: "DXz5rMMEZ1W",
    body: [
      {
        type: "p",
        text: "O ponto mais vulnerável de qualquer sistema não é tecnológico. É humano. Não precisou de invasão sofisticada nem de quebra de criptografia. Houve aproximação. Aumento paulatino do relacionamento. Convites aparentemente legítimos, valores baixos o suficiente para parecerem inofensivos, e perguntas estruturadas para extrair o máximo sem levantar suspeita.",
      },
      { type: "h2", text: "O padrão que se repete" },
      {
        type: "p",
        text: "Esse padrão se repete em múltiplos contextos: engenharia social, golpes digitais, vazamentos de informação, manipulação interpessoal. O raciocínio é o mesmo: se a informação não pode ser roubada, ela pode ser entregue. E quase sempre é.",
      },
      {
        type: "p",
        text: "Basta criar o cenário certo para aumentar a disposição em responder. Um contexto que pareça legítimo, uma relação que pareça genuína, uma pergunta que pareça inofensiva.",
      },
      { type: "h2", text: "Técnicas comuns" },
      {
        type: "ul",
        items: [
          "Pretexting: criar uma história falsa para justificar a abordagem.",
          "Elicitação: extrair informações através de conversa aparentemente casual.",
          "Rapport building: construir confiança antes de pedir qualquer coisa.",
          "Reciprocidade: oferecer algo pequeno para criar obrigação de retribuir.",
          "Urgência artificial: pressionar decisões rápidas para evitar reflexão.",
        ],
      },
      { type: "h2", text: "Como se defender" },
      {
        type: "ol",
        items: [
          "Questione pedidos de informação, mesmo de fontes aparentemente legítimas.",
          "Verifique identidades através de canais independentes.",
          "Não tome decisões importantes sob pressão de tempo artificial.",
          "Treine equipes para reconhecer táticas de engenharia social.",
          "Crie protocolos claros para compartilhamento de informações sensíveis.",
        ],
      },
      {
        type: "quote",
        text: "E você… saberia identificar esse tipo de abordagem antes de falar demais?",
      },
    ],
    methodology:
      "Texto editorial baseado em padrões recorrentes de engenharia social documentados em literatura de segurança da informação e casos públicos.",
  },
  {
    slug: "psicologia-gaslighting-alterar-percepcao",
    title: "Gaslighting: a técnica de alterar a percepção do outro",
    description:
      "Gaslighting é a técnica de alterar a percepção do outro. Aos poucos, a pessoa deixa de confiar no que vê, ouve e lembra.",
    category: "psicologia-comportamental",
    categoryLabel: "Psicologia Comportamental",
    tags: ["Gaslighting", "Manipulação", "Psicologia Comportamental", "Influência"],
    author: "Equipe Mundo da HUMINT",
    authorBio:
      "Equipe editorial dedicada a método, ética e profundidade no campo da inteligência humana aplicada.",
    publishedAt: "2026-04-18",
    readingTime: "6 min",
    heroImage: "/images/editorial/source-validation.jpg",
    heroAlt: "Fichas de arquivo sobrepostas com anotações e carimbos.",
    featured: false,
    instagramShortCode: "DS27MBHEYsW",
    body: [
      {
        type: "p",
        text: "Gaslighting é a técnica de alterar a percepção do outro. Aos poucos, a pessoa deixa de confiar no que vê, ouve e lembra. O termo vem de uma peça de teatro de 1938 (Gas Light), onde um marido manipula a esposa fazendo-a duvidar de sua própria sanidade.",
      },
      { type: "h2", text: "Como funciona" },
      {
        type: "p",
        text: "O gaslighting opera através de negação persistente, contradição de fatos, trivialização de preocupações e reconstrução de eventos. A vítima começa a questionar sua própria memória e percepção.",
      },
      {
        type: "ul",
        items: [
          "Negação: \"Isso nunca aconteceu\"",
          "Trivialização: \"Você está exagerando\"",
          "Desvio: \"O problema é você, não eu\"",
          "Reconstrução: \"Não foi assim que aconteceu\"",
          "Isolamento: cortar a vítima de fontes externas de validação",
        ],
      },
      { type: "h2", text: "Contextos de aplicação" },
      {
        type: "p",
        text: "Gaslighting não se limita a relacionamentos interpessoais. A técnica aparece em contextos organizacionais, interrogatórios, operações de influência e até política. Sempre que o objetivo é fazer alguém duvidar de sua própria percepção da realidade.",
      },
      { type: "h2", text: "Sinais de alerta" },
      {
        type: "ol",
        items: [
          "Você constantemente questiona sua memória de eventos.",
          "Sente que precisa de validação externa para confiar em suas percepções.",
          "Pedidos de desculpas por coisas que você não entende ter feito.",
          "Sensação de estar \"enlouquecendo\" ou \"sendo paranoico\".",
          "Isolamento crescente de outras fontes de informação.",
        ],
      },
      { type: "h2", text: "Defesa" },
      {
        type: "p",
        text: "A principal defesa contra gaslighting é manter registros independentes (diários, documentos, testemunhas) e preservar conexões com fontes externas de validação. Quando a única versão da realidade vem de uma pessoa, a vulnerabilidade é máxima.",
      },
      {
        type: "note",
        text: "Este texto é educacional. Se você reconhece esses padrões em um relacionamento, busque apoio profissional e redes de suporte externas.",
      },
    ],
    methodology:
      "Texto baseado em literatura de psicologia clínica e organizacional. O termo e o conceito são amplamente documentados em pesquisa acadêmica.",
  },
]

export const ARTICLES: Article[] = [...EDITORIAL_ARTICLES, ...INSTAGRAM_ARTICLES]

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug)
}

export function getRelatedArticles(currentSlug: string, limit = 3) {
  const current = getArticleBySlug(currentSlug)
  if (!current) return []
  const sameCategory = ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.category === current.category
  )
  const others = ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.category !== current.category
  )
  return [...sameCategory, ...others].slice(0, limit)
}

export function getFeaturedArticles() {
  return ARTICLES.filter((a) => a.featured)
}

export function getLatestArticles(limit = 6) {
  return [...ARTICLES]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit)
}

function normalizeContentKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function articleMatchesCategory(article: Article, category: string) {
  const normalizedCategory = normalizeContentKey(category)
  if (article.category === normalizedCategory) return true

  const categoryMeta = getCategoryBySlug(normalizedCategory)
  const categoryTerms = [
    categoryMeta?.slug,
    categoryMeta?.name,
    categoryMeta?.shortDescription,
  ]
    .filter(Boolean)
    .map((term) => normalizeContentKey(term as string))

  return article.tags.some((tag) => {
    const normalizedTag = normalizeContentKey(tag)
    return categoryTerms.some(
      (term) => normalizedTag === term || normalizedTag.includes(term),
    )
  })
}

export function articleMatchesTag(article: Article, tag: string) {
  const normalizedTag = normalizeContentKey(tag)
  return article.tags.some((item) => normalizeContentKey(item) === normalizedTag)
}

export function getArticlesByCategory(category: string, limit?: number) {
  const filtered = ARTICLES.filter((a) => articleMatchesCategory(a, category)).sort(
    (a, b) => (a.publishedAt < b.publishedAt ? 1 : -1),
  )
  return limit ? filtered.slice(0, limit) : filtered
}

export function getArticlesByTag(tag: string, limit?: number) {
  const filtered = ARTICLES.filter((a) => articleMatchesTag(a, tag)).sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  )
  return limit ? filtered.slice(0, limit) : filtered
}
