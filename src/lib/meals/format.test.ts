import { describe, expect, it } from "vitest";
import { formatAmount, formatIngredient, scaleAmount } from "./format";

describe("recipe portion scaling", () => {
  it("scales quantities from four portions", () => {
    expect(scaleAmount(700, 2)).toBe(350);
    expect(scaleAmount(260, 8)).toBe(520);
  });

  it("formats common fractions in Swedish recipe style", () => {
    expect(formatAmount(1.5)).toBe("1½");
    expect(formatIngredient({ amount: 1.5, unit: "msk", item: "honung" }, 2)).toBe("¾ msk honung");
  });
});
