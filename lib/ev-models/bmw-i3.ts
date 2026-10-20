import type { EvModel } from "./types"

export const bmwI3: EvModel = {
  slug: "bmw-i3",
  name: "BMW i3",
  years: "2013 to 2022 (60Ah, 94Ah and 120Ah batteries)",
  title: "Used BMW i3 Battery Health Check",
  description:
    "BMW i3 battery sizes by Ah rating (22, 33 and 42 kWh), the 8-year, 100,000-mile warranty, the 2022 cell recall, replacement cost, and what we test on a used i3 before you buy.",
  summary:
    "The i3 is a carbon-fibre oddity that has aged well, and its packs have been better than the early Leaf's. Three batteries were fitted over nine years, named by their cell rating: 60Ah (22 kWh), 94Ah (33 kWh) and 120Ah (42 kWh). The 120Ah car from late 2018 is the one to have. A new pack from BMW was quoted at around 16,000 dollars in 2016, so the health reading is the price of the car.",
  batteries: [
    { version: "60Ah, 2013 to 2016", capacity: "22 kWh gross, about 18.8 kWh usable", range: "81 miles EPA, around 70 in practice when new" },
    { version: "94Ah, 2016 to 2018", capacity: "33 kWh gross, 27.2 kWh usable", range: "114 miles EPA, 190 miles NEDC" },
    { version: "120Ah, late 2018 to 2022", capacity: "42.2 kWh gross, 37.9 kWh usable, Samsung SDI NMC cells", range: "177 to 191 miles WLTP" },
  ],
  warranty:
    "Eight years or 100,000 miles on the high-voltage battery. BMW's UK site would not load when we checked the capacity threshold, so we ask to see the warranty booklet and record the figure in the report. A 2013 to 2018 car is now out of battery warranty, so what you measure is what you get.",
  sohDisplay:
    "Not on the dashboard. Owners read the pack's maximum capacity in kWh through a hidden service menu; our Autel test reads State of Health and the module data from the battery management system properly and gives you a report to keep.",
  knownIssues: [
    "Recall R/2022/322 (November 2022): 18 UK cars built between November 2018 and July 2021 for a cell-winding manufacturing defect, fixed by module replacement. Small, but a VIN check takes seconds.",
    "Range extender (REx) cars carry a small petrol engine that is often barely used. Fuel goes stale, the engine's own faults go unnoticed, and the REx needs running on the inspection as much as the battery needs reading.",
    "The 12V battery lives under the bonnet and fails with age, leaving the car dead; cheap to fix, alarming to find.",
    "Carbon-fibre body: accident repairs are specialist and expensive, so paint depth readings and a close look at the plastic panels and the tub matter more than on a steel car.",
  ],
  whatWeCheck: [
    "Which battery the car has (60Ah, 94Ah or 120Ah), confirmed from the car, because adverts get it wrong and the difference is 20 kWh.",
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "On a REx, the petrol engine running under load, its service history and the fuel age.",
    "The 2022 recall against the VIN, the first registration date and mileage against the eight-year warranty, and the 12V battery.",
    "In a Premium inspection, paint depth on every panel and a careful look at the carbon tub, panel fit and the plastic skins for accident repairs, plus the fault memory in every module.",
  ],
  faqs: [
    {
      question: "Which BMW i3 battery is best to buy used?",
      answer:
        "The 120Ah car (late 2018 to 2022) with its 42 kWh pack and 177 to 191-mile official range. The 94Ah is a reasonable middle ground. The original 60Ah car is a town car with a real range nearing 60 miles now, and should be priced as one.",
    },
    {
      question: "How much does an i3 battery cost to replace?",
      answer:
        "BMW estimated around 16,000 dollars for a new pack in 2016, and used 22 kWh packs have changed hands for a fraction of that. Either way it is more than many i3s are worth, which is why the State of Health reading is the number that sets the price.",
    },
    {
      question: "Is the i3 range extender worth having?",
      answer:
        "For some buyers, yes: it removes the fear of a flat battery on a long trip. It is also one more engine to inspect, and one that is often neglected. We run it, scan it and check its service history as part of the inspection.",
    },
  ],
  related: ["nissan-leaf", "renault-zoe", "volkswagen-id3", "jaguar-i-pace"],
  sources: [
    { label: "Wikipedia: BMW i3 (battery versions)", href: "https://en.wikipedia.org/wiki/BMW_i3_(hatchback)" },
    { label: "EV Database: BMW i3 120Ah", href: "https://ev-database.org/uk/car/1145/BMW-i3-120-Ah" },
    { label: "Recurrent: EV battery replacement costs (December 2024)", href: "https://www.recurrentauto.com/research/costs-ev-battery-replacement" },
    { label: "DVSA vehicle recalls service", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
  ],
  updated: "2026-10-19",
}
