import Link from "next/link"
import { inspectionPhotos } from "@/lib/inspection-photos"
import { InspectionsBookingCalendar } from "./booking-calendar"

const photo = inspectionPhotos.van

function VanPhoto({ className }: { className: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-white shadow-sm ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static photo, already sized and compressed */}
      <img
        src={photo.src}
        alt={photo.alt}
        width={900}
        height={675}
        className="aspect-[4/3] h-full w-full object-cover"
        style={{ objectPosition: photo.position }}
      />
    </div>
  )
}

// The booking page: the title, then straight into choosing a package and a time. Henry's van photo sits beside
// the title on a tablet or laptop; on a phone it moves below the calendar so the calendar stays at the top.
export function InspectionsCta() {
  return (
    <section id="book" className="scroll-mt-24 bg-slate-50 py-7 sm:py-9 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-6 grid max-w-4xl items-center gap-8 sm:mb-8 sm:grid-cols-[1fr_240px] lg:grid-cols-[1fr_300px]">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold sm:mt-3 sm:text-4xl lg:text-5xl">Book Your Vehicle Inspection</h1>
              <p className="mt-4 hidden text-xl leading-relaxed text-muted-foreground sm:block">
                Choose your inspection, reserve a convenient appointment and we&apos;ll handle the rest.
              </p>
            </div>
            <VanPhoto className="hidden sm:block" />
          </div>

          <InspectionsBookingCalendar />
          <p className="mt-7 text-center">
            <Link href="/" className="text-sm font-bold text-primary underline underline-offset-4">
              Want to know more first? See what each inspection includes
            </Link>
          </p>

          <VanPhoto className="mx-auto mt-7 max-w-sm sm:hidden" />
          <p className="mt-7 text-center text-sm text-muted-foreground">
            You&apos;ll deal directly with Henry from booking through to your inspection findings, with no call centre and no sales commission from the car.
          </p>
        </div>
      </div>
    </section>
  )
}
