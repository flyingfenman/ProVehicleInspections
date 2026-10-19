"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
            Pro Vehicle Inspections
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <a href="tel:+441992245660" className="hidden lg:inline-flex items-center gap-2 text-base font-semibold text-primary hover:underline">
              <Phone className="h-5 w-5" aria-hidden="true" /> 01992 245660
            </a>
            <Button
              asChild
              size="lg"
              className="text-base font-semibold bg-[#0d9488] text-white hover:bg-[#0b7a70] border-2 border-[#0b7a70] shadow-md"
            >
              <Link href="/book">Book an Inspection</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-base font-semibold bg-[#2563eb] text-white hover:bg-[#1d4ed8] border-2 border-[#1d4ed8] shadow-md"
            >
              <Link href="/ev-battery-health-check">EV Battery Check</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base bg-[#6711a4] text-white hover:bg-[#6711a4]/90 border-[#6711a4]"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-1 md:hidden">
            <a
              href="tel:+441992245660"
              className="flex h-11 w-11 items-center justify-center rounded-md text-primary"
              aria-label="Call 01992 245660"
            >
              <Phone className="h-6 w-6" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav id="mobile-menu" className="md:hidden mt-4 pb-4 space-y-2">
            <Button asChild className="flex h-12 w-full font-semibold bg-[#0d9488] text-white hover:bg-[#0b7a70]" size="lg">
              <Link href="/book" onClick={() => setIsMenuOpen(false)}>
                Book an Inspection
              </Link>
            </Button>
            <Button asChild className="flex h-12 w-full font-semibold bg-[#2563eb] text-white hover:bg-[#1d4ed8]" size="lg">
              <Link href="/ev-battery-health-check" onClick={() => setIsMenuOpen(false)}>
                EV Battery Check
              </Link>
            </Button>
            <Button asChild className="flex h-12 w-full bg-[#6711a4] text-white hover:bg-[#6711a4]/90" size="lg">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex h-12 w-full font-semibold text-primary" size="lg">
              <a href="tel:+441992245660">
                <Phone className="h-5 w-5" aria-hidden="true" /> Call 01992 245660
              </a>
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
