import type { Guide } from "./types"

export const hpiVsInspection: Guide = {
  slug: "hpi-check-vs-car-inspection",
  question: "HPI check vs car inspection: do you need both?",
  title: "HPI Check vs Car Inspection: Do You Need Both?",
  description:
    "What a history check covers and what it cannot see, 2026 prices for HPI, AA, RAC and Total Car Check, which inspection services include one, and a real example of a clean scan hiding eight fault codes.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "You need both, because they answer different questions. A history check (£9.99 to £19.99 in October 2026) tells you whether the car has outstanding finance, a write-off marker, a theft record or a mileage discrepancy. An inspection tells you what condition the car is actually in. Most national inspection services do not include a history check; ours includes one in every package.",
  blocks: [
    { type: "h2", text: "What a history check covers" },
    {
      type: "ul",
      items: [
        "Outstanding finance. HPI says one in three cars it checks has an active finance agreement; the RAC puts it at 24%. If the finance is not settled, the lender owns the car, not you.",
        "Insurance write-off category and date.",
        "Stolen vehicle markers from the Police National Computer.",
        "Mileage history from MOT tests and other records, flagging a clock that has gone backwards. HPI says one in eleven cars it checks has a mileage discrepancy.",
        "Plate changes, colour changes, number of owners, import and export markers, and whether the car has been scrapped.",
        "A data guarantee, typically up to £30,000, if the check misses something that was on the record.",
      ],
    },
    {
      type: "table",
      caption: "History check prices, checked 19 October 2026",
      head: ["Provider", "Single check", "Multi-check", "Guarantee"],
      rows: [
        ["HPI Check", "£19.99 (Basic £9.99)", "3 for £29.99", "Up to £30,000"],
        ["AA Car History Check (run by HPI)", "£14.99", "5 for £6 each", "£30,000"],
        ["RAC Vehicle History Check", "£14.99 (Basic £9.98)", "3 for £29.97", "Up to £30,000, valid 2 years"],
        ["Total Car Check", "Gold £9.99 (Silver £3.99)", "3 for £14.99, 5 for £19.99", "£30,000 on Gold"],
      ],
    },
    { type: "h2", text: "What a history check cannot see" },
    {
      type: "ul",
      items: [
        "The condition of the car. A clean history does not mean clean brakes, a dry gearbox or an honest paint job.",
        "Accidents that were never claimed on insurance. A car repaired privately after a crash has no write-off marker and nothing on the record.",
        "Fault codes, including ones that were cleared the morning you arrive.",
        "Body filler, overspray, mismatched panels and a bent subframe.",
        "Service history, or the lack of it.",
        "Anything that happened abroad. On an imported car the UK record starts at UK registration, so a foreign write-off, finance agreement or mileage change never shows.",
        "Whether the dealer is telling the truth about the car.",
      ],
    },
    { type: "h2", text: "What an inspection covers" },
    {
      type: "p",
      text: "A pre-purchase inspection looks at the car itself: the mechanical condition, the bodywork and paint, the interior and electrics, the tyres and brakes, a diagnostic scan of every module, and a road test. Ours runs to 160 points in the Standard package and 260 in the Premium. [What a pre-purchase inspection checks](/guides/what-does-a-pre-purchase-car-inspection-check) goes through it item by item.",
    },
    { type: "h2", text: "Which inspection services include a history check" },
    {
      type: "table",
      caption: "Checked on each provider's website or terms, 19 October 2026",
      head: ["Service", "History check included?"],
      rows: [
        ["The AA Vehicle Inspection", "No. The terms exclude vehicle data checks at every level."],
        ["RAC Vehicle Inspections", "No. Sold as an optional paid add-on."],
        ["ClickMechanic", "No. The page states inspections do not include any vehicle history checks."],
        ["WhoCanFixMyCar", "No."],
        ["CarExamer", "Free basic vehicle data only."],
        ["Pro Vehicle Inspections", "Yes, in both the Standard (£149.99) and Premium (£199.99) packages. The Premium adds salvage auction, previous advert and seller checks on top."],
      ],
    },
    { type: "h2", text: "Two real examples" },
    {
      type: "p",
      text: "A BMW M4 we inspected at a franchised dealer in October 2026 had a clean history and a generic OBD scan showing zero fault codes, with 170 km driven since the codes were last cleared. The full scan with the Autel found eight intermittent codes across seven modules, from the engine's low-pressure fuel system to the differential lock and the body module. None was a reason not to buy the car, and the buyer had the facts and a negotiating position instead of a clean sheet. A history check would have shown none of it.",
    },
    {
      type: "p",
      text: "The same month, a small Audi hatchback's history check showed it had been written off as a Cat N and sold through a salvage auction, which the inspection then followed up with a scan that found misfire codes on one cylinder. The history check found the past; the inspection found the present. Each on its own would have told half the story.",
    },
    { type: "h2", text: "The order to do things in" },
    {
      type: "ol",
      items: [
        "Run a history check on the registration before you travel. It costs £10 to £20 and takes a minute. If it shows finance the seller cannot settle, a theft marker or a mileage that goes backwards, stop there.",
        "If the history is clean, or the write-off marker is priced in and you still want the car, [book the inspection](/book). We come to the car, and the history check is repeated as part of the report.",
        "Use the report to negotiate or to walk away. A clean history and a clean inspection together are as close to certainty as a used car gets.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is an HPI check included in your inspection?",
      answer:
        "A full vehicle history check is included in both packages, covering finance, write-off status, theft, mileage and plate changes. The Premium package adds searches of salvage auctions and previous adverts and checks on the seller.",
    },
    {
      question: "Is a free history check enough?",
      answer:
        "Free checks show MOT history, tax and basic DVLA data, which is useful for mileage and advisories. They do not show finance, write-off category or theft, which are the three things that can cost you the car. Pay for a full check.",
    },
    {
      question: "Can a history check be wrong?",
      answer:
        "It can only report what was recorded. Private repairs, foreign history and recent events not yet on the databases are invisible to it. The data guarantee covers errors in the record, not things that were never recorded.",
    },
    {
      question: "Does a dealer's own history check count?",
      answer:
        "Ask to see it, with the date, but run your own. It costs £10 to £20 and removes any question about what the dealer's check covered or when it was done.",
    },
  ],
  related: ["cat-s-and-cat-n-write-offs", "what-does-a-pre-purchase-car-inspection-check", "pre-purchase-car-inspection-cost-uk"],
  areas: ["vehicle-inspection-london", "vehicle-inspection-hertfordshire", "pre-purchase-car-inspection-essex"],
  sources: [
    { label: "HPI Check", href: "https://www.home.hpicheck.com/" },
    { label: "AA Car History Check", href: "https://www.theaa.com/vehicle-check" },
    { label: "RAC Vehicle History Check", href: "https://www.rac.co.uk/buying-a-car/rac-car-data-check/" },
    { label: "Total Car Check prices", href: "https://totalcarcheck.co.uk/Prices" },
    { label: "The AA vehicle inspection terms and conditions, October 2026", href: "https://www.theaa.com/media/the-aa/pdf/vehicle-inspection/aa-vehicle-inspections-terms-and-conditions-october-2026.pdf" },
    { label: "RAC vehicle inspections FAQ", href: "https://www.rac.co.uk/buying-a-car/vehicle-inspections/faq" },
    { label: "ClickMechanic pre-purchase inspection", href: "https://www.clickmechanic.com/pre-purchase-inspection" },
  ],
}
