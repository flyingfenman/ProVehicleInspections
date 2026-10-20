import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { evModelPath, evModels } from "@/lib/ev-models"
import { guidePath, guides, type Guide } from "@/lib/guides"

const EV_GUIDE_SLUGS = ["how-to-check-ev-battery-health-before-you-buy", "how-long-do-electric-car-batteries-last"]

// The hub part of the EV page: the two battery guides and one short page per popular model.
export function EvHubLinks() {
  const evGuides = EV_GUIDE_SLUGS.map((slug) => guides.find((guide) => guide.slug === slug)).filter((guide): guide is Guide => guide !== undefined)
  return (
    <section id="models" className="scroll-mt-20 border-t border-border bg-white py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Before you book</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Battery health, model by model</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              What is normal for the battery in the car you are looking at, what its warranty says, what goes wrong, and what we check. One short page per popular used EV, and two guides that answer the questions behind them.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {evGuides.map((guide) => (
              <Link key={guide.slug} href={guidePath(guide)} className="group flex items-start gap-3 rounded-2xl border border-border bg-primary/5 p-5 transition hover:border-primary/40">
                <BookOpen className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <span>
                  <span className="block text-lg font-bold leading-snug group-hover:text-primary">{guide.question}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{guide.description}</span>
                </span>
              </Link>
            ))}
          </div>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {evModels.map((model) => (
              <li key={model.slug}>
                <Link href={evModelPath(model)} className="flex min-h-12 items-center justify-between rounded-xl border border-border bg-white px-4 py-2 font-semibold hover:border-primary/40 hover:text-primary">
                  <span>
                    {model.name}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">{model.years}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
