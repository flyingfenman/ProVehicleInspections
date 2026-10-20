// Builds lib/areas/map-shapes.ts, the outlines behind the "Areas we cover" map.
//
// Source: ONS Local Authority Districts (December 2024) boundaries, ultra generalised (BUC), Open Government
// Licence v3.0. Contains OS data © Crown copyright and database right 2024.
//
// Re-run after a boundary change or to adjust a label:
//   node scripts/build-area-map.mjs                 downloads the districts from ONS into a temp folder
//   node scripts/build-area-map.mjs districts.json  uses a GeoJSON FeatureCollection you already have
// It shells out to mapshaper through npx (not a project dependency) to merge districts into counties and
// simplify them, then projects, fits and writes the TypeScript module. Nothing here runs at build or request time.

import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const OUT = join(ROOT, "lib/areas/map-shapes.ts")
const MAPSHAPER = "mapshaper@0.6.102"
const ONS =
  "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/Local_Authority_Districts_December_2024_Boundaries_UK_BUC/FeatureServer/0/query?where=1%3D1&outFields=LAD24CD,LAD24NM&outSR=4326&f=geojson"

// Covered regions, keyed by the area page slug they link to, as lists of district codes.
const COVERED = {
  "vehicle-inspection-london": [range("E09000", 1, 33)],
  "pre-purchase-car-inspection-essex": [range("E07000", 66, 77), "E06000033", "E06000034"],
  "vehicle-inspection-hertfordshire": ["E07000095", "E07000096", "E07000098", "E07000099", "E07000102", "E07000103", "E07000240", "E07000241", "E07000242", "E07000243"],
  "vehicle-inspection-bedfordshire": ["E06000055", "E06000056", "E06000032"],
  "vehicle-inspection-cambridgeshire": [range("E07000", 8, 12), "E06000031"],
  "vehicle-inspection-suffolk": ["E07000200", "E07000202", "E07000203", "E07000244", "E07000245"],
  "vehicle-inspection-norfolk": [range("E07000", 143, 149)],
  "vehicle-inspection-northamptonshire": ["E06000061", "E06000062"],
  "vehicle-inspection-leicestershire": [range("E07000", 129, 135), "E06000016", "E06000017"],
  "vehicle-inspection-nottinghamshire": [range("E07000", 170, 176), "E06000018"],
  "vehicle-inspection-lincolnshire": ["E07000136", "E07000139", "E07000140", "E07000141"],
  "vehicle-inspection-west-midlands": [range("E08000", 25, 31)],
}

// Neighbouring counties drawn for context only, no links.
const CONTEXT = {
  Lincolnshire: ["E07000137", "E07000138", "E07000142", "E06000012", "E06000013"],
  Derbyshire: [range("E07000", 32, 39), "E06000015"],
  Staffordshire: [range("E07000", 192, 199), "E06000021"],
  Warwickshire: [range("E07000", 218, 222)],
  Worcestershire: [range("E07000", 234, 239)],
  Shropshire: ["E06000051", "E06000020"],
  Gloucestershire: [range("E07000", 78, 83)],
  Oxfordshire: [range("E07000", 177, 181)],
  Buckinghamshire: ["E06000060", "E06000042"],
  Berkshire: [range("E06000", 36, 41)],
  Wiltshire: ["E06000054", "E06000030"],
  Hampshire: [range("E07000", 84, 94)],
  Surrey: [range("E07000", 207, 217)],
  Kent: [range("E07000", 105, 116), "E06000035"],
  "South Yorkshire": [range("E08000", 16, 19)],
}

// Short labels and hand-placed positions (longitude, latitude) where the automatic inner point sits badly,
// for example under a city pin. Small regions get a leader-free label just outside or beside them.
const LABELS = {
  "vehicle-inspection-london": { text: "London", at: [-0.12, 51.47] },
  "pre-purchase-car-inspection-essex": { text: "Essex", at: [0.58, 51.8] },
  "vehicle-inspection-hertfordshire": { text: "Herts", at: [-0.2, 51.84] },
  "vehicle-inspection-bedfordshire": { text: "Beds", at: [-0.4, 52.08] },
  "vehicle-inspection-cambridgeshire": { text: "Cambs", at: [-0.05, 52.4] },
  "vehicle-inspection-suffolk": { text: "Suffolk", at: [1.12, 52.32] },
  "vehicle-inspection-norfolk": { text: "Norfolk", at: [0.85, 52.7] },
  "vehicle-inspection-northamptonshire": { text: "Northants", at: [-0.78, 52.42] },
  "vehicle-inspection-leicestershire": { text: "Leics", at: [-1.2, 52.78], phoneAt: [-1.12, 52.78] },
  "vehicle-inspection-nottinghamshire": { text: "Notts", at: [-1.0, 53.18] },
  "vehicle-inspection-lincolnshire": { text: "S. Lincs", at: [-0.25, 52.92] },
  // On phones the label sits above the county so Birmingham's name can go above its pin, clear of Coventry.
  "vehicle-inspection-west-midlands": { text: "W. Midlands", at: [-1.85, 52.6], phoneAt: [-1.86, 52.74] },
}

// Smaller names for places inside a region that buyers look for by name, drawn in the region's colour.
// Shown from tablet width up; on a phone Rutland is too small to carry its own name next to Leicester's.
const MINOR_LABELS = [{ text: "Rutland", at: [-0.64, 52.725] }]

// City pages shown as pins (London is a region, not a pin).
const PINS = {
  "vehicle-inspection-luton": { text: "Luton", at: [-0.4167, 51.8787], side: "left" },
  "vehicle-inspection-cambridge": { text: "Cambridge", at: [0.1218, 52.2053], side: "right" },
  "vehicle-inspection-peterborough": { text: "Peterborough", at: [-0.2405, 52.5695], side: "right" },
  "vehicle-inspection-leicester": { text: "Leicester", at: [-1.1398, 52.6369], side: "right" },
  "vehicle-inspection-nottingham": { text: "Nottingham", at: [-1.1581, 52.9548], side: "left" },
  "vehicle-inspection-birmingham": { text: "Birmingham", at: [-1.8904, 52.4862], side: "below", phoneSide: "above" },
  "vehicle-inspection-coventry": { text: "Coventry", at: [-1.5197, 52.4068], side: "below" },
  "vehicle-inspection-northampton": { text: "Northampton", at: [-0.9027, 52.2405], side: "left", phoneSide: "right" },
  "vehicle-inspection-norwich": { text: "Norwich", at: [1.2974, 52.6309], side: "below" },
  "vehicle-inspection-ipswich": { text: "Ipswich", at: [1.1482, 52.0567], side: "below" },
}

// The frame: covered area plus a margin, in degrees. Context counties are clipped to it.
const BBOX = { west: -2.3, east: 1.82, south: 51.24, north: 53.52 }
const WIDTH = 1000
const PAD = 8
const COS = Math.cos((52.4 * Math.PI) / 180)

function range(prefix, from, to) {
  const codes = []
  for (let n = from; n <= to; n++) codes.push(prefix + String(n).padStart(3, "0"))
  return codes
}

async function loadDistricts(path) {
  if (path) return JSON.parse(readFileSync(path, "utf8"))
  const features = []
  for (let offset = 0; ; offset += 100) {
    const res = await fetch(`${ONS}&resultOffset=${offset}&resultRecordCount=100`)
    if (!res.ok) throw new Error(`ONS download failed: ${res.status}`)
    const page = await res.json()
    features.push(...page.features)
    if (!page.properties?.exceededTransferLimit) break
  }
  return { type: "FeatureCollection", features }
}

const regionOf = new Map()
for (const [key, lists] of Object.entries(COVERED)) for (const code of lists.flat()) regionOf.set(code, { key, covered: true })
for (const [key, lists] of Object.entries(CONTEXT)) for (const code of lists.flat()) regionOf.set(code, { key, covered: false })

const districts = await loadDistricts(process.argv[2])
const tmp = mkdtempSync(join(tmpdir(), "area-map-"))
const tagged = {
  type: "FeatureCollection",
  features: districts.features
    .filter((f) => regionOf.has(f.properties.LAD24CD))
    .map((f) => ({ ...f, properties: { region: regionOf.get(f.properties.LAD24CD).key, covered: regionOf.get(f.properties.LAD24CD).covered ? 1 : 0 } })),
}
const sourceCodes = new Set(districts.features.map((f) => f.properties.LAD24CD))
const missing = [...regionOf.keys()].filter((code) => !sourceCodes.has(code))
if (missing.length) console.warn("District codes not found in the source:", missing.join(", "))
writeFileSync(join(tmp, "tagged.json"), JSON.stringify(tagged))

const bbox = `${BBOX.west},${BBOX.south},${BBOX.east},${BBOX.north}`
execFileSync(
  "npx",
  ["--yes", MAPSHAPER, join(tmp, "tagged.json"), "-dissolve", "region", "copy-fields=covered", "-clip", `bbox=${bbox}`, "-simplify", "30%", "keep-shapes", "-filter-islands", "min-area=4km2", "-o", "format=geojson", "precision=0.00001", join(tmp, "regions.json")],
  { stdio: "inherit" },
)
const regions = JSON.parse(readFileSync(join(tmp, "regions.json"), "utf8"))

// Equirectangular, scaled for 52.4 degrees north, fitted to WIDTH with PAD each side.
const x0 = BBOX.west * COS
const y0 = BBOX.north
const scale = (WIDTH - PAD * 2) / ((BBOX.east - BBOX.west) * COS)
const HEIGHT = Math.round((BBOX.north - BBOX.south) * scale + PAD * 2)
const project = ([lon, lat]) => [PAD + (lon * COS - x0) * scale, PAD + (y0 - lat) * scale]
const r1 = (n) => Math.round(n * 10) / 10
const fmt = (n) => {
  const s = r1(n).toFixed(1).replace(/\.0$/, "")
  return s === "-0" ? "0" : s
}

function ringPath(ring) {
  const pts = ring.map(project).map(([x, y]) => [r1(x), r1(y)])
  let d = `M${fmt(pts[0][0])} ${fmt(pts[0][1])}l`
  const parts = []
  for (let i = 1; i < pts.length - 1; i++) {
    const dx = r1(pts[i][0] - pts[i - 1][0])
    const dy = r1(pts[i][1] - pts[i - 1][1])
    if (dx === 0 && dy === 0) continue
    parts.push(`${fmt(dx)} ${fmt(dy)}`.replace(/ -/g, "-"))
  }
  return d + parts.join(" ").replace(/ -/g, "-") + "z"
}

function geometryPath(geom) {
  const polys = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates
  return polys.map((poly) => poly.map(ringPath).join("")).join("")
}

const covered = {}
const context = []
for (const f of regions.features) {
  if (!f.geometry) continue
  const d = geometryPath(f.geometry)
  if (f.properties.covered) covered[f.properties.region] = d
  else context.push({ name: f.properties.region, d })
}
for (const key of Object.keys(COVERED)) if (!covered[key]) throw new Error(`No outline for ${key}`)

const place = ([lon, lat]) => project([lon, lat]).map(r1)
const labels = Object.fromEntries(
  Object.entries(LABELS).map(([key, { text, at, phoneAt }]) => [
    key,
    { text, x: place(at)[0], y: place(at)[1], ...(phoneAt ? { phoneX: place(phoneAt)[0], phoneY: place(phoneAt)[1] } : {}) },
  ]),
)
const minorLabels = MINOR_LABELS.map(({ text, at }) => ({ text, x: place(at)[0], y: place(at)[1] }))
const pins = Object.fromEntries(
  Object.entries(PINS).map(([key, { text, at, side, phoneSide }]) => [key, { text, x: place(at)[0], y: place(at)[1], side, ...(phoneSide ? { phoneSide } : {}) }]),
)

const out = `// Generated by scripts/build-area-map.mjs from ONS Local Authority Districts (December 2024, BUC).
// Contains OS data © Crown copyright and database right 2024. Open Government Licence v3.0.
// Do not edit by hand: change the script and re-run it.

export const MAP_VIEWBOX = { width: ${WIDTH}, height: ${HEIGHT} }

/** Outline of each covered region, keyed by the area page slug it links to. */
export const REGION_PATHS: Record<string, string> = ${JSON.stringify(covered, null, 2)}

/** Neighbouring counties, drawn for context only. */
export const CONTEXT_PATHS: { name: string; d: string }[] = ${JSON.stringify(context, null, 2)}

/** Where each region's short label sits. */
export const REGION_LABELS: Record<string, { text: string; x: number; y: number; phoneX?: number; phoneY?: number }> = ${JSON.stringify(labels, null, 2)}

/** Smaller place names inside a region, such as Rutland inside the Leicestershire region. */
export const MINOR_LABELS: { text: string; x: number; y: number }[] = ${JSON.stringify(minorLabels, null, 2)}

export type PinSide = "left" | "right" | "below" | "above"

/** City pages shown as pins, and which side of the pin the name goes (phoneSide overrides it below tablet width). */
export const CITY_PINS: Record<string, { text: string; x: number; y: number; side: PinSide; phoneSide?: PinSide }> = ${JSON.stringify(pins, null, 2)}
`
writeFileSync(OUT, out)
console.log(`Wrote ${OUT} (${(Buffer.byteLength(out) / 1024).toFixed(1)} KB, viewBox ${WIDTH} x ${HEIGHT})`)
