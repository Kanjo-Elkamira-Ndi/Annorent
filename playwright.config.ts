import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests (context/QUALITY_AND_TESTING.md §3).
 *
 * Runs against a production build (`npm run build` first), served on
 * port 3300. Uses the locally installed Google Chrome (`channel: "chrome"`),
 * so no Playwright browser download is needed. Viewports cover the design
 * floor (360px phone) and desktop (1440px).
 */
const PORT = 3300;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "phone-360", use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 360, height: 780 }, hasTouch: true } },
    { name: "desktop-1440", use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
