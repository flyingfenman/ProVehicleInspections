import type { Area } from "./types"
import { london } from "./london"
import { essex } from "./essex"
import { luton } from "./luton"
import { cambridge } from "./cambridge"
import { peterborough } from "./peterborough"
import { leicester } from "./leicester"
import { nottingham } from "./nottingham"
import { birmingham } from "./birmingham"
import { coventry } from "./coventry"
import { northampton } from "./northampton"
import { norwich } from "./norwich"
import { ipswich } from "./ipswich"
import { hertfordshire } from "./hertfordshire"
import { cambridgeshire } from "./cambridgeshire"
import { suffolk } from "./suffolk"
import { norfolk } from "./norfolk"
import { lincolnshire } from "./lincolnshire"
import { nottinghamshire } from "./nottinghamshire"
import { northamptonshire } from "./northamptonshire"
import { leicestershire } from "./leicestershire"
import { bedfordshire } from "./bedfordshire"
import { westMidlands } from "./west-midlands"

export type { Area, AreaFaq, AreaPlace } from "./types"

// Cities first, then counties, in the order they are listed on the site.
export const areas: Area[] = [
  london,
  essex,
  luton,
  cambridge,
  peterborough,
  leicester,
  nottingham,
  birmingham,
  coventry,
  northampton,
  norwich,
  ipswich,
  hertfordshire,
  cambridgeshire,
  suffolk,
  norfolk,
  lincolnshire,
  nottinghamshire,
  northamptonshire,
  leicestershire,
  bedfordshire,
  westMidlands,
]

export const cityAreas = areas.filter((area) => area.kind === "city")
export const countyAreas = areas.filter((area) => area.kind === "county")

export function getArea(slug: string) {
  return areas.find((area) => area.slug === slug)
}

export function areaPath(area: Area) {
  return `/${area.slug}`
}

export { SERVICE_AREA } from "./service-area"

// schema.org areaServed for the business: the counties and the cities, each typed, so the business markup and the
// Google Business Profile list match.
export const AREA_SERVED = [
  ...countyAreas.map((area) => ({ "@type": "AdministrativeArea", name: area.name })),
  { "@type": "AdministrativeArea", name: "Rutland" },
  ...cityAreas.map((area) => ({ "@type": "City", name: area.name })),
]
