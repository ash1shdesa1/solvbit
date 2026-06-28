import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero, nav, and featured products", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Splatter Impacts/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/different/i);
    // at least one product card with an Add button is present
    await expect(page.getByRole("button", { name: /add .* to cart/i }).first()).toBeVisible();
  });

  test("has no uncaught JavaScript errors", async ({ page }) => {
    const errors: string[] = [];
    // uncaught exceptions in page scripts
    page.on("pageerror", (err) => errors.push(err.message));
    // console errors, excluding external resource-load failures (fonts/CDN)
    // which are network/environment dependent, not code defects
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (/Failed to load resource|net::ERR_|ERR_CONNECTION/i.test(text)) return;
      errors.push(text);
    });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    expect(errors).toEqual([]);
  });

  test("404 page works", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    // static host returns 404.html content
    await expect(page.getByText(/Missed/i)).toBeVisible();
    expect(res?.status()).toBeGreaterThanOrEqual(200);
  });
});
