import type { EvModel } from "./types"
import { teslaModel3 } from "./tesla-model-3"
import { teslaModelY } from "./tesla-model-y"
import { nissanLeaf } from "./nissan-leaf"
import { kiaENiro } from "./kia-e-niro"
import { hyundaiKonaElectric } from "./hyundai-kona-electric"
import { volkswagenId3 } from "./volkswagen-id3"
import { renaultZoe } from "./renault-zoe"
import { mg4 } from "./mg4"
import { mgZsEv } from "./mg-zs-ev"
import { bmwI3 } from "./bmw-i3"
import { peugeotE208 } from "./peugeot-e-208"
import { vauxhallCorsaE } from "./vauxhall-corsa-e"
import { jaguarIPace } from "./jaguar-i-pace"
import { polestar2 } from "./polestar-2"

export type { EvModel, EvBattery, EvFaq } from "./types"

// The used electric cars buyers ask about most, in the order they appear on the site.
export const evModels: EvModel[] = [
  teslaModel3,
  teslaModelY,
  nissanLeaf,
  kiaENiro,
  hyundaiKonaElectric,
  volkswagenId3,
  renaultZoe,
  mg4,
  mgZsEv,
  bmwI3,
  peugeotE208,
  vauxhallCorsaE,
  jaguarIPace,
  polestar2,
]

export function getEvModel(slug: string) {
  return evModels.find((model) => model.slug === slug)
}

export function evModelPath(model: Pick<EvModel, "slug">) {
  return `/ev-battery-health-check/${model.slug}`
}
