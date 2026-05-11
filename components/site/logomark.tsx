import Image from "next/image"
import { cn } from "@/lib/utils"

type LogomarkProps = {
  className?: string
  variant?: "black" | "white"
}

export function Logomark({ className, variant = "black" }: LogomarkProps) {
  return (
    <Image
      src={`/images/brand/mundo-humint-mark-${variant}.png`}
      alt=""
      width={1024}
      height={1024}
      aria-hidden="true"
      className={cn("h-8 w-8 object-contain", className)}
    />
  )
}
