export function ExerciseVisual({ index, exerciseId, compact = false }: { index: number; exerciseId?: string; compact?: boolean }) {
  const visual = exerciseVisuals[exerciseId ?? ""] ?? { atlas: 1, index: index % 16, columns: 4, rows: 4 };
  const column = visual.index % visual.columns;
  const row = Math.floor(visual.index / visual.columns);
  return (
    <div className={`exercise-visual exercise-atlas ${compact ? "exercise-visual--compact" : ""}`} style={{ backgroundImage: `url('/media/exercises/ember-exercise-atlas-v${visual.atlas}.png')`, backgroundSize: `${visual.columns * 100}% ${visual.rows * 100}%`, backgroundPosition: `${column * 100 / Math.max(1, visual.columns - 1)}% ${row * 100 / Math.max(1, visual.rows - 1)}%` }} aria-hidden="true">
      <span>{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

import { exerciseVisuals } from "./exercise-visuals";
