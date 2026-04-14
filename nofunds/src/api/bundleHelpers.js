// src/api/bundleHelpers.js

const VALIDITY_MAP = {
  daily:   "Until midnight",
  "3-day": "3 days",
  weekly:  "7 days",
  monthly: "30 days",
};

/**
 * Parse subCategory from the description string.
 * "20MB daily data bundle"   → "daily"
 * "500MB 3-day bundle"       → "3-day"
 * "2GB weekly bundle"        → "weekly"
 * "3GB monthly bundle"       → "monthly"
 */
function parseSubCategory(description = "") {
  const d = description.toLowerCase();
  if (d.includes("3-day") || d.includes("3 day")) return "3-day";
  if (d.includes("weekly"))  return "weekly";
  if (d.includes("monthly")) return "monthly";
  return "daily"; // default
}
/**
 * Assign a display label based on category + subCategory.
 * Extend this as your product team defines promos.
 */
function getLabel(category, subCategory) {
  if (category === "night")                          return "Night";
  if (category === "voice")                          return "Voice";
  if (category === "social")                         return "Social";
  if (category === "data" && subCategory === "daily")   return "Best Value";
  if (category === "data" && subCategory === "weekly")  return "Recommended";
  if (category === "data" && subCategory === "3-day")   return "Popular";
  if (category === "data" && subCategory === "monthly") return "Recommended";
  return "Popular";
}
/**
 * Extract a human-readable size from the bundle code.
 * "DATA-20MB-DAILY" → "20 MB"
 * "20MB-DAILY"      → "20 MB"
 * "20MB"            → "20 MB"
 * "1GB"             → "1 GB"
 * "500MIN"          → "500 Min"
 */
function parseName(code = "", fallback = "") {
  const match = code.match(/(\d+(?:\.\d+)?)\s*(GB|MB|MIN)/i);
  if (!match) return fallback;
  const [, num, unit] = match;
  const unitDisplay = { GB: "GB", MB: "MB", MIN: "Min" }[unit.toUpperCase()] ?? unit;
  return `${num} ${unitDisplay}`;
}

/**
 * Transforms a raw ApiBundle into the shape BundlesPage cards expect.
 */
export function normalizeBundle(b) {
  const category    = b.category?.toLowerCase() ?? "data";
  const subCategory = parseSubCategory(b.description);
  const priceNum    = Number(b.price);

  return {
    id:          b.id,
    code:        b.code,
    category,
    subCategory,
    name:        parseName(b.code, b.description),
    description: b.description,
    validity:    VALIDITY_MAP[subCategory] ?? subCategory,
    price:       `${b.currency} ${priceNum.toFixed(2)}`,
    label:       getLabel(category, subCategory),   // ← was missing
    badge:       category.charAt(0).toUpperCase() + category.slice(1),
    active:      b.active,
  };
}