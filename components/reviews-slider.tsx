import { Quote } from "lucide-react"
import { reviews } from "@/lib/reviews"

// A strip of every real review that slides slowly past on its own: the name and what they said (no star ratings: only one review came with one). It stops
// while a finger or mouse is on it, can be swiped by hand, and stands still for anyone who has asked their device
// for less motion. A short list is repeated so the strip is never empty on a wide screen, and the copy that makes
// the loop seamless is hidden from screen readers. The loop time grows with the number of cards (about 8 seconds
// a card), so adding reviews never makes the strip move faster.
export function ReviewsSlider({ className = "bg-white" }: { className?: string }) {
  const run = Array.from({ length: Math.max(1, Math.ceil(8 / reviews.length)) }, () => reviews).flat()

  return (
    <section className={`overflow-hidden border-t py-10 sm:py-14 ${className}`} aria-labelledby="reviews-slider-heading">
      <div className="container mx-auto px-4">
        <h2 id="reviews-slider-heading" className="text-center text-3xl font-bold sm:text-4xl">
          What customers <span className="text-primary">say</span>
        </h2>
      </div>

      <div className="reviews-slider mt-7 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-9">
        <div className="reviews-slider-track flex w-max" style={{ animationDuration: `${run.length * 8}s` }}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5" aria-hidden={copy === 1 || undefined}>
              {run.map((review, i) => (
                <li
                  key={`${review.name}-${i}`}
                  className="flex w-[82vw] max-w-[360px] shrink-0 flex-col rounded-3xl border border-primary/15 bg-primary/5 p-6 sm:w-[360px]"
                >
                  <Quote className="h-7 w-7 text-primary" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">&ldquo;{review.quote}&rdquo;</blockquote>
                  <p className="mt-4 text-lg font-bold text-primary">{review.name}</p>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
