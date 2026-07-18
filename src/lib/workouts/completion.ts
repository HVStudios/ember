import type { ActiveWorkoutDraft, CompletedWorkout } from "@/types/training";

export function createCompletedWorkout(draft: ActiveWorkoutDraft, endedAt = Date.now()): CompletedWorkout {
  const { restEndsAt, ...snapshot } = draft;
  void restEndsAt;
  return {
    ...snapshot,
    id: `completed:${draft.startedAt}`,
    endedAt,
    updatedAt: endedAt,
    durationSeconds: Math.max(1, Math.round((endedAt - draft.startedAt) / 1000)),
  };
}
