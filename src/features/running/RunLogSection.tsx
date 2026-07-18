import { Plus, Route, Trash2 } from "lucide-react";
import { useState } from "react";
import { runRepository } from "@/db/database";
import type { RunLog, RunType } from "@/types/training";

const labels: Record<RunType, string> = { easy: "Lugnt", interval: "Intervall", tempo: "Tempo", long: "Långpass" };

export function RunLogSection({ initialRuns }: { initialRuns: RunLog[] }) {
  const [runs, setRuns] = useState(initialRuns);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [type, setType] = useState<RunType>("easy");
  const [distance, setDistance] = useState("");
  const [minutes, setMinutes] = useState("");
  const [note, setNote] = useState("");
  const save = async () => {
    const distanceKm = Number(distance.replace(",", ".")); const durationMinutes = Number(minutes);
    if (!(distanceKm > 0 && durationMinutes > 0)) return;
    const run = await runRepository.add({ ranAt: new Date(`${date}T12:00:00`).getTime(), type, distanceKm, durationSeconds: Math.round(durationMinutes * 60), note: note.trim() || undefined });
    setRuns((current) => [run, ...current]); setDistance(""); setMinutes(""); setNote(""); setOpen(false);
  };
  return <section className="running-section"><div className="section-heading"><div><p className="eyebrow">LÖPNING</p><h2>Löplogg</h2></div><button className="add-measurement" onClick={() => setOpen(!open)}><Plus size={16}/> Lägg till</button></div>
    {open && <div className="run-form"><label>Datum<input type="date" value={date} onChange={(e) => setDate(e.target.value)}/></label><label>Typ<select value={type} onChange={(e) => setType(e.target.value as RunType)}>{Object.entries(labels).map(([value,label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>Distans (km)<input inputMode="decimal" value={distance} onChange={(e) => setDistance(e.target.value)}/></label><label>Tid (min)<input inputMode="decimal" value={minutes} onChange={(e) => setMinutes(e.target.value)}/></label><label className="wide">Kommentar<input value={note} onChange={(e) => setNote(e.target.value)}/></label><button className="primary-action wide" onClick={() => void save()}>Spara löppass</button></div>}
    {runs.length === 0 ? <div className="history-empty"><Route size={26}/><strong>Inga löppass ännu</strong><p>Logga distans och tid så räknar Ember ut ditt tempo.</p></div> : <div className="run-list">{runs.map((run) => <article key={run.id}><span className="run-date">{new Intl.DateTimeFormat("sv-SE",{day:"numeric",month:"short"}).format(run.ranAt)}</span><div><strong>{labels[run.type]} · {run.distanceKm.toFixed(1)} km</strong><span>{formatDuration(run.durationSeconds)} · {pace(run)} min/km{run.note ? ` · ${run.note}` : ""}</span></div><button aria-label="Radera löppass" onClick={() => { if (confirm("Radera löppasset?")) void runRepository.remove(run.id).then(() => setRuns((current) => current.filter((item) => item.id !== run.id))); }}><Trash2 size={16}/></button></article>)}</div>}
  </section>;
}
function formatDuration(seconds:number){const h=Math.floor(seconds/3600),m=Math.round((seconds%3600)/60);return h?`${h} h ${m} min`:`${m} min`;}
function pace(run:RunLog){const seconds=run.durationSeconds/run.distanceKm;return `${Math.floor(seconds/60)}:${String(Math.round(seconds%60)).padStart(2,"0")}`;}
