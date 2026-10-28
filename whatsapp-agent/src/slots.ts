import { MIN_BOOKING_NOTICE_HOURS, PACKAGE_KEYS, type PackageKey } from "../../lib/inspection-slots"

type Slot = { start: string; end: string }
export type FreeTimes = Record<PackageKey, Slot[]>

const LONDON = "Europe/London"
// How far ahead the agent is shown free times.
const DAYS_SHOWN = 10

// The same free times the booking page shows: this site's own bookings and the Epping and Stamford diaries.
export async function loadFreeTimes(siteUrl: string): Promise<FreeTimes> {
  const res = await fetch(`${siteUrl}/api/inspection-slots?package=all`, { headers: { "cache-control": "no-store" } })
  if (!res.ok) throw new Error(`Free times failed to load (${res.status})`)
  const data = (await res.json()) as { slotsByPackage?: Partial<FreeTimes> }
  return Object.fromEntries(PACKAGE_KEYS.map((key) => [key, data.slotsByPackage?.[key] ?? []])) as FreeTimes
}

export function londonDate(instant: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: LONDON, year: "numeric", month: "2-digit", day: "2-digit" }).format(instant)
}

export function londonTime(instant: Date): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: LONDON, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(instant)
}

function londonDayName(instant: Date): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: LONDON, weekday: "short", day: "numeric", month: "short" }).format(instant)
}

export function londonNow(now: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now)
}

// Is this London date and time a free start for the package?
export function isFree(free: FreeTimes, packageKey: PackageKey, date: string, time: string): boolean {
  return free[packageKey].some((slot) => {
    const start = new Date(slot.start)
    return londonDate(start) === date && londonTime(start) === time
  })
}

export function isShortNotice(date: string, time: string, free: FreeTimes, packageKey: PackageKey, now: Date): boolean {
  const slot = free[packageKey].find((s) => londonDate(new Date(s.start)) === date && londonTime(new Date(s.start)) === time)
  return !!slot && new Date(slot.start).getTime() - now.getTime() < MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000
}

// The free times as lines Claude can read, one line per day, with the date the booking link needs.
export function describeFreeTimes(free: FreeTimes, now: Date): string {
  const names: Record<PackageKey, string> = {
    standard: "Standard inspection",
    premium: "Premium inspection",
    ev: "EV battery health check on its own",
  }
  const cutoff = now.getTime() + DAYS_SHOWN * 24 * 60 * 60 * 1000
  const noticeEnds = now.getTime() + MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000

  return PACKAGE_KEYS.map((key) => {
    const byDay = new Map<string, { label: string; times: string[] }>()
    for (const slot of free[key]) {
      const start = new Date(slot.start)
      if (start.getTime() > cutoff) continue
      const date = londonDate(start)
      const day = byDay.get(date) ?? { label: londonDayName(start), times: [] }
      day.times.push(londonTime(start) + (start.getTime() < noticeEnds ? " (short notice)" : ""))
      byDay.set(date, day)
    }
    const lines = [...byDay.entries()].map(([date, day]) => `- ${day.label} (${date}): ${day.times.join(", ")}`)
    return `${names[key]}:\n${lines.length ? lines.join("\n") : "- no free times in the next 10 days"}`
  }).join("\n\n")
}
