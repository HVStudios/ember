import { useState } from "react";
import { measurementRepository } from "@/db/database";
import type { BodyMeasurement } from "@/types/training";

export function MeasurementForm({ initial, onSaved, onCancel }: { initial?: BodyMeasurement; onSaved: (measurement: BodyMeasurement) => void; onCancel: () => void }) {
  const [weight, setWeight] = useState(initial?.weightKg?.toString() ?? "");
  const [waist, setWaist] = useState(initial?.waistCm?.toString() ?? "");
  const [date, setDate] = useState(() => localDate(initial?.measuredAt ?? Date.now()));
  const [saving, setSaving] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!weight && !waist) return;
    setSaving(true);
    const values = { measuredAt: new Date(`${date}T12:00:00`).getTime(), weightKg: parseNumber(weight), waistCm: parseNumber(waist) };
    const measurement = initial ? await measurementRepository.update({ ...initial, ...values }) : await measurementRepository.add(values);
    onSaved(measurement);
  };

  return <form className="measurement-form" onSubmit={submit}><div className="measurement-form__head"><div><span>{initial ? "REDIGERA" : "NY MÄTNING"}</span><strong>Logga kroppsmått</strong></div><button type="button" onClick={onCancel}>Avbryt</button></div><label>Datum<input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label><div className="measurement-fields"><label>Vikt <span>kg</span><input inputMode="decimal" placeholder="65,0" value={weight} onChange={(event) => setWeight(event.target.value)} /></label><label>Midja <span>cm</span><input inputMode="decimal" placeholder="82,0" value={waist} onChange={(event) => setWaist(event.target.value)} /></label></div><button className="primary-action" disabled={saving || (!weight && !waist)}>{saving ? "Sparar…" : initial ? "Spara ändring" : "Spara mätning"}</button></form>;
}

function parseNumber(value: string) { return value ? Number(value.replace(",", ".")) : undefined; }
function localDate(timestamp: number) { const date = new Date(timestamp); return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
