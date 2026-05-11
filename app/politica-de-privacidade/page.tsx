import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { pageMetadata } from "@/lib/seo"
import { SITE } from "@/lib/site"

export const metadata: Metadata = pageMetadata({
  title: "Política de privacidade",
  description:
    "Como o Mundo da HUMINT trata seus dados pessoais, em conformidade com a LGPD.",
  path: "/politica-de-privacidade",
})

export default function PrivacidadePage() {
  return (
    <>
      <section className="container-editorial pt-8 md:pt-10">
        <Breadcrumbs items={[{ label: "Política de privacidade", href: "/politica-de-privacidade" }]} />
      </section>

      <section className="container-editorial py-10 md:py-16 max-w-3xl">
        <p className="eyebrow-gold">Documento legal</p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-semibold text-balance leading-tight">
          Política de privacidade
        </h1>
        <p className="mt-3 text-sm font-mono uppercase tracking-widest text-ink-muted">
          Última atualização: maio de 2026
        </p>

        <div className="mt-10 article-prose">
          <p>
            Esta política descreve como o {SITE.name} coleta, usa e protege os
            dados pessoais de quem interage com o site. Está alinhada à Lei
            Geral de Proteção de Dados (Lei nº 13.709/2018, LGPD).
          </p>

          <h2>1. Quais dados coletamos</h2>
          <p>
            Coletamos apenas os dados estritamente necessários para responder
            ao que você nos pede. Em formulários (lista de espera do livro,
            interesse em formação, newsletter, contato), tipicamente:
          </p>
          <ul>
            <li>Nome</li>
            <li>E-mail</li>
            <li>WhatsApp (apenas na lista de espera do livro)</li>
            <li>Conteúdo da mensagem enviada (no formulário de contato)</li>
            <li>Área de interesse profissional (quando informada)</li>
          </ul>
          <p>
            Também podemos coletar dados de navegação agregados e anônimos
            (páginas visitadas, dispositivo, origem) por meio de ferramentas de
            análise. Esses dados não permitem identificar você.
          </p>

          <h2>2. Como usamos seus dados</h2>
          <ul>
            <li>Para responder ao seu contato ou solicitação.</li>
            <li>Para enviar comunicações relacionadas ao motivo da sua inscrição (lançamento do livro, abertura de turma, newsletter).</li>
            <li>Para melhorar continuamente o conteúdo do site, com base em métricas agregadas.</li>
          </ul>
          <p>
            Não usamos seus dados para perfilamento publicitário e não os
            compartilhamos com terceiros para fins comerciais.
          </p>

          <h2>3. Base legal</h2>
          <p>
            O tratamento se baseia, conforme o caso, em <strong>consentimento</strong>
            (formulários com checkbox específico), em <strong>execução de
            obrigação contratual ou pré-contratual</strong> (lista de espera do
            livro) ou em <strong>legítimo interesse</strong>, sempre observados
            os direitos do titular.
          </p>

          <h2>4. Cookies</h2>
          <p>
            Usamos cookies essenciais para o funcionamento do site. Cookies
            opcionais de análise são ativados somente após seu consentimento no
            banner. Você pode rever sua escolha a qualquer momento, limpando os
            dados do navegador ou nos contatando.
          </p>

          <h2>5. Seus direitos como titular</h2>
          <p>De acordo com a LGPD, você pode, a qualquer momento:</p>
          <ul>
            <li>Confirmar a existência de tratamento</li>
            <li>Solicitar acesso aos seus dados</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar anonimização, bloqueio ou eliminação</li>
            <li>Revogar o consentimento</li>
            <li>Solicitar a portabilidade</li>
          </ul>

          <h2>6. Como exercer seus direitos</h2>
          <p>
            Envie um pedido para <a href={`mailto:${SITE.email}`}>{SITE.email}</a> com o
            assunto “LGPD: solicitação de titular”. Respondemos no prazo legal.
          </p>

          <h2>7. Segurança</h2>
          <p>
            Adotamos medidas técnicas e organizacionais razoáveis para
            proteger seus dados contra acesso não autorizado, perda ou
            alteração indevida.
          </p>

          <h2>8. Atualizações</h2>
          <p>
            Esta política pode ser atualizada. Mudanças relevantes serão
            comunicadas no próprio site e, quando apropriado, por e-mail.
          </p>
        </div>
      </section>
    </>
  )
}
