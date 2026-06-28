import type { Product } from "@/lib/types";

/**
 * Demo catalog — used when Shopify credentials are not configured.
 * All copy, names, and specs here are original to Splatter Impacts.
 * In live mode this is replaced entirely by the Shopify Storefront API.
 *
 * Prices are illustrative. Variant ids are synthetic ("demo:...") so the
 * cart UI works end-to-end; real checkout activates once Shopify is wired.
 */

const usd = (amount: string) => ({ amount, currencyCode: "USD" });

export const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo:burst-bullseye",
    handle: "burst-bullseye",
    title: "Burst Bullseye",
    subtitle: "High-visibility splatter rings",
    category: "splatter",
    description:
      "Every hit blooms into a bright chartreuse halo so you can call your shots from the bench without a spotting scope. The black aiming center stays crisp downrange while impacts flash on the surrounding rings — perfect for zeroing and quick feedback drills.",
    bullets: [
      "Impacts flash neon-green on a non-reflective black face",
      "Scoring rings sized for pistol and rifle at common distances",
      "Heavy 70 lb stock lays flat and resists curling",
      "Peel-and-stick backer keeps targets put in wind",
    ],
    specs: [
      { label: "Material", value: "70 lb coated splatter stock" },
      { label: "Adhesive", value: "Repositionable full-back" },
      { label: "Best for", value: "Sight-in, group testing" },
    ],
    tags: ["bullseye", "zeroing", "pistol", "rifle"],
    art: "bullseye",
    priceFrom: usd("12.99"),
    featured: true,
    bestseller: true,
    rating: { value: 4.8, count: 214 },
    variants: [
      { id: "demo:burst-bullseye:8-25", title: '8" — 25 pack', price: usd("12.99"), available: true },
      { id: "demo:burst-bullseye:8-100", title: '8" — 100 pack', price: usd("39.99"), available: true },
      { id: "demo:burst-bullseye:12-25", title: '12" — 25 pack', price: usd("18.99"), available: true },
    ],
  },
  {
    id: "demo:grid-zero",
    handle: "grid-zero",
    title: "Grid Zero Sight-In",
    subtitle: "1 MOA reference grid",
    category: "splatter",
    description:
      "A precision sight-in target with a fine 1-inch grid and bold center diamond. Click your adjustments straight off the squares — every impact lights up so you can see exactly how far you walked the group with each correction.",
    bullets: [
      "1 in / ~1 MOA grid at 100 yd for fast scope dial-in",
      "Bold diamond center for a repeatable point of aim",
      "Flashes bright on impact for no-scope confirmation",
      "Two targets per sheet to save paper",
    ],
    specs: [
      { label: "Grid", value: '1 in squares, labeled axes' },
      { label: "Material", value: "70 lb coated splatter stock" },
      { label: "Best for", value: "Scope and red-dot zeroing" },
    ],
    tags: ["sight-in", "grid", "scope", "moa"],
    art: "sight-in",
    priceFrom: usd("13.99"),
    bestseller: true,
    rating: { value: 4.9, count: 167 },
    variants: [
      { id: "demo:grid-zero:25", title: "25 pack", price: usd("13.99"), available: true },
      { id: "demo:grid-zero:100", title: "100 pack", price: usd("44.99"), available: true },
    ],
  },
  {
    id: "demo:contact-silhouette",
    handle: "contact-silhouette",
    title: "Contact Silhouette",
    subtitle: "Defensive practice torso",
    category: "splatter",
    description:
      "A clean defensive silhouette with scoring zones that pop on every hit. Built for draw-and-fire reps, controlled pairs, and accountability training where seeing each impact in real time actually matters.",
    bullets: [
      "Anatomically neutral torso with A/B/C scoring zones",
      "Impacts flash so you can score without walking downrange",
      "Matte face cuts glare under range lights and sun",
      "Sized for standard target stands and USPSA-style stages",
    ],
    specs: [
      { label: "Size", value: '23 x 35 in' },
      { label: "Material", value: "70 lb coated splatter stock" },
      { label: "Best for", value: "Defensive and action drills" },
    ],
    tags: ["silhouette", "defensive", "uspsa", "drills"],
    art: "silhouette",
    priceFrom: usd("16.99"),
    featured: true,
    rating: { value: 4.7, count: 98 },
    variants: [
      { id: "demo:contact-silhouette:10", title: "10 pack", price: usd("16.99"), available: true },
      { id: "demo:contact-silhouette:25", title: "25 pack", price: usd("34.99"), available: true },
    ],
  },
  {
    id: "demo:diamond-dialer",
    handle: "diamond-dialer",
    title: "Diamond Dialer",
    subtitle: "Precision micro-diamonds",
    category: "splatter",
    description:
      "Twelve small diamonds per sheet for one-shot precision work. Ideal for rimfire benchrest, trigger-control practice, and load development where a tiny aiming point and instant impact feedback tighten your fundamentals fast.",
    bullets: [
      "12 individual aiming diamonds per sheet",
      "Small point of aim rewards a clean, repeatable hold",
      "Bright impact halo confirms hits at distance",
      "Great for rimfire, air rifle, and load testing",
    ],
    specs: [
      { label: "Targets", value: "12 diamonds / sheet" },
      { label: "Material", value: "70 lb coated splatter stock" },
      { label: "Best for", value: "Precision and rimfire" },
    ],
    tags: ["diamond", "precision", "rimfire", "benchrest"],
    art: "diamond",
    priceFrom: usd("11.99"),
    rating: { value: 4.6, count: 73 },
    variants: [
      { id: "demo:diamond-dialer:25", title: "25 sheet pack", price: usd("11.99"), available: true },
      { id: "demo:diamond-dialer:50", title: "50 sheet pack", price: usd("19.99"), available: true },
    ],
  },
  {
    id: "demo:dot-ladder",
    handle: "dot-ladder",
    title: "Dot Ladder Drill",
    subtitle: "Five-dot accountability",
    category: "splatter",
    description:
      "A five-dot ladder built for the classic dot drill and split-time work. Run it on a shot timer and the flashing impacts give you instant, honest feedback on speed versus accuracy.",
    bullets: [
      "Five 2-inch dots laid out for the standard dot drill",
      "Impacts flash for at-a-glance scoring on the clock",
      "Numbered dots make par-time drills repeatable",
      "Doubles as a transition and recoil-control target",
    ],
    specs: [
      { label: "Dots", value: '5 x 2 in, numbered' },
      { label: "Material", value: "70 lb coated splatter stock" },
      { label: "Best for", value: "Speed and split drills" },
    ],
    tags: ["dot-drill", "pistol", "timer", "drills"],
    art: "dot-drill",
    priceFrom: usd("12.49"),
    rating: { value: 4.7, count: 61 },
    variants: [
      { id: "demo:dot-ladder:25", title: "25 pack", price: usd("12.49"), available: true },
      { id: "demo:dot-ladder:100", title: "100 pack", price: usd("38.99"), available: true },
    ],
  },
  {
    id: "demo:splashback-12",
    handle: "splashback-12",
    title: "Splashback Splatter Roll",
    subtitle: "Custom-size adhesive roll",
    category: "splatter",
    description:
      "A continuous roll of blank splatter surface — cut any size you need and stick it over steel, cardboard, or your own printed targets. Turn anything into a high-visibility reactive face.",
    bullets: [
      "Cut-to-length: make any size target you want",
      "Sticks to steel, cardboard, plywood, and paper",
      "Same bright impact flash as our printed line",
      "Cover and reuse expensive steel without paint",
    ],
    specs: [
      { label: "Width", value: "12 in" },
      { label: "Length", value: "25 ft / 50 ft" },
      { label: "Best for", value: "DIY and steel overlays" },
    ],
    tags: ["roll", "diy", "adhesive", "steel-overlay"],
    art: "splash",
    priceFrom: usd("21.99"),
    rating: { value: 4.5, count: 44 },
    variants: [
      { id: "demo:splashback-12:25", title: "12 in x 25 ft", price: usd("21.99"), available: true },
      { id: "demo:splashback-12:50", title: "12 in x 50 ft", price: usd("36.99"), available: true },
    ],
  },
  {
    id: "demo:ring-gong",
    handle: "ring-gong",
    title: "Ring Gong AR500",
    subtitle: "Hardened reactive steel",
    category: "reactive",
    description:
      "A laser-cut AR500 gong that rings loud and swings on hit. Through-hardened to handle rifle and pistol calibers within rated velocity, with a clean hanger slot for chain or rubber straps. Audible feedback you can hear across the range.",
    bullets: [
      "Through-hardened AR500, ~3/8 in thick",
      "Loud audible ring confirms hits without optics",
      "CNC hanger slot fits chain or strap mounts",
      "Powder-coat-ready face; pairs with Splashback rolls",
    ],
    specs: [
      { label: "Material", value: "AR500, 3/8 in" },
      { label: "Hardness", value: "~500 BHN" },
      { label: "Rating", value: "Pistol + rifle within velocity limits" },
    ],
    tags: ["steel", "ar500", "gong", "reactive"],
    art: "steel-gong",
    priceFrom: usd("39.99"),
    featured: true,
    bestseller: true,
    rating: { value: 4.9, count: 188 },
    variants: [
      { id: "demo:ring-gong:6", title: "6 in round", price: usd("39.99"), available: true },
      { id: "demo:ring-gong:8", title: "8 in round", price: usd("54.99"), available: true },
      { id: "demo:ring-gong:10", title: "10 in round", price: usd("74.99"), available: true },
    ],
  },
  {
    id: "demo:knockover-tree",
    handle: "knockover-tree",
    title: "Knockover Dueling Tree",
    subtitle: "Six-paddle reactive",
    category: "reactive",
    description:
      "A competition-style dueling tree with six AR500 paddles that swing from one side to the other on every hit. Built for head-to-head matches and reset-free practice — knock them all across, then send them back.",
    bullets: [
      "Six hardened AR500 paddles, pistol rated",
      "Smooth pivot for clean swings, even on edge hits",
      "Knockdown design resets by shooting the other way",
      "Bolt-together frame breaks down for transport",
    ],
    specs: [
      { label: "Paddles", value: "6 x AR500" },
      { label: "Rating", value: "Handgun calibers" },
      { label: "Frame", value: "Bolt-together steel" },
    ],
    tags: ["steel", "dueling-tree", "competition", "reactive"],
    art: "dueling-tree",
    priceFrom: usd("219.00"),
    rating: { value: 4.8, count: 52 },
    variants: [
      { id: "demo:knockover-tree:std", title: "Standard frame", price: usd("219.00"), available: true },
    ],
  },
  {
    id: "demo:spin-twins",
    handle: "spin-twins",
    title: "Spin Twins Reactive",
    subtitle: "Dual-paddle spinner",
    category: "reactive",
    description:
      "A balanced two-paddle spinner that whirls on impact and self-resets every time. The large lower paddle and small upper paddle reward accuracy with a satisfying spin you can see and hear downrange.",
    bullets: [
      "AR500 paddles balanced for a full spin on hit",
      "Always self-resets — no walking downrange",
      "Ground-spike and stand mount options",
      "Pistol and rimfire friendly at range distances",
    ],
    specs: [
      { label: "Material", value: "AR500 paddles" },
      { label: "Reset", value: "Automatic / gravity" },
      { label: "Mount", value: "Spike or stand" },
    ],
    tags: ["steel", "spinner", "reactive", "self-reset"],
    art: "spinner",
    priceFrom: usd("84.99"),
    rating: { value: 4.7, count: 39 },
    variants: [
      { id: "demo:spin-twins:spike", title: "Ground spike", price: usd("84.99"), available: true },
      { id: "demo:spin-twins:stand", title: "With stand", price: usd("119.00"), available: true },
    ],
  },
  {
    id: "demo:rack-five",
    handle: "rack-five",
    title: "Rack Five Plate Rack",
    subtitle: "Five-plate reactive",
    category: "reactive",
    description:
      "A five-plate reactive rack for fast transition practice and friendly competition. Each AR500 plate falls flat on a hit and the whole rack resets with a single pull of the cord.",
    bullets: [
      "Five 6-inch AR500 plates, pistol rated",
      "Plates fall clean and stay down when hit",
      "Single-cord manual reset from the firing line",
      "Folds flat for transport and storage",
    ],
    specs: [
      { label: "Plates", value: "5 x 6 in AR500" },
      { label: "Reset", value: "Manual pull cord" },
      { label: "Rating", value: "Handgun calibers" },
    ],
    tags: ["steel", "plate-rack", "competition", "reactive"],
    art: "plate-rack",
    priceFrom: usd("279.00"),
    rating: { value: 4.8, count: 31 },
    variants: [
      { id: "demo:rack-five:std", title: "Complete rack", price: usd("279.00"), available: true },
    ],
  },
  {
    id: "demo:range-day-bundle",
    handle: "range-day-bundle",
    title: "Range Day Variety Bundle",
    subtitle: "Mixed splatter pack",
    category: "bundle",
    description:
      "Everything for a full session in one box: a mix of bullseyes, sight-in grids, silhouettes, and drill targets at a better price than buying separately. The fastest way to stock the range bag.",
    bullets: [
      "100 mixed splatter targets across our top sellers",
      "Bullseyes, grids, silhouettes, and dot drills included",
      "Lower per-target cost than singles",
      "Ships flat in a reinforced mailer",
    ],
    specs: [
      { label: "Count", value: "100 mixed targets" },
      { label: "Includes", value: "4 best-selling styles" },
      { label: "Best for", value: "Regular range trips" },
    ],
    tags: ["bundle", "variety", "value", "splatter"],
    art: "bundle",
    priceFrom: usd("49.99"),
    featured: true,
    bestseller: true,
    rating: { value: 4.9, count: 142 },
    variants: [
      { id: "demo:range-day-bundle:100", title: "100 mixed targets", price: usd("49.99"), available: true },
    ],
  },
  {
    id: "demo:steel-starter-bundle",
    handle: "steel-starter-bundle",
    title: "Steel Starter Bundle",
    subtitle: "Gong + hardware",
    category: "bundle",
    description:
      "Get ringing steel set up in minutes. Pairs an 8-inch AR500 Ring Gong with a rubber strap hanger kit and a Splashback roll so you can mark hits and run it for years.",
    bullets: [
      '8" Ring Gong AR500 included',
      "Rubber strap hanger kit for quiet, durable mounting",
      "12 in x 25 ft Splashback roll to mark impacts",
      "Bundle priced below buying the pieces alone",
    ],
    specs: [
      { label: "Includes", value: "Gong + hanger + roll" },
      { label: "Steel", value: "8 in AR500" },
      { label: "Best for", value: "First steel setup" },
    ],
    tags: ["bundle", "steel", "starter", "value"],
    art: "bundle",
    priceFrom: usd("74.99"),
    rating: { value: 4.8, count: 57 },
    variants: [
      { id: "demo:steel-starter-bundle:std", title: "Complete kit", price: usd("74.99"), available: true },
    ],
  },
  {
    id: "demo:strap-hanger-kit",
    handle: "strap-hanger-kit",
    title: "Rubber Strap Hanger Kit",
    subtitle: "Quiet steel mounting",
    category: "accessory",
    description:
      "Conveyor-belt rubber straps and hardware to hang gongs and paddles from a stand or 2x4. Lets steel swing freely, soaks up energy, and keeps your targets — and your hardware — lasting longer.",
    bullets: [
      "Heavy conveyor-belt rubber straps",
      "Lets steel swing for safer, longer life",
      "Fits most gongs and standard target stands",
      "All mounting hardware included",
    ],
    specs: [
      { label: "Includes", value: "2 straps + bolts" },
      { label: "Fits", value: "Gongs / 2x4 stands" },
      { label: "Material", value: "Conveyor-belt rubber" },
    ],
    tags: ["accessory", "hanger", "steel", "hardware"],
    art: "accessory",
    priceFrom: usd("18.99"),
    rating: { value: 4.7, count: 64 },
    variants: [
      { id: "demo:strap-hanger-kit:std", title: "Strap kit", price: usd("18.99"), available: true },
    ],
  },
  {
    id: "demo:target-stand",
    handle: "target-stand",
    title: "Knockdown Target Stand",
    subtitle: "Folding base + uprights",
    category: "accessory",
    description:
      "A stable folding base that takes standard 1x2 furring strips as uprights so you can run paper and splatter targets anywhere. Wide stance for wind, folds flat for the trunk.",
    bullets: [
      "Folding steel base with a wide, stable stance",
      "Uses cheap 1x2 furring strips as uprights",
      "Holds backers for paper and splatter targets",
      "Folds flat to fit in a range bag or trunk",
    ],
    specs: [
      { label: "Base", value: "Folding steel" },
      { label: "Uprights", value: "1x2 furring (not incl.)" },
      { label: "Best for", value: "Paper + splatter" },
    ],
    tags: ["accessory", "stand", "paper", "range-gear"],
    art: "accessory",
    priceFrom: usd("29.99"),
    rating: { value: 4.6, count: 48 },
    variants: [
      { id: "demo:target-stand:std", title: "Folding base", price: usd("29.99"), available: true },
    ],
  },
];
