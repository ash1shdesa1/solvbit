/**
 * Client-side cart for the Splatter Impacts storefront.
 *
 * - Persists to localStorage so the cart survives navigation/reloads.
 * - Renders the slide-out drawer and header badge.
 * - Checkout: in LIVE mode (Shopify configured) it creates a Shopify cart via
 *   the Storefront API and redirects to Shopify's secure hosted checkout.
 *   In DEMO mode it shows a friendly notice instead of charging anyone.
 *
 * Shopify config is injected by the Base layout onto window.__SI__.
 */

export interface CartItem {
  variantId: string;
  handle: string;
  title: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  art: string;
  qty: number;
}

interface ShopifyConfig {
  domain?: string;
  token?: string;
  apiVersion: string;
  mode: "live" | "demo";
}

const KEY = "si_cart_v1";

declare global {
  interface Window {
    __SI__?: ShopifyConfig;
    SICart?: ReturnType<typeof createCart>;
  }
}

function readConfig(): ShopifyConfig {
  return (
    window.__SI__ || { apiVersion: "2025-01", mode: "demo" }
  );
}

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage full / disabled — cart still works in-memory this session */
  }
}

function formatMoney(amount: number, currency = "USD"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

function createCart() {
  let items: CartItem[] = load();
  const cfg = readConfig();

  function emit() {
    save(items);
    document.dispatchEvent(new CustomEvent("cart:change", { detail: { items } }));
  }

  function count(): number {
    return items.reduce((n, i) => n + i.qty, 0);
  }

  function subtotal(): number {
    return items.reduce((n, i) => n + Number(i.price.amount) * i.qty, 0);
  }

  function currency(): string {
    return items[0]?.price.currencyCode || "USD";
  }

  function add(item: Omit<CartItem, "qty">, qty = 1) {
    const existing = items.find((i) => i.variantId === item.variantId);
    if (existing) existing.qty += qty;
    else items.push({ ...item, qty });
    emit();
    open();
  }

  function setQty(variantId: string, qty: number) {
    const it = items.find((i) => i.variantId === variantId);
    if (!it) return;
    it.qty = Math.max(0, qty);
    if (it.qty === 0) items = items.filter((i) => i.variantId !== variantId);
    emit();
  }

  function remove(variantId: string) {
    items = items.filter((i) => i.variantId !== variantId);
    emit();
  }

  function clear() {
    items = [];
    emit();
  }

  function open() {
    document.documentElement.classList.add("cart-open");
  }
  function close() {
    document.documentElement.classList.remove("cart-open");
  }

  async function checkout(): Promise<void> {
    if (items.length === 0) return;
    const btn = document.querySelector<HTMLButtonElement>("[data-cart-checkout]");
    const notice = document.querySelector<HTMLElement>("[data-cart-notice]");

    if (cfg.mode !== "live" || !cfg.domain || !cfg.token) {
      if (notice) {
        notice.textContent =
          "Demo mode: connect your Shopify store to enable secure checkout. Your cart is fully functional.";
        notice.hidden = false;
      }
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.dataset.label = btn.textContent || "";
      btn.textContent = "Starting secure checkout…";
    }
    try {
      const query = `mutation Create($lines:[CartLineInput!]!){cartCreate(input:{lines:$lines}){cart{checkoutUrl} userErrors{message}}}`;
      const lines = items.map((i) => ({ merchandiseId: i.variantId, quantity: i.qty }));
      const res = await fetch(
        `https://${cfg.domain}/api/${cfg.apiVersion}/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": cfg.token,
          },
          body: JSON.stringify({ query, variables: { lines } }),
        },
      );
      const json = await res.json();
      const url = json?.data?.cartCreate?.cart?.checkoutUrl;
      if (url) {
        window.location.href = url;
        return;
      }
      throw new Error(
        json?.data?.cartCreate?.userErrors?.[0]?.message || "Checkout could not start",
      );
    } catch (err) {
      if (notice) {
        notice.textContent = `Sorry — checkout could not start (${(err as Error).message}). Please try again.`;
        notice.hidden = false;
      }
      if (btn) {
        btn.disabled = false;
        btn.textContent = btn.dataset.label || "Checkout";
      }
    }
  }

  return {
    get items() {
      return items;
    },
    count,
    subtotal,
    currency,
    add,
    setQty,
    remove,
    clear,
    open,
    close,
    checkout,
  };
}

/* ------------------------------------------------------------------ *
 * DOM wiring
 * ------------------------------------------------------------------ */
function render(cart: ReturnType<typeof createCart>) {
  const badge = document.querySelector<HTMLElement>("[data-cart-count]");
  const list = document.querySelector<HTMLElement>("[data-cart-items]");
  const empty = document.querySelector<HTMLElement>("[data-cart-empty]");
  const subtotalEl = document.querySelector<HTMLElement>("[data-cart-subtotal]");
  const footer = document.querySelector<HTMLElement>("[data-cart-footer]");

  const n = cart.count();
  if (badge) {
    badge.textContent = String(n);
    badge.hidden = n === 0;
  }

  if (!list) return;
  if (cart.items.length === 0) {
    list.innerHTML = "";
    if (empty) empty.hidden = false;
    if (footer) footer.hidden = true;
    return;
  }
  if (empty) empty.hidden = true;
  if (footer) footer.hidden = false;

  list.innerHTML = cart.items
    .map(
      (i) => `
      <li class="flex gap-3 py-4 border-b border-steel-700">
        <div class="h-16 w-16 shrink-0 rounded-lg bg-steel-800 grid place-items-center text-blaze-400 text-xs font-display">${i.art}</div>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-steel-50 truncate">${i.title}</p>
          <p class="text-sm text-steel-400">${i.variantTitle}</p>
          <div class="mt-2 flex items-center gap-2">
            <button class="h-7 w-7 rounded border border-steel-600 text-steel-200 hover:border-blaze-500" data-qty-dec="${i.variantId}" aria-label="Decrease quantity">−</button>
            <span class="w-6 text-center text-sm" aria-label="Quantity">${i.qty}</span>
            <button class="h-7 w-7 rounded border border-steel-600 text-steel-200 hover:border-blaze-500" data-qty-inc="${i.variantId}" aria-label="Increase quantity">+</button>
            <button class="ml-auto text-xs text-steel-400 hover:text-blaze-400 underline" data-remove="${i.variantId}">Remove</button>
          </div>
        </div>
        <div class="text-right font-medium text-steel-100 whitespace-nowrap">${formatMoney(Number(i.price.amount) * i.qty, i.price.currencyCode)}</div>
      </li>`,
    )
    .join("");

  if (subtotalEl) subtotalEl.textContent = formatMoney(cart.subtotal(), cart.currency());
}

function init() {
  const cart = createCart();
  window.SICart = cart;

  render(cart);
  document.addEventListener("cart:change", () => render(cart));

  // Add-to-cart buttons (carry a data-add payload)
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("[data-add]");
    if (target) {
      e.preventDefault();
      try {
        const payload = JSON.parse(target.dataset.add || "{}");
        const sel = target.dataset.variantSelect;
        if (sel) {
          const select = document.querySelector<HTMLSelectElement>(sel);
          if (select && select.selectedOptions[0]) {
            const opt = select.selectedOptions[0];
            payload.variantId = opt.value;
            payload.variantTitle = opt.dataset.title || opt.textContent || "";
            payload.price = {
              amount: opt.dataset.amount || payload.price.amount,
              currencyCode: opt.dataset.currency || payload.price.currencyCode,
            };
          }
        }
        cart.add(payload, 1);
      } catch {
        /* ignore malformed payloads */
      }
    }
  });

  // Drawer + qty controls (event delegation)
  document.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;
    if (el.closest("[data-cart-open]")) {
      e.preventDefault();
      cart.open();
    }
    if (el.closest("[data-cart-close]")) cart.close();
    const inc = el.closest<HTMLElement>("[data-qty-inc]");
    const dec = el.closest<HTMLElement>("[data-qty-dec]");
    const rm = el.closest<HTMLElement>("[data-remove]");
    if (inc) {
      const id = inc.dataset.qtyInc!;
      const it = cart.items.find((i) => i.variantId === id);
      cart.setQty(id, (it?.qty || 0) + 1);
    }
    if (dec) {
      const id = dec.dataset.qtyDec!;
      const it = cart.items.find((i) => i.variantId === id);
      cart.setQty(id, (it?.qty || 0) - 1);
    }
    if (rm) cart.remove(rm.dataset.remove!);
    if (el.closest("[data-cart-checkout]")) cart.checkout();
  });

  // Escape closes the drawer
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cart.close();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
