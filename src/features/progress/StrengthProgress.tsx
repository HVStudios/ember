import { useMemo, useState } from "react";
import { getExerciseName } from "@/data/exercises";
import type { CompletedWorkout } from "@/types/training";

export function StrengthProgress({ workouts }: { workouts: CompletedWorkout[] }) {
  const ids = useMemo(() => [...new Set(workouts.flatMap((w) => w.exercises.map((e) => e.exerciseId)))], [workouts]);
  const [selected, setSelected] = useState("");
  const id = ids.includes(selected) ? selected : ids[0];
  const points = useMemo(() => workouts.slice().reverse().flatMap((w) => w.exercises.filter((e) => e.exerciseId === id).map((e) => {
    const sets = e.sets.filter((s) => s.completed).map((s) => ({ load: Number(s.load.replace(",",".")), reps: Number(s.reps) })).filter((s) => s.load > 0 && s.reps > 0);
    return { date:w.endedAt, value:sets.reduce((best,s) => Math.max(best,s.load*(1+s.reps/30)),0) };
  })).filter((p) => p.value > 0), [workouts,id]);
  const max = Math.max(...points.map((p) => p.value),1); const min = Math.min(...points.map((p) => p.value),0);
  const path = points.map((p,i) => `${i?"L":"M"} ${points.length===1?150:12+i*276/(points.length-1)} ${108-(p.value-min)/(max-min||1)*82}`).join(" ");
  return <section className="strength-section"><div className="section-heading"><div><p className="eyebrow">STYRKA</p><h2>Utveckling per övning</h2></div></div>
    {ids.length===0?<div className="history-empty"><strong>Grafen vaknar efter ditt första pass</strong><p>Ember visar uppskattad 1RM utifrån vikt och repetitioner.</p></div>:<><select className="exercise-select" value={id} onChange={(e)=>setSelected(e.target.value)}>{ids.map((exerciseId)=><option key={exerciseId} value={exerciseId}>{getExerciseName(exerciseId)}</option>)}</select>{points.length?<div className="strength-chart"><div><span>UPPSKATTAD 1RM</span><strong>{points.at(-1)!.value.toFixed(1)} kg</strong></div><svg viewBox="0 0 300 120" role="img" aria-label="Styrkeutveckling"><path className="chart-grid" d="M12 26H288 M12 67H288 M12 108H288"/><path className="strength-line" d={path}/>{points.map((p,i)=><circle key={`${p.date}-${i}`} cx={points.length===1?150:12+i*276/(points.length-1)} cy={108-(p.value-min)/(max-min||1)*82} r="4"/>)}</svg><small>{points.length} loggade pass · Epley-formeln</small></div>:<div className="history-empty"><p>Övningen saknar ännu kompletta set med vikt och repetitioner.</p></div>}</>}
  </section>;
}
