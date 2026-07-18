import { describe, expect, it } from "vitest";
import { athleticFoundationV1 } from "@/data/programs/athletic-foundation-v1";
import { createWorkoutDraft, startRest, toggleSetComplete } from "@/features/active-workout/session";
import { createCompletedWorkout } from "./completion";

describe("createCompletedWorkout", () => {
  it("creates an immutable historical snapshot without active timer state", () => {
    const workout = athleticFoundationV1.workouts[0];
    let draft = createWorkoutDraft(athleticFoundationV1, workout, 1_000);
    draft = toggleSetComplete(draft, 0, 0, 2_000);
    draft = startRest(draft, 90, 2_000);

    const completed = createCompletedWorkout(draft, 61_000);

    expect(completed.id).toBe("completed:1000");
    expect(completed.durationSeconds).toBe(60);
    expect(completed.exercises[0].sets[0].completed).toBe(true);
    expect(completed).not.toHaveProperty("restEndsAt");
    expect(draft.restEndsAt).toBe(92_000);
  });
});
