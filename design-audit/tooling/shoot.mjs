// Screenshots every real legacy page at 3 widths and records console errors,
// horizontal overflow, and page height. Usage: node shoot.mjs <outDir>
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const req = createRequire(join(execSync("npm root -g").toString().trim(), "@playwright/mcp/package.json"));
const { chromium } = req("playwright-core");

const out = process.argv[2];
mkdirSync(out, { recursive: true });
const BASE = "http://localhost:3100/en";
const ROUTES = [
  "", "/properties", "/properties/villa-cocody", "/rentals", "/rentals/WS-ABJ-01",
  "/hotels", "/hotels/HT-ABJ-01", "/map", "/about", "/contact", "/partners",
  "/legal/terms", "/legal/privacy", "/login", "/register", "/register/owner",
  "/register/hotel", "/forgot-password", "/reset-password", "/verify-email",
  "/owner", "/owner/properties", "/owner/properties/new", "/owner/rentals",
  "/owner/rentals/main-villa/availability", "/owner/documents",
  "/admin", "/admin/listings", "/admin/users", "/admin/transactions",
];
const WIDTHS = [390, 768, 1440];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
for (const route of ROUTES) {
  const slug = route === "" ? "home" : route.slice(1).replaceAll("/", "__");
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errors.push(("PAGEERROR " + e.message).slice(0, 200)));
    let status = 0;
    try {
      const res = await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 120000 });
      status = res?.status() ?? 0;
      await page.waitForTimeout(800);
      const m = await page.evaluate(() => ({
        scrollW: document.documentElement.scrollWidth,
        h: document.documentElement.scrollHeight,
        title: document.title,
        h1: document.querySelector("h1")?.textContent?.trim().slice(0, 80) ?? null,
      }));
      await page.screenshot({ path: join(out, `${slug}@${width}.jpg`), fullPage: true, type: "jpeg", quality: 60 });
      report.push({ route, width, status, overflowX: m.scrollW > width, scrollW: m.scrollW, height: m.h, title: m.title, h1: m.h1, errors });
    } catch (e) {
      report.push({ route, width, status, error: String(e).slice(0, 200), errors });
    }
    await page.close();
  }
  console.log("done", route);
}
await browser.close();
writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
