import type { Guide } from "./types"

export const writeOffs: Guide = {
  slug: "cat-s-and-cat-n-write-offs",
  question: "Should you buy a Cat S or Cat N write-off?",
  title: "Cat S and Cat N Write-Offs: Should You Buy One?",
  description:
    "What Cat S and Cat N mean, how often write-offs turn up in used car sales, what a cheap repair hides, how it affects price and insurance, and what we check before you buy one.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "You can, at the right price, once the repair has been checked by someone who was not paid to do it. Cat N means the damage was not structural; Cat S means it was, and the repair has to be looked at properly. Either marker stays on the car for life, cuts its value and can raise its insurance. An RAC study of more than 32,000 used car sales found 14.2% were insurance write-offs, and the marker is not always in the advert.",
  blocks: [
    { type: "h2", text: "What the categories mean" },
    {
      type: "table",
      caption: "Insurance write-off categories in Great Britain since 1 October 2017",
      head: ["Category", "Meaning", "Can it go back on the road?"],
      rows: [
        ["Cat A", "Scrap. The whole car must be crushed, including parts.", "No"],
        ["Cat B", "Break. The body shell must be crushed; parts can be salvaged.", "No"],
        ["Cat S", "Structural damage (chassis, crumple zones, pillars) that the insurer chose not to repair. Can be repaired and re-registered; the V5C is marked.", "Yes, after repair"],
        ["Cat N", "Non-structural damage: panels, bumpers, lights, interior, electrics, often cosmetic. Repairable; the marker stays on the record.", "Yes, after repair"],
        ["Cat C and Cat D", "The categories used before October 2017, based on repair cost rather than damage type. C roughly matches S, D roughly matches N, but a Cat D car can have had structural work.", "Yes"],
      ],
    },
    {
      type: "p",
      text: "The category describes what the insurer decided, not how well the car was fixed. A Cat N repaired by a good bodyshop can be a better car than a never-crashed one with a careless owner. A Cat N repaired in a yard with filler and a rattle can is the opposite, and from ten feet they look the same.",
    },
    { type: "h2", text: "How often write-offs turn up" },
    {
      type: "p",
      text: "More often than buyers expect. The RAC's 2019 study of 32,000 used car sales found 14.2% had been insurance write-offs. HPI says one in three cars run through its check has something to hide. Write-offs sell through salvage auctions to repairers who put them back on the market, sometimes with the marker in the advert and sometimes not.",
    },
    {
      type: "p",
      text: "A Standard inspection we did in October 2026 on a small Audi hatchback is typical. The history check showed it had been written off as a Cat N and sold through a salvage auction. The diagnostic scan then found a string of misfire codes on one cylinder, the front brake pads were very low, and the engine ticked once warm. The buyer had the facts before the money changed hands, for £149.99.",
    },
    { type: "h2", text: "What a cheap repair hides" },
    {
      type: "ul",
      items: [
        "Filler under fresh paint. A paint depth gauge shows it in seconds: a factory panel reads around 100 to 150 microns, a filled one can read five or ten times that. On an imported V8 saloon we inspected this month, two panels read consistent with a large amount of body filler, and the rear bumper had been replaced and badly painted with its parking sensors no longer working.",
        "Airbags and seatbelt pretensioners not replaced, or replaced with second-hand units. The warning light can be switched off while the fault stays in the module.",
        "Parking sensors, cameras and radar that were never recalibrated after a bumper change.",
        "Water damage on a car written off in a flood: corrosion in connectors, damp under carpets, and electrical faults that arrive months later.",
        "Panel gaps, mismatched paint, overspray on seals and glass, and new bolts on old brackets.",
      ],
    },
    { type: "h2", text: "What a Cat S needs" },
    {
      type: "p",
      text: "A Cat S has had structural damage, so the question is who repaired it and how. The right answer involves a body jig, measured to the manufacturer's data, and an invoice to prove it. There is no legal requirement for an independent engineer's inspection before a Cat S returns to the road, which means it falls to the buyer. In a Premium inspection we measure paint on every panel, look at the underside, the chassis legs, the inner wings and the seams, and we search the auction and salvage records, including Copart, to see the damage photographs from before the repair.",
    },
    { type: "h2", text: "Price, insurance and selling it on" },
    {
      type: "ul",
      items: [
        "Price. A recorded write-off should sell for well below a clean equivalent, and should stay there when you sell it. If the discount is small, the seller is pricing it as if the marker were not there.",
        "Insurance. Some insurers decline Cat S cars, some load the premium, and most will pay out less in a total loss because the car was worth less. Get a quote on the registration before you buy.",
        "Finance. Some lenders will not finance a recorded write-off, which shrinks your pool of buyers later.",
        "Warranty. Manufacturer warranties can be voided by a write-off, and some dealer warranties exclude them.",
      ],
    },
    { type: "h2", text: "What we check on a write-off" },
    {
      type: "ul",
      items: [
        "The history check, included in both packages, for the category, the date and any finance, theft or mileage flags.",
        "In a Premium inspection, the salvage auction and previous advert searches, which usually show photographs of the damage before repair.",
        "Paint depth on every panel and the fit of every panel, light and bumper.",
        "The underside, chassis legs, inner wings and the welds and seams a structural repair touches.",
        "The fault memory in every module, especially the airbag, body and driver assistance systems, and the date any codes were cleared.",
        "A road test for tracking, pulling, noises and whether the car drives straight.",
      ],
    },
    {
      type: "note",
      text: "The AA will not inspect a recorded write-off at all, the RAC excludes them from its Basic package, and ClickMechanic turns them away. We inspect them, because they are exactly the cars that need it. [Book a Premium inspection](/book?package=premium) for a Cat S, or [a Standard](/book) for a cosmetic Cat N.",
    },
  ],
  faqs: [
    {
      question: "Is a Cat N car safe to drive?",
      answer:
        "By definition the damage was not structural, so a properly repaired Cat N is as safe as any other car. The risk is in the repair quality and in the systems that were not reset or replaced: airbags, sensors and electrics. That is what an inspection checks.",
    },
    {
      question: "How much less should I pay for a Cat S or Cat N?",
      answer:
        "Enough to reflect that it will always be worth less and may be harder to insure and sell. There is no fixed percentage; compare it with clean cars of the same age and mileage and remember the discount should still be there when you come to sell.",
    },
    {
      question: "Can a write-off marker be removed from a car's record?",
      answer:
        "No. The category stays on the vehicle's record for life. A car advertised as having had the marker removed is either misdescribed or has been cloned onto another identity, which is a reason to walk away.",
    },
    {
      question: "Do you inspect Cat S cars?",
      answer:
        "Yes, and we recommend the Premium package for one, because the paint depth readings, the underside check and the salvage auction searches are where a structural repair is judged.",
    },
  ],
  related: ["hpi-check-vs-car-inspection", "is-a-pre-purchase-car-inspection-worth-it", "imported-cars-what-to-check-before-you-buy"],
  areas: ["pre-purchase-car-inspection-essex", "vehicle-inspection-london", "vehicle-inspection-birmingham"],
  sources: [
    { label: "RAC: vehicle history check (14.2% write-off study)", href: "https://www.rac.co.uk/buying-a-car/rac-car-data-check/" },
    { label: "HPI Check: one in three cars has something to hide", href: "https://www.home.hpicheck.com/" },
    { label: "GOV.UK: written-off vehicles", href: "https://www.gov.uk/scrapped-and-written-off-vehicles" },
    { label: "The AA vehicle inspection terms and conditions, October 2026", href: "https://www.theaa.com/media/the-aa/pdf/vehicle-inspection/aa-vehicle-inspections-terms-and-conditions-october-2026.pdf" },
  ],
}
