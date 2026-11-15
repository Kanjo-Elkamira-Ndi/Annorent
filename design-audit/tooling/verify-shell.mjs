// Phase 2 browser verification of the public shell, in real Chrome.
// Usage: node verify-shell.mjs <baseUrl> <outDir>
// Checks: HTTP status, horizontal overflow, <html lang>/data-theme, nav visibility,
// and that keyboard focus is never hidden under the floating pills (WCAG 2.4.11).
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const req = createRequire(join(execSync("npm root -g").toString().trim(), "@playwright/mcp/package.json"));
const { chromium } = req("playwright-core");
const [base, out] = process.argv.slice(2);
mkdirSync(out, { recursive: true });

const ROUTES = ["/en", "/fr", "/en/hotels", "/fr/properties", "/en/saved", "/en/design-preview", "/en/no-such-page"];
const WIDTHS = [360, 768, 1440];
const THEMES = ["light", "dark"];
const report = [];
const browser = await chromium.launch({ channel: "chrome" });

for (const theme of THEMES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 800 } });
    await context.addCookies([{ name: "theme", value: theme, url: base }]);
    for (const route of ROUTES) {
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message.slice(0, 160)));
      page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 160)));
      const res = await page.goto(base + route, { waitUntil: "networkidle" });
      const facts = await page.evaluate(() => {
        const html = document.documentElement;
        const header = document.querySelector("header > div");
        const bottom = document.querySelector('nav[aria-label] ul.grid');
        const visible = (el) => !!el && getComputedStyle(el).display !== "none" && el.getBoundingClientRect().height > 0;
        return {
          lang: html.lang,
          theme: html.getAttribute("data-theme"),
          overflowX: html.scrollWidth > window.innerWidth,
          pill: visible(header) ? header.getBoundingClientRect().toJSON() : null,
          bottomNav: visible(bottom),
          h1: document.querySelector("h1")?.textContent?.trim().slice(0, 60) ?? null,
        };
      });
      // Tab through the page; every focused element must be clear of both pills.
      const obscured = [];
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const hit = await page.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          if (el.closest("header") || el.closest("nav.fixed") || el.closest("dialog")) return null;
          const r = el.getBoundingClientRect();
          const top = document.querySelector("header > div")?.getBoundingClientRect();
          const bot = document.querySelector("nav.fixed ul")?.getBoundingClientRect();
          const underTop = top && r.top < top.bottom && r.bottom > top.top;
          const underBottom = bot && bot.height > 0 && r.bottom > bot.top && r.top < bot.bottom;
          return underTop || underBottom ? (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 40) : null;
        });
        if (hit) obscured.push(hit);
      }
      const name = `${theme}-${width}-${route.slice(1).replaceAll("/", "_") || "root"}`;
      await page.screenshot({ path: join(out, `${name}.jpg`), type: "jpeg", quality: 65, fullPage: true });
      report.push({ theme, width, route, status: res?.status(), ...facts, obscured, errors });
      await page.close();
    }
    await context.close();
  }
}

// Menu sheet at phone width: opens as a dialog, traps focus, closes on Esc.
const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
const page = await ctx.newPage();
await page.goto(base + "/en/hotels", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open menu" }).click();
const dialogOpen = await page.getByRole("dialog", { name: "Menu" }).isVisible();
await page.screenshot({ path: join(out, "menu-open-390.jpg"), type: "jpeg", quality: 65 });
let focusEscaped = false;
for (let i = 0; i < 15; i++) {
  await page.keyboard.press("Tab");
  if (await page.evaluate(() => !document.activeElement?.closest("dialog"))) focusEscaped = true;
}
await page.keyboard.press("Escape");
const closedOnEsc = !(await page.getByRole("dialog", { name: "Menu" }).isVisible());
report.push({ check: "menu-sheet", dialogOpen, focusEscaped, closedOnEsc });

// Language switch: same page, other language, cookie stored.
await page.goto(base + "/en/hotels", { waitUntil: "networkidle" });
await page.getByRole("link", { name: "Passer en français" }).first().click();
await page.waitForLoadState("networkidle");
report.push({ check: "language-switch", url: page.url(), lang: await page.evaluate(() => document.documentElement.lang) });

// Theme switch persists across reloads.
await page.getByRole("contentinfo").locator("label", { hasText: "Sombre" }).click();
await page.reload({ waitUntil: "networkidle" });
report.push({ check: "theme-persist", theme: await page.evaluate(() => document.documentElement.getAttribute("data-theme")) });

await browser.close();
writeFileSync(join(out, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.filter((r) => r.check || r.overflowX || r.obscured?.length || r.errors?.length || (r.status ?? 200) >= 500), null, 1));
console.log("pages checked:", report.filter((r) => r.route).length);
