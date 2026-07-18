import { ArrowRight, ChevronRight, Clock3, Dumbbell, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { ExerciseVisual } from "@/components/ExerciseVisual";
import { getExerciseName } from "@/data/exercises";
import { athleticFoundationV1 } from "@/data/programs/athletic-foundation-v1";

export function ProgramPage() {
  return (
    <div className="page program-page">
      <header className="topbar"><BrandMark /><span className="program-version">PROGRAM · V1</span></header>
      <section className="page-intro">
        <p className="eyebrow">DITT UPPLÄGG</p>
        <h1>Atletisk grund</h1>
        <p>Tre pass som bildar en komplett träningsvecka, plus ett valfritt överkroppspass när tid och återhämtning tillåter.</p>
      </section>
      <div className="program-principles">
        <span><Dumbbell size={15} /> 3 kärnpass</span>
        <span><Sparkles size={15} /> 1 bonuspass</span>
        <span><Clock3 size={15} /> 45–50 min</span>
      </div>
      <section className="program-list" aria-label="Träningspass">
        {athleticFoundationV1.workouts.map((workout, workoutIndex) => (
          <article className={`program-card ${workout.kind === "optional" ? "is-optional" : ""}`} key={workout.id}>
            <div className="program-card__header">
              <div><span>{workout.kind === "optional" ? "BONUS" : `PASS ${String(workoutIndex + 1).padStart(2, "0")}`}</span><h2>{workout.name.sv}</h2><p>{workout.focus.sv}</p></div>
              <strong>{workout.estimatedMinutes}<small>min</small></strong>
            </div>
            <div className="program-exercises">
              {workout.exercises.map((item, index) => (
                <Link to={`/exercise/${item.exerciseId}`} className="program-exercise" key={item.exerciseId}>
                  <ExerciseVisual compact index={index} exerciseId={item.exerciseId} />
                  <div><strong>{getExerciseName(item.exerciseId)}</strong><span>{targetSummary(item.target)}</span></div>
                  <ChevronRight size={17} />
                </Link>
              ))}
            </div>
            <Link className="program-start" to={`/workout/${workout.id}`}>{workout.kind === "optional" ? "Starta bonuspass" : "Starta pass"}<ArrowRight size={18} /></Link>
          </article>
        ))}
      </section>
    </div>
  );
}

function targetSummary(target: { sets: number; reps?: { min: number; max: number }; distanceMeters?: { min: number; max: number } }) {
  if (target.reps) return `${target.sets} set · ${target.reps.min}–${target.reps.max} reps`;
  if (target.distanceMeters) return `${target.sets} rundor · ${target.distanceMeters.min}–${target.distanceMeters.max} m`;
  return `${target.sets} set`;
}
