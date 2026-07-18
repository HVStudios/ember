import { ArrowLeft, Check, Dumbbell, Info, ShieldCheck, Target } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ExerciseVisual } from "@/components/ExerciseVisual";
import { getExercise } from "@/data/exercises";

export function ExerciseDetailPage() {
  const { exerciseId = "" } = useParams();
  const exercise = getExercise(exerciseId);

  return (
    <main className="exercise-detail-page">
      <header><Link to="/program" className="icon-button" aria-label="Tillbaka till programmet"><ArrowLeft size={21} /></Link><span>ÖVNINGSBIBLIOTEK</span><div className="header-spacer" /></header>
      <ExerciseVisual index={Math.abs(hash(exercise.id)) % 16} exerciseId={exercise.id} />
      <section className="exercise-detail-title"><p className="eyebrow">{exercise.equipment.join(" · ") || "GYM"}</p><h1>{exercise.name.sv}</h1><p>{exercise.purpose.sv}</p></section>
      <section className="detail-section"><div className="detail-section__title"><Target size={18} /><h2>Så gör du</h2></div><ol>{exercise.steps.sv.map((step) => <li key={step}>{step}</li>)}</ol></section>
      <section className="detail-section"><div className="detail-section__title"><Check size={18} /><h2>Tekniknycklar</h2></div><ul>{exercise.cues.sv.map((cue) => <li key={cue}>{cue}</li>)}</ul></section>
      {exercise.expectedSensation.sv.length > 0 && <section className="detail-section"><div className="detail-section__title"><Dumbbell size={18} /><h2>Det ska kännas här</h2></div><p>{exercise.expectedSensation.sv.join(", ")}.</p></section>}
      {exercise.commonMistakes.sv.length > 0 && <section className="detail-section"><div className="detail-section__title"><Info size={18} /><h2>Vanliga misstag</h2></div><ul>{exercise.commonMistakes.sv.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section>}
      <aside className="joint-note"><ShieldCheck size={21} /><div><strong>Ledkvalitet före vikt</strong><p>Arbeta i ett kontrollerat och bekvämt rörelseomfång. Avbryt vid smärta, instabilitet eller känslan att en led ger vika.</p></div></aside>
    </main>
  );
}

function hash(value: string) {
  return [...value].reduce((total, character) => ((total << 5) - total) + character.charCodeAt(0), 0);
}
