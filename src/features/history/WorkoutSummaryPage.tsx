import { ArrowRight, Check, Clock3, Dumbbell, Flame, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { getExerciseName } from "@/data/exercises";
import { completedWorkoutRepository } from "@/db/database";
import type { CompletedWorkout } from "@/types/training";
import { readSettings } from "@/lib/settings";

export function WorkoutSummaryPage() {
  const userName = readSettings().name || "du";
  const { sessionId } = useParams();
  const [workout, setWorkout] = useState<CompletedWorkout>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!sessionId) return;
    void completedWorkoutRepository.get(sessionId).then((result) => {
      if (active) { setWorkout(result); setIsLoading(false); }
    });
    return () => { active = false; };
  }, [sessionId]);

  const stats = useMemo(() => workout ? summarize(workout) : undefined, [workout]);

  if (isLoading) return <div className="workout-loading"><span className="brand-mark"><span /></span><p>Sammanställer passet…</p></div>;
  if (!workout || !stats) return <div className="summary-page"><h1>Passet hittades inte</h1><Link to="/">Till startsidan</Link></div>;

  return (
    <main className="summary-page">
      <header><BrandMark /><span className="summary-complete"><Check size={15} /> Sparat lokalt</span></header>
      <section className="summary-hero">
        <div className="summary-flame"><Flame size={32} fill="currentColor" /></div>
        <p className="eyebrow">PASSET ÄR KLART</p>
        <h1>Bra jobbat,<br /><span>{userName}.</span></h1>
        <p>{workout.workoutName} är sparat. Nästa gång använder Ember resultaten som utgångspunkt.</p>
      </section>
      <section className="summary-stats">
        <div><Clock3 size={19} /><strong>{formatDuration(workout.durationSeconds)}</strong><span>Tid</span></div>
        <div><Dumbbell size={19} /><strong>{stats.completedSets}</strong><span>Set</span></div>
        <div><Trophy size={19} /><strong>{stats.exercisesCompleted}</strong><span>Övningar</span></div>
      </section>
      <section className="summary-exercises">
        <div className="section-heading"><div><p className="eyebrow">SAMMANFATTNING</p><h2>{workout.workoutName}</h2></div></div>
        {workout.exercises.map((exercise, index) => {
          const completedSets = exercise.sets.filter((set) => set.completed);
          const fullyCompleted = completedSets.length === exercise.sets.length;
          return <div className={`summary-exercise ${fullyCompleted ? "is-complete" : ""}`} key={exercise.exerciseId}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{getExerciseName(exercise.exerciseId)}</strong><small>{completedSets.length} av {exercise.sets.length} set · {shortResult(completedSets)}</small></div><span className="summary-status">{fullyCompleted ? <Check size={17} /> : "—"}</span></div>;
        })}
      </section>
      <Link className="primary-action summary-action" to="/">Till startsidan <ArrowRight size={20} /></Link>
    </main>
  );
}

function summarize(workout: CompletedWorkout) {
  const completedSets = workout.exercises.flatMap((exercise) => exercise.sets).filter((set) => set.completed).length;
  const exercisesCompleted = workout.exercises.filter((exercise) => exercise.sets.some((set) => set.completed)).length;
  return { completedSets, exercisesCompleted };
}

function formatDuration(seconds: number) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `${minutes} min`;
}

function shortResult(sets: Array<{ load: string; reps: string; distanceMeters?: string; durationSeconds?: string }>) {
  if (!sets.length) return "inga resultat";
  const load = sets.find((set) => set.load)?.load;
  const distance = sets.find((set) => set.distanceMeters)?.distanceMeters;
  const duration = sets.find((set) => set.durationSeconds)?.durationSeconds;
  if (distance) return `${load ? `${load} kg · ` : ""}${distance} meter`;
  if (duration) return `${load ? `${load} kg · ` : ""}${duration} sekunder`;
  return `${load ? `${load} kg · ` : ""}${sets.map((set) => set.reps).join(" / ")} reps`;
}
