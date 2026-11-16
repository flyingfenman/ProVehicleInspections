// A real EV battery State of Health report shown on the site as an example: Henry's test of a 2022 Polestar 2 at a
// dealer in London, November 2026. The headline figures are the ones the lead tool printed in the customer report's
// Battery Health section. The three gauges are cut from the Autel "Battery Status Report (SOH Blitz Test)" as it drew
// them, and every other reading (pack figures, all 108 cell voltages, all 54 temperature sensors, with the colour the
// report gave each cell) was read out of that report by script, not typed by hand. original-printout.webp is the
// report's own panels, one under the other, as the lead tool cuts them for the customer.
//
// Left out on purpose: the customer's name, the registration, the VIN, the tester's serial number, the report id and
// the exact date. None of them is in the pictures, which are the report's panels only, not its page header or footer.

const PICTURE_DIR = "/images/sample-report/polestar-2-battery"

export type BatteryMetric = {
  label: string
  value: string
  detail?: string
  /** Printed in green, as the report does for a clear result. */
  good?: boolean
}

/** Where a reading sits on the report's own Low to High colour scale: 0 is the lowest (blue), 4 the highest (amber). */
export type BatteryLevel = 0 | 1 | 2 | 3 | 4
export type BatteryCell = [value: string, level: BatteryLevel]

export type BatteryReading = { label: string; value: string }

export type BatteryGauge = {
  src: string
  width: number
  height: number
  alt: string
  readings: BatteryReading[]
}

export type BatteryReport = {
  path: string
  vehicle: string
  intro: string
  tested: string
  serviceName: string
  mileage: string
  inspector: string
  where: { label: string; href: string }
  batteryLabel: string
  soh: number
  status: string
  metrics: BatteryMetric[]
  pack: {
    gauges: BatteryGauge[]
    energy: { now: string; whenNew: string }
    range: { now: string; whenNew: string }
    footnote: string
  }
  /** The readings above the table, in the groups the report prints them in: the modules, then the cells. */
  voltage: { readings: BatteryReading[][]; cellCount: number }
  /** One row per module: the module's own voltage, then each of its cells. */
  voltageRows: { module: string; span: string; voltage: string; cells: BatteryCell[] }[]
  temperature: { readings: BatteryReading[][]; sensorCount: number }
  /** One row per module: its temperature sensors. */
  temperatureRows: { module: string; span: string; cells: BatteryCell[] }[]
  original: { src: string; width: number; height: number }
  limitations: string
}

export const polestar2BatteryReport: BatteryReport = {
  path: "/ev-battery-health-check/sample-report",
  vehicle: "2022 Polestar 2",
  intro:
    "A real battery health report from a 2022 Polestar 2 we tested at a dealer in London in November 2026. These are the car's own readings, with the customer's name, the registration and the VIN taken out.",
  tested: "November 2026",
  serviceName: "EV Battery Health Check",
  mileage: "32,841 miles",
  inspector: "Henry",
  where: { label: "A dealer in London", href: "/vehicle-inspection-london" },
  batteryLabel: "High voltage battery",
  soh: 91,
  status: "0 battery fault codes",
  metrics: [
    { label: "State of charge", value: "86%", detail: "Charge level at time of test" },
    { label: "Battery DTCs", value: "0", detail: "No battery fault codes detected", good: true },
    { label: "Pack voltage", value: "440.70 V", detail: "Rated 400 V" },
    { label: "Rated capacity", value: "196 Ah", detail: "Reported BMS capacity value" },
    { label: "Max voltage delta", value: "7 mV", detail: "Maximum reported voltage variation", good: true },
    { label: "Cell voltage range", value: "4.076 to 4.083\u00a0V", detail: "Average 4.081 V across 108 cells" },
    { label: "Battery temperature", value: "5°C", detail: "Maximum delta 0.7°C" },
    { label: "Temperature range", value: "4.3 to 5°C", detail: "Average 4.6°C across 54 sensors" },
  ],

  pack: {
    gauges: [
      {
        src: `${PICTURE_DIR}/gauge-health.webp`,
        width: 790,
        height: 440,
        alt: "Battery Health Status gauge from the battery report, in the green band, grade A",
        readings: [
          { label: "SOH*", value: "91 %" },
          { label: "SOC", value: "86 %" },
        ],
      },
      {
        src: `${PICTURE_DIR}/gauge-temperature.webp`,
        width: 770,
        height: 440,
        alt: "Static Temperature Consistency gauge from the battery report, in the green band, grade A",
        readings: [
          { label: "Battery Temperature", value: "5 °C" },
          { label: "Max Temperature Delta", value: "0.7 °C" },
        ],
      },
      {
        src: `${PICTURE_DIR}/gauge-voltage.webp`,
        width: 785,
        height: 440,
        alt: "Static Voltage Consistency gauge from the battery report, in the green band, grade A",
        readings: [
          { label: "Battery Voltage", value: "440.70 V" },
          { label: "Max Voltage Delta", value: "7 mV" },
        ],
      },
    ],
    energy: { now: "71 kWh", whenNew: "78 kWh" },
    range: { now: "440.4 km", whenNew: "484 km" },
    footnote:
      "*: Based on the BMS data or related data of the vehicle manufacturer. Autel provides no guarantee regarding the actual SOH or physical condition of the battery.",
  },

  voltage: {
    cellCount: 108,
    readings: [
      [
        { label: "Maximum Module Voltage", value: "16.33 V" },
        { label: "Minimum Module Voltage", value: "16.32 V" },
        { label: "Average Module Voltage", value: "16.32 V" },
        { label: "Module Voltage Delta", value: "0.01 V" },
        { label: "Standard Module Voltage Delta", value: "0 V" },
      ],
      [
        { label: "Maximum Cell Voltage", value: "4.083 V" },
        { label: "Minimum Cell Voltage", value: "4.076 V" },
        { label: "Average Cell Voltage", value: "4.081 V" },
        { label: "Cell Voltage Delta", value: "7 mV" },
        { label: "Standard Cell Voltage Delta", value: "1 mV" },
      ],
    ],
  },
  voltageRows: [
    { module: "M1", span: "#1-#4", voltage: "16.33 V", cells: [["4.081 V", 2], ["4.083 V", 2], ["4.082 V", 2], ["4.081 V", 2]] },
    { module: "M2", span: "#5-#8", voltage: "16.33 V", cells: [["4.082 V", 2], ["4.081 V", 2], ["4.08 V", 2], ["4.082 V", 2]] },
    { module: "M3", span: "#9-#12", voltage: "16.33 V", cells: [["4.081 V", 2], ["4.082 V", 2], ["4.081 V", 2], ["4.082 V", 2]] },
    { module: "M4", span: "#13-#16", voltage: "16.32 V", cells: [["4.077 V", 2], ["4.082 V", 2], ["4.081 V", 2], ["4.082 V", 2]] },
    { module: "M5", span: "#17-#20", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.08 V", 2]] },
    { module: "M6", span: "#21-#24", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.08 V", 2], ["4.08 V", 2]] },
    { module: "M7", span: "#25-#28", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.08 V", 2], ["4.081 V", 2], ["4.08 V", 2]] },
    { module: "M8", span: "#29-#32", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2]] },
    { module: "M9", span: "#33-#36", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M10", span: "#37-#40", voltage: "16.32 V", cells: [["4.082 V", 2], ["4.081 V", 2], ["4.08 V", 2], ["4.081 V", 2]] },
    { module: "M11", span: "#41-#44", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M12", span: "#45-#48", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M13", span: "#49-#52", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M14", span: "#53-#56", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M15", span: "#57-#60", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.08 V", 2], ["4.081 V", 2], ["4.08 V", 2]] },
    { module: "M16", span: "#61-#64", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2]] },
    { module: "M17", span: "#65-#68", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2]] },
    { module: "M18", span: "#69-#72", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2]] },
    { module: "M19", span: "#73-#76", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2], ["4.079 V", 2]] },
    { module: "M20", span: "#77-#80", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2], ["4.08 V", 2]] },
    { module: "M21", span: "#81-#84", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.08 V", 2], ["4.079 V", 2], ["4.08 V", 2]] },
    { module: "M22", span: "#85-#88", voltage: "16.32 V", cells: [["4.076 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M23", span: "#89-#92", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M24", span: "#93-#96", voltage: "16.32 V", cells: [["4.08 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M25", span: "#97-#100", voltage: "16.32 V", cells: [["4.078 V", 2], ["4.078 V", 2], ["4.081 V", 2], ["4.082 V", 2]] },
    { module: "M26", span: "#101-#104", voltage: "16.32 V", cells: [["4.082 V", 2], ["4.081 V", 2], ["4.081 V", 2], ["4.081 V", 2]] },
    { module: "M27", span: "#105-#108", voltage: "16.32 V", cells: [["4.081 V", 2], ["4.082 V", 2], ["4.077 V", 2], ["4.082 V", 2]] },
  ],

  temperature: {
    sensorCount: 54,
    readings: [
      [
        { label: "Max Temperature", value: "5 °C" },
        { label: "Min Temperature", value: "4.3 °C" },
        { label: "Average Temperature", value: "4.6 °C" },
      ],
    ],
  },
  temperatureRows: [
    { module: "M1", span: "T1-T2", cells: [["4.6 °C", 2], ["4.9 °C", 4]] },
    { module: "M2", span: "T3-T4", cells: [["4.4 °C", 1], ["4.6 °C", 2]] },
    { module: "M3", span: "T5-T6", cells: [["4.5 °C", 1], ["4.6 °C", 2]] },
    { module: "M4", span: "T7-T8", cells: [["4.4 °C", 1], ["4.5 °C", 1]] },
    { module: "M5", span: "T9-T10", cells: [["4.4 °C", 1], ["4.6 °C", 2]] },
    { module: "M6", span: "T11-T12", cells: [["4.9 °C", 4], ["4.7 °C", 3]] },
    { module: "M7", span: "T13-T14", cells: [["4.8 °C", 3], ["4.8 °C", 3]] },
    { module: "M8", span: "T15-T16", cells: [["4.7 °C", 3], ["4.9 °C", 4]] },
    { module: "M9", span: "T17-T18", cells: [["4.8 °C", 3], ["4.7 °C", 3]] },
    { module: "M10", span: "T19-T20", cells: [["4.9 °C", 4], ["4.9 °C", 4]] },
    { module: "M11", span: "T21-T22", cells: [["5 °C", 4], ["4.7 °C", 3]] },
    { module: "M12", span: "T23-T24", cells: [["4.9 °C", 4], ["4.9 °C", 4]] },
    { module: "M13", span: "T25-T26", cells: [["4.7 °C", 3], ["4.7 °C", 3]] },
    { module: "M14", span: "T27-T28", cells: [["4.7 °C", 3], ["4.8 °C", 3]] },
    { module: "M15", span: "T29-T30", cells: [["4.5 °C", 1], ["4.5 °C", 1]] },
    { module: "M16", span: "T31-T32", cells: [["4.7 °C", 3], ["4.9 °C", 4]] },
    { module: "M17", span: "T33-T34", cells: [["4.5 °C", 1], ["4.4 °C", 1]] },
    { module: "M18", span: "T35-T36", cells: [["4.5 °C", 1], ["4.6 °C", 2]] },
    { module: "M19", span: "T37-T38", cells: [["4.5 °C", 1], ["4.5 °C", 1]] },
    { module: "M20", span: "T39-T40", cells: [["4.6 °C", 2], ["4.4 °C", 1]] },
    { module: "M21", span: "T41-T42", cells: [["4.6 °C", 2], ["4.6 °C", 2]] },
    { module: "M22", span: "T43-T44", cells: [["4.4 °C", 1], ["4.4 °C", 1]] },
    { module: "M23", span: "T45-T46", cells: [["4.5 °C", 1], ["4.4 °C", 1]] },
    { module: "M24", span: "T47-T48", cells: [["4.4 °C", 1], ["4.4 °C", 1]] },
    { module: "M25", span: "T49-T50", cells: [["4.3 °C", 0], ["4.4 °C", 1]] },
    { module: "M26", span: "T51-T52", cells: [["4.4 °C", 1], ["4.7 °C", 3]] },
    { module: "M27", span: "T53-T54", cells: [["4.5 °C", 1], ["4.5 °C", 1]] },
  ],

  original: { src: `${PICTURE_DIR}/original-printout.webp`, width: 1656, height: 6499 },
  limitations:
    "Battery and BMS information is obtained from the vehicle's control modules and is believed accurate at the time checked, but cannot be independently guaranteed. Battery state of health figures are reported from available vehicle/BMS data and are not a guarantee of remaining battery life or future performance. The Autel EV Battery Health Test is based on battery-management data available from the vehicle and is not a full independent charge and discharge capacity test.",
}
