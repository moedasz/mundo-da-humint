import { NextResponse } from "next/server"
import { z } from "zod"

/**
 * Endpoint: POST /api/waitlist
 *
 * Recebe a inscrição na lista de espera do livro (ou na lista de interesse
 * de formação). Em produção, encaminhe para um webhook (Make/Zapier/N8n),
 * SMTP ou diretamente para um CRM/banco.
 *
 * Variável de ambiente esperada:
 * - WAITLIST_WEBHOOK_URL — webhook genérico que recebe o payload
 */

const Schema = z.object({
  nome: z.string().min(2, "Informe seu nome."),
  email: z.string().email("E-mail inválido."),
  whatsapp: z.string().optional().default(""),
  consent: z.boolean().refine((v) => v === true, "Consentimento obrigatório."),
  source: z.string().optional(),
  perfil: z.string().optional(),
  interesse: z.string().optional(),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Payload inválido." },
      { status: 400 },
    )
  }

  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    return NextResponse.json(
      { error: first?.message ?? "Dados inválidos." },
      { status: 400 },
    )
  }

  const data = parsed.data
  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Canal de inscrição não configurado." },
      { status: 503 },
    )
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        receivedAt: new Date().toISOString(),
        ip:
          request.headers.get("x-forwarded-for") ??
          request.headers.get("x-real-ip") ??
          null,
        userAgent: request.headers.get("user-agent") ?? null,
      }),
    })
  } catch {
    console.error("[waitlist] webhook unavailable")
    return NextResponse.json(
      { error: "Não foi possível registrar a inscrição agora." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
