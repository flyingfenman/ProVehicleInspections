import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { SITE } from "@/components/vehicle-inspections/sections/site"

export const AUTHOR = {
  name: "Henry",
  role: "Inspector and owner, Pro Vehicle Inspections",
  bio: "Henry inspects every car himself, at the seller, across London, Essex, East Anglia and the Midlands. He scans with an Autel diagnostic tablet, which carries the CARA Approved EV battery health test, and with VCDS on Volkswagen group cars, measures paint depth on every panel in a Premium inspection, and road tests every car he reports on. Years of buying cars with his own money shape what he looks for.",
}

export function AuthorCard({ checked }: { checked: string }) {
  return (
    <aside className="rounded-3xl border border-border bg-muted/30 p-6 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-start">
        {/* eslint-disable-next-line @next/next/no-img-element -- the same photo the home page uses */}
        <img src="/henry.webp" alt={`Henry from ${SITE.brand}`} width={120} height={160} loading="lazy" className="h-40 w-[120px] rounded-2xl object-cover" />
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-primary">Written by</p>
          <p className="mt-1 text-xl font-bold">{AUTHOR.name}</p>
          <p className="text-sm text-muted-foreground">{AUTHOR.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{AUTHOR.bio}</p>
          <p className="mt-3 text-sm text-muted-foreground">Last checked {checked}.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex min-h-11 items-center rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary/90">
              Book an inspection
            </Link>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-white px-5 text-sm font-bold hover:bg-muted/40">
              <MessageCircle className="h-4 w-4" /> Ask Henry on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
