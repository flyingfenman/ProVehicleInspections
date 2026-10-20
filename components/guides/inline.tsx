import Link from "next/link"
import type { ReactNode } from "react"

// Paragraph text may carry links written as [label](href). Anything else is plain text.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

export function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match
    const index = match.index ?? 0
    if (index > last) parts.push(text.slice(last, index))
    const external = /^https?:\/\//.test(href)
    parts.push(
      external ? (
        <a key={`${href}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
          {label}
        </a>
      ) : (
        <Link key={`${href}-${index}`} href={href} className="font-semibold text-primary underline underline-offset-4">
          {label}
        </Link>
      ),
    )
    last = index + whole.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
}
