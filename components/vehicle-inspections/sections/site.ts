import { SERVICE_AREA } from "@/lib/areas/service-area"

// The parts of the inspections page that differ between this site and the Epping and Stamford Car Buyer sites
// it was copied from. 01992 367909 is WhatsApp only, so there is no phone link.
export const SITE = {
  brand: "Pro Vehicle Inspections",
  area: SERVICE_AREA.long,
  serves: SERVICE_AREA.long,
  whatsapp: "https://wa.me/441992367909",
  phoneDisplay: "01992 367909",
}
