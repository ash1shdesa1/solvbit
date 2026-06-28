/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  /** Shopify store domain, e.g. "your-store.myshopify.com" */
  readonly PUBLIC_SHOPIFY_DOMAIN?: string;
  /** Shopify Storefront API public access token (safe to expose client-side) */
  readonly PUBLIC_SHOPIFY_STOREFRONT_TOKEN?: string;
  /** Storefront API version, e.g. "2025-01" */
  readonly PUBLIC_SHOPIFY_API_VERSION?: string;
  /** Canonical site URL */
  readonly SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
