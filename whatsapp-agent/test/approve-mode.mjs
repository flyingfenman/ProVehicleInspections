import crypto from "node:crypto"
const W = "http://127.0.0.1:8787", M = "http://127.0.0.1:8788"
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const sign = (b) => "sha256=" + crypto.createHmac("sha256", "appsecret").update(b).digest("hex")
let n = 0
const ok = (cond, msg) => { console.log((cond ? "PASS " : "FAIL ") + msg); if (!cond) process.exitCode = 1 }
async function hook(value, field = "messages") {
  const body = JSON.stringify({ object: "whatsapp_business_account", entry: [{ changes: [{ field, value: { messaging_product: "whatsapp", metadata: { phone_number_id: "PHONEID" }, ...value } }] }] })
  return fetch(W + "/webhook", { method: "POST", body, headers: { "x-hub-signature-256": sign(body), "content-type": "application/json" } })
}
const cust = (from, text, extra = {}) => hook({ contacts: [{ wa_id: from, profile: { name: "Asha Patel" } }], messages: [{ from, id: "wamid.in" + ++n, timestamp: String(Math.floor(Date.now() / 1000)), type: "text", text: { body: text }, ...extra }] })
const log = async () => (await fetch(M + "/__log")).json()
const claudeCalls = async () => (await log()).filter((e) => e.url.startsWith("/v1/messages"))
const sends = async () => (await log()).filter((e) => e.url.includes("PHONEID/messages") && e.body?.type === "text")

// 1 verify
let r = await fetch(W + "/webhook?hub.mode=subscribe&hub.verify_token=verify&hub.challenge=123")
ok(r.status === 200 && (await r.text()) === "123", "webhook verification echoes the challenge")
r = await fetch(W + "/webhook?hub.mode=subscribe&hub.verify_token=wrong&hub.challenge=123")
ok(r.status === 403, "wrong verify token refused")
r = await fetch(W + "/webhook", { method: "POST", body: "{}", headers: { "x-hub-signature-256": "sha256=00" } })
ok(r.status === 401, "unsigned webhook refused")
r = await fetch(W + "/inbox?k=nope"); ok(r.status === 404, "drafts page hidden without key")

// 2 customer writes twice, one reply drafted after the wait
await cust("447700900001", "(Ref: Pro Vehicle Inspections, google ads) Hi how much for a Tesla check?")
await sleep(1500)
ok((await claudeCalls()).length === 0, "no draft before the minimum wait")
await cust("447700900001", "It's in Barking, reg AB12 CDE")
await sleep(2000)
ok((await claudeCalls()).length === 0, "second message restarts the wait")
await sleep(3000)
const calls = await claudeCalls()
ok(calls.length === 1, "one draft for both messages, after the wait")
const req = calls[0]?.body
ok(req?.model === "claude-opus-5-5" && req.messages.length === 2 && req.messages[1].content.at(-1).text.includes("Barking"), "Claude got both customer messages")
ok(JSON.stringify(req.system).includes("FREE TIMES") && JSON.stringify(req.system).includes("10:00"), "Claude got the free times")
ok((await sends()).length === 0, "approve mode: nothing sent on its own")

// 3 Henry's page
let page = await (await fetch(W + "/inbox?k=adminkey")).text()
ok(page.includes("Waiting for you") && page.includes("Asha Patel"), "inbox lists the waiting draft")
page = await (await fetch(W + "/chat/447700900001?k=adminkey")).text()
const url = page.match(/http:\/\/127\.0\.0\.1:8788\/book\?[^<\s]+/)?.[0]?.replace(/&amp;/g, "&")
ok(url?.includes("package=premium") && url.includes("battery=1") && url.includes("time=10%3A00") && url.includes("reg=AB12CDE"), "booking link built: " + url)
const draftId = page.match(/name="draft" value="([^"]+)"/)?.[1]
const form = new URLSearchParams({ k: "adminkey", draft: draftId, text: "Hi Asha, Premium is £199.99.\n" + url + "\nThanks, Henry" })
r = await fetch(W + "/chat/447700900001/send", { method: "POST", body: form, redirect: "manual" })
ok(r.status === 303 && decodeURIComponent(r.headers.get("location")).includes("Sent"), "Henry presses Send: " + decodeURIComponent(r.headers.get("location") ?? ""))
const s = await sends()
ok(s.length === 1 && s[0].body.to === "447700900001" && s[0].body.text.body.startsWith("Hi Asha"), "the edited reply went to the customer")
ok((await log()).some((e) => e.body?.typing_indicator), "typing indicator shown first")

// 4 stale draft refused
r = await fetch(W + "/chat/447700900001/send", { method: "POST", body: new URLSearchParams({ k: "adminkey", draft: draftId, text: "again" }), redirect: "manual" })
ok(decodeURIComponent(r.headers.get("location")).includes("out of date"), "old draft can't be sent twice")

// 5 Henry replies from the app, agent goes quiet
await hook({ message_echoes: [{ from: "441992245660", to: "447700900002", id: "wamid.echo1", timestamp: String(Math.floor(Date.now() / 1000)), type: "text", text: { body: "Hi, I can do Thursday" } }] }, "smb_message_echoes")
await cust("447700900002", "Great, Thursday works")
await sleep(5000)
ok((await claudeCalls()).length === 1, "after Henry replied himself, the agent stays out of that chat")
page = await (await fetch(W + "/chat/447700900002?k=adminkey")).text()
ok(page.includes("Let the assistant answer again"), "page offers to hand the chat back")

// 6 a thank you needs no reply
await fetch(M + "/__claude", { method: "POST", body: JSON.stringify({ should_reply: false, reply: "", booking_link: null, needs_henry: false, note_for_henry: "" }) })
await cust("447700900001", "Thanks!")
await sleep(4500)
ok((await claudeCalls()).length === 2, "thanks message still gets looked at")
ok((await sends()).length === 1, "nothing sent when no reply is needed")
page = await (await fetch(W + "/inbox?k=adminkey")).text()
ok(page.includes("No reply needed"), "inbox shows no reply needed")

// 7 rule checks in code
await fetch(M + "/__claude", { method: "POST", body: JSON.stringify({ should_reply: true, reply: "Hi — we do a full HPI check, happy to give you a call", booking_link: { package: "standard", battery: false, date: "2026-12-25", time: "10:00", reg: null }, needs_henry: false, note_for_henry: "" }) })
await cust("447700900003", "Hi do you do history checks?")
await sleep(4500)
page = await (await fetch(W + "/chat/447700900003?k=adminkey")).text()
ok(!page.includes("—") && page.includes("Hi, we do"), "em dash removed")
ok(page.includes("names another company") && page.includes("mentions a call") && page.includes("is not free"), "rule slips flagged for Henry")
ok(!page.includes("date=2026-12-25"), "a time that isn't free is left out of the link")

// 8 photo goes to Claude
await fetch(M + "/__claude", { method: "POST", body: JSON.stringify({ should_reply: true, reply: "Thanks for the photo.\nThanks, Henry", booking_link: null, needs_henry: false, note_for_henry: "" }) })
await cust("447700900004", "", { type: "image", text: undefined, image: { id: "MEDIA1", caption: "this one" } })
await sleep(4500)
const last = (await claudeCalls()).at(-1).body
ok(last.messages.at(-1).content[0].type === "image" && last.messages.at(-1).content[1].text.includes("[photo] this one"), "photo and caption passed to Claude")
// 9 voice note flagged
await cust("447700900005", "", { type: "audio", text: undefined, audio: { id: "A1", voice: true } })
await sleep(4500)
page = await (await fetch(W + "/chat/447700900005?k=adminkey")).text()
ok(page.includes("can&#39;t hear or read"), "voice note flagged for Henry")
