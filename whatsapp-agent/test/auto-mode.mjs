import crypto from "node:crypto"
const W = "http://127.0.0.1:8787", M = "http://127.0.0.1:8788"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const sign = (b) => "sha256=" + crypto.createHmac("sha256", "appsecret").update(b).digest("hex")
const ok = (c, m) => { console.log((c ? "PASS " : "FAIL ") + m); if (!c) process.exitCode = 1 }
const cust = (from, text, id) => { const body = JSON.stringify({ entry: [{ changes: [{ field: "messages", value: { metadata: { phone_number_id: "PHONEID" }, contacts: [{ wa_id: from, profile: { name: "Ben" } }], messages: [{ from, id, timestamp: String(Math.floor(Date.now() / 1000)), type: "text", text: { body: text } }] } }] }] }); return fetch(W + "/webhook", { method: "POST", body, headers: { "x-hub-signature-256": sign(body) } }) }
const log = async () => (await fetch(M + "/__log")).json()
const sends = async () => (await log()).filter((e) => e.url.includes("PHONEID/messages") && e.body?.type === "text")
const before = (await sends()).length
const d = new Date(Date.now() + 2 * 864e5).toISOString().slice(0, 10)
await fetch(M + "/__claude", { method: "POST", body: JSON.stringify({ should_reply: true, reply: "Hi Ben, Standard is £199.99.\n[BOOKING_LINK]\nThanks, Henry", booking_link: { package: "standard", battery: false, date: d, time: "10:00", reg: null }, needs_henry: false, note_for_henry: "" }) })
const t0 = Date.now()
await cust("447700900010", "price for a standard check?", "wamid.auto1")
for (let i = 0; i < 60 && (await sends()).length === before; i++) await sleep(250)
const s = (await sends()).at(-1)
ok((await sends()).length === before + 1 && s.body.text.body.includes(`/book?package=standard&date=${d}&time=10:00`), "auto mode sends a simple reply by itself: " + JSON.stringify(s?.body.text.body))
ok(Date.now() - t0 >= 3000, `waited ${(Date.now() - t0) / 1000}s (minimum 3s in this test, 60s live)`)
await fetch(M + "/__claude", { method: "POST", body: JSON.stringify({ should_reply: true, reply: "Hi, I will check about the van.\nThanks, Henry", booking_link: null, needs_henry: true, note_for_henry: "Asks about a Transit van." }) })
await cust("447700900011", "do you inspect vans?", "wamid.auto2")
await sleep(6000)
ok((await sends()).length === before + 1, "unusual question waits for Henry even in auto mode")
const page = await (await fetch(W + "/chat/447700900011?k=adminkey")).text()
ok(page.includes("Asks about a Transit van"), "Henry sees why")
const tp = await (await fetch(W + "/try", { method: "POST", body: new URLSearchParams({ k: "adminkey", text: "how much?" }) })).text()
ok(tp.includes("The assistant would say") && tp.includes("Would wait for you"), "try page drafts a reply without WhatsApp")
