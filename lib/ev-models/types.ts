export type EvFaq = { question: string; answer: string }

export type EvBattery = { version: string; capacity: string; range: string }

export type EvModel = {
  slug: string
  name: string
  years: string
  title: string
  description: string
  /** The direct answer: what a buyer needs to know about this car's battery, in one paragraph. */
  summary: string
  batteries: EvBattery[]
  warranty: string
  sohDisplay: string
  knownIssues: string[]
  whatWeCheck: string[]
  faqs: EvFaq[]
  related: string[]
  sources: { label: string; href: string }[]
  updated: string
}
