import { describe, expect, it } from "vitest";
import { emberMealsV1 } from "./ember-meals-v1";

describe("Ember Meals v1", () => {
  it("contains six complete and unique recipes", () => {
    expect(emberMealsV1).toHaveLength(6);
    expect(new Set(emberMealsV1.map(({ id }) => id)).size).toBe(6);
    for (const recipe of emberMealsV1) {
      expect(recipe.servings).toBe(4);
      expect(recipe.calories).toBeGreaterThanOrEqual(650);
      expect(recipe.calories).toBeLessThanOrEqual(750);
      expect(recipe.protein).toBeGreaterThanOrEqual(40);
      expect(recipe.protein).toBeLessThanOrEqual(50);
      expect(recipe.ingredientGroups.length).toBeGreaterThan(0);
      expect(recipe.instructions.length).toBeGreaterThan(4);
    }
  });
});
