import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, MoreHorizontal, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ExerciseVisual } from "@/components/ExerciseVisual";
import { athleticFoundationV1 } from "@/data/programs/athletic-foundation-v1";
import { getExercise, getExerciseAlternatives } from "@/data/exercises";
import { canCompleteSet, isExerciseComplete } from "./session";
import { RestTimer } from "./RestTimer";
import { useWorkoutSession } from "./useWorkoutSession";
import { recommendProgression } from "@/lib/progression/recommendation";

export function WorkoutPage() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const workout = athleticFoundationV1.workouts.find((item) => item.id === workoutId) ?? athleticFoundationV1.workouts[0];
  const session = useWorkoutSession(workout);
  const [showGuide, setShowGuide] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [showWorkoutMenu, setShowWorkoutMenu] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, left: 0 }); }, [workout.id]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [session.draft?.currentExerciseIndex]);

  if (session.isLoading || !session.draft) {
    return <div className="workout-loading"><span className="brand-mark"><span /></span><p>Förbereder passet…</p></div>;
  }

  const draft = session.draft;
  const currentIndex = draft.currentExerciseIndex;
  const exerciseLog = draft.exercises[currentIndex];
  const item = exerciseLog.prescription;
  const exercise = getExercise(item.exerciseId);
  const complete = isExerciseComplete(draft, currentIndex);
  const isLast = currentIndex === draft.exercises.length - 1;
  const previous = session.previousResults.get(exerciseLog.exerciseId);
  const recommendation = recommendProgression(item.target, previous);
  const alternatives = getExerciseAlternatives(exercise.id);

  const navigateToExercise = (index: number) => {
    setShowGuide(false);
    session.goToExercise(index);
  };

  const next = () => {
    if (!isLast) navigateToExercise(currentIndex + 1);
  };

  const finishWorkout = async () => {
    setIsFinishing(true);
    const completed = await session.finish();
    if (completed) navigate(`/workout-summary/${completed.id}`, { replace: true });
    else setIsFinishing(false);
  };

  const discardWorkout = async () => {
    if (!window.confirm("Kassera det pågående passet? Loggade set går inte att återställa.")) return;
    await session.discard();
    navigate("/", { replace: true });
  };

  return (
    <div className="workout-page">
      <header className="workout-header">
        <Link to="/" className="icon-button" aria-label="Minimera pass"><ArrowLeft size={21} /></Link>
        <div><span>PASS {String(currentIndex + 1).padStart(2, "0")} · {workout.exercises.length}</span><strong>{workout.name.sv}</strong></div>
        <button className="icon-button" aria-label="Fler alternativ" onClick={() => setShowWorkoutMenu((value) => !value)}><MoreHorizontal size={22} /></button>
      </header>
      {showWorkoutMenu && <div className="workout-menu"><button onClick={() => setShowWorkoutMenu(false)}>Fortsätt passet</button><button onClick={() => void finishWorkout()}>Avsluta och spara nu</button><button className="is-danger" onClick={() => void discardWorkout()}>Kassera passet</button></div>}
      <div className="workout-progress"><span style={{ width: `${((currentIndex + 1) / workout.exercises.length) * 100}%` }} /></div>

      <main className="exercise-stage">
        <div className="exercise-heading">
          <div><p className="eyebrow">ÖVNING {currentIndex + 1} AV {workout.exercises.length}</p><h1>{exercise.name.sv}</h1><p>{item.target.sets} set · {targetLabel(item.target)} · RIR {item.target.rir?.min ?? "—"}–{item.target.rir?.max ?? "—"}</p></div>
          <button className="icon-button" aria-label="Övningshjälp" onClick={() => setShowGuide((value) => !value)}><CircleHelp size={21} /></button>
        </div>

        <div className="guide-card">
          <ExerciseVisual index={currentIndex} exerciseId={exercise.id} />
          <div className="guide-copy"><span>TEKNIK</span><strong>{exercise.cues.sv[0]}</strong><p>{exercise.cues.sv[1]}</p></div>
          {showGuide && <div className="guide-details"><h3>Så gör du</h3>{exercise.steps.sv.map((step) => <p key={step}>{step}</p>)}<div className="safety-note">Avbryt om en led gör ont, känns instabil eller tappar sin position.</div></div>}
          <button className="guide-more" onClick={() => setShowGuide((value) => !value)} aria-expanded={showGuide}>Visa instruktioner <ChevronDown className={showGuide ? "is-rotated" : ""} size={18} /></button>
        </div>

        <div className="previous-card"><div><span>FÖRRA GÅNGEN</span><strong>{previous ? previousResultLabel(previous) : "Första passet"}</strong></div><p>{previous ? "Ditt senaste genomförda resultat för övningen." : "Välj en vikt som lämnar 2–3 kontrollerade repetitioner."}</p></div>
        <div className={`recommendation-card is-${recommendation.action}`}><span>NÄSTA STEG</span><strong>{recommendation.title}</strong><p>{recommendation.rationale}</p></div>
        {alternatives.length > 0 && <button className="substitute-trigger" onClick={() => setShowAlternatives(true)}>Byt övning</button>}

        <section className="sets-section">
          <div className="set-table-head"><span>SET</span><span>KG / HANTEL</span><span>REPS</span><span /></div>
          {exerciseLog.sets.map((set) => (
            <div className={`set-row ${set.completed ? "is-complete" : ""}`} key={set.index}>
              <span className="set-number">{set.index + 1}</span>
              <label><span className="sr-only">Vikt för set {set.index + 1}</span><input inputMode="decimal" placeholder="—" value={set.load} disabled={set.completed} onChange={(event) => session.updateSet(set.index, "load", event.target.value)} /></label>
              <label><span className="sr-only">Repetitioner för set {set.index + 1}</span><input inputMode="numeric" placeholder="—" value={set.reps} disabled={set.completed} onChange={(event) => session.updateSet(set.index, "reps", event.target.value)} /></label>
              <button className="complete-set-button" disabled={!set.completed && !canCompleteSet(set)} onClick={() => session.toggleSet(set.index, item.target.restSeconds)} aria-label={`${set.completed ? "Öppna" : "Markera"} set ${set.index + 1} ${set.completed ? "igen" : "klart"}`}><span className="check-circle">{set.completed ? "✓" : ""}</span></button>
            </div>
          ))}
        </section>

        <div className="exercise-nav">
          <button disabled={currentIndex === 0} onClick={() => navigateToExercise(currentIndex - 1)}><ChevronLeft size={18} /> Föregående</button>
          <span>{currentIndex + 1} / {draft.exercises.length}</span>
          <button disabled={currentIndex === draft.exercises.length - 1} onClick={() => navigateToExercise(currentIndex + 1)}>Nästa <ChevronRight size={18} /></button>
        </div>
      </main>

      {draft.restEndsAt && <RestTimer endsAt={draft.restEndsAt} durationSeconds={item.target.restSeconds} onDismiss={session.dismissRest} />}
      {showAlternatives && <div className="sheet-backdrop" onClick={() => setShowAlternatives(false)}><div className="substitution-sheet" role="dialog" aria-modal="true" aria-label="Byt övning" onClick={(event) => event.stopPropagation()}><span>BYT ÖVNING</span><h2>Likvärdiga alternativ</h2><p>Resultatet loggas på övningen du faktiskt utför. Ursprungspasset förblir oförändrat.</p>{alternatives.map((alternative) => <button key={alternative.id} onClick={() => { session.substitute(alternative.id); setShowAlternatives(false); }}><strong>{alternative.name.sv}</strong><small>{alternative.purpose.sv}</small></button>)}<button className="sheet-cancel" onClick={() => setShowAlternatives(false)}>Avbryt</button></div></div>}
      <footer className="workout-footer">
        <div className="rest-hint"><Timer size={17} /><span>Vila efter set<strong>{item.target.restSeconds} sek</strong></span></div>
        <button className="next-button" disabled={!complete || isFinishing} onClick={isLast ? finishWorkout : next}>{isFinishing ? "Sparar…" : complete ? (isLast ? "Avsluta pass" : "Nästa övning") : "Slutför alla set"}</button>
      </footer>
    </div>
  );
}

function previousResultLabel(exercise: { sets: Array<{ completed: boolean; load: string; reps: string }> }) {
  const completedSets = exercise.sets.filter((set) => set.completed);
  if (!completedSets.length) return "Inga slutförda set";
  const load = completedSets.find((set) => set.load)?.load;
  const reps = completedSets.map((set) => set.reps).join(" / ");
  return `${load ? `${load} kg · ` : ""}${reps} reps`;
}

function targetLabel(target: { reps?: { min: number; max: number }; distanceMeters?: { min: number; max: number } }) {
  if (target.reps) return `${target.reps.min}–${target.reps.max} reps`;
  if (target.distanceMeters) return `${target.distanceMeters.min}–${target.distanceMeters.max} meter`;
  return "kontrollerat";
}
