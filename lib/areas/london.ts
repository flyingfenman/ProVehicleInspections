import type { Area } from "./types"

export const london: Area = {
  slug: "vehicle-inspection-london",
  kind: "city",
  name: "London",
  h1: "Pre-Purchase Vehicle Inspection London",
  title: "Pre-Purchase Vehicle Inspection London",
  description:
    "Independent mobile vehicle inspections across London from £199.99. Diagnostic scan, road test, history check, same-day video report and EV battery health checks.",
  schemaType: "City",
  intro:
    "Buying a used car in London? We inspect it at the dealer, the car supermarket or the seller's door before you commit, with full diagnostics, a road test, a history check and a video report the same day. We cover all of Greater London.",
  travel: {
    summary: "Covering all of Greater London, from Enfield to Croydon, at one price with no mileage charge",
    detail:
      "The price is the same anywhere inside the M25, with no mileage or call-out charge, and our own vehicle is ULEZ compliant, so nothing is added for an inspection inside the zone. Book online, tell us where the car is, and we arrange the time with the seller or dealer. You get the video, the photos and the written report the same day, and we call you to go through them.",
  },
  local: [
    "London has the biggest choice of used cars in the country: car supermarkets with thousands of cars on one site, main-dealer approved-used centres, long rows of independents on the North Circular and the A13, and a huge private market. Wherever the car is, we inspect it before the deposit goes down.",
    "We inspect petrol, diesel, hybrid and electric cars wherever they are for sale. Both packages include a full diagnostic scan, a road test, a history check for finance, write-offs, theft and mileage, a video review filmed at the car and a same-day written report with photos, followed by a call to go through it with you. You decide with the facts in front of you, and you negotiate on what the car is rather than what the advert says.",
  ],
  places: [
    {
      name: "Car supermarkets",
      note: "The large sites in West London and on the North Circular sell hundreds of cars a week and prepare them to a standard, not to your car. We inspect at the site once the car is reserved, and the Premium package's auction and previous-advert searches show where the car came from.",
    },
    {
      name: "Enfield, Edmonton and the Great Cambridge Road",
      note: "A dense run of independents and larger used-car sites along the A10 and A406.",
    },
    {
      name: "Ilford, Romford and the A13",
      note: "East London's dealer strips through Barking, Dagenham and Rainham.",
    },
    {
      name: "Main-dealer approved-used centres",
      note: "Approved-used Mercedes, BMW, Audi, Tesla and Land Rover across the capital. A franchised badge means a prepared car, not an independently checked one.",
    },
    {
      name: "Private sellers across Greater London",
      note: "From Croydon to Barnet. Private sales carry no Consumer Rights Act protection, so the inspection is the only check you get.",
    },
  ],
  nearby: ["Enfield", "Chingford", "Walthamstow", "Ilford", "Romford", "Barnet", "Stratford", "Barking", "Croydon", "Watford border", "Wembley", "Bromley"],
  postcodes: "E, N, NW, EC, WC, W, SW, SE, IG, RM, EN and HA",
  faqs: [
    {
      question: "Can you inspect a car at a car supermarket before I pay?",
      answer:
        "Yes. Reserve the car, tell the sales team an independent inspector is coming, and we arrange a time with them. Large sites are used to it. We inspect on their premises, road test where they allow it, and send you the video and report the same day.",
    },
    {
      question: "How do I know if the car is ULEZ compliant?",
      answer:
        "We read the emissions standard from the car's own data and the V5C details during the inspection, so you are not relying on the advert. As a rule petrol cars from about 2006 and diesels from about September 2015 comply, but there are exceptions both ways.",
    },
    {
      question: "Do you charge extra for South London, Croydon, Bromley or Kingston?",
      answer:
        "No. The price is the same anywhere in Greater London, with no mileage or call-out charge: Standard £199.99, Premium £249.99, and the EV battery check £149.99.",
    },
    {
      question: "Can you do an EV battery check on a used Tesla in London?",
      answer:
        "Yes. The CARA Approved Autel State of Health test runs on compatible Teslas and most other EVs. Add it to an inspection for £49.99 or book it on its own for £149.99. Send us the model and year first and we will confirm it is compatible.",
    },
  ],
  related: ["pre-purchase-car-inspection-essex", "vehicle-inspection-hertfordshire", "vehicle-inspection-luton"],
  updated: "2026-10-20",
}
