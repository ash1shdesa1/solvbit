# Splatter Impacts

A fast, self-managing e-commerce storefront for reactive & splatter shooting
targets — built to run for years with minimal hands-on maintenance.

- **Framework:** [Astro](https://astro.build) (static output) + Tailwind CSS v4
- **Commerce:** Headless [Shopify](https://shopify.dev/docs/api/storefront) — you
  manage products in the Shopify admin; the site syncs automatically
- **Hosting:** GitHub Pages (free, custom domain, ~99.9% uptime)
- **Checkout:** Shopify's secure, PCI-compliant hosted checkout
- **Automation:** GitHub Actions for deploy, catalog sync, E2E tests,
  performance budgets, link checking, uptime monitoring, and security scanning

> **Demo vs. Live.** With no Shopify credentials configured the site builds in
> **demo mode** using an original built-in catalog, and the cart simulates
> checkout. Add your Shopify credentials and it flips to **live mode** — real
> products, real secure checkout — with zero code changes.

---

## Quick start (local)

```bash
npm install
npm run dev          # http://localhost:4321
```

Other scripts:

```bash
npm run build        # static build into dist/
npm run preview      # serve the built site
npm run check        # Astro + TypeScript type check
npm run test:e2e     # Playwright end-to-end tests
npm run lighthouse   # Lighthouse CI performance/SEO/a11y budgets
```

## Connecting Shopify (go live)

1. In Shopify admin: **Settings → Apps and sales channels → Develop apps →
   Create an app**. Enable the **Storefront API** and grant read access to
   products. Install the app and copy the **Storefront API access token**.
2. Add credentials to the GitHub repo (**Settings → Secrets and variables →
   Actions**):
   - **Variable** `PUBLIC_SHOPIFY_DOMAIN` = `your-store.myshopify.com`
   - **Variable** `PUBLIC_SHOPIFY_API_VERSION` = `2025-01` (optional)
   - **Secret** `PUBLIC_SHOPIFY_STOREFRONT_TOKEN` = your token
     *(the Storefront token is a public access token by design — safe in the
     client bundle)*
3. Trigger a deploy (push, or run the **Deploy** workflow). The build now pulls
   your live catalog and the cart redirects to Shopify checkout.

For local live testing, copy `.env.example` to `.env` and fill it in.

See [`docs/LAUNCH.md`](docs/LAUNCH.md) for the full turnkey launch checklist and
[`docs/MAINTENANCE.md`](docs/MAINTENANCE.md) for how the site keeps itself
healthy.

## How products work

| Mode | Source of truth | Where you edit |
|------|-----------------|----------------|
| Demo | `src/data/demo-products.ts` | code |
| Live | Shopify catalog | Shopify admin |

In live mode, the site rebuilds **daily** (and on demand) to pick up catalog
changes — so adding or editing a product in Shopify is all you need to do. To
make updates instant, point a Shopify webhook/automation at the
`repository_dispatch` event `shopify-update` (details in `docs/MAINTENANCE.md`).

Optional Shopify metafields (namespace `splatter`) enrich product display:
`art` (illustration key), `subtitle`, and `bullets` (JSON array or newline list).

## Project structure

```
src/
  components/   UI building blocks (ProductCard, CartDrawer, TargetArt, …)
  data/         demo-products.ts (demo catalog)
  layouts/      Base.astro (shell, SEO, scripts)
  lib/          shopify.ts, catalog.ts, types.ts, format.ts, nav.ts
  pages/        routes (index, shop, products/[handle], about, faq, …)
  scripts/      cart.ts, ui.ts (client-side)
  styles/       global.css (design tokens + Tailwind)
public/         favicon, og image, robots.txt, manifest, CNAME
tests/e2e/      Playwright specs
.github/        workflows + dependabot
```

## Automation at a glance

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `deploy.yml` | push to main, daily cron, manual, `shopify-update` | Build + publish to Pages; daily catalog sync |
| `ci.yml` | PRs / non-main pushes | Type check + Playwright E2E |
| `lighthouse.yml` | PRs / weekly | Performance, a11y, SEO budgets |
| `links.yml` | weekly / manual | Broken-link crawl, auto-opens an issue |
| `uptime.yml` | every 15 min | Production smoke check, auto-opens an issue on failure |
| `codeql.yml` | push/PR / weekly | Static security analysis |
| `dependabot.yml` | weekly | Automated dependency & action updates |

## Notes

All branding, product copy, and illustrations are original to this project.
This is a demo storefront; review the policy pages (privacy, terms,
shipping/returns) before a real launch.
