import { Timer, X } from "lucide-react";
import { useEffect, useState } from "react";

export function RestTimer({ endsAt, durationSeconds, onDismiss }: { endsAt: number; durationSeconds: number; onDismiss: () => void }) {
  const [remaining, setRemaining] = useState(() => secondsRemaining(endsAt));

  useEffect(() => {
    const update = () => setRemaining(secondsRemaining(endsAt));
    update();
    const interval = window.setInterval(update, 250);
    return () => window.clearInterval(interval);
  }, [endsAt]);

  const progress = Math.max(0, Math.min(1, remaining / durationSeconds));

  return (
    <div className={`rest-timer ${remaining === 0 ? "is-finished" : ""}`} role="timer" aria-live="polite">
      <div className="rest-timer__icon"><Timer size={19} /></div>
      <div><span>{remaining === 0 ? "Vilan är klar" : "Vilar"}</span><strong>{formatTime(remaining)}</strong></div>
      <div className="rest-timer__track"><span style={{ transform: `scaleX(${progress})` }} /></div>
      <button onClick={onDismiss} aria-label="Stäng vilotimer"><X size={18} /></button>
    </div>
  );
}

function secondsRemaining(endsAt: number) {
  return Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
}
