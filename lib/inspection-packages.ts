import type { PackageKey } from "@/lib/inspection-slots"

export type InspectionPackage = {
  key: PackageKey
  name: string
  // How the booking bar names it: "You've selected a standard inspection".
  label: string
  price: string
  amount: number
  points: string
  strapline: string
  features: string[]
  popular?: boolean
  // Which tab it sits under: buying a car, or a fault on a car you already own, after garage work or a dealer sale.
  group: InspectionGroup
}

export type InspectionGroup = "pre-purchase" | "mechanical"

export const INSPECTION_GROUPS: { key: InspectionGroup; name: string }[] = [
  { key: "pre-purchase", name: "Pre-purchase inspections" },
  { key: "mechanical", name: "Mechanical inspection" },
]

export const INSPECTION_PACKAGES: InspectionPackage[] = [
  {
    key: "standard",
    name: "Standard Inspection",
    label: "a standard inspection",
    price: "£249.99",
    amount: 249.99,
    points: "160-point inspection",
    strapline: "In-depth mechanical findings and buying guidance",
    group: "pre-purchase",
    features: ["History check: finance, write-off, stolen and mileage", "Full diagnostic scan and road test", "Engine / drivetrain, brakes, steering and suspension", "Video review, photos and same-day report", "Personal call and buying guidance"],
  },
  {
    key: "premium",
    name: "Premium Inspection",
    label: "a premium inspection",
    price: "£299.99",
    amount: 299.99,
    points: "260-point inspection",
    strapline: "Deeper inspection and vehicle and seller research",
    features: ["Everything in Standard, including history check and video review", "Paint depth, underbody and deeper bodywork checks", "Auction, salvage and previous advert searches", "Repair-cost guidance and action plan", "Extended road test", "Checks for signs of undisclosed motor trading"],
    popular: true,
    group: "pre-purchase",
  },
  {
    key: "ev",
    name: "EV Battery Health Check",
    label: "an EV battery health check",
    price: "£149.99",
    amount: 149.99,
    points: "Battery check only",
    strapline: "The battery State of Health test and report on their own, without an inspection",
    features: ["CARA Approved® Autel EV Battery Health Test", "State of Health (SOH) result", "Customer battery health report", "Fully electric and plug-in hybrid cars"],
    group: "pre-purchase",
  },
  {
    key: "mechanical",
    name: "Mechanical Inspection",
    label: "a mechanical inspection",
    price: "£499.99",
    amount: 499.99,
    points: "Independent fault report",
    strapline: "For a fault after garage work or after buying from a dealer, with the likely cause",
    features: ["Independent and unbiased: we work for neither side", "Full Autel diagnostic scan with live data", "Written report on the findings and likely cause", "Signed statement of truth for a Small Claims case", "Photos and video of the fault and any work done", "The engine stays sealed, so the evidence is undisturbed"],
    group: "mechanical",
  },
]
