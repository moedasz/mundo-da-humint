import { NextResponse } from "next/server"
import { z } from "zod"

const Schema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  intencao: z.string().min(1),
  mensagem: z.string().min(10),
  consent: z.boolean().refine((v) => v === true, "Consentimento obrigatório."),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 })
  }

  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
      { status: 400 },
    )
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL ?? process.env.WAITLIST_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Canal de contato não configurado." },
      { status: 503 },
    )
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "contato",
        ...parsed.data,
        receivedAt: new Date().toISOString(),
      }),
    })
  } catch {
    console.error("[contato] webhook unavailable")
    return NextResponse.json(
      { error: "Não foi possível registrar a mensagem agora." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
