"use client"

import { useEffect, useState, type ReactNode } from "react"
import { INSPECTION_GROUPS, type InspectionGroup } from "@/lib/inspection-packages"
import { scrollToAnchorWhileLoading } from "@/lib/scroll-to-anchor"

// The two tabs over the prices: buying a car, or a fault after garage work. Both panels are in the page for search
// engines; only the chosen one shows. A #mechanical-inspection link opens the mechanical tab.
export function PricingTabs({ panels }: { panels: Record<InspectionGroup, ReactNode> }) {
  const [group, setGroup] = useState<InspectionGroup>("pre-purchase")

  useEffect(() => {
    if (window.location.hash !== "#mechanical-inspection") return
    setGroup("mechanical")
    return scrollToAnchorWhileLoading("prices")
  }, [])

  return (
    <>
      <div role="tablist" aria-label="Type of inspection" className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-1 rounded-2xl border border-primary/20 bg-primary/5 p-1">
        {INSPECTION_GROUPS.map((tab) => {
          const active = group === tab.key
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${tab.key}`}
              onClick={() => setGroup(tab.key)}
              className={`min-h-12 rounded-xl px-3 text-sm font-bold transition sm:text-lg ${active ? "bg-primary text-primary-foreground shadow-md" : "text-primary hover:bg-white"}`}
            >
              {tab.name}
            </button>
          )
        })}
      </div>

      {INSPECTION_GROUPS.map((tab) => (
        <div key={tab.key} id={`panel-${tab.key}`} role="tabpanel" aria-labelledby={`tab-${tab.key}`} hidden={group !== tab.key}>
          {panels[tab.key]}
        </div>
      ))}
    </>
  )
}
