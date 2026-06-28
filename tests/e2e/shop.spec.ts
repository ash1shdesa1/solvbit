import { test, expect } from "@playwright/test";

test.describe("Shop & product", () => {
  test("category filter narrows the grid", async ({ page }) => {
    await page.goto("/shop");
    const allCount = await page.locator(".product-cell:visible").count();
    expect(allCount).toBeGreaterThan(0);

    await page.getByRole("button", { name: /reactive steel/i }).click();
    const reactiveCells = page.locator(".product-cell:visible");
    const reactiveCount = await reactiveCells.count();
    expect(reactiveCount).toBeGreaterThan(0);
    expect(reactiveCount).toBeLessThanOrEqual(allCount);
    // every visible cell is in the reactive category
    for (const cell of await reactiveCells.all()) {
      await expect(cell).toHaveAttribute("data-category", "reactive");
    }
  });

  test("deep link to a category preselects the filter", async ({ page }) => {
    await page.goto("/shop?c=splatter");
    for (const cell of await page.locator(".product-cell:visible").all()) {
      await expect(cell).toHaveAttribute("data-category", "splatter");
    }
  });

  test("product page changes price when variant changes", async ({ page }) => {
    await page.goto("/products/burst-bullseye");
    const price = page.locator("[data-price]");
    const before = await price.textContent();
    await page.locator("#variant").selectOption({ index: 1 });
    await expect(price).not.toHaveText(before || "");
  });

  test("add to cart from product page respects selected variant", async ({ page }) => {
    await page.goto("/products/burst-bullseye");
    await page.locator("#variant").selectOption({ index: 1 });
    await page.getByRole("button", { name: /^add to cart$/i }).click();
    await expect(page.locator("[data-cart-count]")).toHaveText("1");
    await expect(page.locator("[data-cart-items]")).toContainText("100 pack");
  });
});
