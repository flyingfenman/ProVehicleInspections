import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BatteryCharging } from "lucide-react"
import { formatDate } from "@/components/guides/inline"
import { evModelPath, evModels } from "@/lib/ev-models"
import { guidePath, guides } from "@/lib/guides"

const title = "Used Car Buying Guides | Pro Vehicle Inspections"
const description =
  "Straight answers for used car buyers: what an inspection costs, AA vs RAC vs independent, EV battery health, write-offs, imports and your rights. Written by the inspector."

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/guides" },
  openGraph: { title, description, url: "/guides", type: "website", images: ["/images/inspection-car.jpg"] },
}

export default function GuidesIndexPage() {
  return (
    <main className="bg-white">
      <section className="border-b border-border bg-primary/5 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold sm:text-5xl">Used car buying guides</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              The questions buyers ask us before they book, answered plainly by the person who does the inspections, with the prices and the real cars behind the answers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link key={guide.slug} href={guidePath(guide)} className="group flex flex-col rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <h2 className="text-xl font-bold leading-snug group-hover:text-primary">{guide.question}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{guide.description}</p>
                <p className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Checked {formatDate(guide.updated)}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-primary">
                    Read <ArrowRight className="h-4 w-4" />
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-10 sm:py-14">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
              <BatteryCharging className="h-7 w-7 text-primary" /> EV battery notes by model
            </h2>
            <p className="mt-2 text-muted-foreground">Battery sizes, warranty terms, what goes wrong and what we check, one short page per popular used electric car.</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {evModels.map((model) => (
                <li key={model.slug}>
                  <Link href={evModelPath(model)} className="flex min-h-11 items-center justify-between rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold hover:border-primary/40 hover:text-primary">
                    {model.name}
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted-foreground">
              The battery check itself is on the{" "}
              <Link href="/ev-battery-health-check" className="font-semibold text-primary underline underline-offset-4">
                EV battery health check page
              </Link>
              : £99.99 on its own or £49.99 with an inspection.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
