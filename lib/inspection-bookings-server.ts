import "server-only"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { applyBookingMoves, fetchBookingMoves, type DiaryBooking } from "@/lib/booking-moves"


export interface OccupiedRange {
  start: string
  end: string
}

// Stripe hands the sessions over 100 at a time, each page waiting for the one before. The lookback window is cut into
// this many stretches that are read at the same time, so the booking calendar waits for the slowest stretch rather
// than for every page in turn.
const WINDOW_PARTS = 4

// Every inspection booking among the Checkout Sessions created in one stretch of time. Paginates fully rather than
// trusting a single page, since Stripe caps each page at 100.
async function listBookings(created: Stripe.RangeQueryParam): Promise<DiaryBooking[]> {
  const bookings: DiaryBooking[] = []

  let startingAfter: string | undefined
  for (let page = 0; page < 20; page++) {
    // 20 pages (2,000 sessions) is a generous ceiling for a small business, stops a runaway loop if
    // something upstream ever misbehaves, without silently truncating any realistic volume of bookings.
    const response: Stripe.ApiList<Stripe.Checkout.Session> = await getStripe().checkout.sessions.list({
      created,
      limit: 100,
      starting_after: startingAfter,
    })

    for (const session of response.data) {
      if (session.status === "expired") continue
      if (session.metadata?.type !== "inspection_booking") continue
      if (typeof session.metadata?.slotStart !== "string" || typeof session.metadata?.slotEnd !== "string") continue
      bookings.push({ start: session.metadata.slotStart, end: session.metadata.slotEnd, created: session.created })
    }

    if (!response.has_more || response.data.length === 0) break
    startingAfter = response.data[response.data.length - 1].id
  }

  return bookings
}

// The lookback window as stretches that follow straight on from one another: each runs from its own start up to, but
// not including, the next one's start, so no session can fall between two or be counted twice. The newest stretch has
// no end, so a checkout started this very second is still counted.
export function lookbackParts(windowStart: number, now: number, parts: number = WINDOW_PARTS): Stripe.RangeQueryParam[] {
  const length = Math.max(1, Math.ceil((now - windowStart) / parts))
  return Array.from({ length: parts }, (_, index) => {
    const gte = windowStart + index * length
    return index === parts - 1 ? { gte } : { gte, lt: gte + length }
  })
}

// Fetches every inspection-booking Checkout Session created in the lookback window that isn't expired,
// i.e. still open (customer is mid-checkout) or already paid. Both count as "occupying" their slot, so a
// slot becomes unavailable to other customers the moment someone starts paying for it, not only once they
// finish.
export async function getOccupiedRanges(lookbackDays: number): Promise<OccupiedRange[]> {
  const now = Math.floor(Date.now() / 1000)
  const windowStart = now - 60 * 60 * 24 * lookbackDays
  // Bookings moved in the lead tool, read while Stripe is being read. Never fails: an empty list holds every
  // booking at the time it was paid for.
  const moves = fetchBookingMoves()
  const bookings = (await Promise.all(lookbackParts(windowStart, now).map(listBookings))).flat()

  // A booking moved in the lead tool frees the time it was paid for and holds its new time instead.
  return applyBookingMoves(bookings, await moves)
}
