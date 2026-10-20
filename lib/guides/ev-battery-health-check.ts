import type { Guide } from "./types"

export const evBatteryHealthCheck: Guide = {
  slug: "how-to-check-ev-battery-health-before-you-buy",
  question: "How do you check an electric car's battery health before you buy?",
  title: "How to Check EV Battery Health Before You Buy",
  description:
    "Five ways to check a used electric car's battery, from the dashboard to a full discharge test, what State of Health is normal by age, the red flags, and what our £99.99 mobile test reads.",
  published: "2026-10-19",
  updated: "2026-10-19",
  answer:
    "Read the State of Health from the battery management system with a diagnostic tool, at the car, before you pay. The car's own display (Tesla's app, the Leaf's 12 bars) is a rough guide, and a seller's certificate may be months old. A healthy used EV reads in the high 80s to mid 90s depending on age; the warranty threshold on most cars is 70%. Our mobile test takes minutes and costs £99.99.",
  blocks: [
    { type: "h2", text: "Five ways to check, from weakest to strongest" },
    {
      type: "ol",
      items: [
        "The range estimate on the dash. It is a guess based on recent driving, the weather and the charge level, and it says nothing reliable about capacity. A car can lose a third of its range in winter with no change to the battery.",
        "The car's own health display. Tesla shows one in the app (Service, Request Service, Battery and Charging, Range). The Nissan Leaf has a 12-bar capacity gauge, and losing a bar is a step of several percent. Most other used EVs, including the Kona Electric, e-Niro, ID.3, MG4, Zoe and Polestar 2, show the driver nothing.",
        "A certificate from the seller. Dealers increasingly offer one from ClearWatt or Aviloo. Useful, but check the date, how many miles the car has done since, and whether it was a physical test or a desk estimate from the registration and mileage. ClearWatt's cheapest product is an estimate, not a test.",
        "A battery management system read-out at the car. This is what we do. The Autel CARA Approved test reads the pack's State of Health, State of Charge, module and cell voltages, the spread between them and the temperature, in minutes, and produces a report you keep. It is the BMS's own estimate, which is why we read the cell data alongside the headline figure rather than quoting the percentage alone.",
        "A full discharge test. Aviloo's Premium test and some dealer workshops measure real capacity by running the pack down under load. It is the most accurate method, it takes hours or a full day, and it is almost never possible before you have bought the car.",
      ],
    },
    { type: "h2", text: "What the number means" },
    {
      type: "p",
      text: "State of Health is the pack's current usable capacity as a percentage of what it had when new. It is not range. Range moves with the season, speed, load and driving style; State of Health moves slowly, in one direction. The figure is set by the weakest module in the pack, which is why one cell out of step with the rest matters more than the average.",
    },
    {
      type: "table",
      caption: "What is normal by age (derived from Geotab's 2026 fleet rates of 1.8% to 2.3% loss a year)",
      head: ["Age", "Typical State of Health", "What would worry us"],
      rows: [
        ["1 year", "97% to 98%", "Below 95%"],
        ["3 years", "93% to 95%", "Below 90%"],
        ["5 years", "88% to 91%", "Below 85%"],
        ["8 years", "82% to 86% (Geotab's own 8-year average is 81.6%)", "Below 78%, or near the 70% warranty line"],
      ],
    },
    {
      type: "p",
      text: "Air-cooled packs age faster. Geotab's data shows the 2015 Nissan Leaf losing 4.2% a year, and Recurrent puts an eight-year-old 24 kWh Leaf at 70% to 75%. The table above is for liquid-cooled cars, which is almost everything else. [Our Leaf page](/ev-battery-health-check/nissan-leaf) has the figures for that car.",
    },
    { type: "h2", text: "Red flags on the day" },
    {
      type: "ul",
      items: [
        "A module or cell voltage out of step with the rest. The average can look fine while one weak module decides the car's real range and its future.",
        "A State of Health well below the band for its age without an obvious reason such as a hard taxi life.",
        "A charging cap in place. Volkswagen has remotely limited some 2022 to 2025 ID.3, ID.4 and ID.7 cars to 80% under a battery recall; Jaguar has limited 16,291 I-Paces to 90% since March 2026. A capped car has 10% to 20% less range than its badge says until the fix is done.",
        "A battery recall outstanding. The Kona Electric has had three; the e-208 and Corsa-e two each. The DVSA recall service checks any VIN for free.",
        "A replaced pack with no paperwork, or a Renault Zoe whose battery is still on hire with monthly payments that transfer to you.",
        "A charging history heavy on rapid chargers above 100 kW. Geotab's 2026 data shows those cars degrading 3.0% a year against 2.2%.",
        "A seller who will not let the car be scanned. There is no good reason to refuse a read-only test that takes a few minutes.",
      ],
    },
    { type: "h2", text: "Questions to ask before you travel" },
    {
      type: "ul",
      items: [
        "Which version and pack size is it? Adverts get this wrong, and on a BMW i3 or Polestar 2 the difference between versions is 20 kWh.",
        "Has it had any battery recall work, and is there paperwork?",
        "Has the battery or any module ever been replaced?",
        "How was it charged: at home overnight, or on public rapid chargers?",
        "Is there a battery health certificate, and when was it done?",
      ],
    },
    { type: "h2", text: "What our test includes" },
    {
      type: "p",
      text: "We come to the car wherever it is for sale, run the Autel CARA Approved battery health test, and give you the State of Health with the module and cell data on a report you keep. We check the recall record against the VIN, the warranty dates, the charge port and cable, the 12V battery, and a live charge where there is a charger nearby. On its own the test is [£99.99](/book?package=ev). Added to a [Standard or Premium inspection](/book) of the whole car it is £49.99.",
    },
    {
      type: "note",
      text: "None of the national inspection services offered a traction battery State of Health test when we checked their pages on 19 October 2026. The AA's Advanced package lists a Digital Battery Test without saying which battery it covers; the RAC's diagnostic reads fault codes; ClickMechanic and WhoCanFixMyCar do not mention the battery at all.",
    },
  ],
  faqs: [
    {
      question: "Can I check EV battery health myself with an OBD dongle?",
      answer:
        "On some cars, yes. LeafSpy reads the Nissan Leaf and CanZE reads the Renault Zoe over a cheap Bluetooth dongle, and Tesla shows a figure in its app. Most other cars need a professional tool that can talk to the battery management system, which is what the Autel test does.",
    },
    {
      question: "Is a battery management system read-out accurate?",
      answer:
        "It is the car's own estimate, and Aviloo, which sells a full discharge test, points out that it can run high or low. In our experience it is a sound guide when read with the cell data, and it is the only test that can be done in minutes at the seller's before you commit. A full discharge test is more precise but takes a day.",
    },
    {
      question: "What State of Health should I walk away from?",
      answer:
        "There is no single number; a cheap Leaf at 80% can be fair value and a three-year-old car at 85% is a problem. The question is whether the figure fits the age, mileage and price, whether the cells are balanced, and how far the car is from its 70% warranty line.",
    },
    {
      question: "Does the test work on every EV?",
      answer:
        "Autel says its test covers more than 90% of electric models, and it covers every car on our model list. Tell us the make, model and year when you book and we confirm before you pay.",
    },
  ],
  related: ["how-long-do-electric-car-batteries-last", "is-a-pre-purchase-car-inspection-worth-it", "pre-purchase-car-inspection-cost-uk"],
  models: ["tesla-model-3", "nissan-leaf", "hyundai-kona-electric", "volkswagen-id3", "kia-e-niro", "mg4"],
  areas: ["vehicle-inspection-london", "pre-purchase-car-inspection-essex", "vehicle-inspection-hertfordshire"],
  sources: [
    { label: "Geotab EV battery health study, 28 April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
    { label: "Recurrent: all about battery testing", href: "https://www.recurrentauto.com/research/all-about-battery-testing" },
    { label: "Recurrent: what dealers should know about EV battery health (SoH vs range)", href: "https://www.recurrentauto.com/research/ev-battery-health-car-dealership" },
    { label: "Autel: Battery Health Check, CARA Approved", href: "https://autel.com/service/4302.jhtml" },
    { label: "Aviloo: read-out vs testing", href: "https://aviloo.com/en/read-out-vs-testing" },
    { label: "Volkswagen UK: high-voltage battery recall campaign", href: "https://www.volkswagen.co.uk/en/owners-and-services/my-car/battery-recall-campaign.html" },
    { label: "DVSA vehicle recalls service", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
  ],
}
