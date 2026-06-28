import type { Category, Product } from "@/lib/types";
import { DEMO_PRODUCTS } from "@/data/demo-products";
import { fetchAllProducts, isShopifyConfigured } from "@/lib/shopify";

/**
 * Single source of truth for product data at build time.
 *
 * If Shopify is configured we pull the live catalog; otherwise we serve the
 * original demo catalog so the site always builds and the demo always works.
 * The result is cached for the duration of the build.
 */

let cache: Product[] | null = null;

export const CATALOG_MODE: "live" | "demo" = isShopifyConfigured ? "live" : "demo";

export async function getProducts(): Promise<Product[]> {
  if (cache) return cache;
  if (isShopifyConfigured) {
    try {
      const live = await fetchAllProducts();
      if (live.length > 0) {
        cache = live;
        return cache;
      }
      console.warn("[catalog] Shopify returned 0 products — using demo catalog.");
    } catch (err) {
      console.warn(
        `[catalog] Shopify fetch failed (${(err as Error).message}) — using demo catalog.`,
      );
    }
  }
  cache = DEMO_PRODUCTS;
  return cache;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.handle === handle);
}

export async function getProductsByCategory(cat: Category): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.category === cat);
}

export async function getFeatured(): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all.slice(0, 4);
}

export async function getBestsellers(limit = 8): Promise<Product[]> {
  const all = await getProducts();
  const best = all.filter((p) => p.bestseller);
  return (best.length ? best : all).slice(0, limit);
}
