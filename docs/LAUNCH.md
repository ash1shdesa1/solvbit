# Launch checklist

Turnkey steps to take this from the current branch to **live at
splatterimpacts.com**. Everything except step 1 is one-time setup; after that
the site runs and updates itself.

---

## 0. Why a new repo?

This code currently lives on a branch of the `solvbit` repo, whose GitHub Pages
site is already used by `solvbit.com`. A repo can only publish **one** Pages
site, so Splatter Impacts needs its own repository. That's the single manual
step below — the rest is automated.

## 1. Create the `splatterimpacts` repo and push (one manual step)

```bash
# from a clone of this branch
git checkout claude/splatterimpacts-ecommerce-4t4rn5

# create an empty repo named "splatterimpacts" on GitHub, then:
git remote add site https://github.com/<your-username>/splatterimpacts.git
git push site claude/splatterimpacts-ecommerce-4t4rn5:main
```

(Or use the GitHub UI: create the repo, then push this branch as `main`.)

## 2. Enable GitHub Pages

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The `Deploy` workflow handles the rest on the next push.

## 3. Connect Shopify (enables real checkout)

1. Shopify admin → **Settings → Apps and sales channels → Develop apps →
   Create an app**.
2. **Configure Storefront API scopes** → enable `unauthenticated_read_product_listings`
   (and related read scopes). Install the app.
3. Copy the **Storefront API access token**.
4. In the GitHub repo → **Settings → Secrets and variables → Actions**:
   - Variable `PUBLIC_SHOPIFY_DOMAIN` = `your-store.myshopify.com`
   - Variable `PUBLIC_SHOPIFY_API_VERSION` = `2025-01`
   - Variable `SITE_URL` = `https://splatterimpacts.com`
   - Secret `PUBLIC_SHOPIFY_STOREFRONT_TOKEN` = your token

> Until these are set the site happily runs in **demo mode** with the built-in
> catalog — great for showing the design before products are loaded.

## 4. Point DNS at GitHub Pages

At your domain registrar, for `splatterimpacts.com`:

```
# apex (root) — A records
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153

# www subdomain
CNAME www   <your-username>.github.io.
```

(Optional but recommended: also add the four `AAAA` records GitHub publishes for
IPv6.) The `public/CNAME` file already pins the custom domain to
`splatterimpacts.com`. In **Settings → Pages**, confirm the custom domain and
tick **Enforce HTTPS** once the certificate is issued (can take up to ~24h).

## 5. Make catalog updates instant (optional)

By default the site re-syncs the Shopify catalog **daily**. To rebuild the
moment a product changes, create a Shopify automation (Flow, or a webhook via a
free tool like Zapier/Make) that POSTs to GitHub:

```
POST https://api.github.com/repos/<you>/splatterimpacts/dispatches
Authorization: Bearer <a fine-grained PAT with "actions: write">
Body: { "event_type": "shopify-update" }
```

## 6. Pre-launch polish

- Replace placeholder copy on **privacy**, **terms**, and **shipping-returns**
  with your real policies.
- Set the real support email in `src/lib/nav.ts` (`BRAND.email`).
- Add a Shopify-connected or Formspree backend to the contact & newsletter
  forms (they currently acknowledge client-side only — see `src/pages/contact.astro`).
- Add a free uptime monitor (e.g. UptimeRobot) in addition to the built-in
  GitHub Actions probe, if you want SMS/phone alerts.

You're live. 🟢
