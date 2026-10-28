import type { Guide } from "./types"

export const aaVsRac: Guide = {
  slug: "aa-vs-rac-vs-independent-car-inspection",
  question: "AA vs RAC vs independent: which car inspection should you book?",
  title: "AA vs RAC vs Independent Car Inspection",
  description:
    "An honest comparison of the AA, RAC and an independent inspector on price, points, road test, history check, who turns up, turnaround, EV battery testing and the cars each will not inspect, from their October 2026 terms.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "The AA and RAC give you a national name, a booking line and coverage almost anywhere in Great Britain, at from £110 to £290 depending on the car, with no history check and a report in two to four working days from the AA or by 7pm the same day from the RAC. An independent gives you one named inspector, a fixed price, usually a history check and a diagnostic scan included, and a report the same day. For a car near us, the independent is the better inspection; for a car in Aberdeen, book the AA or RAC.",
  blocks: [
    { type: "h2", text: "Side by side" },
    {
      type: "table",
      caption: "From each provider's website and terms, 19 October 2026",
      head: ["", "The AA", "RAC", "Pro Vehicle Inspections"],
      rows: [
        ["Price", "Basic £110; Comprehensive from £199; Advanced from £279. Rises with the car's age and value.", "Basic from £132; Comprehensive from £225; Advanced from £290. Depends on age, value and model.", "Standard £199.99; Premium £249.99. Same for every car."],
        ["Points checked", "Up to 99, 214 or 221", "Basic not stated; Comprehensive and Advanced 307", "160 or 260"],
        ["Road test", "Short on Basic; up to 10 miles on the others", "Up to 3, 10 or 20 miles", "Every inspection; extended in Premium"],
        ["Diagnostic scan", "Advanced only (OBD scan)", "Advanced only (fault codes)", "Full scan of every module in both packages, with VCDS on Volkswagen group cars"],
        ["History check", "Not included; the terms exclude vehicle data checks", "Optional paid add-on", "Included in both packages"],
        ["Paint depth", "Not stated", "Not stated", "Premium"],
        ["EV battery State of Health", "Not offered. Advanced lists a Digital Battery Test without saying which battery.", "Not offered", "Yes: CARA Approved Autel test, £149.99 alone or £49.99 added"],
        ["Who turns up", "An AA engineer or a third party working on its behalf (terms, clause 3.1)", "The terms do not say whether inspectors are RAC employees", "Henry, every time"],
        ["When", "Aims to inspect within 2 to 4 working days of booking; weekdays 8:30 to 5", "Usually within 48 hours; verbal report by 7pm that day", "Usually within a day or two; report the same day"],
        ["Report", "Emailed; engineer talks it through by phone", "Emailed; verbal summary on Comprehensive and Advanced, none on Basic", "Same-day written report with video and photos, and a call"],
        ["Coverage", "England, most of Scotland and Wales; not Northern Ireland or islands", "Great Britain", "London, Essex, Hertfordshire, East Anglia and the Midlands"],
      ],
    },
    { type: "h2", text: "Cars they will not inspect" },
    {
      type: "ul",
      items: [
        "The AA: recorded write-offs, cars over 20 years old, American imports, kit cars, limousines, London taxis, supercars and hypercars. Basic is petrol and diesel only.",
        "The RAC Basic: cars over 10 years old or 120,000 miles, imports, convertibles, write-offs, hybrids, vans, 4x4s, LPG, modified cars, prestige cars and anything with more than five seats. Cars over 15 years old and prestige or performance cars need a ramp, with the cost passed on.",
        "Us: none of the above. We inspect write-offs, imports, EVs, hybrids, performance cars and old cars at the same price. The only limits are the service area and private land for the inspection itself.",
      ],
    },
    { type: "h2", text: "What the AA and RAC do better" },
    {
      type: "ul",
      items: [
        "Coverage. If the car is in Carlisle, Cardiff or Cornwall, book one of them. We work from Essex and cover as far as Birmingham, Nottingham and Norwich.",
        "Scale. They inspect thousands of cars a year and have a complaints process, a brand and insurance behind the report.",
        "Member discounts. AA breakdown members get 10% off; the RAC offers a discount with a membership number.",
      ],
    },
    { type: "h2", text: "What an independent does better" },
    {
      type: "ul",
      items: [
        "The same person inspects, writes and calls. You know who is coming, and the report is written by the person who drove the car.",
        "Fixed prices. No \"from\", no uplift for a BMW over a Ford.",
        "The things the big names leave out: the history check, the full diagnostic scan in every package, paint depth, the salvage auction and previous advert searches, and on electric cars the battery test nobody else offers.",
        "Speed. The AA aims for two to four working days. A seller with other buyers waiting will not hold a car that long.",
        "The cars the big names refuse: write-offs, imports, old cars, hybrids on the RAC Basic. Those are the cars most in need of a look.",
      ],
    },
    { type: "h2", text: "Read the exclusions before you choose" },
    {
      type: "p",
      text: "Every inspection, ours included, is a visual and diagnostic examination without dismantling. The AA's terms add that it does not check vehicle electrics and electronics that would require specific diagnostic equipment outside the Advanced package, does not check mileage accuracy and does not do vehicle data checks. The RAC's terms accept no liability for defects not reasonably apparent on cars over 10 years old, require daylight and good weather, and warn that cleared fault codes may not show. Ours is in [the sample report](/sample-report) and [the terms](/terms-of-service), in plain English.",
    },
    {
      type: "note",
      text: "If the car is within our area, [book a Standard inspection](/book) for £199.99 or [a Premium](/book?package=premium) for £249.99. If it is not, we would rather you booked the AA or RAC than nobody.",
    },
  ],
  faqs: [
    {
      question: "Is the AA or RAC inspection better?",
      answer:
        "They are close. The RAC's Comprehensive checks more points (307 against 214) and reports verbally the same day; the AA's Basic is cheaper at a fixed £110 but petrol and diesel only, with no diagnostic scan below Advanced. Neither includes a history check. For most buyers the differences between them are smaller than the difference between either and an independent who includes the scan and history check.",
    },
    {
      question: "Does the AA use its own engineers?",
      answer:
        "Its October 2026 terms say an inspection is carried out by one of its engineers or a third party working on its behalf. The AA does not say how often it is the latter.",
    },
    {
      question: "Why do the AA and RAC not include a history check?",
      answer:
        "They sell it separately. The AA's inspection terms exclude vehicle data checks altogether and its history check is a £14.99 product; the RAC offers its check as a paid add-on. Ours is in every inspection because the two halves belong together.",
    },
    {
      question: "Can an independent inspector be trusted as much as the AA?",
      answer:
        "Judge by the report, not the badge. Ask any inspector for a sample report, how long they have been doing it, what tools they bring and who writes the report. Ours is on the site, with the Autel and VCDS scans and the paint readings shown.",
    },
  ],
  related: ["pre-purchase-car-inspection-cost-uk", "is-a-pre-purchase-car-inspection-worth-it", "what-does-a-pre-purchase-car-inspection-check"],
  areas: ["vehicle-inspection-london", "pre-purchase-car-inspection-essex", "vehicle-inspection-hertfordshire", "vehicle-inspection-cambridgeshire"],
  sources: [
    { label: "The AA Vehicle Inspection", href: "https://www.theaa.com/vehicle-inspection" },
    { label: "The AA vehicle inspection terms and conditions, October 2026", href: "https://www.theaa.com/media/the-aa/pdf/vehicle-inspection/aa-vehicle-inspections-terms-and-conditions-october-2026.pdf" },
    { label: "RAC Vehicle Inspections", href: "https://www.rac.co.uk/buying-a-car/vehicle-inspections" },
    { label: "RAC basic inspection exclusions", href: "https://www.rac.co.uk/buying-a-car/vehicle-inspections/basic-inspection" },
    { label: "RAC vehicle inspections terms and conditions", href: "https://assets.contentstack.io/v3/assets/bltf298597f74081431/blted4c2fe7e46f05d8/vehicle-inspections-ts-cs.pdf" },
    { label: "RAC vehicle inspections FAQ", href: "https://www.rac.co.uk/buying-a-car/vehicle-inspections/faq" },
  ],
}
