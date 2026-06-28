// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// The public site URL. Override with SITE_URL in CI if needed.
const SITE = process.env.SITE_URL || "https://splatterimpacts.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/checkout-pending"),
    }),
  ],
  // Cast: @tailwindcss/vite ships against a slightly different Vite version
  // than Astro bundles, which trips the deep plugin type-check only (build is fine).
  vite: /** @type {any} */ ({
    plugins: [tailwindcss()],
  }),
});
