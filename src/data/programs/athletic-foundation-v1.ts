import type { ProgramDefinition, WorkoutTemplate } from "@/types/training";

const strengthTarget = (sets: number, min: number, max: number, restSeconds = 90) => ({
  sets,
  reps: { min, max },
  rir: { min: 2, max: 3 },
  restSeconds,
});

const workouts: WorkoutTemplate[] = [
  {
    id: "upper-a",
    name: { sv: "Överkropp A", en: "Upper A" },
    kind: "core",
    estimatedMinutes: 48,
    focus: { sv: "Grundläggande press och drag", en: "Foundational push and pull" },
    exercises: [
      { exerciseId: "flat-neutral-dumbbell-press", order: 1, target: strengthTarget(3, 8, 10) },
      { exerciseId: "neutral-lat-pulldown", order: 2, target: strengthTarget(3, 8, 12) },
      { exerciseId: "seated-cable-row", order: 3, target: strengthTarget(3, 8, 12) },
      { exerciseId: "landmine-press", order: 4, target: { ...strengthTarget(2, 8, 10), unilateral: true } },
      { exerciseId: "cable-lateral-raise", order: 5, target: strengthTarget(2, 12, 15, 60) },
      { exerciseId: "rope-triceps-pushdown", order: 6, target: strengthTarget(2, 10, 15, 60) },
      { exerciseId: "cable-curl", order: 7, target: strengthTarget(2, 10, 15, 60) }
    ]
  },
  {
    id: "lower",
    name: { sv: "Underkropp", en: "Lower" },
    kind: "core",
    estimatedMinutes: 50,
    focus: { sv: "Ben, höftkontroll och bål", en: "Legs, hip control, and trunk" },
    exercises: [
      { exerciseId: "supported-bulgarian-split-squat", order: 1, target: { ...strengthTarget(3, 8, 8), unilateral: true } },
      { exerciseId: "dumbbell-romanian-deadlift", order: 2, target: strengthTarget(3, 8, 10, 120) },
      { exerciseId: "leg-press", order: 3, target: strengthTarget(3, 10, 12, 90) },
      { exerciseId: "leg-curl", order: 4, target: strengthTarget(2, 10, 15, 75) },
      { exerciseId: "sled-push", order: 5, target: { sets: 4, distanceMeters: { min: 20, max: 20 }, restSeconds: 90 } },
      { exerciseId: "reverse-crunch", order: 6, target: strengthTarget(3, 10, 15, 60) }
    ]
  },
  {
    id: "full-body",
    name: { sv: "Helkropp", en: "Full Body" },
    kind: "core",
    estimatedMinutes: 50,
    focus: { sv: "Styrka och atletisk kapacitet", en: "Strength and athletic capacity" },
    exercises: [
      { exerciseId: "trap-bar-deadlift", order: 1, target: strengthTarget(3, 5, 5, 150) },
      { exerciseId: "chest-supported-row", order: 2, target: strengthTarget(3, 8, 12) },
      { exerciseId: "incline-neutral-dumbbell-press", order: 3, target: strengthTarget(3, 8, 10) },
      { exerciseId: "assisted-pull-up", order: 4, target: strengthTarget(3, 6, 10) },
      { exerciseId: "supported-single-leg-rdl", order: 5, target: { ...strengthTarget(2, 8, 8), unilateral: true } },
      { exerciseId: "farmer-carry", order: 6, target: { sets: 3, distanceMeters: { min: 20, max: 30 }, restSeconds: 75 } },
      { exerciseId: "dead-bug", order: 7, target: { ...strengthTarget(2, 8, 8, 45), unilateral: true } }
    ]
  },
  {
    id: "upper-b",
    name: { sv: "Överkropp B", en: "Upper B" },
    kind: "optional",
    estimatedMinutes: 45,
    focus: { sv: "Extra överkroppsvolym", en: "Additional upper-body volume" },
    exercises: [
      { exerciseId: "incline-neutral-dumbbell-press", order: 1, target: strengthTarget(3, 8, 10) },
      { exerciseId: "chest-supported-row", order: 2, target: strengthTarget(3, 8, 12) },
      { exerciseId: "neutral-lat-pulldown", order: 3, target: strengthTarget(2, 8, 12) },
      { exerciseId: "cable-lateral-raise", order: 4, target: strengthTarget(2, 12, 15, 60) },
      { exerciseId: "face-pull", order: 5, target: strengthTarget(2, 12, 15, 60) },
      { exerciseId: "rope-triceps-pushdown", order: 6, target: strengthTarget(2, 10, 15, 60) },
      { exerciseId: "cable-curl", order: 7, target: strengthTarget(2, 10, 15, 60) },
      { exerciseId: "farmer-carry", order: 8, target: { sets: 2, distanceMeters: { min: 20, max: 30 }, restSeconds: 75 } }
    ]
  }
];

export const athleticFoundationV1: ProgramDefinition = {
  id: "athletic-foundation",
  version: 1,
  name: { sv: "Atletisk grund", en: "Athletic Foundation" },
  description: {
    sv: "Tre grundpass och ett valfritt överkroppspass med fokus på kontroll, styrka och en atletisk fysik.",
    en: "Three core sessions and one optional upper-body session focused on control, strength, and an athletic physique."
  },
  workoutSequence: ["upper-a", "lower", "full-body"],
  optionalWorkoutIds: ["upper-b"],
  workouts
};

