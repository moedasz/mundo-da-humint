export function maskEmail(email: string) {
  const [name, domain] = email.split("@")
  if (!name || !domain) return "[email inválido]"
  const visible = name.slice(0, 2)
  return `${visible}${"*".repeat(Math.max(name.length - 2, 2))}@${domain}`
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "")
  if (!digits) return ""
  return `${"*".repeat(Math.max(digits.length - 4, 0))}${digits.slice(-4)}`
}
