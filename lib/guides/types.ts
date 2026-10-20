export type GuideFaq = { question: string; answer: string }

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "note"; text: string }

export type Guide = {
  slug: string
  /** The question, used as the h1. */
  question: string
  /** The <title> without the brand suffix. */
  title: string
  description: string
  published: string
  updated: string
  /** The direct answer, as the first paragraph. */
  answer: string
  blocks: GuideBlock[]
  faqs?: GuideFaq[]
  /** Other guide slugs. */
  related: string[]
  /** Area slugs worth linking from this guide. */
  areas?: string[]
  /** EV model slugs worth linking from this guide. */
  models?: string[]
  sources?: { label: string; href: string }[]
}
