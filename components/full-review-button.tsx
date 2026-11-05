"use client"

import { Quote } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// "Read the full review" on a shortened review card: opens the customer's whole review, word for word, in a light
// card over the page. The second, screen-reader-hidden copy of the strip keeps the button but out of the tab order.
// Radix puts the window in a portal, so the sliding strip's moving track doesn't carry it.
export function FullReviewButton({ name, paragraphs, hiddenCopy = false }: { name: string; paragraphs: string[]; hiddenCopy?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger tabIndex={hiddenCopy ? -1 : undefined} className="mt-3 self-start text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary/80">
        Read the full review
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-[calc(100%-2rem)] overflow-y-auto rounded-3xl border-primary/15 bg-white p-6 sm:p-8" overlayClassName="bg-black/40">
        <Quote className="h-8 w-8 text-primary" aria-hidden="true" />
        <DialogTitle className="sr-only">Review from {name}</DialogTitle>
        <blockquote className="space-y-3 text-base leading-relaxed text-foreground">
          {paragraphs.map((p, i) => (
            <p key={i}>
              {i === 0 && "“"}
              {p}
              {i === paragraphs.length - 1 && "”"}
            </p>
          ))}
        </blockquote>
        <p className="text-lg font-bold text-primary">{name}</p>
      </DialogContent>
    </Dialog>
  )
}
