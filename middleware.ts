import { NextResponse, type NextRequest } from "next/server"
import { classifyVisit } from "@/lib/traffic-source"

// Where the visitor came from, as the server saw it, handed to the page in a Server-Timing header.
// iPhone Safari (iOS 26 and later) often hides document.referrer from the page's own script while still sending the
// Referer header with the request, so WhatsApp notes and bookings were losing their source (shown as no source at all).
// The page reads this with performance.getEntriesByType("navigation") (lib/traffic-source.ts). Nothing is stored.
const SOURCE_TIMING_NAME = "pvi-src" // Read by sourceSeenByServer() in lib/traffic-source.ts.

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  if (request.headers.get("sec-fetch-dest") !== "document" && !request.headers.get("accept")?.includes("text/html")) {
    return response
  }
  try {
    const visit = classifyVisit(request.headers.get("referer") || "", request.nextUrl.search)
    if (visit) {
      const description = encodeURIComponent(`${visit.label.slice(0, 40)}|${visit.detail.slice(0, 60)}`)
      response.headers.append("Server-Timing", `${SOURCE_TIMING_NAME};desc="${description}"`)
    }
  } catch {
    // Unknown source: the page falls back to what its own script can see.
  }
  return response
}

export const config = {
  // Pages only: not API routes, Next.js files or anything with a file extension (images, icons, robots.txt).
  matcher: ["/((?!api/|_next/|.*\\.[a-zA-Z0-9]+$).*)"],
}
