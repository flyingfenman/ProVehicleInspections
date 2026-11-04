export type InspectionPhoto = {
  src: string
  /** The car as it reads on the "Pictured" label. */
  car: string
  alt: string
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
    position: "70% center",
  },
  grandland: {
    src: "/images/inspections/vauxhall-grandland-inspection.webp",
    car: "Vauxhall Grandland X",
    alt: "White Vauxhall Grandland X on ramps with a Pro Vehicle Inspections plate, at a dealer before its inspection",
    position: "center 55%",
  },
} satisfies Record<string, InspectionPhoto>
