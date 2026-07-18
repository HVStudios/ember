import { CalendarDays, ChevronRight, Clock3, Dumbbell, History, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BrandMark } from "@/components/BrandMark";
import { completedWorkoutRepository, runRepository } from "@/db/database";
import type { CompletedWorkout } from "@/types/training";
import type { BodyMeasurement } from "@/types/training";
import { measurementRepository } from "@/db/database";
import { TrendChart, type TrendMetric } from "@/features/measurements/TrendChart";
import { MeasurementForm } from "@/features/measurements/MeasurementForm";
import { RunLogSection } from "@/features/running/RunLogSection";
import { StrengthProgress } from "@/features/progress/StrengthProgress";
import type { RunLog } from "@/types/training";

export function ProgressPage() {
  const [history, setHistory] = useState<CompletedWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [showMeasurementForm, setShowMeasurementForm] = useState(false);
  const [metric, setMetric] = useState<TrendMetric>("weightKg");
  const [editingMeasurement, setEditingMeasurement] = useState<BodyMeasurement>();
  const [runs, setRuns] = useState<RunLog[]>([]);

  useEffect(() => {
    void Promise.all([completedWorkoutRepository.list(), measurementRepository.list(), runRepository.list()]).then(([workouts, savedMeasurements, savedRuns]) => { setHistory(workouts); setMeasurements(savedMeasurements); setRuns(savedRuns); setIsLoading(false); });
  }, []);

  const stats = useMemo(() => summarize(history), [history]);

  return (
    <div className="page progress-page">
      <header className="topbar"><BrandMark /><span className="program-version">LOKAL HISTORIK</span></header>
      <section className="page-intro"><p className="eyebrow">UTVECKLING</p><h1>Det du bygger över tid</h1><p>Varje avslutat pass blir en del av historiken och ger Ember ett bättre underlag inför nästa gång.</p></section>
      <section className="progress-stats">
        <div><Dumbbell size={18} /><strong>{stats.sessions}</strong><span>Pass</span></div>
        <div><Clock3 size={18} /><strong>{stats.minutes}</strong><span>Minuter</span></div>
        <div><CalendarDays size={18} /><strong>{stats.thisMonth}</strong><span>Denna månad</span></div>
      </section>
      <section className="measurements-section">
        <div className="section-heading"><div><p className="eyebrow">KROPP</p><h2>Mått och trend</h2></div><button className="add-measurement" onClick={() => { setEditingMeasurement(undefined); setShowMeasurementForm(true); }}><Plus size={16} /> Lägg till</button></div>
        {showMeasurementForm && <MeasurementForm initial={editingMeasurement} onCancel={() => { setShowMeasurementForm(false); setEditingMeasurement(undefined); }} onSaved={(measurement) => { setMeasurements((current) => [...current.filter((item) => item.id !== measurement.id), measurement].sort((a, b) => a.measuredAt - b.measuredAt)); setShowMeasurementForm(false); setEditingMeasurement(undefined); }} />}
        <div className="metric-tabs"><button className={metric === "weightKg" ? "is-active" : ""} onClick={() => setMetric("weightKg")}>Vikt</button><button className={metric === "waistCm" ? "is-active" : ""} onClick={() => setMetric("waistCm")}>Midja</button></div>
        <TrendChart measurements={measurements} metric={metric} />
        {measurements.length > 0 && <div className="measurement-latest"><span>Senaste mätning · {new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short" }).format(measurements.at(-1)!.measuredAt)}</span><strong>{measurements.at(-1)!.weightKg?.toFixed(1) ?? "—"} kg <em>·</em> {measurements.at(-1)!.waistCm?.toFixed(1) ?? "—"} cm</strong></div>}
        {measurements.length > 0 && <div className="measurement-log">{measurements.slice(-5).reverse().map((measurement) => <div key={measurement.id}><span>{new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short", year: "numeric" }).format(measurement.measuredAt)}</span><strong>{measurement.weightKg?.toFixed(1) ?? "—"} kg · {measurement.waistCm?.toFixed(1) ?? "—"} cm</strong><button onClick={() => { setEditingMeasurement(measurement); setShowMeasurementForm(true); }}>Redigera</button><button className="is-danger" onClick={() => { if (window.confirm("Radera mätningen?")) void measurementRepository.remove(measurement.id).then(() => setMeasurements((current) => current.filter((item) => item.id !== measurement.id))); }}>Radera</button></div>)}</div>}
      </section>
      <StrengthProgress workouts={history} />
      {!isLoading && <RunLogSection initialRuns={runs} />}
      <section className="history-section">
        <div className="section-heading"><div><p className="eyebrow">PASSHISTORIK</p><h2>Senaste passen</h2></div></div>
        {isLoading ? <div className="history-empty">Läser historiken…</div> : history.length === 0 ? (
          <div className="history-empty"><History size={28} /><strong>Historiken börjar med ditt första pass</strong><p>När du avslutar ett pass visas det här tillsammans med dina resultat.</p><Link to="/program">Visa programmet</Link></div>
        ) : (
          <div className="history-list">
            {history.map((workout) => <Link className="history-item" to={`/workout-summary/${workout.id}`} key={workout.id}><span className="history-date"><strong>{new Date(workout.endedAt).getDate()}</strong><small>{monthName(workout.endedAt)}</small></span><div><strong>{workout.workoutName}</strong><span>{formatDate(workout.endedAt)} · {Math.max(1, Math.round(workout.durationSeconds / 60))} min · {completedSetCount(workout)} set</span></div><ChevronRight size={18} /></Link>)}
          </div>
        )}
      </section>
    </div>
  );
}

function summarize(history: CompletedWorkout[]) {
  const now = new Date();
  return {
    sessions: history.length,
    minutes: history.reduce((sum, workout) => sum + Math.max(1, Math.round(workout.durationSeconds / 60)), 0),
    thisMonth: history.filter((workout) => { const date = new Date(workout.endedAt); return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth(); }).length,
  };
}

function completedSetCount(workout: CompletedWorkout) { return workout.exercises.flatMap((exercise) => exercise.sets).filter((set) => set.completed).length; }
function monthName(timestamp: number) { return new Intl.DateTimeFormat("sv-SE", { month: "short" }).format(timestamp).replace(".", "").toUpperCase(); }
function formatDate(timestamp: number) { return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "long" }).format(timestamp); }
