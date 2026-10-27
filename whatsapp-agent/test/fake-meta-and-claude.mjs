import http from "node:http"
const log = []
let claudeReply = null
const tomorrow = new Date(Date.now() + 2 * 864e5)
const d = tomorrow.toISOString().slice(0, 10)
// 10:00 and 11:00 London in late Oct = GMT
const slots = (dur) => [9, 10, 11, 12].map((h) => ({ start: `${d}T${String(h).padStart(2, "0")}:00:00.000Z`, end: new Date(Date.parse(`${d}T${String(h).padStart(2, "0")}:00:00.000Z`) + dur * 60000).toISOString() }))
http.createServer(async (req, res) => {
  let body = ""
  for await (const c of req) body += c
  const entry = { method: req.method, url: req.url, headers: req.headers, body: body ? JSON.parse(body.startsWith("{") ? body : "null") : null }
  if (req.url.startsWith("/__log")) { res.end(JSON.stringify(log)); return }
  if (req.url.startsWith("/__claude")) { claudeReply = entry.body; res.end("ok"); return }
  log.push(entry)
  res.setHeader("content-type", "application/json")
  if (req.url.startsWith("/api/inspection-slots")) return res.end(JSON.stringify({ slotsByPackage: { standard: slots(60), premium: slots(90), ev: slots(60) } }))
  if (req.url.startsWith("/v1/messages")) {
    const answer = claudeReply ?? { should_reply: true, reply: "Hi, Premium is £199.99.\n[BOOKING_LINK]\nThanks, Henry", booking_link: { package: "premium", battery: true, date: d, time: "10:00", reg: "ab12 cde" }, write_off: false, needs_henry: false, note_for_henry: "" }
    return res.end(JSON.stringify({ id: "msg_1", type: "message", role: "assistant", model: "claude-opus-5-5", content: [{ type: "text", text: JSON.stringify(answer) }], stop_reason: "end_turn", stop_details: null, usage: { input_tokens: 1, output_tokens: 1 } }))
  }
  if (req.url.includes("/messages")) return res.end(JSON.stringify(entry.body?.status ? { success: true } : { messages: [{ id: "wamid.out" + log.length }] }))
  if (req.url.startsWith("/v23.0/MEDIA1")) return res.end(JSON.stringify({ url: "http://127.0.0.1:8788/media/x", mime_type: "image/jpeg" }))
  if (req.url.startsWith("/media/x")) { res.setHeader("content-type", "image/jpeg"); return res.end(Buffer.from([0xff, 0xd8, 0xff, 0xd9])) }
  res.statusCode = 404; res.end("{}")
}).listen(8788, () => console.log("mock up", d))
