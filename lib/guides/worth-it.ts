import type { Guide } from "./types"

export const worthIt: Guide = {
  slug: "is-a-pre-purchase-car-inspection-worth-it",
  question: "Is a pre-purchase car inspection worth it?",
  title: "Is a Pre-Purchase Car Inspection Worth It?",
  description:
    "The arithmetic on a £149.99 inspection against what inspections find, with the 2026 data and three real cases from October 2026, when it is most worth it, and the few times it is not.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "For most used cars costing more than a couple of thousand pounds, yes. An inspection costs £149.99 to £199.99 here, and from about £80 to £290 nationally, while the problems it finds routinely run to thousands. CarExamer's index found 97.4% of cars inspected in 2026 had at least one item graded poor or fair. It is most worth it on an import, a write-off, a performance car, an electric car or a private sale, and least worth it on a very cheap car you already expect to have faults.",
  blocks: [
    { type: "h2", text: "The arithmetic" },
    {
      type: "p",
      text: "Three cars from our own diary in October 2026. An imported American V8 saloon, sold by a dealer who said by phone that it had no issues: cleared fault memory, body filler on two panels, a badly repaired rear bumper with dead parking sensors, a flat battery, discoloured coolant, no service history, and the registration paperwork still to do. We put the repairs at £5,000 to £8,500 and did not recommend the purchase. A small Audi hatchback: the history check showed a Cat N write-off sold through a salvage auction, and the scan found misfire codes on one cylinder, with the front brake pads nearly gone. A BMW M4 at a franchised dealer: a clean history, a generic scan showing zero codes, and a full scan showing eight intermittent faults across seven modules. That car was still a good buy, and the buyer went to the table with a list.",
    },
    {
      type: "p",
      text: "Two of the three inspections cost £149.99 and one £199.99. Even on the good car, the report paid for itself in the negotiation. On the bad one it saved the price of a decent used car.",
    },
    { type: "h2", text: "What the data says" },
    {
      type: "ul",
      items: [
        "CarExamer's Car Market Health Index, from 2,767 inspections and 392,822 individual checks: 97.4% of cars inspected in 2026 had at least one item graded poor or fair, and the weighted rate of adverse findings has risen from 5.4% in 2019 to 8.5% in 2026. The top problem areas were bodywork (24.6%), the diagnostic scan (18.8%), wheels and tyres (17.3%) and the underbody (13.7%).",
        "ClickMechanic says one in six cars it inspects needs more than £500 of repairs.",
        "HPI says one in three cars it checks has something to hide, one in three has outstanding finance, and one in eleven has a mileage discrepancy.",
        "The RAC's study of 32,000 used car sales found 14.2% were insurance write-offs.",
        "The Motor Ombudsman logged more than 100,000 contacts under its Vehicle Sales Code in 2025, a record, most of them about the quality of used cars at the point of sale.",
      ],
    },
    { type: "h2", text: "When it is most worth it" },
    {
      type: "ul",
      items: [
        "Any car where a £2,000 repair would hurt. On a £10,000 car the inspection is 1.5% of the price.",
        "A private sale. You have no Consumer Rights Act protection, so the inspection is the only protection you get. [Dealer vs private seller](/guides/buying-a-used-car-from-a-dealer-vs-private-seller) explains the difference.",
        "An import, a recorded write-off or a car with a thin history. The national services often refuse these; they are the cars that most need a look.",
        "A performance or prestige car, where a single component can cost what a small car costs, and where paint depth readings tell you whether it has been crashed.",
        "An electric car, where the battery is the dearest part and only a test tells you its state. The [battery health check](/guides/how-to-check-ev-battery-health-before-you-buy) is £99.99.",
        "A car you are buying at a distance, unseen, or in a hurry because other buyers are waiting.",
        "Any car where the seller has told you by phone that there is nothing wrong with it.",
      ],
    },
    { type: "h2", text: "When it is less worth it" },
    {
      type: "ul",
      items: [
        "A very cheap car, under about £2,000, where you have already priced in faults and can fix them yourself. Even then a £10 history check is worth running for finance and theft.",
        "An approved used car from a franchised dealer with a long manufacturer warranty, which you will sell before the warranty ends. The bodywork and paint are still worth checking, because a warranty does not cover a crash repair.",
        "If you are a mechanic with your own diagnostic tools and a paint gauge. You are already doing the inspection.",
        "If the seller will not allow one. Then the answer is not to buy uninspected; it is to buy a different car.",
      ],
    },
    { type: "h2", text: "What an inspection does not do" },
    {
      type: "p",
      text: "It is a visual and diagnostic examination of the car on the day. Nobody dismantles an engine on a forecourt, and no inspector can promise a gearbox will last another five years. What it does is tell you what the car is now, with evidence, so the decision and the price are yours to make with the facts. [What a pre-purchase inspection checks](/guides/what-does-a-pre-purchase-car-inspection-check) lists the points.",
    },
    { type: "h2", text: "Using the report to negotiate" },
    {
      type: "p",
      text: "A Premium report includes repair cost guidance and an action plan, split into what to fix now, within three months and later. Dealers deal in those numbers every day and tend to respond to a written list with costs rather than a feeling that the car is a bit tired. On the M4 above, the eight codes and a slightly low set of rear pads became the negotiation; on a private sale the same list is the difference between the asking price and the real one.",
    },
    {
      type: "note",
      text: "[Book a Standard inspection](/book) for £149.99 or [a Premium](/book?package=premium) for £199.99. We come to the car, and the report is with you the same day.",
    },
  ],
  faqs: [
    {
      question: "Is it worth inspecting a nearly new car?",
      answer:
        "Usually yes, if it is more than a few months old or has had more than one owner. Nearly new cars are crashed and repaired like any other, and a repaired car sold as clean is exactly what paint depth readings find. The mechanical risk is low; the bodywork risk is not.",
    },
    {
      question: "Is it worth inspecting a car under £3,000?",
      answer:
        "If £1,000 of unexpected repairs would matter to you, yes. If you are buying a cheap runabout expecting to spend on it, a history check for finance and write-off status may be enough. Our price does not change with the car's value, so the inspection is a bigger share of a cheap car's price, which is a fair thing to weigh.",
    },
    {
      question: "Does the inspection guarantee the car?",
      answer:
        "No inspection does, and any that claims to is selling insurance, not inspection. It tells you the car's condition on the day, with photographs, video, scan results and readings you can act on.",
    },
    {
      question: "Will a dealer drop the price after an inspection?",
      answer:
        "Often, when the report lists specific faults with costs. Some will fix the items instead, which is as good. Some will not move, and then you know what you are paying for. The report also stops a dealer later claiming a fault was not there at sale.",
    },
  ],
  related: ["pre-purchase-car-inspection-cost-uk", "what-does-a-pre-purchase-car-inspection-check", "buying-a-used-car-from-a-dealer-vs-private-seller"],
  areas: ["vehicle-inspection-london", "pre-purchase-car-inspection-essex", "vehicle-inspection-hertfordshire", "vehicle-inspection-peterborough"],
  sources: [
    { label: "CarExamer Car Market Health Index, 2019 to 2026", href: "https://carexamer.com/services/car-market-health-index" },
    { label: "ClickMechanic pre-purchase inspection", href: "https://www.clickmechanic.com/pre-purchase-inspection" },
    { label: "HPI Check", href: "https://www.home.hpicheck.com/" },
    { label: "RAC Vehicle History Check (2019 write-off study)", href: "https://www.rac.co.uk/buying-a-car/rac-car-data-check/" },
    { label: "The Motor Ombudsman, 1 September 2026", href: "https://www.themotorombudsman.org/press-releases/tmo-marks-a-decade-of-the-vehicle-sales-code-driving-high-standards-in-the-automotive-sector/" },
  ],
}
