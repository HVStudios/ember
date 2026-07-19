import type { SetTarget, WorkoutExerciseLog } from "@/types/training";

export type ProgressionRecommendation = {
  action: "increase" | "hold" | "review" | "none";
  title: string;
  rationale: string;
};

export function recommendProgression(target: SetTarget, previous?: WorkoutExerciseLog): ProgressionRecommendation {
  if (!target.reps || !previous) return { action: "none", title: "Skapa en utgångspunkt", rationale: "Genomför övningen kontrollerat så kan Ember jämföra nästa gång." };
  const sets = previous.sets.filter((set) => set.completed && Number(set.reps) > 0);
  if (sets.length < target.sets) return { action: "hold", title: "Behåll en trygg vikt", rationale: "Det saknas ett komplett jämförbart resultat från förra gången." };
  if (sets.every((set) => Number(set.reps) >= target.reps!.max) && previous.actualRir !== undefined && previous.actualRir < (target.rir?.min ?? 1)) return { action: "hold", title: "Behåll vikten", rationale: "Du nådde repetitionsmålet men hade mindre marginal än planerat. Bekräfta resultatet med bättre RIR innan du höjer." };
  if (sets.every((set) => Number(set.reps) >= target.reps!.max)) return { action: "increase", title: "Redo för en liten höjning", rationale: `Alla ${target.sets} set nådde ${target.reps.max} reps. Höj med minsta praktiska steg om tekniken och RIR var bra.` };
  if (sets.some((set) => Number(set.reps) < target.reps!.min)) return { action: "review", title: "Sänk eller se över tekniken", rationale: `Minst ett set hamnade under ${target.reps.min} reps. Prioritera kontroll före belastning.` };
  return { action: "hold", title: "Behåll vikten", rationale: `Bygg vidare inom intervallet ${target.reps.min}–${target.reps.max} reps.` };
}
