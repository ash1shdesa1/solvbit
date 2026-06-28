import type {
  ArtKey,
  Category,
  Money,
  Product,
  ProductVariant,
} from "@/lib/types";

/**
 * Shopify Storefront API client.
 *
 * Reads public env vars (safe to expose; the Storefront token is a public
 * access token by design). When these are absent the storefront falls back
 * to the demo catalog — see src/lib/catalog.ts.
 *
 *   PUBLIC_SHOPIFY_DOMAIN            your-store.myshopify.com
 *   PUBLIC_SHOPIFY_STOREFRONT_TOKEN xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *   PUBLIC_SHOPIFY_API_VERSION      2025-01 (optional)
 */

const DOMAIN = import.meta.env.PUBLIC_SHOPIFY_DOMAIN;
const TOKEN = import.meta.env.PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = import.meta.env.PUBLIC_SHOPIFY_API_VERSION || "2025-01";

export const isShopifyConfigured = Boolean(DOMAIN && TOKEN);

function endpoint(): string {
  return `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!isShopifyConfigured) {
    throw new Error("Shopify is not configured");
  }
  const res = await fetch(endpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    throw new Error(`Shopify HTTP ${res.status}`);
  }
  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new Error(`Shopify GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

/* ------------------------------------------------------------------ *
 * Product fetching (build-time)
 * ------------------------------------------------------------------ */

const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($cursor: String) {
    products(first: 50, after: $cursor, sortKey: BEST_SELLING) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        handle
        title
        description
        productType
        tags
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 25) {
          nodes {
            id
            title
            availableForSale
            sku
            price { amount currencyCode }
          }
        }
        metafields(identifiers: [
          { namespace: "splatter", key: "art" }
          { namespace: "splatter", key: "subtitle" }
          { namespace: "splatter", key: "bullets" }
        ]) { key value }
      }
    }
  }
`;

interface RawMoney {
  amount: string;
  currencyCode: string;
}
interface RawVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  sku?: string;
  price: RawMoney;
}
interface RawProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  priceRange: { minVariantPrice: RawMoney };
  variants: { nodes: RawVariant[] };
  metafields: Array<{ key: string; value: string } | null>;
}

const ART_KEYS: ArtKey[] = [
  "bullseye", "sight-in", "silhouette", "diamond", "dot-drill",
  "splash", "steel-gong", "dueling-tree", "spinner", "plate-rack",
  "bundle", "accessory",
];

function deriveCategory(p: RawProduct): Category {
  const hay = `${p.productType} ${p.tags.join(" ")}`.toLowerCase();
  if (hay.includes("bundle") || hay.includes("kit") || hay.includes("variety")) return "bundle";
  if (hay.includes("steel") || hay.includes("reactive") || hay.includes("ar500")) return "reactive";
  if (hay.includes("accessor") || hay.includes("stand") || hay.includes("hanger") || hay.includes("gear")) return "accessory";
  return "splatter";
}

function deriveArt(p: RawProduct, category: Category): ArtKey {
  const meta = p.metafields.find((m) => m?.key === "art")?.value?.trim() as ArtKey | undefined;
  if (meta && ART_KEYS.includes(meta)) return meta;
  const tagArt = p.tags.map((t) => t.toLowerCase()).find((t) => ART_KEYS.includes(t as ArtKey));
  if (tagArt) return tagArt as ArtKey;
  const fallback: Record<Category, ArtKey> = {
    splatter: "bullseye",
    reactive: "steel-gong",
    bundle: "bundle",
    accessory: "accessory",
  };
  return fallback[category];
}

function money(m: RawMoney): Money {
  return { amount: m.amount, currencyCode: m.currencyCode };
}

function mapProduct(p: RawProduct): Product {
  const category = deriveCategory(p);
  const subtitle = p.metafields.find((m) => m?.key === "subtitle")?.value;
  const bulletsRaw = p.metafields.find((m) => m?.key === "bullets")?.value;
  let bullets: string[] = [];
  if (bulletsRaw) {
    try {
      const parsed = JSON.parse(bulletsRaw);
      if (Array.isArray(parsed)) bullets = parsed.map(String);
    } catch {
      bullets = bulletsRaw.split("\n").map((s) => s.trim()).filter(Boolean);
    }
  }
  const variants: ProductVariant[] = p.variants.nodes.map((v) => ({
    id: v.id,
    title: v.title === "Default Title" ? "Standard" : v.title,
    price: money(v.price),
    available: v.availableForSale,
    sku: v.sku || undefined,
  }));
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    subtitle: subtitle || undefined,
    category,
    description: p.description,
    bullets,
    specs: [],
    tags: p.tags,
    art: deriveArt(p, category),
    priceFrom: money(p.priceRange.minVariantPrice),
    variants,
  };
}

/** Fetch and normalize all products from Shopify (paginated). */
export async function fetchAllProducts(): Promise<Product[]> {
  const out: Product[] = [];
  let cursor: string | null = null;
  // hard cap pages to avoid runaway loops
  for (let page = 0; page < 20; page++) {
    const data: {
      products: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: RawProduct[] };
    } = await shopifyFetch(PRODUCTS_QUERY, { cursor });
    out.push(...data.products.nodes.map(mapProduct));
    if (!data.products.pageInfo.hasNextPage) break;
    cursor = data.products.pageInfo.endCursor;
  }
  return out;
}
