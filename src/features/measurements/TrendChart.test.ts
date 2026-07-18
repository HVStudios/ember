import { describe, expect, it } from "vitest";
import { buildTrendPoints } from "./trend";

describe("buildTrendPoints", () => {
  it("maps chronological measurements across the chart and higher values upward", () => {
    const points = buildTrendPoints([{ x: 1, y: 65 }, { x: 2, y: 66 }, { x: 3, y: 64 }], 320, 120);
    expect(points[0].x).toBe(0);
    expect(points[2].x).toBe(320);
    expect(points[1].y).toBeLessThan(points[0].y);
    expect(points[2].y).toBeGreaterThan(points[0].y);
  });
});
