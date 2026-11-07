// Shared slot logic for the inspection booking calendar.
// Appointments: every day at three fixed times, 9am, 12pm and 3pm Europe/London wall-clock time.

export const PACKAGE_DURATIONS_MIN = {
  standard: 60,
  premium: 90,
  // The EV battery health check on its own, without an inspection.
  ev: 60,
  // An independent report on a fault after garage work: diagnostic scan with live data, photos and video.
  mechanical: 90,
} as const

// Slots inside this window are still shown to customers, but must be confirmed by message first.
// The checkout API also enforces this as a backstop so a short-notice slot cannot be paid for directly.
export const MIN_BOOKING_NOTICE_HOURS = 24

export type PackageKey = keyof typeof PACKAGE_DURATIONS_MIN
export const PACKAGE_KEYS = Object.keys(PACKAGE_DURATIONS_MIN) as PackageKey[]

export function isPackageKey(value: unknown): value is PackageKey {
  return PACKAGE_KEYS.includes(value as PackageKey)
}

// The only start times customers can book (London time). Every package, the 90 minute ones included, is done well
// before the next start, so one booking never blocks the next time on the same day.
export const SLOT_START_HOURS = [9, 12, 15] as const
const LOOKAHEAD_DAYS = 30
const LONDON_TZ = "Europe/London"

export interface Slot {
  start: string
  end: string
}

export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string): boolean {
  return new Date(aStart).getTime() < new Date(bEnd).getTime() && new Date(bStart).getTime() < new Date(aEnd).getTime()
}

function londonOffsetMinutes(instant: Date): number {
  const asUTC = new Date(instant.toLocaleString("en-US", { timeZone: "UTC" }))
  const asLondon = new Date(instant.toLocaleString("en-US", { timeZone: LONDON_TZ }))
  return Math.round((asLondon.getTime() - asUTC.getTime()) / 60000)
}

function londonWallTimeToUTC(year: number, month: number, day: number, hour: number, minute: number): Date {
  const naiveUTCGuess = new Date(Date.UTC(year, month, day, hour, minute))
  const offset = londonOffsetMinutes(naiveUTCGuess)
  return new Date(naiveUTCGuess.getTime() - offset * 60000)
}

function londonDateParts(instant: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: LONDON_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(instant)
  const get = (type: string) => parts.find((p) => p.type === type)?.value || ""
  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return {
    year: Number(get("year")),
    month: Number(get("month")) - 1,
    day: Number(get("day")),
    weekday: weekdayMap[get("weekday")] ?? -1,
  }
}

export function generateAllSlots(packageKey: PackageKey, fromDate: Date = new Date()): Slot[] {
  const durationMin = PACKAGE_DURATIONS_MIN[packageKey]
  const slots: Slot[] = []

  for (let dayOffset = 0; dayOffset < LOOKAHEAD_DAYS; dayOffset++) {
    const probe = new Date(fromDate.getTime() + dayOffset * 24 * 60 * 60 * 1000)
    const { year, month, day } = londonDateParts(probe)

    for (const hour of SLOT_START_HOURS) {
      const slotStart = londonWallTimeToUTC(year, month, day, hour, 0)
      const slotEnd = new Date(slotStart.getTime() + durationMin * 60000)

      if (slotStart.getTime() > fromDate.getTime()) {
        slots.push({ start: slotStart.toISOString(), end: slotEnd.toISOString() })
      }
    }
  }

  return slots
}

// Is this instant one of the fixed start times (9am, 12pm or 3pm London time)?
export function isFixedStartTime(iso: string): boolean {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LONDON_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso))
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value)
  return (SLOT_START_HOURS as readonly number[]).includes(get("hour")) && get("minute") === 0 && get("second") === 0
}

// "09:00" (London time), the form booking links and the times list use.
export const FIXED_START_TIMES = SLOT_START_HOURS.map((hour) => `${String(hour).padStart(2, "0")}:00`)

// "9:00am", "12:00pm", "3:00pm": how a start time is shown to customers.
export function friendlyTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number)
  const suffix = h >= 12 ? "pm" : "am"
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, "0")}${suffix}`
}
