import type { Guide } from "./types"

export const inspectionCost: Guide = {
  slug: "pre-purchase-car-inspection-cost-uk",
  question: "How much does a pre-purchase car inspection cost in the UK?",
  title: "Pre-Purchase Car Inspection Cost UK (October 2026 Prices)",
  description:
    "Every national provider's pre-purchase inspection price as published on 19 October 2026: AA, RAC, ClickMechanic, CarExamer, WhoCanFixMyCar and independents, what the 'from' means, what is left out, and what £199.99 buys.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "Between about £80 and £300 in October 2026, depending on who does it and how much they look at. The AA charges £110 for a Basic inspection and from £199 to £279 for its fuller packages; the RAC from £132 to £290; ClickMechanic from £79 to £137 through its marketplace mechanics. Most of those are starting prices that rise with the car's age and value, and most do not include a history check. Our Standard inspection is £199.99 and our Premium £249.99, the same for every car, with the history check included.",
  blocks: [
    { type: "h2", text: "What the national services charge" },
    {
      type: "table",
      caption: "Prices as shown on each provider's website on 19 October 2026, before a registration is entered",
      head: ["Provider", "Entry package", "Middle package", "Top package", "History check"],
      rows: [
        ["The AA", "Basic £110 fixed, up to 99 points, petrol and diesel only", "Comprehensive from £199, up to 214 points, 10-mile road test", "Advanced from £279, up to 221 points, OBD scan, brake fluid test", "Not included at any level"],
        ["RAC", "Basic from £132, 3-mile road test, written report only", "Comprehensive from £225, 307 points, 10-mile road test", "Advanced from £290, 307 points plus fault codes, 20-mile road test", "Paid add-on"],
        ["ClickMechanic", "Basic from £79, 86 points, no bodywork", "Standard from £95, 136 points", "Premium from £137, 185 points, plug-in diagnostic", "Not included"],
        ["CarExamer (franchise network)", "Basic £142.99, 100+ checks", "Standard £189.99, 200+ checks", "Premium £256.99, 300+ checks", "Free basic data only"],
        ["WhoCanFixMyCar", "Quotes from local garages; the site's own average is £101.40", "", "", "Not included"],
        ["Pre-Purchase Inspections UK (London)", "From £95 plus VAT", "From £120 plus VAT, 105 points", "From £150 plus VAT, 143 points, diagnostics", "Not stated"],
        ["Pro Vehicle Inspections", "Standard £199.99, 160 points, full diagnostic scan, road test", "Premium £249.99, 260 points, paint depth, extended road test, salvage and seller checks", "EV battery health report £99.99 alone or £49.99 added", "Included in both packages"],
      ],
    },
    {
      type: "p",
      text: "The AA's footnote explains its \"from\" prices: at least 10% of customers paid that price or less for the package between July and August 2026, so most paid more. The RAC says its prices depend on the age, value and model of the vehicle. A six-year-old premium German car will not be inspected for the headline figure by either.",
    },
    { type: "h2", text: "What moves the price" },
    {
      type: "ul",
      items: [
        "Age, value and engine size, on the AA and RAC. Older, dearer and faster cars cost more to inspect.",
        "Who turns up. The AA's terms, reissued in October 2026, say inspections are carried out by its engineers or by a third party working on its behalf. ClickMechanic and WhoCanFixMyCar are marketplaces, so the price depends on which local mechanic bids. We charge one price because one person does every inspection.",
        "What is included. A history check adds £10 to £20 if you buy it separately. A diagnostic scan is only in the AA's and RAC's top packages. Photos are an £18 add-on on the RAC Comprehensive.",
        "Travel. Independent inspectors often charge per mile beyond a radius. Our price covers the whole service area from London to Birmingham and Norwich, with no travel charge.",
        "Cancellation. The AA charges £15 for a same-day cancellation.",
      ],
    },
    { type: "h2", text: "What is usually left out" },
    {
      type: "ul",
      items: [
        "A history check, on almost every national service. Outstanding finance, write-off status and mileage records are a separate purchase.",
        "Dismantling and compression tests. Every provider's inspection, ours included, is visual and diagnostic; nobody takes the engine apart on a forecourt.",
        "A traction battery State of Health test on an electric car. No national provider offered one when we checked. Ours is £99.99 on its own or £49.99 with an inspection.",
        "Cars the provider will not look at. The AA excludes recorded write-offs, American imports and cars over 20 years old; the RAC's Basic excludes cars over 10 years or 120,000 miles, hybrids, 4x4s and convertibles; ClickMechanic excludes write-offs and imports.",
      ],
    },
    { type: "h2", text: "What the inspection saves" },
    {
      type: "p",
      text: "CarExamer's index of 2,767 inspections found that 97.4% of cars inspected in 2026 had at least one item graded poor or fair. ClickMechanic says one in six cars needs more than £500 in repairs. Our own October 2026 diary included an imported V8 with £5,000 to £8,500 of problems behind a dealer's assurance that it had none, a small hatchback whose history check turned up a Cat N write-off and whose scan found misfire codes, and a performance BMW whose clean generic scan hid eight intermittent fault codes. Against those, £199.99 is a rounding error.",
    },
    { type: "h2", text: "What £199.99 and £249.99 buy here" },
    {
      type: "p",
      text: "The [Standard inspection](/book) is 160 points: the engine, gearbox, brakes, steering, suspension and tyres, a full diagnostic scan of every module, the history check, a road test, and a same-day report with video and photos. The [Premium](/book?package=premium) is 260 points and adds paint depth readings, a deeper look at the bodywork, an extended road test, repair cost guidance, seller and V5C checks and searches of salvage auctions and previous adverts. Both take place at the car, wherever it is for sale.",
    },
    {
      type: "note",
      text: "Prices on this page are what each provider published on 19 October 2026. They change; the links at the bottom go to the live pages. Ours have not changed since launch and apply to every car, everywhere we work.",
    },
  ],
  faqs: [
    {
      question: "Why are AA and RAC prices quoted as \"from\"?",
      answer:
        "Because the final price depends on the car. Both confirm it when you enter the registration. The AA states that at least one in ten customers paid the quoted figure or less, which means most paid more. Our prices are fixed before you book.",
    },
    {
      question: "Is a cheaper inspection a false economy?",
      answer:
        "It depends what is left out. A £79 inspection with no bodywork check, no history check and no diagnostic scan can miss the three things that cost the most: a hidden accident repair, outstanding finance and a cleared fault code. Compare what is included, not the headline.",
    },
    {
      question: "Do you charge more for prestige or performance cars?",
      answer:
        "No. A Standard inspection is £199.99 and a Premium £249.99 whether the car is a Corsa or an M4. We do suggest the Premium for cars where paint and bodywork matter most.",
    },
    {
      question: "Is there a travel charge?",
      answer:
        "No. The price covers London, Essex, Hertfordshire, East Anglia and the Midlands as far as Birmingham, Nottingham and Norwich. Our area pages list the towns.",
    },
  ],
  related: ["aa-vs-rac-vs-independent-car-inspection", "is-a-pre-purchase-car-inspection-worth-it", "what-does-a-pre-purchase-car-inspection-check"],
  areas: ["vehicle-inspection-london", "pre-purchase-car-inspection-essex", "vehicle-inspection-birmingham", "vehicle-inspection-cambridge"],
  sources: [
    { label: "The AA Vehicle Inspection", href: "https://www.theaa.com/vehicle-inspection" },
    { label: "The AA vehicle inspection terms and conditions, October 2026", href: "https://www.theaa.com/media/the-aa/pdf/vehicle-inspection/aa-vehicle-inspections-terms-and-conditions-october-2026.pdf" },
    { label: "RAC Vehicle Inspections", href: "https://www.rac.co.uk/buying-a-car/vehicle-inspections" },
    { label: "ClickMechanic pre-purchase inspection", href: "https://www.clickmechanic.com/pre-purchase-inspection" },
    { label: "CarExamer: compare car inspections", href: "https://carexamer.com/compare-car-inspections" },
    { label: "CarExamer Car Market Health Index", href: "https://carexamer.com/services/car-market-health-index" },
    { label: "WhoCanFixMyCar pre-purchase inspection", href: "https://www.whocanfixmycar.com/pre-purchase-car-inspection" },
    { label: "Pre-Purchase Inspections UK", href: "https://www.prepurchaseinspections.co.uk" },
  ],
}
