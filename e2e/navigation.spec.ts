import { expect, test } from "@playwright/test";

test("every top-level page loads", async ({ page }) => {
  for (const path of ["/", "/blog", "/projects", "/resume"]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
  }
});

test("the nav reaches Blog and Projects and comes back Home", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation");
  await nav.getByRole("link", { name: "Blog" }).click();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { name: "Blog posts" })).toBeVisible();
  await nav.getByRole("link", { name: "Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await nav.getByRole("link", { name: "Home" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Hi, I'm Dillon.");
});

test("a blog post opens from the blog list", async ({ page }) => {
  await page.goto("/blog");
  const first = page.locator("main a").first();
  const title = await first.textContent();
  await first.click();
  await expect(page).toHaveURL(/\/blog\/.+/);
  expect(title).toBeTruthy();
  await expect(page.locator("main h1")).toBeVisible();
});

test("the Projects page links Fantasy Survivor in a new tab", async ({ page }) => {
  await page.goto("/projects");
  const link = page.getByRole("link", { name: "Fantasy Survivor" });
  await expect(link).toHaveAttribute("href", "https://fantasy-tv-eosin.vercel.app/");
  await expect(link).toHaveAttribute("target", "_blank");
});

test("the landing page moves to a section from its slide dots", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Go to slide 2" }).click();
  await expect(page.getByRole("heading", { level: 2, name: "Copilot" }).first()).toBeVisible();
});

test("the hero's top line stays below the nav with enlarged phone text", async ({ page }) => {
  // iOS Larger Text or an in-app browser's text size scales rem; 19px ≈ +20%.
  await page.setViewportSize({ width: 402, height: 620 });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 19px }" });
  const nav = await page.getByRole("navigation").boundingBox();
  const eyebrow = await page.getByText("Full Stack Engineer").boundingBox();
  expect(eyebrow?.y).toBeGreaterThanOrEqual((nav?.y ?? 0) + (nav?.height ?? 0));
});

test("a long section slide scrolls to its last bullet on a short phone", async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 620 });
  await page.goto("/");
  await page.getByRole("button", { name: "Go to slide 3" }).click();
  const last = page.getByText("Addresses merge conflicts", { exact: false });
  await expect(last).not.toBeInViewport();
  await page.mouse.move(200, 400);
  await page.mouse.wheel(0, 2000); // one gesture from the top: scrolls, doesn't move
  await expect(last).toBeInViewport();
  // The slide scrolled rather than changed, and the heading moved with it.
  await expect(page.getByRole("button", { name: "Go to slide 3" })).toHaveClass(/scale-150/);
});
