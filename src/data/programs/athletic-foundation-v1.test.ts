import { describe, expect, it } from "vitest";
import { athleticFoundationV1 } from "./athletic-foundation-v1";
import { hasExercise } from "@/data/exercises";
import { hasUniqueExerciseVisual } from "@/components/exercise-visuals";

describe("athleticFoundationV1", () => {
  it("contains three ordered core workouts and one optional workout", () => {
    expect(athleticFoundationV1.workoutSequence).toEqual(["upper-a", "lower", "full-body"]);
    expect(athleticFoundationV1.optionalWorkoutIds).toEqual(["upper-b"]);
    expect(athleticFoundationV1.workouts.filter((workout) => workout.kind === "core")).toHaveLength(3);
    expect(athleticFoundationV1.workouts.filter((workout) => workout.kind === "optional")).toHaveLength(1);
  });

  it("uses unique, sequential exercise positions in every workout", () => {
    for (const workout of athleticFoundationV1.workouts) {
      expect(workout.exercises.map((exercise) => exercise.order)).toEqual(
        workout.exercises.map((_, index) => index + 1),
      );
      expect(new Set(workout.exercises.map((exercise) => exercise.exerciseId)).size).toBe(
        workout.exercises.length,
      );
    }
  });

  it("keeps working strength sets inside the joint-aware RIR target", () => {
    const strengthTargets = athleticFoundationV1.workouts.flatMap((workout) =>
      workout.exercises.map((exercise) => exercise.target).filter((target) => target.reps),
    );

    for (const target of strengthTargets) {
      expect(target.rir).toEqual({ min: 2, max: 3 });
      expect(target.reps!.min).toBeLessThanOrEqual(target.reps!.max);
    }
  });

  it("has instructional content for every programmed exercise", () => {
    for (const workout of athleticFoundationV1.workouts) {
      for (const exercise of workout.exercises) expect(hasExercise(exercise.exerciseId)).toBe(true);
    }
  });

  it("has a unique illustration cell for every programmed exercise", () => {
    for (const workout of athleticFoundationV1.workouts) {
      for (const exercise of workout.exercises) expect(hasUniqueExerciseVisual(exercise.exerciseId)).toBe(true);
    }
  });
});
