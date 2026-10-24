import { defineConfig, devices } from "@playwright/test";

// Runs against the production build (`pnpm build` first; `pnpm check` does).
const port = 3100;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  // In CI, also write the HTML report and traces that ci.yml uploads on failure.
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: { baseURL: `http://localhost:${port}`, trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `pnpm start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
  },
});
