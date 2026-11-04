import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BadgeCheck } from "lucide-react"
import { rangeRoverSportReport as report } from "@/lib/sample-reports/range-rover-sport"

// Points from the illustrated sample to the real customer report.
export function RealReportBanner() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="container mx-auto px-4">
        <Link
          href={report.path}
          className="group mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 shadow-md transition-colors hover:border-primary/40 sm:flex-row sm:p-6"
        >
          <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-xl sm:w-52">
            <Image
              src={report.hero.src}
              alt={report.hero.alt}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 208px, 100vw"
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-primary">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" /> Real customer report
            </p>
            <p className="mt-1 text-xl font-bold text-foreground">See a real one: {report.vehicle}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A full Premium Inspection report, 93/100 and a Good Buy, with the customer&apos;s name, the registration
              and the VIN taken out.
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-primary">
              Read the real report
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
