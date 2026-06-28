import { test, expect } from "@playwright/test";

test.describe("Cart", () => {
  test("add to cart updates badge and opens drawer", async ({ page }) => {
    await page.goto("/shop");
    const addBtn = page.getByRole("button", { name: /add .* to cart/i }).first();
    await addBtn.click();

    // drawer opens
    await expect(page.getByRole("dialog", { name: /shopping cart/i })).toBeVisible();
    // badge shows 1
    const badge = page.locator("[data-cart-count]");
    await expect(badge).toHaveText("1");
    // subtotal footer visible
    await expect(page.locator("[data-cart-footer]")).toBeVisible();
  });

  test("quantity controls and remove work", async ({ page }) => {
    await page.goto("/shop");
    await page.getByRole("button", { name: /add .* to cart/i }).first().click();
    await expect(page.locator("[data-cart-count]")).toHaveText("1");

    await page.locator("[data-qty-inc]").first().click();
    await expect(page.locator("[data-cart-count]")).toHaveText("2");

    await page.locator("[data-remove]").first().click();
    await expect(page.locator("[data-cart-empty]")).toBeVisible();
  });

  test("cart persists across navigation", async ({ page }) => {
    await page.goto("/shop");
    await page.getByRole("button", { name: /add .* to cart/i }).first().click();
    await expect(page.locator("[data-cart-count]")).toHaveText("1");
    await page.goto("/about");
    await expect(page.locator("[data-cart-count]")).toHaveText("1");
  });

  test("checkout in demo mode shows a notice rather than charging", async ({ page }) => {
    await page.goto("/shop");
    await page.getByRole("button", { name: /add .* to cart/i }).first().click();
    await page.getByRole("button", { name: /checkout/i }).click();
    await expect(page.locator("[data-cart-notice]")).toContainText(/demo mode/i);
  });
});
