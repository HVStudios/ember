import { describe, expect, it } from "vitest";
import { recommendProgression } from "./recommendation";
import type { WorkoutExerciseLog } from "@/types/training";

const target = { sets: 3, reps: { min: 8, max: 10 }, rir: { min: 2, max: 3 }, restSeconds: 90 };
const result = (reps: number[]): WorkoutExerciseLog => ({ exerciseId: "test", prescription: { exerciseId: "test", order: 1, target }, sets: reps.map((value, index) => ({ index, load: "20", reps: String(value), completed: true })) });

describe("recommendProgression", () => {
  it("increases only after every set reaches the upper bound", () => expect(recommendProgression(target, result([10, 10, 10])).action).toBe("increase"));
  it("holds while progressing inside the range", () => expect(recommendProgression(target, result([10, 9, 8])).action).toBe("hold"));
  it("reviews when a set falls below the range", () => expect(recommendProgression(target, result([8, 7, 6])).action).toBe("review"));
});
