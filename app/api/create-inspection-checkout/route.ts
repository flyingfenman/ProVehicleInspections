import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import {
  MIN_BOOKING_NOTICE_HOURS,
  PACKAGE_DURATIONS_MIN,
  isPackageKey,
  clashesWithBooking,
  type PackageKey,
} from "@/lib/inspection-slots"
import { getOccupiedRanges } from "@/lib/inspection-bookings-server"
import { fetchOtherDiaries, isFreeElsewhere } from "@/lib/other-diaries"

const LOOKBACK_DAYS = 45
const EV_SOH_AMOUNT_PENCE = 4999

const PACKAGE_INFO: Record<PackageKey, { name: string; amountPence: number }> = {
  standard: { name: "Standard Inspection", amountPence: 19999 },
  premium: { name: "Premium Inspection", amountPence: 24999 },
  ev: { name: "EV Battery Health Check", amountPence: 14999 },
  mechanical: { name: "Mechanical Inspection", amountPence: 39999 },
}

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : ""
}

// Stripe refuses any metadata value over 500 characters, which would stop the checkout opening at all.
const METADATA_MAX = 500

// The customer's own earlier checkout for this booking, left open when they came back from the Stripe page.
// It would otherwise hold their time for 30 minutes and tell them it was "just booked by someone else".
async function releaseEarlierCheckout(sessionId: unknown) {
  if (typeof sessionId !== "string" || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) return
  try {
    const stripe = getStripe()
    const earlier = await stripe.checkout.sessions.retrieve(sessionId)
    if (earlier.status === "open" && earlier.metadata?.type === "inspection_booking") {
      await stripe.checkout.sessions.expire(sessionId)
    }
  } catch (error) {
    console.error("Couldn't release an earlier inspection checkout:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      packageKey, slotStart, slotEnd, registration, location, sellerName, sellerPhone, advertUrl,
      name, phone, email, notes, includeEvSoh, shortNoticeConfirmed, trafficSource, previousSessionId,
    } = body as {
      packageKey: unknown
      slotStart: string
      slotEnd: string
      registration: string
      location: string
      sellerName?: string
      sellerPhone?: string
      advertUrl?: string
      name: string
      phone: string
      email: string
      notes?: string
      includeEvSoh?: boolean
      shortNoticeConfirmed?: boolean
      trafficSource?: { label?: unknown; detail?: unknown; landingPage?: unknown } | null
      previousSessionId?: unknown
    }

    const missing = [
      [registration, "the registration"],
      [location, "where the car is"],
      [name, "your name"],
      [phone, "your phone number"],
      [email, "your email address"],
    ]
      .filter(([value]) => typeof value !== "string" || !value.trim())
      .map(([, label]) => label)
    if (!isPackageKey(packageKey) || !slotStart || !slotEnd) {
      return NextResponse.json(
        { error: "Please choose your inspection and a time again.", code: "invalid_slot" },
        { status: 400 },
      )
    }
    if (missing.length > 0) {
      return NextResponse.json({ error: `Please fill in ${missing.join(", ")}.`, code: "missing_fields" }, { status: 400 })
    }

    const start = new Date(slotStart)
    const end = new Date(slotEnd)
    const expectedDurationMin = PACKAGE_DURATIONS_MIN[packageKey]
    const actualDurationMin = (end.getTime() - start.getTime()) / 60000
    const earliestAllowedStart = Date.now() + MIN_BOOKING_NOTICE_HOURS * 60 * 60 * 1000
    const isShortNotice = start.getTime() < earliestAllowedStart
    const hasShortNoticeConfirmation = shortNoticeConfirmed === true

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      actualDurationMin !== expectedDurationMin
    ) {
      return NextResponse.json({ error: "Please choose your time again.", code: "invalid_slot" }, { status: 400 })
    }

    if (isShortNotice && !hasShortNoticeConfirmation) {
      return NextResponse.json(
        {
          error: `Appointments inside ${MIN_BOOKING_NOTICE_HOURS} hours must be confirmed with Henry before online booking.`,
          code: "short_notice",
        },
        { status: 400 },
      )
    }

    await releaseEarlierCheckout(previousSessionId)

    // Taken here, or taken on one of Henry's other inspection sites, which book into their own Stripe account.
    const [occupied, otherDiaries] = await Promise.all([getOccupiedRanges(LOOKBACK_DAYS), fetchOtherDiaries()])
    const alreadyTaken =
      occupied.some((range) => clashesWithBooking(slotStart, slotEnd, range.start, range.end)) ||
      !isFreeElsewhere(otherDiaries, packageKey, { start: slotStart, end: slotEnd })
    if (alreadyTaken) {
      return NextResponse.json(
        { error: "Sorry, that time has just been booked. Please pick another below. Your details are saved.", code: "slot_taken" },
        { status: 409 },
      )
    }

    const { name: packageName, amountPence } = PACKAGE_INFO[packageKey]
    // The battery check on its own is the whole booking, so the add-on doesn't apply to it, and the mechanical
    // inspection is for a car already owned, not one being bought.
    const evOnly = packageKey === "ev"
    const mechanical = packageKey === "mechanical"
    const wantsEvSoh = !evOnly && !mechanical && includeEvSoh === true
    const origin = request.nextUrl.origin
    const trimmedNotes = (notes || "").slice(0, 400)

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: "gbp",
          unit_amount: amountPence,
          product_data: {
            name: evOnly ? packageName : mechanical ? "Mechanical Inspection Report" : `${packageName} Vehicle Inspection`,
            description: `${cleanText(registration, 20)} · ${start.toLocaleString("en-GB", { timeZone: "Europe/London", dateStyle: "full", timeStyle: "short" })}`,
          },
        },
        quantity: 1,
      },
    ]

    if (wantsEvSoh) {
      lineItems.push({
        price_data: {
          currency: "gbp",
          unit_amount: EV_SOH_AMOUNT_PENCE,
          product_data: {
            name: "EV Battery State of Health Report",
            description: "CARA Approved® Autel EV Battery Health Test add-on for compatible fully electric and plug-in hybrid vehicles",
          },
        },
        quantity: 1,
      })
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: cleanText(email, 200),
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      line_items: lineItems,
      // brand and site say whose booking this is, in the Stripe dashboard and to the payment webhook
      // (app/api/webhooks/stripe), which sends the confirmation emails once it is paid.
      metadata: {
        type: "inspection_booking",
        brand: "Pro Vehicle Inspections",
        site: "provehicleinspections",
        packageKey,
        packageName,
        includeEvSoh: wantsEvSoh ? "yes" : "no",
        shortNoticeConfirmed: isShortNotice && hasShortNoticeConfirmation ? "yes" : "no",
        slotStart,
        slotEnd,
        registration: cleanText(registration, 20),
        location: cleanText(location, METADATA_MAX),
        sellerName: (sellerName || "").slice(0, 200),
        sellerPhone: (sellerPhone || "").slice(0, 50),
        advertUrl: (advertUrl || "").slice(0, 400),
        customerName: cleanText(name, 200),
        customerPhone: cleanText(phone, 50),
        customerEmail: cleanText(email, 200),
        notes: trimmedNotes,
        trafficSource: cleanText(trafficSource?.label, 60),
        trafficDetail: cleanText(trafficSource?.detail, 120),
        landingPage: cleanText(trafficSource?.landingPage, 120),
      },
      success_url: `${origin}/booked?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book?booking=cancelled`,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (error) {
    console.error("Error creating inspection checkout session:", error)
    return NextResponse.json(
      { error: "We couldn't open the payment page. Please try again, or WhatsApp Henry and he'll book it in for you." },
      { status: 500 },
    )
  }
}
