import { testimonials } from "@/lib/testimonials"

export type Review = {
  name: string
  /** What the customer said, word for word (an ellipsis marks a cut). */
  quote: string
}

// Every real customer review we have, for the sliding reviews strip near the bottom of the pages. Never invent or
// reword one: add a new review here only when a customer has actually written it.
export const reviews: Review[] = [
  {
    // Posted on the Epping Car Buyer Google profile, 21 October 2026, word for word.
    name: "H",
    quote:
      "I can’t recommend Henry highly enough. He was incredibly thorough and took the time to explain everything clearly … I genuinely feel the £199 inspection was some of the best money I’ve ever spent.",
  },
  ...testimonials.map((t) => ({ name: t.name, quote: t.quote })),
]
