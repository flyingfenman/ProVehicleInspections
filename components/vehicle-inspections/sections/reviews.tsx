import Image from "next/image"
import { Quote } from "lucide-react"
import { testimonials } from "@/lib/testimonials"

// "What our customers say about us": real customers, all on show with nothing to click. The photos are Henry's
// own inspection photos, labelled with the car shown. Rendered inside the hero: the right-hand column on a laptop, compact cards stacked
// beside the headline; full-width cards under the hero on a phone or tablet.
export function Reviews() {
  return (
    <div id="reviews" className="mt-12 scroll-mt-20 sm:mt-16 lg:mt-0">
      <h2 className="text-balance text-center text-3xl font-bold sm:text-4xl lg:text-left lg:text-2xl xl:text-3xl">What our customers say about us</h2>

      <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:mt-10 sm:gap-6 lg:mt-5 lg:gap-4">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-md md:grid-cols-[2fr_3fr] lg:grid-cols-[160px_1fr] lg:rounded-2xl xl:grid-cols-[200px_1fr]"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] lg:min-h-[180px]">
              <Image
                src={t.image}
                alt={t.imageAlt}
                fill
                sizes="(min-width: 1280px) 200px, (min-width: 1024px) 160px, (min-width: 768px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: t.imagePosition ?? "center" }}
              />
              {t.pictured && (
                <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-full bg-white/95 px-2.5 py-1 text-balance text-xs font-bold leading-tight text-primary shadow-sm">
                  Pictured: {t.pictured}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-5">
              <Quote className="h-9 w-9 text-primary lg:h-6 lg:w-6" aria-hidden="true" />
              <blockquote className="mt-3 text-xl font-bold leading-snug sm:text-2xl lg:mt-2 lg:text-base xl:text-lg">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 lg:mt-3">
                <p className="text-lg font-bold text-primary lg:text-base">{t.name}</p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </div>
  )
}
