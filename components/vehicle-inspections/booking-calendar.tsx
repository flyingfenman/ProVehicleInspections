"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
  TriangleAlert,
  Phone,
  MessageCircle,
  Check,
  CalendarDays,
} from "lucide-react"
import { MIN_BOOKING_NOTICE_HOURS, isPackageKey, isSundaySlot, type PackageKey, type Slot } from "@/lib/inspection-slots"
import { INSPECTION_PACKAGES as PACKAGES, type InspectionGroup } from "@/lib/inspection-packages"
import { trackWhatsAppClick } from "@/lib/tracking"
import { getTrafficSource } from "@/lib/traffic-source"
import { scrollToAnchorWhileLoading } from "@/lib/scroll-to-anchor"

function toWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "")
  if (cleaned.startsWith("+")) return cleaned.slice(1)
  if (cleaned.startsWith("0")) return "44" + cleaned.slice(1)
  return cleaned
}

const PHONE_FEATURE_LIMIT = 4

const EV_SOH_PRICE = 49.99
const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const SHORT_NOTICE_MS = MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000
const DEFAULT_CALENDAR_START_HOURS = 25
// How often the page rechecks the time, so a slot that slips inside 24 hours while the page is open is shown as
// "Message first" before the customer tries to pay for it.
const CLOCK_TICK_MS = 30 * 1000
// The booking in progress, kept for the visit so pressing back on the Stripe page brings it all back.
const DRAFT_KEY = "pvi-booking-draft"
const WHATSAPP_HELP_URL = `https://wa.me/441992245660?text=${encodeURIComponent("Hi Henry, I'm having trouble booking an inspection on the website. Can you help?")}`

// A reply that isn't JSON (a timeout page, a lost connection) still gives the customer a plain message.
async function readJson(res: Response): Promise<Record<string, unknown>> {
  try {
    return (await res.json()) as Record<string, unknown>
  } catch {
    return {}
  }
}

function dateKey(isoString: string) {
  return isoString.slice(0, 10)
}

function getMonthGrid(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1)
  const startWeekday = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

function toDateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

function setViewFromDateKey(key: string) {
  const [year, month] = key.split("-").map(Number)
  return { year, month: month - 1 }
}

function isShortNotice(slot: Slot, nowMs: number) {
  return new Date(slot.start).getTime() < nowMs + SHORT_NOTICE_MS
}

// A time that can't be paid for until Henry has agreed it by message: anything inside 24 hours, and every Sunday
// (Sundays are by request). Both go through the same "Message first" step, so the short notice names further down
// (the candidate, the tick box, the checkout's shortNoticeConfirmed) cover Sundays as well.
type MessageFirstReason = "short-notice" | "sunday"

function messageFirstReason(slot: Slot, nowMs: number): MessageFirstReason | null {
  if (isShortNotice(slot, nowMs)) return "short-notice"
  return isSundaySlot(slot.start) ? "sunday" : null
}

function needsMessageFirst(slot: Slot, nowMs: number) {
  return messageFirstReason(slot, nowMs) !== null
}

// Said in the red message above the times when a chosen time turns out to need a message first.
function messageFirstNotice(slot: Slot, reason: MessageFirstReason) {
  return reason === "sunday"
    ? `Sunday appointments are by request, so ${formatSlotTime(slot)} needs a quick WhatsApp to Henry before you pay.`
    : `${formatSlotTime(slot)} is now less than ${MIN_BOOKING_NOTICE_HOURS} hours away, so it needs a quick WhatsApp to Henry before you pay.`
}

function shortNoticeWhatsAppUrl(slot: Slot, packageName: string, reason: MessageFirstReason) {
  const when = new Date(slot.start).toLocaleString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  })
  const message = reason === "sunday"
    ? `Hi Henry, I can see the ${packageName} slot at ${when}. Is this Sunday appointment available?`
    : `Hi Henry, I can see the ${packageName} slot at ${when}. Is this short-notice appointment still available?`
  return `https://wa.me/441992245660?text=${encodeURIComponent(message)}`
}

function formatSlotTime(slot: Slot) {
  return new Date(slot.start).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  })
}

export function InspectionsBookingCalendar() {
  const timeRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const [packageKey, setPackageKey] = useState<PackageKey>("standard")
  // The two tabs above the packages: buying a car, or a fault after garage work.
  const [group, setGroup] = useState<InspectionGroup>("pre-purchase")
  const [includeEvSoh, setIncludeEvSoh] = useState(false)
  const [slotsByPackage, setSlotsByPackage] = useState<Record<PackageKey, Slot[]>>({ standard: [], premium: [], ev: [], mechanical: [] })
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null)
  const [shortNoticeCandidate, setShortNoticeCandidate] = useState<Slot | null>(null)
  const [shortNoticeConfirmed, setShortNoticeConfirmed] = useState(false)
  // Set once the customer clicks an inspection (or a link chose one), so the bottom bar shows the price straight away.
  const [packagePicked, setPackagePicked] = useState(false)
  const [detailsUnlocked, setDetailsUnlocked] = useState(false)
  // On a phone the seller's details and the advert link start folded away, so the form is five boxes to the pay button.
  const [sellerOpen, setSellerOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date()
    return { year: d.getFullYear(), month: d.getMonth() }
  })
  // The customer's clock can be wrong, and the page can sit open for an hour, so "now" follows the server's
  // clock and moves on while the page is open. The checkout uses the same 24 hour rule.
  const clockOffsetMs = useRef(0)
  const [nowMs, setNowMs] = useState(() => Date.now())
  const refreshNow = useCallback(() => {
    const current = Date.now() + clockOffsetMs.current
    setNowMs(current)
    return current
  }, [])
  const [form, setForm] = useState({
    registration: "",
    location: "",
    sellerName: "",
    sellerPhone: "",
    advertUrl: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formError, setFormError] = useState("")
  const [prefilledReg, setPrefilledReg] = useState("")
  // A link Henry sends for one appointment: ?date=2026-10-13&time=09:00 (London time).
  const scrollToDetailsOnOpen = useRef(false)
  // confirmed: a time inside 24 hours already counts as agreed with Henry (his own links, or a booking the
  // customer had already confirmed before they pressed back on the payment page).
  const [requestedSlot, setRequestedSlot] = useState<{ date: string; time: string; confirmed: boolean } | null>(null)
  const [restoredDraft, setRestoredDraft] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    // Links such as the EV page's can choose the package: /book?package=ev
    const requestedPackage = params.get("package")
    if (isPackageKey(requestedPackage)) {
      setPackageKey(requestedPackage)
      setGroup(PACKAGES.find((p) => p.key === requestedPackage)?.group || "pre-purchase")
      setPackagePicked(true)
    }
    // The battery add-on box on the inspections page comes here with ?battery=1, with the report already ticked.
    if (params.get("battery") === "1") setIncludeEvSoh(true)
    const requestedDate = params.get("date")
    const requestedTime = params.get("time")
    if (requestedDate && /^\d{4}-\d{2}-\d{2}$/.test(requestedDate) && requestedTime && /^\d{1,2}:\d{2}$/.test(requestedTime)) {
      setRequestedSlot({ date: requestedDate, time: requestedTime.padStart(5, "0"), confirmed: true })
    }
    // Back from the Stripe page without paying: put the booking back as it was, so nothing is typed twice.
    if (params.get("booking") === "cancelled") {
      try {
        const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null")
        if (draft && isPackageKey(draft.packageKey)) {
          setPackageKey(draft.packageKey)
          setGroup(PACKAGES.find((p) => p.key === draft.packageKey)?.group || "pre-purchase")
          setPackagePicked(true)
          setIncludeEvSoh(draft.includeEvSoh === true)
          if (draft.form && typeof draft.form === "object") {
            setForm((current) => {
              const next = { ...current }
              for (const key of Object.keys(current) as (keyof typeof current)[]) {
                if (typeof draft.form[key] === "string") next[key] = draft.form[key]
              }
              return next
            })
          }
          if (typeof draft.date === "string" && typeof draft.time === "string") {
            setRequestedSlot({ date: draft.date, time: draft.time, confirmed: draft.shortNoticeConfirmed === true })
          }
          setRestoredDraft(true)
        }
      } catch {}
    }
    const registration = params.get("reg")?.trim().toUpperCase()
    if (registration) {
      setPrefilledReg(registration)
      setForm((current) => ({ ...current, registration: current.registration || registration }))
    }
    // Arriving on a #book link: the browser's own jump gets undone during page load, so retry briefly
    // until the section is in view.
    if (window.location.hash === "#book") return scrollToAnchorWhileLoading("book")
  }, [])

  const selectedPackage = PACKAGES.find((p) => p.key === packageKey) || PACKAGES[0]
  // The battery check on its own already is the battery report, so the add-on only goes with an inspection.
  const evOnly = packageKey === "ev"
  // A car the customer already owns, after garage work: no seller, no advert and no battery add-on.
  const mechanical = packageKey === "mechanical"
  const withEvSoh = includeEvSoh && !evOnly && !mechanical
  const totalPrice = selectedPackage.amount + (withEvSoh ? EV_SOH_PRICE : 0)
  const slots = slotsByPackage[packageKey]

  const loadAvailability = useCallback(async () => {
    setLoadingSlots(true)
    setError("")
    try {
      const res = await fetch("/api/inspection-slots?package=all", { cache: "no-store" })
      const data = (await readJson(res)) as { error?: string; now?: number; slotsByPackage?: Partial<Record<PackageKey, Slot[]>> }
      if (!res.ok || !data.slotsByPackage) throw new Error(data.error || "Couldn't load availability")
      if (typeof data.now === "number") clockOffsetMs.current = data.now - Date.now()
      refreshNow()
      setSlotsByPackage({
        standard: data.slotsByPackage?.standard || [],
        premium: data.slotsByPackage?.premium || [],
        ev: data.slotsByPackage?.ev || [],
        mechanical: data.slotsByPackage?.mechanical || [],
      })
    } catch {
      setError("Couldn't load available times. Please WhatsApp us and we'll arrange it with you.")
    } finally {
      setLoadingSlots(false)
    }
  }, [refreshNow])

  useEffect(() => {
    void loadAvailability()
  }, [loadAvailability])

  // The phone's back button from the Stripe page can bring this page back exactly as it was left, spinner and all.
  // Put the button back so the customer can try again.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setSubmitting(false)
    }
    window.addEventListener("pageshow", onPageShow)
    return () => window.removeEventListener("pageshow", onPageShow)
  }, [])

  // Keep the clock moving, and catch up straight away when the customer comes back to the tab.
  useEffect(() => {
    const timer = window.setInterval(refreshNow, CLOCK_TICK_MS)
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshNow()
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [refreshNow])

  useEffect(() => {
    if (loadingSlots || requestedSlot || selectedDate || slots.length === 0) return
    const defaultStartMs = nowMs + DEFAULT_CALENDAR_START_HOURS * 60 * 60 * 1000
    // Open on the first day that can be booked online, so not a Sunday when there is another day to show.
    const laterSlots = slots.filter((slot) => new Date(slot.start).getTime() >= defaultStartMs)
    const firstDefaultSlot = laterSlots.find((slot) => !isSundaySlot(slot.start)) || laterSlots[0] || slots[0]
    const firstDate = dateKey(firstDefaultSlot.start)
    setSelectedDate(firstDate)
    setViewDate(setViewFromDateKey(firstDate))
  }, [loadingSlots, nowMs, requestedSlot, selectedDate, slots])

  const slotsByDate = useMemo(() => {
    const map = new Map<string, Slot[]>()
    for (const slot of slots) {
      const key = dateKey(slot.start)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(slot)
    }
    return map
  }, [slots])

  const monthGrid = useMemo(() => getMonthGrid(viewDate.year, viewDate.month), [viewDate])
  const monthLabel = new Date(viewDate.year, viewDate.month, 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  })

  const set = (field: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const resetShortNotice = () => {
    setShortNoticeCandidate(null)
    setShortNoticeConfirmed(false)
  }

  const choosePackage = (key: PackageKey) => {
    setPackageKey(key)
    setPackagePicked(true)
    setSelectedDate(null)
    setSelectedSlot(null)
    setDetailsUnlocked(false)
    resetShortNotice()
    setError("")
  }

  // The link under the inspections swaps between buying a car and a fault after garage work. Switching picks that
  // group's first package, so the calendar always matches what is showing.
  const chooseGroup = (key: InspectionGroup) => {
    setGroup(key)
    if (selectedPackage.group === key) return
    const first = PACKAGES.find((p) => p.group === key)
    if (!first) return
    setPackageKey(first.key)
    // The mechanical inspection is the only choice in its group, so arriving there counts as choosing it.
    setPackagePicked(key === "mechanical")
    setSelectedDate(null)
    setSelectedSlot(null)
    setDetailsUnlocked(false)
    resetShortNotice()
    setError("")
  }

  const chooseDate = (key: string) => {
    setSelectedDate(key)
    setSelectedSlot(null)
    setDetailsUnlocked(false)
    resetShortNotice()
  }

  const handleSlotClick = (slot: Slot) => {
    setSelectedSlot(null)
    setDetailsUnlocked(false)
    setError("")
    if (needsMessageFirst(slot, nowMs)) {
      setShortNoticeCandidate(slot)
      setShortNoticeConfirmed(false)
      return
    }
    resetShortNotice()
    setSelectedSlot(slot)
  }

  // With the details open, everything above the form folds into one summary line, so going back to the top of the
  // page shows the "Book Your Vehicle Inspection" title, the summary and the start of the form together. Scrolling
  // to the form itself pushed the title off the top of a phone screen.
  const showPageTop = () => window.scrollTo({ top: 0 })

  // The details stay hidden until the customer has chosen a valid appointment and presses Continue.
  const goToDetails = () => {
    if (!selectedSlot) return
    setDetailsUnlocked(true)
    requestAnimationFrame(() => {
      showPageTop()
      detailsRef.current?.focus({ preventScroll: true })
    })
  }

  // A link for one appointment opens with that time chosen and the details form showing. Henry sends
  // these himself, so a time inside 24 hours, or on a Sunday, counts as already confirmed with him.
  useEffect(() => {
    if (loadingSlots || !requestedSlot) return
    setRequestedSlot(null)
    const match = slots.find((slot) => dateKey(slot.start) === requestedSlot.date && formatSlotTime(slot) === requestedSlot.time)
    if (!match) {
      if (slots.some((slot) => dateKey(slot.start) === requestedSlot.date)) {
        setSelectedDate(requestedSlot.date)
        setViewDate(setViewFromDateKey(requestedSlot.date))
      }
      setError("Sorry, that time isn't available any more. Please pick another below, or WhatsApp us.")
      return
    }
    setSelectedDate(requestedSlot.date)
    setViewDate(setViewFromDateKey(requestedSlot.date))
    const reason = messageFirstReason(match, nowMs)
    if (reason) {
      setShortNoticeCandidate(match)
      if (!requestedSlot.confirmed) {
        // Needs a message first and not agreed with Henry: show the WhatsApp step rather than the details.
        setShortNoticeConfirmed(false)
        setError(`${messageFirstNotice(match, reason)} Your details are saved.`)
        return
      }
      setShortNoticeConfirmed(true)
    }
    setSelectedSlot(match)
    setDetailsUnlocked(true)
    scrollToDetailsOnOpen.current = true
  }, [loadingSlots, requestedSlot, slots, nowMs])

  useEffect(() => {
    if (!detailsUnlocked || !scrollToDetailsOnOpen.current) return
    scrollToDetailsOnOpen.current = false
    showPageTop()
  }, [detailsUnlocked])

  const showTimes = () => timeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  // Once an inspection is picked, the bar at the bottom of the screen carries the price, then the chosen time, until
  // the customer continues to their details.
  const barShowing = (packagePicked || selectedSlot !== null) && !detailsUnlocked
  // With the details open, the inspections and the calendar fold into one line with a Change link, so the form
  // starts near the top of the screen instead of three screens down.
  const changeAppointment = () => {
    setDetailsUnlocked(false)
    requestAnimationFrame(() => timeRef.current?.scrollIntoView({ block: "start" }))
  }

  // The WhatsApp button (components/whatsapp-float.tsx) reads these: its speech bubble stays off on the booking
  // page, and the button itself hides while the bar is showing, so the bottom of a phone screen isn't a pile-up.
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute("data-booking-page", "")
    return () => root.removeAttribute("data-booking-page")
  }, [])
  useEffect(() => {
    const root = document.documentElement
    if (barShowing) root.setAttribute("data-booking-bar", "")
    else root.removeAttribute("data-booking-bar")
    return () => root.removeAttribute("data-booking-bar")
  }, [barShowing])

  // A time that has slipped inside 24 hours (or a Sunday) can't be paid for online until Henry has confirmed it.
  // Instead of sending the customer back to the calendar to pick the same time again, show it as "Message first"
  // with the WhatsApp button and the tick box. Everything typed in the details form stays as it is.
  const moveToShortNotice = useCallback((slot: Slot, reason: MessageFirstReason) => {
    setSelectedSlot(null)
    setDetailsUnlocked(false)
    setShortNoticeCandidate(slot)
    setShortNoticeConfirmed(false)
    setSelectedDate(dateKey(slot.start))
    setViewDate(setViewFromDateKey(dateKey(slot.start)))
    setError(
      `${messageFirstNotice(slot, reason)} ` +
        `Message him below, or pick ${reason === "sunday" ? "another day" : "a later time"}. Your details are saved.`,
    )
    // Straight to the WhatsApp box under the times, once it has drawn.
    window.setTimeout(() => {
      const box = document.getElementById("short-notice-box") || timeRef.current
      box?.scrollIntoView({ behavior: "smooth", block: "center" })
    }, 50)
  }, [])

  // The same check while the customer is still on the calendar: a chosen time that the clock has overtaken.
  useEffect(() => {
    if (!selectedSlot || detailsUnlocked || shortNoticeConfirmed) return
    const reason = messageFirstReason(selectedSlot, nowMs)
    if (reason) moveToShortNotice(selectedSlot, reason)
  }, [nowMs, selectedSlot, detailsUnlocked, shortNoticeConfirmed, moveToShortNotice])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedSlot) {
      setError(shortNoticeCandidate
        ? `${messageFirstReason(shortNoticeCandidate, nowMs) === "sunday" ? "Sunday appointments are by request" : "That time is within 24 hours"}. Message Henry first, then tick the box once he's confirmed it.`
        : "Please choose a date and time for your appointment.")
      showTimes()
      return
    }
    const slotReason = messageFirstReason(selectedSlot, refreshNow())
    const slotIsShortNotice = slotReason !== null
    if (slotReason && !shortNoticeConfirmed) {
      moveToShortNotice(selectedSlot, slotReason)
      return
    }
    setSubmitting(true)
    setError("")
    setFormError("")

    const bookedSlot = selectedSlot
    // Kept for this visit only, so the back button on the Stripe page brings the booking back as it was.
    let previousSessionId: string | undefined
    try {
      previousSessionId = JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null")?.sessionId
    } catch {}
    const saveDraft = (sessionId?: string) => {
      try {
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify({
          packageKey,
          includeEvSoh,
          date: dateKey(bookedSlot.start),
          time: formatSlotTime(bookedSlot),
          shortNoticeConfirmed: slotIsShortNotice && shortNoticeConfirmed,
          form,
          sessionId,
        }))
      } catch {}
    }
    try {
      const res = await fetch("/api/create-inspection-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageKey,
          includeEvSoh: withEvSoh,
          shortNoticeConfirmed: slotIsShortNotice && shortNoticeConfirmed,
          slotStart: bookedSlot.start,
          slotEnd: bookedSlot.end,
          trafficSource: getTrafficSource(),
          // An earlier unpaid checkout of theirs is let go first, so it doesn't block this one.
          previousSessionId,
          ...form,
        }),
      })
      const data = (await readJson(res)) as { error?: string; code?: string; url?: string; sessionId?: string }
      if (res.ok && data.url) {
        saveDraft(data.sessionId)
        window.location.href = data.url
        return
      }
      setSubmitting(false)
      if (data.code === "short_notice" || data.code === "sunday") {
        // The server says the time is inside 24 hours, or on a Sunday. Catch the page's clock up and ask for a message.
        await loadAvailability()
        moveToShortNotice(bookedSlot, data.code === "sunday" ? "sunday" : "short-notice")
        return
      }
      if (data.code === "slot_taken" || data.code === "invalid_slot" || res.status === 409) {
        // The time has gone meanwhile: refresh the times and send the customer back up to pick another.
        setSelectedSlot(null)
        setDetailsUnlocked(false)
        resetShortNotice()
        await loadAvailability()
        setError(data.error || "Sorry, that time has just been booked. Please pick another below. Your details are saved.")
        showTimes()
        return
      }
      setFormError(data.error || "We couldn't open the payment page. Please try again, or WhatsApp Henry and he'll book it in for you.")
    } catch {
      setSubmitting(false)
      setFormError("We couldn't reach the booking system. Please check your connection and try again, or WhatsApp Henry and he'll book it in for you.")
    }
  }

  const daySlots = selectedDate ? slotsByDate.get(selectedDate) || [] : []
  // Why the time in the "Message first" box needs a message: it only ever holds a short-notice or a Sunday time.
  const candidateReason: MessageFirstReason =
    shortNoticeCandidate && messageFirstReason(shortNoticeCandidate, nowMs) === "sunday" ? "sunday" : "short-notice"

  return (
    <div className="mx-auto max-w-5xl">
      {restoredDraft && (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-white p-4" role="status">
          <p className="text-sm font-semibold text-foreground">No payment was taken. Your booking details are still here, so you can carry on where you left off.</p>
        </div>
      )}
      {prefilledReg && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-primary/20 bg-white p-4" role="status">
          <span
            className="rounded-md bg-[#ffd500] px-3 py-1 text-lg font-bold tracking-wider text-black"
            style={{ fontFamily: "var(--font-charles-wright), monospace" }}
          >
            {prefilledReg}
          </span>
          <p className="text-sm font-semibold text-foreground">Added to your booking. You can change it below, with the rest of the details.</p>
        </div>
      )}
      {detailsUnlocked && selectedSlot ? (
        <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-primary bg-primary/5 p-4 sm:p-5">
          <div className="min-w-0">
            <p className="font-bold">
              {selectedPackage.name}{withEvSoh ? " + battery report" : ""} · £{totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(selectedSlot.start).toLocaleString("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" })}
            </p>
          </div>
          <button type="button" onClick={changeAppointment} className="shrink-0 text-sm font-bold text-primary underline underline-offset-4">
            Change
          </button>
        </div>
      ) : (
      <>
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div>
            <h3 className="text-xl font-bold">Your inspection</h3>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {group === "mechanical"
                ? "For a fault after garage work: an independent report on what has gone wrong, with the evidence to back it up."
                : "Both inspections include an in-depth mechanical inspection, video review, evidence and personal buying guidance, or you can book the EV battery check on its own."}
            </p>
          </div>
        </div>

        {/* One row per inspection. The chosen one opens to show what it includes, so the page stays short on a phone
            and nothing collapses or jumps when the customer taps. */}
        <div className="space-y-3">
          {PACKAGES.filter((pkg) => pkg.group === group).map((pkg) => {
            const active = packageKey === pkg.key
            return (
              <button
                key={pkg.key}
                type="button"
                onClick={() => choosePackage(pkg.key)}
                aria-pressed={active}
                className={`flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all sm:p-5 ${active ? "border-primary bg-primary/5 shadow-md" : "border-border bg-white hover:border-primary/40 hover:shadow-sm"}`}
              >
                <span aria-hidden="true" className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-white ${active ? "border-primary" : "border-muted-foreground/40"}`}>
                  {active && <span className="h-3 w-3 rounded-full bg-primary" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-lg font-bold leading-tight sm:text-xl">{pkg.name}</span>
                    <span className="shrink-0 text-xl font-bold sm:text-2xl">{pkg.price}</span>
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {pkg.popular && <span className="mr-2 inline-block rounded-full bg-primary px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-primary-foreground">Most thorough</span>}
                    {pkg.points} · {pkg.strapline}
                  </span>
                  {active && (
                    <span className="mt-3 grid gap-1.5 sm:grid-cols-2">
                      {pkg.features.map((feature, i) => (
                        <span key={feature} className={`${i >= PHONE_FEATURE_LIMIT ? "hidden sm:flex" : "flex"} items-start gap-2 text-sm font-medium sm:text-xs`}><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {feature}</span>
                      ))}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
        <div className="mt-3 space-y-1 text-sm text-muted-foreground">
          {group === "mechanical" ? (
            <p>
              Buying a car instead?{" "}
              <button type="button" onClick={() => chooseGroup("pre-purchase")} className="font-bold text-primary underline underline-offset-4">
                See the pre-purchase inspections
              </button>
            </p>
          ) : (
            <>
              <p>
                <Link href="/" className="font-bold text-primary underline underline-offset-4">See what each inspection includes</Link>
              </p>
              <p>
                Had garage work go wrong?{" "}
                <button type="button" onClick={() => chooseGroup("mechanical")} className="font-bold text-primary underline underline-offset-4">
                  Book a mechanical inspection instead
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      {!evOnly && !mechanical && (
        <label
          htmlFor="includeEvSoh"
          className={`mb-8 flex cursor-pointer items-start gap-3 rounded-2xl border-2 bg-white p-4 shadow-sm transition sm:items-center sm:p-5 ${includeEvSoh ? "border-primary shadow-md" : "border-border hover:border-primary/50"}`}
        >
          <input id="includeEvSoh" type="checkbox" checked={includeEvSoh} onChange={(e) => setIncludeEvSoh(e.target.checked)} className="mt-0.5 h-6 w-6 shrink-0 rounded border-border accent-primary sm:mt-0" />
          <span className="min-w-0 flex-1">
            <span className="block font-bold leading-tight sm:text-lg">
              Buying an electric or plug-in hybrid? Add the battery health report
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              CARA Approved® Autel test. The battery&apos;s State of Health as a percentage, with its own report. Fully electric and plug-in hybrid cars only.
            </span>
          </span>
          <span className="shrink-0 text-lg font-bold text-primary sm:text-xl">+£49.99</span>
        </label>
      )}

      <div ref={timeRef} className="scroll-mt-24">
        <div className="mb-4 flex items-center gap-3">
          <div>
            <h3 className="text-xl font-bold">Choose your appointment</h3>
            <p className="text-sm text-muted-foreground">All open times are shown. If it&apos;s a Sunday or within 24 hours, message us first so we can confirm travel and access.</p>
          </div>
        </div>

        {loadingSlots ? (
          <div className="grid gap-4 md:grid-cols-[1.25fr_.75fr]">
            <div className="h-80 animate-pulse rounded-2xl border bg-muted/40" />
            <div className="h-80 animate-pulse rounded-2xl border bg-muted/30" />
          </div>
        ) : slots.length === 0 ? (
          <div className="rounded-2xl border bg-white p-8 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-3 font-bold">No availability showing for this package.</p>
            <p className="mt-1 text-sm text-muted-foreground">Message us and we&apos;ll see what we can arrange.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
            <div className="grid md:h-[430px] md:grid-cols-[1.25fr_.75fr]">
              <div className="border-b border-border p-5 md:h-full md:overflow-hidden md:border-b-0 md:border-r sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <button type="button" onClick={() => setViewDate((v) => (v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 }))} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-muted" aria-label="Previous month">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="font-bold">{monthLabel}</p>
                  <button type="button" onClick={() => setViewDate((v) => (v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 }))} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-muted" aria-label="Next month">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-1">
                  {WEEKDAY_LABELS.map((w) => <div key={w} className="py-1 text-center text-sm font-semibold text-muted-foreground sm:text-xs">{w}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {monthGrid.map((date, i) => {
                    if (!date) return <div key={i} />
                    const key = toDateKey(date)
                    const dateSlots = slotsByDate.get(key) || []
                    const hasSlots = dateSlots.length > 0
                    const onlyShortNotice = hasSlots && dateSlots.every((slot) => needsMessageFirst(slot, nowMs))
                    const isSelected = key === selectedDate
                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={!hasSlots}
                        onClick={() => chooseDate(key)}
                        className={`h-11 rounded-full text-sm font-semibold transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : onlyShortNotice
                              ? "bg-primary/5 text-primary ring-1 ring-primary/25 hover:bg-primary/10"
                              : hasSlots
                                ? "text-foreground hover:bg-primary/10"
                                : "cursor-not-allowed text-muted-foreground/25"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="bg-muted/20 p-5 sm:p-6 md:h-full md:overflow-y-auto md:overscroll-contain">
                {selectedDate ? (
                  <>
                    <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary sm:text-xs">Available appointments</p>
                    <p className="mb-4 font-bold">
                      {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                    </p>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-1">
                      {daySlots.map((slot) => {
                        const shortNotice = needsMessageFirst(slot, nowMs)
                        const isCandidate = shortNoticeCandidate?.start === slot.start
                        const isSelected = selectedSlot?.start === slot.start
                        const time = formatSlotTime(slot)
                        return (
                          <button
                            key={slot.start}
                            type="button"
                            onClick={() => handleSlotClick(slot)}
                            aria-pressed={isSelected}
                            className={`rounded-xl border px-2 py-2.5 text-sm font-bold transition-all hover:shadow-sm md:px-4 md:py-3 ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : shortNotice
                                ? isCandidate
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-primary/25 bg-white text-foreground hover:border-primary/50 hover:bg-primary/5"
                                : "border-primary bg-white text-primary hover:bg-primary hover:text-primary-foreground"
                            }`}
                          >
                            <span className="block text-base">{time}</span>
                            {/* On phones only message-first times carry a label; the legend above explains the rest. */}
                            <span className={`mt-0.5 text-[12px] font-semibold md:text-[11px] ${shortNotice ? "block text-muted-foreground" : "hidden opacity-70 md:block"}`}>
                              {shortNotice ? "Message first" : "Book online"}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                    {/* One slim line under the times, the same for a Sunday and for a time inside 24 hours: message Henry, then
                        tick once he has confirmed. No heading or card, so it doesn't push the page down on a phone. */}
                    {shortNoticeCandidate && dateKey(shortNoticeCandidate.start) === selectedDate && (
                      <div id="short-notice-box" className="mt-3 grid scroll-mt-24 grid-cols-2 gap-2">
                        <Button asChild className="h-11 bg-[#25D366] px-2 text-sm font-bold text-white hover:bg-[#1da851]">
                          <a href={shortNoticeWhatsAppUrl(shortNoticeCandidate, selectedPackage.name, candidateReason)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(candidateReason === "sunday" ? "sunday_slot" : "short_notice_slot")}>
                            <MessageCircle className="mr-1.5 h-4 w-4 shrink-0" /> Message Henry
                          </a>
                        </Button>
                        <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-primary/25 bg-white px-2.5 text-sm font-semibold leading-tight text-foreground">
                          <input
                            type="checkbox"
                            checked={shortNoticeConfirmed}
                            onChange={(e) => {
                              const confirmed = e.target.checked
                              setShortNoticeConfirmed(confirmed)
                              setSelectedSlot(confirmed ? shortNoticeCandidate : null)
                              setDetailsUnlocked(false)
                            }}
                            className="h-5 w-5 shrink-0 rounded border-border accent-primary"
                          />
                          Henry has confirmed
                        </label>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex min-h-48 items-center justify-center text-center text-sm text-muted-foreground">Choose a highlighted date to see appointment times.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {error && <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
      </div>
      </>
      )}
      {/* Once an inspection is picked, keep it and its price visible at the bottom of the screen, then the chosen
          appointment, until the customer continues to their details. While the cookie banner is open it sets
          --cookie-banner-space, so this bar sits just above it instead of underneath. */}
      {barShowing && (
        <div className="sticky bottom-[var(--cookie-banner-space,0px)] z-[45] -mx-4 mt-5 border-t border-primary/20 bg-white px-4 py-3 pb-[max(.75rem,calc(env(safe-area-inset-bottom)_-_var(--cookie-banner-space,0px)))] shadow-[0_-8px_30px_rgba(0,0,0,0.10)] sm:mx-0 sm:rounded-2xl sm:border sm:px-6 sm:py-4 sm:pb-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 sm:gap-6">
            <div role="status" aria-live="polite" className="min-w-0">
              {selectedSlot ? (
              <>
              <p className="truncate text-sm font-bold sm:hidden">
                {selectedPackage.name.replace(" Inspection", "")} · {new Date(selectedSlot.start).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/London" })} · {formatSlotTime(selectedSlot)} · £{totalPrice.toFixed(2)}
              </p>
              <div className="hidden sm:block">
                <p className="font-semibold">
                  {selectedPackage.name} · {new Date(selectedSlot.start).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/London" })} · {formatSlotTime(selectedSlot)}
                </p>
                <p className="text-sm text-muted-foreground">£{totalPrice.toFixed(2)} · Booking confirmed after payment.</p>
              </div>
              </>
              ) : (
              <>
                <p className="truncate text-sm font-bold sm:text-base">
                  {selectedPackage.name}{withEvSoh ? " + EV battery" : ""} · £{totalPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground sm:text-sm">Now pick a date and time.</p>
              </>
              )}
            </div>
            {selectedSlot ? (
              <Button type="button" onClick={goToDetails} className="h-11 shrink-0 bg-primary px-4 font-bold text-primary-foreground hover:bg-primary/90 sm:min-w-40">
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={showTimes} className="h-11 shrink-0 bg-primary px-4 font-bold text-primary-foreground hover:bg-primary/90 sm:min-w-40">
                Choose a time <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {detailsUnlocked && selectedSlot && (
        <form onSubmit={handleSubmit} className="mt-10 space-y-10">
        <div ref={detailsRef} tabIndex={-1} aria-label="Tell us about the car" className="scroll-mt-24 outline-none">
          <div className="mb-4 flex items-center gap-3">
            <div>
              <h3 className="text-xl font-bold">Tell us about the car</h3>
              <p className="text-sm text-muted-foreground">{mechanical ? "Tell us what was done and what has happened since, so we know what to look for." : "This lets us prepare before we arrive."}</p>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
            <div className="space-y-1.5">
              <Label htmlFor="registration">Registration *</Label>
              <Input id="registration" value={form.registration} onChange={set("registration")} placeholder="e.g. AB12 CDE" required autoCapitalize="characters" autoCorrect="off" spellCheck={false} autoComplete="off" className="uk-numberplate text-center tracking-widest" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">Where is the car? *</Label>
              <Input id="location" value={form.location} onChange={set("location")} placeholder={mechanical ? "Postcode or address where the car will be" : "Postcode, address or dealer name"} required maxLength={200} autoComplete="off" />
              <p className="text-xs text-muted-foreground">A postcode is fine, or the full address.</p>
            </div>
            {mechanical ? (
              <>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="sellerName">Garage that did the work</Label>
                  <Input id="sellerName" value={form.sellerName} onChange={set("sellerName")} placeholder="Garage name and town" autoComplete="off" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="notes">What work was done, and what has gone wrong since? *</Label>
                  <Textarea id="notes" value={form.notes} onChange={set("notes")} placeholder="e.g. Cambelt changed in August, a tensioner failed three weeks later. Dates, mileage and any warning lights help." rows={4} maxLength={400} required />
                </div>
              </>
            ) : (
            <>
            {/* On a phone these three start folded away; on a wider screen there is room, so they always show. */}
            <button
              type="button"
              onClick={() => setSellerOpen((open) => !open)}
              aria-expanded={sellerOpen}
              className="flex min-h-11 items-center gap-1.5 text-left text-sm font-bold text-primary sm:hidden"
            >
              <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${sellerOpen ? "rotate-90" : ""}`} />
              {sellerOpen ? "Hide the seller's details" : "Add the seller's details and the advert link (optional)"}
            </button>
            <div className={`${sellerOpen ? "grid" : "hidden sm:grid"} gap-4 sm:col-span-2 sm:grid-cols-2`}>
            <div className="space-y-1.5">
              <Label htmlFor="sellerName">Seller&apos;s name</Label>
              <Input id="sellerName" value={form.sellerName} onChange={set("sellerName")} placeholder="Private seller or dealership" autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sellerPhone">Seller&apos;s contact number</Label>
              <Input id="sellerPhone" type="tel" value={form.sellerPhone} onChange={set("sellerPhone")} placeholder="07700 900000" autoComplete="off" />
            </div>

            {form.sellerPhone.trim().length >= 10 && (
              <div className="sm:col-span-2 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-start gap-2">
                  <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700" />
                  <p className="text-sm text-amber-900">
                    Please make sure the seller can give us access to the vehicle at this time before you pay.
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href={`tel:${form.sellerPhone.replace(/\s+/g, "")}`} className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-white px-3 text-sm font-semibold text-amber-900 hover:bg-amber-100 sm:flex-initial">
                    <Phone className="h-3.5 w-3.5" /> Call seller
                  </a>
                  <a href={`https://wa.me/${toWhatsAppNumber(form.sellerPhone)}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 text-sm font-semibold text-white hover:bg-[#1da851] sm:flex-initial">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            )}

            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="advertUrl">Link to the advert</Label>
              <Input id="advertUrl" type="text" value={form.advertUrl} onChange={set("advertUrl")} placeholder="AutoTrader, eBay, Facebook Marketplace, dealer advert..." />
            </div>
            </div>
            </>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-3">
            <div>
              <h3 className="text-xl font-bold">Your details</h3>
              <p className="text-sm text-muted-foreground">We&apos;ll send the booking confirmation and report here.</p>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name *</Label>
              <Input id="name" value={form.name} onChange={set("name")} placeholder="Your name" required autoComplete="name" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone number *</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="07700 900000" required autoComplete="tel" />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="email">Email address *</Label>
              <Input id="email" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required autoComplete="email" />
            </div>
            {!mechanical && (
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="notes">Anything you&apos;re already concerned about?</Label>
                <Textarea id="notes" value={form.notes} onChange={set("notes")} placeholder="Any noises, warning lights, seller comments or access details..." rows={2} maxLength={400} />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {formError && (
            <div role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <p>{formError}</p>
              <a href={WHATSAPP_HELP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("booking_error")} className="mt-2 inline-flex items-center gap-1.5 font-semibold text-primary underline underline-offset-4">
                <MessageCircle className="h-4 w-4" /> WhatsApp Henry
              </a>
            </div>
          )}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-bold">{selectedPackage.name}</p>
                {selectedSlot ? (
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(selectedSlot.start).toLocaleString("en-GB", {
                      dateStyle: "full",
                      timeStyle: "short",
                      timeZone: "Europe/London",
                    })}
                  </p>
                ) : (
                  <button type="button" onClick={showTimes} className="text-sm font-semibold text-primary underline underline-offset-4">
                    Choose a date and time above
                  </button>
                )}
                <p className="text-sm text-muted-foreground">
                  {evOnly
                    ? "Battery test and State of Health report, without an inspection"
                    : mechanical
                      ? "Diagnostic scan with live data, photos, video and a written report"
                      : withEvSoh
                      ? "Includes EV Battery State of Health Report (+£49.99)"
                      : "Inspection only, no optional battery State of Health report"}
                </p>
                {selectedSlot && shortNoticeConfirmed && needsMessageFirst(selectedSlot, nowMs) && (
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <Check className="h-4 w-4" /> {isShortNotice(selectedSlot, nowMs) ? "Short-notice slot" : "Sunday appointment"} confirmed with Henry
                  </p>
                )}
              </div>
              <p className="shrink-0 text-2xl font-bold">£{totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={submitting} className="h-14 w-full text-lg font-bold bg-primary hover:bg-primary/90">
            {submitting ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Opening secure payment...</>
            ) : (
              <>Reserve My {evOnly ? "Battery Check" : "Inspection"}: £{totalPrice.toFixed(2)} <ChevronRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Secure checkout via Stripe. Your appointment is confirmed once payment is complete.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Free cancellation up to 48 hours before your appointment. No refunds after that.{" "}
            <a href="/terms-of-service" className="text-primary underline">
              Terms
            </a>
          </p>
        </div>
        </form>
      )}
    </div>
  )
}
