import { DurableObject } from "cloudflare:workers"
import type { Env } from "./env"

export type InboxStatus = "waiting" | "sent" | "henry" | "quiet" | "error"

export type InboxItem = {
  waId: string
  name: string
  preview: string
  status: InboxStatus
  note: string
  updatedAt: number
}

const KEEP = 60

// The list on the drafts page: chats waiting for Henry first, then what happened recently.
export class Inbox extends DurableObject<Env> {
  async set(item: InboxItem): Promise<void> {
    const items = (await this.ctx.storage.get<Record<string, InboxItem>>("items")) ?? {}
    items[item.waId] = item
    const kept = Object.values(items)
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, KEEP)
    await this.ctx.storage.put("items", Object.fromEntries(kept.map((i) => [i.waId, i])))
  }

  async list(): Promise<InboxItem[]> {
    const items = Object.values((await this.ctx.storage.get<Record<string, InboxItem>>("items")) ?? {})
    return items.sort((a, b) => Number(b.status === "waiting") - Number(a.status === "waiting") || b.updatedAt - a.updatedAt)
  }
}
