import type { EvModel } from "./types"

export const mgZsEv: EvModel = {
  slug: "mg-zs-ev",
  name: "MG ZS EV",
  years: "2019 on",
  title: "Used MG ZS EV Battery Health Check",
  description:
    "MG ZS EV battery sizes (44.5 kWh, 51 kWh LFP, 72.6 kWh Long Range), the 7-year, 80,000-mile battery warranty, and what we test on a used ZS EV before you buy.",
  summary:
    "The ZS EV was the cheap electric family car before the MG4 arrived, and most used ones are the 2019 to 2021 car with the 44.5 kWh pack and a real range of around 130 miles. The facelift from late 2021 brought a 72.6 kWh Long Range pack and a 51 kWh LFP Standard Range. The battery warranty is seven years or 80,000 miles, shorter on mileage than most rivals, which matters on a taxi.",
  batteries: [
    { version: "2019 to 2021", capacity: "44.5 kWh, NMC cells", range: "163 miles WLTP" },
    { version: "Facelift Long Range, late 2021 on", capacity: "72.6 kWh gross, 68.3 kWh usable, NMC cells", range: "273 miles WLTP" },
    { version: "Facelift Standard Range", capacity: "51.1 kWh, LFP cells", range: "Shorter than the Long Range; check the spec for the exact figure" },
  ],
  warranty:
    "MG's seven-year, 100,000-mile car warranty with the ZS EV battery listed at seven years or 80,000 miles. MG's site would not confirm the capacity threshold for us, so we ask for the written battery terms and record them in the report. On a 2019 car the seven years run out in 2026, and an ex-taxi car will have passed 80,000 miles long before that.",
  sohDisplay:
    "No. The ZS EV gives the driver no State of Health figure; it is held in the battery management system, which our Autel test reads. You get the percentage, the module data and a report to keep.",
  knownIssues: [
    "No traction battery recall on the DVSA file as of October 2026.",
    "The original 44.5 kWh car has a modest real range, so its pack has done more full cycles per mile than a bigger one and shows its age sooner. A 2019 car with high mileage deserves a careful reading.",
    "Lots of ZS EVs were bought as private hire cars because they were the cheapest electric SUV. Mileage out of step with the age, worn rear seats and plate holes are common, and the 80,000-mile warranty limit is often already passed.",
    "Early cars had software and charging glitches that dealer updates fixed; an un-updated car can refuse to charge or throw warning lights for no mechanical reason.",
  ],
  whatWeCheck: [
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "The first registration date and mileage against the seven-year, 80,000-mile battery warranty, and the written terms for the capacity threshold.",
    "Signs of a working life: rear seat wear, plate holes, roof-sign fixings, brake and suspension wear, with mileage checked against the history.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Standard or Premium inspection, the rest of the car: tyres, brakes, suspension, paint depth on every panel, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "What real range does a used 2019 to 2021 ZS EV have?",
      answer:
        "The official figure was 163 miles; a healthy car does around 130 in mixed driving and less in winter. A pack that has lost ten percent takes that to 115 or so. The State of Health reading tells you where the car you are looking at sits.",
    },
    {
      question: "Is the ZS EV battery still under warranty?",
      answer:
        "Seven years or 80,000 miles from first registration, whichever comes first. A 2019 car reaches seven years in 2026, and a former private hire car has usually passed 80,000 miles already, so assume no battery warranty unless the dates and mileage say otherwise.",
    },
    {
      question: "Should I buy the Long Range or the original?",
      answer:
        "If you can stretch to the facelift Long Range, its 72.6 kWh pack nearly doubles the real range and is a newer design. The original is fine as a town and school-run car at the right price, and the battery reading decides what that price should be.",
    },
  ],
  related: ["mg4", "hyundai-kona-electric", "kia-e-niro", "nissan-leaf"],
  sources: [
    { label: "Wikipedia: MG ZS (electric versions)", href: "https://en.wikipedia.org/wiki/MG_ZS_(crossover)" },
    { label: "EV Database: MG ZS EV Long Range", href: "https://ev-database.org/uk/car/1541/MG-ZS-EV-Long-Range" },
    { label: "Geotab EV battery health study, April 2026", href: "https://www.geotab.com/blog/ev-battery-health/" },
  ],
  updated: "2026-10-19",
}
