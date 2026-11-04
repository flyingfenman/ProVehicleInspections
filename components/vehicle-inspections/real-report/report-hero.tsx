import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, CalendarDays, EyeOff, Gauge, MapPin, PackageCheck, ShieldCheck, UserRound, Users } from "lucide-react"
import type { RealReport } from "@/lib/sample-reports/types"
import { Removed } from "./removed"

export function RealReportHero({ report }: { report: RealReport }) {
  const facts = [
    { icon: ShieldCheck, label: "Registration", value: null },
    { icon: Users, label: "Customer", value: null },
    { icon: Gauge, label: "Mileage", value: report.mileage },
    { icon: UserRound, label: "Inspector", value: report.inspector },
    { icon: PackageCheck, label: "Package", value: report.packageName },
    { icon: CalendarDays, label: "Inspected", value: report.inspected },
  ]

  return (
    <section className="bg-primary py-10 sm:py-14 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-lg border-2 border-white">
            <BadgeCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-extrabold tracking-wide text-primary uppercase">Real Customer Report</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance">{report.vehicle}</h1>
            <p className="text-white/80 text-lg max-w-3xl mx-auto">{report.intro}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/30 rounded-full text-sm font-medium text-white">
              <CalendarDays className="w-4 h-4" />
              Inspected {report.inspected}
            </div>
            <Link
              href={report.where.href}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/30 rounded-full text-sm font-medium text-white hover:bg-white/25"
            >
              <MapPin className="w-4 h-4" />
              {report.where.label}
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white text-primary rounded-full text-sm font-semibold">
              <PackageCheck className="w-4 h-4" />
              {report.packageName}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6 sm:mt-8 lg:mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative aspect-[4/3] sm:aspect-[3/2]">
            <Image
              src={report.hero.src}
              alt={report.hero.alt}
              fill
              priority
              sizes="(min-width: 960px) 896px, 100vw"
              className="object-cover"
              style={{ objectPosition: report.hero.position ?? "center" }}
            />
          </div>

          <div className="p-5 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col items-center text-center gap-2">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                    <fact.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{fact.label}</p>
                    <p className="text-sm font-bold text-foreground mt-1">{fact.value ?? <Removed />}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground text-center">
              <EyeOff className="w-4 h-4 flex-shrink-0" />
              <span>Customer name, registration and VIN removed for privacy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
