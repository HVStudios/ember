import { describe, expect, it } from "vitest";
import { athleticFoundationV1 } from "@/data/programs/athletic-foundation-v1";
import { createWorkoutDraft, isExerciseComplete, moveToExercise, startRest, substituteExercise, toggleSetComplete, updateSetValue } from "./session";

const workout = athleticFoundationV1.workouts[0];

describe("workout session", () => {
  it("creates a complete set structure from the data-driven prescription", () => {
    const draft = createWorkoutDraft(athleticFoundationV1, workout, 100);
    expect(draft.exercises).toHaveLength(workout.exercises.length);
    expect(draft.exercises[0].sets).toHaveLength(3);
    expect(draft.startedAt).toBe(100);
  });

  it("sanitizes Swedish decimal input and completes a set immutably", () => {
    const draft = createWorkoutDraft(athleticFoundationV1, workout, 100);
    const withLoad = updateSetValue(draft, 0, 0, "load", "12,5 kg", 110);
    const withReps = updateSetValue(withLoad, 0, 0, "reps", "10", 120);
    const completed = toggleSetComplete(withReps, 0, 0, 130);

    expect(draft.exercises[0].sets[0].load).toBe("");
    expect(completed.exercises[0].sets[0]).toMatchObject({ load: "12.5", reps: "10", completed: true, completedAt: 130 });
  });

  it("reports completion only when every prescribed set is complete", () => {
    let draft = createWorkoutDraft(athleticFoundationV1, workout, 100);
    for (let index = 0; index < draft.exercises[0].sets.length; index += 1) draft = toggleSetComplete(draft, 0, index, 110 + index);
    expect(isExerciseComplete(draft, 0)).toBe(true);
    expect(isExerciseComplete(draft, 1)).toBe(false);
  });

  it("bounds navigation and stores a rest deadline", () => {
    const draft = createWorkoutDraft(athleticFoundationV1, workout, 100);
    expect(moveToExercise(draft, 99, 110).currentExerciseIndex).toBe(workout.exercises.length - 1);
    expect(startRest(draft, 90, 1_000).restEndsAt).toBe(91_000);
  });

  it("substitutes an exercise while preserving its origin and resetting performance", () => {
    let draft = createWorkoutDraft(athleticFoundationV1, workout, 100);
    draft = updateSetValue(draft, 0, 0, "reps", "10", 110);
    const substituted = substituteExercise(draft, 0, "incline-neutral-dumbbell-press", 120);
    expect(substituted.exercises[0].originalExerciseId).toBe("flat-neutral-dumbbell-press");
    expect(substituted.exercises[0].exerciseId).toBe("incline-neutral-dumbbell-press");
    expect(substituted.exercises[0].sets[0].reps).toBe("");
  });
});
