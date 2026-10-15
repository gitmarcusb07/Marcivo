import { chromium } from "playwright";
const url = process.argv[2] || "https://prmovies.futbol/?s=resident+evil";
const b = await chromium.launch({ headless: true });
try {
  const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36" });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 }).catch((e) => console.log("GOTO_ERR:" + String(e).slice(0, 150)));
  for (let i = 0; i < 5; i++) {
    await p.waitForTimeout(5000);
    const t = await p.title().catch(() => "?");
    console.log(`T+${(i + 1) * 5}s TITLE:` + t.slice(0, 80));
    if (!/just a moment/i.test(t)) break;
  }
  console.log("URL:" + p.url());
  const links = await p.locator("article a[href], .post a[href], main a[href]").evaluateAll(
    (els) => els.slice(0, 12).map((e) => ({ t: (e.textContent || "").trim().slice(0, 90), h: e.getAttribute("href") }))
  ).catch(() => []);
  console.log("LINKS:" + JSON.stringify(links, null, 1).slice(0, 3000));
} finally { await b.close().catch(() => {}); }
