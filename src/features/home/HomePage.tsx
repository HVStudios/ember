import { ArrowRight, Check, Flame, Footprints, Timer, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { ExerciseVisual } from "@/components/ExerciseVisual";
import { athleticFoundationV1 } from "@/data/programs/athletic-foundation-v1";
import { getExerciseName } from "@/data/exercises";
import { activeWorkoutRepository, completedWorkoutRepository } from "@/db/database";
import type { ActiveWorkoutDraft } from "@/types/training";
import { readSettings } from "@/lib/settings";

export function HomePage() {
  const userName = readSettings().name || "du";
  const [nextWorkoutId, setNextWorkoutId] = useState(athleticFoundationV1.workoutSequence[0]);
  const workout = athleticFoundationV1.workouts.find((item) => item.id === nextWorkoutId)!;
  const [completedThisWeek, setCompletedThisWeek] = useState(0);
  const [activeDraft, setActiveDraft] = useState<ActiveWorkoutDraft>();

  useEffect(() => {
    void Promise.all([
      completedWorkoutRepository.countSince(startOfWeek()),
      completedWorkoutRepository.list(),
      activeWorkoutRepository.list(),
    ]).then(([count, history, drafts]) => {
      setCompletedThisWeek(count);
      setActiveDraft(drafts[0]);
      const latestCore = history.find((completed) => athleticFoundationV1.workoutSequence.includes(completed.workoutTemplateId));
      if (!latestCore) return;
      const currentIndex = athleticFoundationV1.workoutSequence.indexOf(latestCore.workoutTemplateId);
      setNextWorkoutId(athleticFoundationV1.workoutSequence[(currentIndex + 1) % athleticFoundationV1.workoutSequence.length]);
    });
  }, []);

  return (
    <div className="page home-page">
      <header className="topbar">
        <BrandMark />
        <button className="avatar" aria-label="Öppna profil">HV</button>
      </header>

      <section className="welcome">
        <p className="eyebrow">FREDAG · VECKA 1</p>
        <h1>God eftermiddag,<br /><span>{userName}.</span></h1>
        <p>En lugn start bygger något som håller.</p>
      </section>

      {activeDraft && <Link className="resume-card" to={`/workout/${activeDraft.workoutTemplateId}`}><span className="resume-pulse" /><div><span>PÅGÅENDE PASS</span><strong>Fortsätt {activeDraft.workoutName}</strong><small>Övning {activeDraft.currentExerciseIndex + 1} av {activeDraft.exercises.length}</small></div><ArrowRight size={19} /></Link>}

      <section className="workout-hero" aria-labelledby="today-title">
        <div className="hero-glow" />
        <div className="workout-hero__top">
          <span className="status-pill"><Flame size={14} fill="currentColor" /> Dagens pass</span>
          <span className="week-count">01 / 03</span>
        </div>
        <div className="workout-hero__content">
          <p className="eyebrow">ATLETISK GRUND</p>
          <h2 id="today-title">{workout.name.sv}</h2>
          <p>{workout.focus.sv}</p>
          <div className="workout-meta">
            <span><Timer size={17} /> cirka {workout.estimatedMinutes} min</span>
            <span><TrendingUp size={17} /> {workout.exercises.length} övningar</span>
          </div>
        </div>
        <div className="exercise-preview" aria-label="Första övningarna">
          {workout.exercises.slice(0, 3).map((item, index) => (
            <div className="preview-item" key={item.exerciseId}>
              <ExerciseVisual compact index={index} exerciseId={item.exerciseId} />
              <div><strong>{getExerciseName(item.exerciseId)}</strong><span>{item.target.sets} set · {item.target.reps?.min}–{item.target.reps?.max} reps</span></div>
            </div>
          ))}
        </div>
        <Link className="primary-action" to={`/workout/${workout.id}`}>
          Starta pass <ArrowRight size={20} />
        </Link>
      </section>

      <section className="week-section">
        <div className="section-heading"><div><p className="eyebrow">DEN HÄR VECKAN</p><h2>Håll glöden vid liv</h2></div><span>{completedThisWeek} av 3</span></div>
        <div className="week-grid">
          <div className="metric-card"><span className="metric-icon is-done"><Check size={18} /></span><strong>{completedThisWeek}</strong><p>Gympass</p><small>av 3 planerade</small></div>
          <div className="metric-card"><span className="metric-icon"><Footprints size={18} /></span><strong>2</strong><p>Löppass</p><small>av 2 planerade</small></div>
        </div>
      </section>

      <blockquote className="daily-note">“Det viktiga är inte ett perfekt pass. Det är att du kommer tillbaka.”<span>— EMBER</span></blockquote>
    </div>
  );
}

function startOfWeek() {
  const date = new Date();
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
}
