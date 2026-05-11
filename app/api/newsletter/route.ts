import { NextResponse } from "next/server"
import { z } from "zod"

const Schema = z.object({
  email: z.string().email("E-mail inválido."),
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

  const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL ?? process.env.WAITLIST_WEBHOOK_URL

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Canal de newsletter não configurado." },
      { status: 503 },
    )
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "newsletter",
        email: parsed.data.email,
        receivedAt: new Date().toISOString(),
      }),
    })
  } catch {
    console.error("[newsletter] webhook unavailable")
    return NextResponse.json(
      { error: "Não foi possível registrar o e-mail agora." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
