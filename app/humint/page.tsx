import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, CheckCircle2, Shield, Users, Brain, Eye, Scale, Target } from "lucide-react"

import { pageMetadata } from "@/lib/seo"
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/lib/schema"
import { JsonLd } from "@/components/site/json-ld"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { NewsletterInline } from "@/components/site/newsletter-inline"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SITE } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "O Que é HUMINT: Inteligência Humana Explicada",
  description:
    "Guia completo sobre HUMINT (Human Intelligence): definição, métodos, aplicações, diferenças para OSINT, ética e como a inteligência humana é usada em operações reais.",
  path: "/humint",
})

const faqs = [
  {
    question: "O que significa HUMINT?",
    answer:
      "HUMINT é a sigla para Human Intelligence (Inteligência Humana). Refere-se à coleta de informações através de fontes humanas: pessoas que fornecem dados, análises ou acesso a informações que não estão disponíveis por outros meios.",
  },
  {
    question: "Qual a diferença entre HUMINT e OSINT?",
    answer:
      "OSINT (Open Source Intelligence) coleta informações de fontes abertas e públicas. HUMINT coleta através de interações humanas diretas. São disciplinas complementares: OSINT pode identificar alvos que depois são abordados via HUMINT, e HUMINT pode validar ou contextualizar dados de OSINT.",
  },
  {
    question: "HUMINT é legal?",
    answer:
      "Depende do contexto e jurisdição. Serviços de inteligência governamentais operam sob estruturas legais específicas. No setor privado, HUMINT é usada em due diligence, investigações corporativas e jornalismo investigativo, sempre dentro dos limites legais e éticos.",
  },
  {
    question: "Quem usa HUMINT?",
    answer:
      "Agências de inteligência governamentais, forças armadas, polícias, jornalistas investigativos, empresas de due diligence, departamentos de segurança corporativa, investigadores privados e profissionais de compliance.",
  },
  {
    question: "Como se aprende HUMINT?",
    answer:
      "Através de formação especializada em agências governamentais, cursos acadêmicos de inteligência, treinamentos corporativos, literatura especializada e experiência prática supervisionada. O Mundo da HUMINT oferece conteúdo educacional sobre fundamentos e aplicações.",
  },
]

const pillarTopics = [
  {
    title: "Fundamentos de HUMINT",
    description: "Conceitos essenciais, história e princípios que regem a inteligência humana.",
    href: "/artigos?categoria=fundamentos-de-humint",
    icon: BookOpen,
  },
  {
    title: "Métodos e Tradecraft",
    description: "Técnicas operacionais: elicitação, rapport, recrutamento e comunicação segura.",
    href: "/metodos",
    icon: Target,
  },
  {
    title: "Engenharia Social",
    description: "Manipulação e influência interpessoal: como funciona e como se defender.",
    href: "/artigos?categoria=engenharia-social",
    icon: Users,
  },
  {
    title: "Contrainteligência",
    description: "Proteção contra espionagem, detecção de ameaças e prevenção de vazamentos.",
    href: "/artigos?categoria=contrainteligencia",
    icon: Shield,
  },
  {
    title: "OPSEC",
    description: "Segurança operacional e proteção de informações críticas.",
    href: "/artigos?categoria=opsec",
    icon: Eye,
  },
  {
    title: "Psicologia Comportamental",
    description: "Vieses cognitivos, tomada de decisão e comportamento humano em contextos de inteligência.",
    href: "/artigos?categoria=psicologia-comportamental",
    icon: Brain,
  },
]

export default function HumintPage() {
  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "HUMINT", href: "/humint" },
  ]

  return (
    <>
      <JsonLd
        data={[
          blogPostingSchema({
            title: "O Que é HUMINT: Inteligência Humana Explicada",
            description:
              "Guia completo sobre HUMINT: definição, métodos, aplicações e ética da inteligência humana.",
            slug: "humint",
            image: "/images/hero-home.jpg",
            publishedAt: "2024-01-15",
            updatedAt: new Date().toISOString().split("T")[0],
            author: "Mundo da HUMINT",
          }),
          breadcrumbSchema(breadcrumbs),
          faqSchema(faqs),
        ]}
      />

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative bg-deep text-warm-text">
          <div className="absolute inset-0 bg-gradient-to-b from-deep via-deep to-surface opacity-90" />
          <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-8 text-warm-text/70"><Breadcrumbs items={breadcrumbs} /></div>

            <p className="font-mono text-xs uppercase tracking-widest text-gold">Página Pilar</p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              O Que é HUMINT
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-warm-text/90">
              Inteligência humana (Human Intelligence) é a disciplina de coleta de informações através de fontes
              humanas. Este guia explica o que é, como funciona, quem usa e por que importa.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-gold text-on-gold hover:bg-gold-hover">
                <Link href="/artigos?categoria=fundamentos-de-humint">
                  Explorar artigos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-warm-text/30 text-warm-text hover:bg-warm-text/10">
                <Link href="/livro">Lista do livro</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Definição */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-p:text-ink-soft prose-a:text-gold prose-a:no-underline hover:prose-a:underline">
            <h2>Definição</h2>
            <p>
              <strong>HUMINT</strong> (Human Intelligence, ou Inteligência Humana) é uma das disciplinas de coleta de
              inteligência que obtém informações através de fontes humanas. Diferente de SIGINT (sinais), IMINT (imagens)
              ou OSINT (fontes abertas), HUMINT depende de interações interpessoais.
            </p>
            <p>
              Uma fonte humana pode ser um informante recrutado, um contato voluntário, um diplomata, um desertor ou
              qualquer pessoa com acesso a informações de interesse. O operador de HUMINT (também chamado de case officer
              ou handler) é responsável por identificar, abordar, desenvolver e gerenciar essas fontes.
            </p>

            <h2>Por Que HUMINT Importa</h2>
            <p>
              Em um mundo saturado de dados digitais, pode parecer que inteligência humana é obsoleta. O oposto é
              verdadeiro. Sistemas técnicos capturam o que acontece; fontes humanas explicam o porquê, revelam intenções
              e fornecem contexto que nenhum algoritmo consegue inferir.
            </p>
            <ul>
              <li>
                <strong>Intenções:</strong> HUMINT é a única disciplina capaz de acessar diretamente o que um adversário
                planeja fazer.
              </li>
              <li>
                <strong>Contexto:</strong> Dados sem contexto são ruído. Fontes humanas explicam o significado.
              </li>
              <li>
                <strong>Acesso:</strong> Algumas informações não existem em nenhum sistema, apenas na mente de pessoas.
              </li>
              <li>
                <strong>Validação:</strong> HUMINT pode confirmar ou refutar inteligência obtida por outros meios.
              </li>
            </ul>

            <h2>Métodos Principais</h2>
            <p>A coleta de HUMINT envolve um ciclo de operações que inclui:</p>
            <ol>
              <li>
                <strong>Identificação de alvos:</strong> Quem tem acesso às informações necessárias?
              </li>
              <li>
                <strong>Avaliação:</strong> A pessoa é acessível? Tem motivação? Representa riscos?
              </li>
              <li>
                <strong>Abordagem:</strong> Primeiro contato, construção de rapport, avaliação mútua.
              </li>
              <li>
                <strong>Recrutamento:</strong> Formalização do relacionamento, estabelecimento de termos.
              </li>
              <li>
                <strong>Gerenciamento:</strong> Comunicação segura, tasking, validação de informações.
              </li>
              <li>
                <strong>Encerramento:</strong> Quando e como terminar o relacionamento de forma segura.
              </li>
            </ol>

            <h2>HUMINT vs OSINT</h2>
            <p>
              OSINT e HUMINT não são concorrentes, são complementares. Uma investigação robusta frequentemente começa
              com OSINT (pesquisa em fontes abertas) para mapear o terreno, identificar alvos e preparar abordagens.
              HUMINT então aprofunda, valida e contextualiza.
            </p>
            <p>
              A diferença fundamental: OSINT coleta o que está público; HUMINT acessa o que está protegido, classificado
              ou simplesmente não documentado.
            </p>
          </div>
        </section>

        <Separator className="mx-auto max-w-4xl" />

        {/* Tópicos relacionados */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Explore por Tema</h2>
          <p className="mt-2 text-ink-muted">Aprofunde-se nas diferentes dimensões da inteligência humana.</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillarTopics.map((topic) => (
              <Card key={topic.href} className="group transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <topic.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="mt-4 font-display text-lg">
                    <Link href={topic.href} className="hover:text-gold">
                      {topic.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    href={topic.href}
                    className="inline-flex items-center text-sm font-medium text-gold hover:underline"
                  >
                    Ver artigos
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="mx-auto max-w-4xl" />

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Perguntas Frequentes</h2>

          <dl className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b border-line pb-6">
                <dt className="font-display text-lg font-semibold text-ink">{faq.question}</dt>
                <dd className="mt-2 text-ink-soft">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-deep p-8 text-center text-warm-text sm:p-12">
              <Scale className="mx-auto h-12 w-12 text-gold" />
              <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">
                HUMINT com Método e Ética
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-warm-text/80">
                O Mundo da HUMINT é uma plataforma educacional dedicada a tornar a inteligência humana mais
                compreensível, útil e responsável. Conteúdo rigoroso, sem sensacionalismo.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-gold text-on-gold hover:bg-gold-hover">
                  <Link href="/livro">
                    Entrar na lista do livro
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-warm-text/30 text-warm-text hover:bg-warm-text/10">
                  <Link href="/artigos">Ver todos os artigos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <NewsletterInline />
        </section>
      </div>
    </>
  )
}
