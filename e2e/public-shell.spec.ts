import { expect, test, type Page } from "@playwright/test";

/**
 * Phase 2 acceptance: the public shell (design-audit/frontend-improvement-roadmap.md §1).
 * Runs at 360px and 1440px (see playwright.config.ts projects).
 */

const isPhone = (page: Page) => (page.viewportSize()?.width ?? 1440) < 768;
const isDesktop = (page: Page) => (page.viewportSize()?.width ?? 0) >= 1024;

test("unprefixed URLs redirect to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

test("html lang follows the locale, server-rendered", async ({ page }) => {
  await page.goto("/fr");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cameroun");
});

test("no horizontal scroll on any shell page", async ({ page }) => {
  for (const path of ["/en", "/en/properties", "/fr/hotels", "/en/saved", "/en/does-not-exist"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});

test("floating pill nav marks the current section", async ({ page }) => {
  test.skip(!isDesktop(page), "desktop links are in the pill; phones use the menu sheet");
  await page.goto("/en/hotels");
  const nav = page.getByRole("navigation", { name: "Main navigation" }).first();
  await expect(nav.getByRole("link", { name: "Hotels" })).toHaveAttribute("aria-current", "page");
  await nav.getByRole("link", { name: "Properties" }).click();
  await expect(page).toHaveURL(/\/en\/properties$/);
  await expect(nav.getByRole("link", { name: "Properties" })).toHaveAttribute("aria-current", "page");
});

test("the pill is detached from the viewport edges and stays put on scroll", async ({ page }) => {
  await page.goto("/en/properties");
  const pill = page.locator("header > div").first();
  const before = await pill.boundingBox();
  expect(before?.y).toBeGreaterThan(0);
  expect(before?.x).toBeGreaterThan(0);
  await page.mouse.wheel(0, 600);
  await page.waitForTimeout(150);
  expect((await pill.boundingBox())?.y).toBe(before?.y);
});

test("menu sheet opens as a dialog, keeps focus inside, closes on Escape", async ({ page }) => {
  test.skip(isDesktop(page), "the menu button only exists below 1024px");
  await page.goto("/en/hotels");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    // After the last control Chrome moves focus to its own UI (activeElement = body);
    // what must never happen is focus landing on page content behind the sheet.
    const outside = await page.evaluate(() => {
      const el = document.activeElement;
      return !!el && el !== document.body && !el.closest("dialog");
    });
    expect(outside).toBe(false);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("bottom tab bar on phones only", async ({ page }) => {
  await page.goto("/en/map");
  const bar = page.getByRole("navigation", { name: "Quick navigation" });
  if (isPhone(page)) {
    await expect(bar).toBeVisible();
    await expect(bar.getByRole("link", { name: "Map" })).toHaveAttribute("aria-current", "page");
  } else {
    await expect(bar).toBeHidden();
  }
});

test("keyboard focus is never hidden under the floating pills", async ({ page }) => {
  await page.goto("/en/properties");
  for (let i = 0; i < 30; i++) {
    await page.keyboard.press("Tab");
    const hidden = await page.evaluate(() => {
      const el = document.activeElement;
      // The skip link is meant to appear above the pill when focused.
      if (!el || el === document.body || el.closest("header") || el.closest("nav.fixed")) return null;
      if (el.getAttribute("href") === "#main") return null;
      const r = el.getBoundingClientRect();
      const top = document.querySelector("header > div")?.getBoundingClientRect();
      const bottom = document.querySelector("nav.fixed ul")?.getBoundingClientRect();
      const underTop = top && r.top < top.bottom && r.bottom > top.top;
      const underBottom = bottom && bottom.height > 0 && r.bottom > bottom.top && r.top < bottom.bottom;
      return underTop || underBottom ? el.outerHTML.slice(0, 80) : null;
    });
    expect(hidden).toBeNull();
  }
});

test("language switch keeps the page and works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/en/hotels");
  await page.getByRole("link", { name: "Passer en français" }).first().click();
  await expect(page).toHaveURL(/\/fr\/hotels$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await context.close();
});

test("theme choice applies before paint and persists", async ({ page }) => {
  await page.goto("/en");
  // The radio inputs are visually hidden; people click the visible label.
  const footer = page.getByRole("contentinfo");
  await footer.locator("label", { hasText: "Dark" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(footer.getByRole("radio", { name: "Dark" })).toBeChecked();
});

test("unknown pages show a 404 inside the shell", async ({ page }) => {
  const response = await page.goto("/en/does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "We can't find that page" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Annorent home" })).toBeVisible();
});

test("skip link reaches the main content", async ({ page }) => {
  await page.goto("/en/hotels");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to main content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();
});

test("design preview is not reachable in production", async ({ page }) => {
  const response = await page.goto("/en/design-preview");
  expect(response?.status()).toBe(404);
});

test("pill contents fit inside the pill at every width", async ({ page }) => {
  await page.goto("/fr/properties"); // French labels are the longest
  const pill = await page.locator("header > div").first().boundingBox();
  const controls = page.locator("header > div").first().locator("a:visible, button:visible");
  const count = await controls.count();
  for (let i = 0; i < count; i++) {
    const box = await controls.nth(i).boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(pill!.x);
    expect(box!.x + box!.width).toBeLessThanOrEqual(pill!.x + pill!.width + 0.5);
  }
  const signIn = page.locator("header > div").first().getByRole("link", { name: "Se connecter" });
  if (isDesktop(page)) await expect(signIn).toBeVisible();
  else await expect(signIn).toBeHidden();
});
