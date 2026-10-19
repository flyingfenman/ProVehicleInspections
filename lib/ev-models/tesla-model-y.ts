import type { EvModel } from "./types"

export const teslaModelY: EvModel = {
  slug: "tesla-model-y",
  name: "Tesla Model Y",
  years: "UK sales from 2022",
  title: "Used Tesla Model Y Battery Health Check",
  description:
    "Tesla Model Y battery sizes (LFP and NMC), the 8-year warranty to 70%, the app's own health check, and what we test on a used Model Y before you buy.",
  summary:
    "The Model Y shares its batteries and warranty with the Model 3, so the same good news applies: slow ageing in the fleet data, a health figure in the Tesla app and an 8-year warranty to 70% capacity. The thing to pin down on a used one is which pack it has, because the LFP rear-wheel-drive car and the NMC Long Range want charging differently.",
  batteries: [
    { version: "RWD, late 2022 to late 2024", capacity: "60 kWh gross (estimate), 57 kWh usable, CATL LFP cells", range: "267 to 283 miles WLTP" },
    { version: "Long Range RWD, late 2024 to early 2025", capacity: "78.1 kWh gross, 75 kWh usable, NMC cells", range: "351 to 373 miles WLTP" },
    { version: "Long Range AWD (2025 facelift)", capacity: "About 78 kWh, NMC cells", range: "373 miles WLTP" },
    { version: "Performance (2025)", capacity: "79 kWh", range: "360 miles WLTP" },
  ],
  warranty:
    "Eight years or 100,000 miles on the RWD, eight years or 120,000 miles on Long Range and Performance, with a minimum of 70% capacity retained, and it transfers with the car. Check the first registration date and the mileage against both limits before you buy.",
  sohDisplay:
    "Yes. In the Tesla app, Service, Request Service, Battery and Charging, Range gives a quick health check, and a 24-hour Battery Health test exists in Service Mode. Our Autel test reads State of Health and module data from the battery management system at the car in minutes and gives you a report to keep.",
  knownIssues: [
    "No battery-related recall on the DVSA file as of October 2026. The January 2025 recall was a car-computer software fix, not the pack.",
    "LFP cars (the standard RWD) are designed to be charged to 100% regularly so the gauge stays calibrated. A used LFP Model Y that has always lived at 60% can show a pessimistic range figure that is not real degradation.",
    "Model Ys do a lot of family and fleet miles and often fast charge on long trips. Tesla-specific data shows little effect from fast charging, but we still read the charging history where the car keeps it.",
    "Heavy cars on big wheels: tyre wear, especially on the inside edges of the fronts, and suspension bushes are where a used Model Y shows its mileage before the battery does.",
  ],
  whatWeCheck: [
    "State of Health, module voltages and the cell spread from the battery management system, on the Autel report you keep.",
    "Which pack the car has (LFP or NMC) and whether the owner has been charging it the way that pack wants.",
    "The app's range figure against the official figure for that version and against our reading.",
    "The 12V battery, the charge port and a live charge where there is a charger nearby.",
    "In a Standard or Premium inspection, the rest of the car: tyres, suspension, brakes that corrode from under-use, panel gaps and paint depth on every panel, glass, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "How do I know if a used Model Y has the LFP or the NMC battery?",
      answer:
        "The standard rear-wheel-drive car has LFP; Long Range and Performance have NMC. The car's software states the pack type, and we confirm it from the battery management system during the test. It matters because LFP packs are happy charged to 100% and NMC packs last longer kept below it.",
    },
    {
      question: "What State of Health should a two or three-year-old Model Y show?",
      answer:
        "Across makes, average degradation is around 1.8% to 2.3% a year, so a two or three-year-old car in the mid 90s is normal. Anything much lower needs an explanation, and the 8-year warranty covers a pack that falls below 70%.",
    },
    {
      question: "Can you check an ex-fleet or ex-taxi Model Y?",
      answer:
        "Yes, and the battery test matters more on those. High mileage on its own is not a problem on Tesla packs, but we read the State of Health, the charging history and the fault memory, and check the seats, brakes, suspension and tyres for the wear a working life leaves.",
    },
  ],
  related: ["tesla-model-3", "polestar-2", "kia-e-niro", "jaguar-i-pace"],
  sources: [
    { label: "EV Database: Tesla Model Y RWD (LFP)", href: "https://ev-database.org/uk/car/1743/Tesla-Model-Y-RWD" },
    { label: "EV Database: Tesla Model Y Long Range RWD", href: "https://ev-database.org/uk/car/2186/Tesla-Model-Y-Long-Range-RWD" },
    { label: "Wikipedia: Tesla Model Y", href: "https://en.wikipedia.org/wiki/Tesla_Model_Y" },
    { label: "Recurrent: how long do EV batteries last (November 2025)", href: "https://www.recurrentauto.com/research/how-long-do-ev-batteries-last" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
  ],
  updated: "2026-10-19",
}
