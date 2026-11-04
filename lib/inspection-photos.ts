export type InspectionPhoto = {
  src: string
  /** The car as it reads under the photo. */
  car: string
  alt: string
  width: number
  height: number
  /** Where to anchor the crop when the photo fills a box of a different shape. */
  position?: string
}

// Henry's own photos from real inspections, each with the Pro Vehicle Inspections plate on the front. Plates on
// other cars in the background are blurred and the phone's location data is stripped. No registrations in alt text.
export const inspectionPhotos = {
  rangeRover: {
    src: "/images/inspections/range-rover-sport-inspection.webp",
    car: "Range Rover Sport",
    alt: "Black Range Rover Sport on ramps with a Pro Vehicle Inspections plate, during a pre-purchase inspection at a dealer",
    width: 1200,
    height: 900,
    position: "70% center",
  },
  van: {
    src: "/images/inspections/citroen-relay-van-inspection.webp",
    car: "Citroën Relay van",
    alt: "White Citroën Relay van on ramps with a Pro Vehicle Inspections plate, ready for its pre-purchase inspection",
    width: 1200,
    height: 900,
    position: "60% center",
  },
  polo: {
    src: "/images/polo-inspection.webp",
    car: "Volkswagen Polo",
    alt: "Black Volkswagen Polo on ramps with the bonnet up and a Pro Vehicle Inspections plate, mid inspection",
    width: 750,
    height: 1000,
    position: "center 45%",
  },
  grandland: {
    src: "/images/inspections/vauxhall-grandland-inspection.webp",
    car: "Vauxhall Grandland X",
    alt: "White Vauxhall Grandland X on ramps with a Pro Vehicle Inspections plate, at a dealer before its inspection",
    width: 900,
    height: 1200,
    position: "center 55%",
  },
  grandlandWheel: {
    src: "/images/inspections/vauxhall-grandland-wheel-on-ramps.webp",
    car: "Up on the ramps",
    alt: "Front wheel of a white Vauxhall Grandland X raised on a black ramp, so the underside can be checked",
    width: 1200,
    height: 900,
    position: "center 40%",
  },
} satisfies Record<string, InspectionPhoto>

export const recentInspectionPhotos: InspectionPhoto[] = [
  inspectionPhotos.rangeRover,
  inspectionPhotos.van,
  inspectionPhotos.polo,
  inspectionPhotos.grandland,
  inspectionPhotos.grandlandWheel,
]
