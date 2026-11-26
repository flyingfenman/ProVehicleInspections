"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

// notice is the line shown under the header while Henry is away (components/away-notice.tsx), or nothing.
export function LayoutWrapper({ children, notice }: { children: React.ReactNode; notice?: React.ReactNode }) {
  return (
    <>
      <Header />
      {notice}
      {children}
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
