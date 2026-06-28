/**
 * Normalized commerce types used across the storefront.
 * These are intentionally decoupled from Shopify's raw schema so the UI
 * renders identically whether data comes from Shopify or the demo catalog.
 */

export type Category = "splatter" | "reactive" | "bundle" | "accessory";

/** Which generated SVG target illustration to render for a product. */
export type ArtKey =
  | "bullseye"
  | "sight-in"
  | "silhouette"
  | "diamond"
  | "dot-drill"
  | "splash"
  | "steel-gong"
  | "dueling-tree"
  | "spinner"
  | "plate-rack"
  | "bundle"
  | "accessory";

export interface Money {
  amount: string; // decimal string, e.g. "24.99"
  currencyCode: string; // e.g. "USD"
}

export interface ProductVariant {
  /** Shopify variant GID in live mode, synthetic id in demo mode. */
  id: string;
  title: string; // e.g. "8 in — 25 pack"
  price: Money;
  available: boolean;
  sku?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  handle: string; // url slug
  title: string;
  subtitle?: string;
  category: Category;
  description: string; // plain text / light markdown
  bullets: string[]; // key selling points
  specs: ProductSpec[];
  tags: string[];
  art: ArtKey;
  priceFrom: Money;
  variants: ProductVariant[];
  featured?: boolean;
  bestseller?: boolean;
  rating?: { value: number; count: number };
}

export const CATEGORY_LABELS: Record<Category, string> = {
  splatter: "Splatter Paper",
  reactive: "Reactive Steel",
  bundle: "Bundles",
  accessory: "Range Gear",
};
