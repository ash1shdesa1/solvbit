/** Site navigation and brand constants — single source for links/labels. */

export const BRAND = {
  name: "Splatter Impacts",
  tagline: "See every hit.",
  domain: "splatterimpacts.com",
  email: "hello@splatterimpacts.com",
};

export interface NavLink {
  label: string;
  href: string;
}

export const PRIMARY_NAV: NavLink[] = [
  { label: "Shop All", href: "/shop" },
  { label: "Splatter Paper", href: "/shop?c=splatter" },
  { label: "Reactive Steel", href: "/shop?c=reactive" },
  { label: "Bundles", href: "/shop?c=bundle" },
  { label: "About", href: "/about" },
];

export const FOOTER_NAV: { title: string; links: NavLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Targets", href: "/shop" },
      { label: "Splatter Paper", href: "/shop?c=splatter" },
      { label: "Reactive Steel", href: "/shop?c=reactive" },
      { label: "Bundles", href: "/shop?c=bundle" },
      { label: "Range Gear", href: "/shop?c=accessory" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Range Safety", href: "/safety" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
