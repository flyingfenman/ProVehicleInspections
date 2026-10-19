import type { EvModel } from "./types"

export const kiaENiro: EvModel = {
  slug: "kia-e-niro",
  name: "Kia e-Niro and Niro EV",
  years: "e-Niro 2019 to 2022, Niro EV 2022 on",
  title: "Used Kia e-Niro Battery Health Check",
  description:
    "Kia e-Niro and Niro EV battery sizes, the separate 8-year battery warranty to 70%, why it avoided the Kona recall, and what we test on a used e-Niro before you buy.",
  summary:
    "The e-Niro is one of the safest used EV buys: a liquid-cooled 64 kWh pack with a real 280-mile range, a separate eight-year battery warranty to 70%, and no battery recall. It used SK Innovation cells, not the LG cells behind the Kona Electric recall, despite sharing its platform. The check on a used one is about confirming the health figure and the warranty dates, then the rest of the car.",
  batteries: [
    { version: "e-Niro 39 kWh, 2019 to 2022", capacity: "39.2 kWh usable, liquid-cooled", range: "179 miles WLTP" },
    { version: "e-Niro 64 kWh, 2019 to 2022", capacity: "67.5 kWh gross (estimate), 64 kWh usable, NMC cells, liquid-cooled", range: "282 miles WLTP" },
    { version: "Niro EV, 2022 on", capacity: "68 kWh gross (estimate), 64.8 kWh usable", range: "286 miles WLTP" },
  ],
  warranty:
    "Kia's seven-year, 100,000-mile warranty covers the car, and the high-voltage battery has its own eight-year warranty, which Kia's FAQ describes as eight years or 100,000 miles. Kia repairs or replaces a pack that falls below 70% capacity within eight years of the first purchase date. The warranty transfers to later owners.",
  sohDisplay:
    "No. The e-Niro does not show the driver a State of Health percentage; the figure lives in the battery management system, which is what our Autel test reads. You get the percentage, the module data and a report to keep.",
  knownIssues: [
    "No traction battery recall on the DVSA file as of October 2026. The 2025 recall R/2025/059 was for the hybrid Niro's clutch actuator, not the electric car.",
    "The e-Niro was built alongside the Hyundai Kona Electric but used different cells, so it was not part of the Kona battery recalls that replaced packs in 2020 and 2021.",
    "These cars are often ex-taxi or ex-fleet because the range suits the job. High mileage is normal; what matters is the health reading, the charging history and the wear on seats, brakes and suspension.",
    "The 39 kWh car is rarer and cheaper. Its smaller pack has done more full cycles for the same mileage, so its State of Health deserves the same scrutiny as an older car's.",
  ],
  whatWeCheck: [
    "State of Health and the cell voltage spread from the battery management system, on the Autel report you keep.",
    "The first registration date and mileage against the eight-year battery warranty and the seven-year car warranty, and that Kia's service record is complete, because the warranty depends on it.",
    "A live charge where a charger is available, the charge port and cable, and the 12V battery.",
    "Signs of a working life: rear seat wear, plate holes, roof-sign fixings and brake and suspension wear, with mileage checked against the history.",
    "In a Standard or Premium inspection, the rest of the car: tyres, brakes that corrode from under-use, paint depth on every panel, glass, and the fault memory in every module.",
  ],
  faqs: [
    {
      question: "What State of Health is normal on a used e-Niro?",
      answer:
        "Fleet averages are around 1.8% to 2.3% loss a year, so a 2019 car in the high 80s and a 2021 car in the low 90s is in line. The liquid cooling helps these packs age gently. Anything under 70% within eight years of first purchase is a warranty claim.",
    },
    {
      question: "Was the e-Niro part of the Kona battery recall?",
      answer:
        "No. The Kona Electric recalls covered LG cells; the e-Niro used SK Innovation cells and had no equivalent recall. We still check the recall record against the VIN on every car.",
    },
    {
      question: "Does Kia's seven-year warranty cover the battery?",
      answer:
        "The car is covered for seven years or 100,000 miles, and the high-voltage battery has its own eight-year cover to 70% capacity. Both transfer with the car as long as the servicing has been kept up, which is why we check the service record as part of the inspection.",
    },
  ],
  related: ["hyundai-kona-electric", "mg4", "volkswagen-id3", "tesla-model-y"],
  sources: [
    { label: "Wikipedia: Kia Niro (e-Niro battery and range)", href: "https://en.wikipedia.org/wiki/Kia_Niro" },
    { label: "EV Database: Kia e-Niro 64 kWh", href: "https://ev-database.org/uk/car/1338/Kia-e-Niro-64-kWh" },
    { label: "EV Database: Kia Niro EV", href: "https://ev-database.org/uk/car/1666/Kia-Niro-EV" },
    { label: "Kia UK: 7-year warranty and battery cover", href: "https://www.kia.com/uk/owners/insurance-and-warranty/7-year-warranty/" },
    { label: "DVSA vehicle recalls file", href: "https://www.check-vehicle-recalls.service.gov.uk/" },
  ],
  updated: "2026-10-19",
}
