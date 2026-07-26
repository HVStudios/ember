import type { Ingredient } from "@/types/meals";

const fractions = new Map<number, string>([[0.25, "¼"], [0.5, "½"], [0.75, "¾"]]);

export function scaleAmount(amount: number | undefined, servings: number, baseServings = 4) {
  return amount === undefined ? undefined : amount * (servings / baseServings);
}

export function formatAmount(amount: number | undefined) {
  if (amount === undefined) return "";
  const rounded = Math.round(amount * 100) / 100;
  const whole = Math.floor(rounded);
  const fraction = Math.round((rounded - whole) * 100) / 100;
  if (fractions.has(fraction)) return `${whole || ""}${fractions.get(fraction)}`;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
}

export function formatIngredient(ingredient: Ingredient, servings: number, baseServings = 4) {
  const amount = formatAmount(scaleAmount(ingredient.amount, servings, baseServings));
  return [amount, ingredient.unit, ingredient.item].filter(Boolean).join(" ");
}
