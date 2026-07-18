export type VisualCell = { atlas: 1 | 2; index: number; columns: number; rows: number };

const v1 = (index: number): VisualCell => ({ atlas: 1, index, columns: 4, rows: 4 });
const v2 = (index: number): VisualCell => ({ atlas: 2, index, columns: 3, rows: 2 });

export const exerciseVisuals: Record<string, VisualCell> = {
  "flat-neutral-dumbbell-press": v1(0),
  "neutral-lat-pulldown": v1(1),
  "seated-cable-row": v1(2),
  "landmine-press": v1(3),
  "cable-lateral-raise": v1(4),
  "rope-triceps-pushdown": v1(5),
  "cable-curl": v1(6),
  "supported-bulgarian-split-squat": v1(7),
  "dumbbell-romanian-deadlift": v1(8),
  "leg-press": v1(9),
  "leg-curl": v1(10),
  "sled-push": v1(11),
  "reverse-crunch": v1(12),
  "trap-bar-deadlift": v1(13),
  "chest-supported-row": v1(14),
  "incline-neutral-dumbbell-press": v1(15),
  "assisted-pull-up": v2(0),
  "supported-single-leg-rdl": v2(1),
  "farmer-carry": v2(2),
  "dead-bug": v2(3),
  "face-pull": v2(4),
};

export function hasUniqueExerciseVisual(exerciseId: string) { return exerciseId in exerciseVisuals; }
