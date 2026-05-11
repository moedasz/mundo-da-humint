import Image from "next/image"
import { cn } from "@/lib/utils"

const LOGOS = {
  black: {
    src: "/images/brand/mundo-humint-logo-black.png",
    width: 2681,
    height: 841,
  },
  white: {
    src: "/images/brand/mundo-humint-logo-white.png",
    width: 2956,
    height: 996,
  },
} as const

type BrandLogoProps = {
  className?: string
  priority?: boolean
  variant?: keyof typeof LOGOS
}

export function BrandLogo({
  className,
  priority,
  variant = "black",
}: BrandLogoProps) {
  const logo = LOGOS[variant]

  return (
    <Image
      src={logo.src}
      alt="Mundo da HUMINT"
      width={logo.width}
      height={logo.height}
      priority={priority}
      sizes="(min-width: 1024px) 180px, 120px"
      className={cn("h-8 w-auto object-contain", className)}
    />
  )
}
