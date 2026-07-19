import { useCallback, useEffect, useState } from "react";
import { activeWorkoutRepository, completedWorkoutRepository } from "@/db/database";
import { athleticFoundationV1 } from "@/data/programs/athletic-foundation-v1";
import type { ActiveWorkoutDraft, WorkoutTemplate } from "@/types/training";
import {
  createWorkoutDraft,
  moveToExercise,
  startRest,
  toggleSetComplete,
  updateSetValue,
  substituteExercise,
  setActualRir,
} from "./session";

export function useWorkoutSession(workout: WorkoutTemplate) {
  const [draft, setDraft] = useState<ActiveWorkoutDraft>();
  const [isLoading, setIsLoading] = useState(true);
  const [previousResults, setPreviousResults] = useState<Map<string, ActiveWorkoutDraft["exercises"][number]>>(new Map());

  useEffect(() => {
    let active = true;
    const id = `active:${workout.id}`;

    void Promise.all([
      activeWorkoutRepository.get(id),
      completedWorkoutRepository.latestExerciseResults(workout.exercises.map((exercise) => exercise.exerciseId)),
    ]).then(async ([stored, history]) => {
      const initial = stored ?? createWorkoutDraft(athleticFoundationV1, workout);
      if (!stored) await activeWorkoutRepository.save(initial);
      if (active) {
        setDraft(initial);
        setPreviousResults(history);
        setIsLoading(false);
      }
    });

    return () => { active = false; };
  }, [workout]);

  const commit = useCallback((updater: (current: ActiveWorkoutDraft) => ActiveWorkoutDraft) => {
    setDraft((current) => {
      if (!current) return current;
      const next = updater(current);
      void activeWorkoutRepository.save(next);
      return next;
    });
  }, []);

  return {
    draft,
    isLoading,
    updateSet: (setIndex: number, field: "load" | "reps" | "distanceMeters" | "durationSeconds", value: string) =>
      commit((current) => updateSetValue(current, current.currentExerciseIndex, setIndex, field, value)),
    toggleSet: (setIndex: number, restSeconds: number) =>
      commit((current) => {
        const toggled = toggleSetComplete(current, current.currentExerciseIndex, setIndex);
        return toggled.exercises[current.currentExerciseIndex].sets[setIndex].completed
          ? startRest(toggled, restSeconds)
          : { ...toggled, restEndsAt: undefined };
      }),
    goToExercise: (index: number) => commit((current) => moveToExercise(current, index)),
    dismissRest: () => commit((current) => ({ ...current, restEndsAt: undefined, updatedAt: Date.now() })),
    substitute: (exerciseId: string) => commit((current) => substituteExercise(current, current.currentExerciseIndex, exerciseId)),
    setRir: (rir: number) => commit((current) => setActualRir(current, current.currentExerciseIndex, rir)),
    completeWarmup: () => commit((current) => ({ ...current, warmupCompleted: true, updatedAt: Date.now() })),
    previousResults,
    finish: async () => {
      if (!draft) return undefined;
      return completedWorkoutRepository.complete(draft);
    },
    discard: async () => {
      if (!draft) return;
      await activeWorkoutRepository.remove(draft.id);
      setDraft(undefined);
    },
  };
}
