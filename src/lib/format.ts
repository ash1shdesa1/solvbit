import type { Money } from "@/lib/types";

/** Format a Money value for display, e.g. { amount: "24.99", currencyCode: "USD" } -> "$24.99". */
export function formatMoney(m: Money): string {
  const value = Number(m.amount);
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: m.currencyCode || "USD",
      minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    }).format(value);
  } catch {
    return `$${m.amount}`;
  }
}

/** "From $39.99" helper for products with multiple variants. */
export function formatFrom(m: Money, multiVariant: boolean): string {
  const base = formatMoney(m);
  return multiVariant ? `From ${base}` : base;
}
