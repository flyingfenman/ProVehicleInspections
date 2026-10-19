import type { EvModel } from "./types"

export const peugeotE208: EvModel = {
  slug: "peugeot-e-208",
  name: "Peugeot e-208",
  years: "2020 on",
  title: "Used Peugeot e-208 Battery Health Check",
  description:
    "Peugeot e-208 battery sizes (50 and 51 kWh), the 8-year, 100,000-mile warranty, the 2022 build recalls for battery control software, and what we test on a used e-208 before you buy.",
  summary:
    "The e-208 shares its 50 kWh pack with the Vauxhall Corsa Electric and a dozen other Stellantis cars, which makes parts and knowledge easy to find. The battery itself has a clean record; the recalls were software in the battery control unit on cars built in the second half of 2022, one of them for loss of drive. On a used e-208 we check the recall status, the health reading and whether the car has had the software it needs.",
  batteries: [
    { version: "2020 to 2023", capacity: "50 kWh gross, 46.3 kWh usable", range: "208 to 225 miles WLTP depending on year" },
    { version: "2023 on (115 kW motor)", capacity: "51 kWh gross", range: "Up to 249 miles WLTP" },
  ],
  warranty:
    "A separate eight-year, 100,000-mile warranty on the high-voltage battery, which transfers with the car. Peugeot's site would not load when we checked the capacity threshold, so we ask for the written terms and record them in the report.",
  sohDisplay:
    "No. The e-208 gives the driver no State of Health figure; it is held in the battery management system, which our Autel test reads. You get the percentage, the module data and a report to keep.",
  knownIssues: [
    "Recall R/2023/009 (January 2023): 1,610 UK cars built July to December 2022 for a traction battery control unit software error that could cause loss of propulsion. A dealer software update.",
    "Recall R/2025/120 (March 2025): 889 cars built July to November 2022 for Battery Monitoring Unit software. Again a dealer update, and the one most likely to be outstanding on a car bought in 2025 or 2026.",
    "Recall R/2022/203 (July 2022): 16 cars for the high-voltage harness. Tiny, but on the VIN check.",
    "The 2020 to 2021 cars had a known issue where the range estimate was optimistic and the car's 12V battery drained; both improved with software. A car on old software behaves worse than its battery deserves.",
  ],
  whatWeCheck: [
    "All three recalls against the VIN, and whether the 2022-build software updates have been done.",
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "The first registration date and mileage against the eight-year, 100,000-mile warranty, and the written capacity terms.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "In a Standard or Premium inspection, the rest of the car: brakes that corrode from under-use, tyres, suspension, paint depth on every panel, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "Is the Peugeot e-208 battery reliable?",
      answer:
        "Yes, so far. The recalls were software in the control electronics on 2022-build cars, not the cells, and there is no pattern of pack failures in the data we have seen. The reading we take is the baseline the warranty will be judged against.",
    },
    {
      question: "What State of Health is normal on a used e-208?",
      answer:
        "Fleet averages are around 1.8% to 2.3% loss a year, so a 2020 car in the high 80s and a 2023 car in the mid 90s is in line. Anything under the warranty threshold inside eight years or 100,000 miles is a claim.",
    },
    {
      question: "Is the e-208 the same as the Corsa Electric underneath?",
      answer:
        "Yes: the same platform, motor, battery and recalls. Our Corsa Electric page covers the Vauxhall version. Whichever badge, we read the pack the same way.",
    },
  ],
  related: ["vauxhall-corsa-e", "renault-zoe", "mg4", "volkswagen-id3"],
  sources: [
    { label: "EV Database: Peugeot e-208", href: "https://ev-database.org/uk/car/1168/Peugeot-e-208" },
    { label: "Wikipedia: Peugeot 208 (e-208 versions)", href: "https://en.wikipedia.org/wiki/Peugeot_208" },
    { label: "carwow: Peugeot e-208 review (warranty)", href: "https://www.carwow.co.uk/peugeot/e-208" },
    { label: "DVSA vehicle recalls service", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
  ],
  updated: "2026-10-19",
}
