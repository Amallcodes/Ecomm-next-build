import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Robust UUID generator that works in modern browsers and Node
export function generateUUID(): string {
  // Prefer standards-based crypto.randomUUID when available
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g: any = globalThis as unknown as Record<string, unknown>
  if (g && typeof g.crypto === "object" && g.crypto && typeof (g.crypto as Crypto).randomUUID === "function") {
    return (g.crypto as Crypto).randomUUID()
  }

  // Try Node's crypto.randomUUID if available (server-side)
  try {
    // Dynamically require to avoid bundling for client
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const nodeCrypto = require("crypto") as { randomUUID?: () => string; randomBytes?: (n: number) => Buffer }
    if (nodeCrypto?.randomUUID) {
      return nodeCrypto.randomUUID()
    }
    if (nodeCrypto?.randomBytes) {
      const bytes = nodeCrypto.randomBytes(16)
      // Set version and variant per RFC 4122 v4
      bytes[6] = (bytes[6] & 0x0f) | 0x40
      bytes[8] = (bytes[8] & 0x3f) | 0x80
      const hex = bytes.toString("hex")
      return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}`
    }
  } catch {
    // fall through to browser polyfill
  }

  // Browser polyfill using getRandomValues if available
  if (g && typeof g.crypto === "object" && g.crypto && typeof (g.crypto as Crypto).getRandomValues === "function") {
    const bytes = new Uint8Array(16)
    ;(g.crypto as Crypto).getRandomValues(bytes)
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex: string[] = []
    for (let i = 0; i < bytes.length; i++) {
      hex.push((bytes[i] + 0x100).toString(16).substring(1))
    }
    return `${hex[0]}${hex[1]}${hex[2]}${hex[3]}-${hex[4]}${hex[5]}-${hex[6]}${hex[7]}-${hex[8]}${hex[9]}-${hex[10]}${hex[11]}${hex[12]}${hex[13]}${hex[14]}${hex[15]}`
  }

  // Final fallback: timestamp + Math.random (not cryptographically strong)
  const s = Date.now().toString(16) + Math.random().toString(16).slice(2)
  return `${s.substring(0, 8)}-${s.substring(8, 12)}-4${s.substring(13, 16)}-8${s.substring(17, 20)}-${s.substring(20, 32)}`
}
