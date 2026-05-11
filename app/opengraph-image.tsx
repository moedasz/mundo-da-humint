import { ImageResponse } from "next/og"
import { SITE } from "@/lib/site"

export const alt = "Mundo da HUMINT: inteligência humana aplicada, com método"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0E1116 0%, #161B22 60%, #1F2F43 100%)",
          color: "#F6F1E6",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            color: "#D9A523",
            letterSpacing: 0,
            textTransform: "uppercase",
            fontFamily: "monospace",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: "#D9A523",
            }}
          />
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: 0,
              maxWidth: 1000,
            }}
          >
            A inteligência humana aplicada, com método.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#EBE1D1",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            Artigos, dossiês e fundamentos para quem investiga, verifica e decide.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#A58F56",
            fontFamily: "monospace",
            letterSpacing: 0,
            borderTop: "1px solid #3a3a3a",
            paddingTop: 24,
          }}
        >
          <span>mundodahumint.com.br</span>
          <span>pt-BR · publicação editorial</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
