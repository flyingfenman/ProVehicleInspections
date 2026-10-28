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
  // Which tab it sits under: buying a car, or a fault on a car you already own after garage work.
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
    price: "£149.99",
    amount: 149.99,
    points: "160-point inspection",
    strapline: "In-depth mechanical findings and buying guidance",
    group: "pre-purchase",
    features: ["History check: finance, write-off, stolen and mileage", "Full diagnostic scan and road test", "Engine / drivetrain, brakes, steering and suspension", "Video review, photos and same-day report", "Personal call and buying guidance"],
  },
  {
    key: "premium",
    name: "Premium Inspection",
    label: "a premium inspection",
    price: "£199.99",
    amount: 199.99,
    points: "260-point inspection",
    strapline: "Deeper inspection and vehicle and seller research",
    features: ["Everything in Standard, including history check and video review", "Paint-depth readings and deeper bodywork checks", "Auction, salvage and previous advert searches", "Repair-cost guidance and action plan", "Extended road test", "Checks for signs of undisclosed motor trading"],
    popular: true,
    group: "pre-purchase",
  },
  {
    key: "ev",
    name: "EV Battery Health Check",
    label: "an EV battery health check",
    price: "£99.99",
    amount: 99.99,
    points: "Battery check only",
    strapline: "The battery State of Health test and report on their own, without an inspection",
    features: ["CARA Approved® Autel EV Battery Health Test", "State of Health (SOH) result", "Customer battery health report", "Fully electric and plug-in hybrid cars"],
    group: "pre-purchase",
  },
  {
    key: "mechanical",
    name: "Mechanical Inspection",
    label: "a mechanical inspection",
    price: "£399.99",
    amount: 399.99,
    points: "Independent fault report",
    strapline: "Something gone wrong after garage work? An independent, evidence-based report on the fault and its likely cause",
    features: ["Full Autel diagnostic scan with live data", "Photos and video of the work and the fault", "Written report on the findings and likely cause", "Signed statement of truth for a Small Claims case", "Non-invasive: nothing is taken apart"],
    group: "mechanical",
  },
]
