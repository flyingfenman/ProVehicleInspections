// Tells Bing, Yandex and the other IndexNow engines which pages exist, straight after a deploy, so new area pages,
// guides and notes are crawled within hours rather than whenever the sitemap is next read. Runs as part of
// `pnpm run cf:deploy` on Cloudflare Builds. It never fails the deploy: any problem is logged and the script exits 0.
// The key file is public/<key>.txt (served at the site root), which is how IndexNow proves we own the host.

const HOST = "www.provehicleinspections.com"
const KEY = "b778eca1666d80eba31be3a12877838a"
const SITEMAP = `https://${HOST}/sitemap.xml`

async function main() {
  const response = await fetch(SITEMAP, { headers: { "user-agent": "provehicleinspections-indexnow/1.0" } })
  if (!response.ok) throw new Error(`sitemap fetch failed: ${response.status}`)
  const xml = await response.text()
  const urls = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((match) => match[1]).filter((url) => url.includes(HOST))
  if (urls.length === 0) throw new Error("no URLs found in the sitemap")

  const submit = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
  })
  // 200 = accepted, 202 = accepted and the key will be checked later. Anything else is worth seeing in the build log.
  console.log(`IndexNow: submitted ${urls.length} URLs, response ${submit.status}`)
}

main().catch((error) => {
  console.error("IndexNow submission skipped:", error instanceof Error ? error.message : error)
})
