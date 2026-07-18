import { describe, expect, it } from "vitest";
import { z } from "zod";

describe("backup format", () => {
  it("uses a stable version discriminator", () => {
    const header = z.object({ format: z.literal("ember-backup"), version: z.literal(1) });
    expect(header.safeParse({ format: "ember-backup", version: 1 }).success).toBe(true);
    expect(header.safeParse({ format: "other", version: 1 }).success).toBe(false);
  });
});
