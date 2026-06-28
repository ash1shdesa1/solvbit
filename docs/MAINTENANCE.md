# Maintenance & the self-managing model

This site is designed to need very little hands-on work. Here's what runs
automatically, what it does for you, and the rare times you need to step in.

---

## The day-to-day: you barely touch the code

| You want to… | Where you do it | Code change? |
|--------------|-----------------|--------------|
| Add / edit / remove a product | Shopify admin | No |
| Change prices or stock | Shopify admin | No |
| Process orders & payments | Shopify admin | No |
| Edit page copy (about, FAQ, etc.) | the relevant `src/pages/*.astro` | Yes (small) |
| Change branding/colors | `src/styles/global.css`, `src/lib/nav.ts` | Yes (small) |

In live mode the storefront rebuilds **daily** to pull the latest Shopify
catalog, so product changes appear without anyone touching the repo. Wire up the
`shopify-update` dispatch (see `LAUNCH.md` step 5) to make this instant.

## What the robots do

- **Deploy** — rebuilds and republishes on every push to `main`, daily, on
  demand, and on a Shopify `shopify-update` event. One concurrent deploy;
  superseded runs are cancelled.
- **CI** — type-checks and runs the Playwright E2E suite on every PR, so broken
  changes never reach `main`.
- **Lighthouse** — enforces performance, accessibility, and SEO budgets
  (a11y/SEO are hard gates) on PRs and weekly.
- **Link Check** — weekly crawl of the built site; **opens a GitHub issue** if a
  link breaks.
- **Uptime** — probes production every 15 minutes and verifies key pages render;
  **opens (and comments on) a GitHub issue** if the site is down or a page is
  missing expected content.
- **CodeQL** — weekly static security analysis of the JS/TS code.
- **Dependabot** — weekly grouped PRs to keep dependencies and Actions patched.

## When you'll get pinged (and what to do)

1. **An "Uptime" issue opens.** Check the named URL. If it's a transient blip
   the next run auto-comments when recovered; if Pages/DNS is misconfigured,
   fix and the issue stops recurring. Close it once green.
2. **A "Broken links" issue opens.** Open the attached report, fix the link in
   code or content, merge — the next weekly run verifies.
3. **A Dependabot PR opens.** CI runs automatically. If green, merge. Grouped
   minor/patch updates are low-risk; review majors before merging.
4. **A CodeQL alert appears** (Security tab). Triage and address as needed.

> Tip: turn on GitHub auto-merge for Dependabot PRs that pass CI if you want
> dependency upkeep to be fully hands-off.

## Keeping uptime high

- GitHub Pages serves from a global CDN with strong availability; static output
  means there's no server to crash.
- The catalog has a **graceful fallback**: if a deploy can't reach Shopify, the
  build logs a warning and ships the demo catalog rather than failing — the site
  stays up while you fix credentials.
- The E2E gate prevents shipping a broken cart or checkout flow.
- For external alerting (SMS/phone), add a free monitor like UptimeRobot
  pointing at `https://splatterimpacts.com` alongside the built-in probe.

## Routine (mostly optional) checks

- **Monthly:** skim open automated issues and the Security tab; merge pending
  Dependabot PRs.
- **Quarterly:** bump the Shopify `PUBLIC_SHOPIFY_API_VERSION` variable to a
  current stable version and let CI confirm.
- **As needed:** run `npm run lighthouse` locally before big visual changes.
