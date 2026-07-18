import type { BodyMeasurement } from "@/types/training";
import { buildTrendPoints } from "./trend";

export type TrendMetric = "weightKg" | "waistCm";

export function TrendChart({ measurements, metric }: { measurements: BodyMeasurement[]; metric: TrendMetric }) {
  const values = measurements.flatMap((measurement) => measurement[metric] == null ? [] : [{ x: measurement.measuredAt, y: measurement[metric] }]);
  const points = buildTrendPoints(values, 320, 120);
  const latest = values.at(-1)?.y;
  const first = values[0]?.y;

  if (points.length < 2) return <div className="chart-empty">Lägg till minst två mätningar för att se trenden.</div>;

  return (
    <div className="trend-chart">
      <div className="trend-chart__summary"><span>{metric === "weightKg" ? "Vikttrend" : "Midjetrend"}</span><strong>{latest?.toFixed(1)} <small>{metric === "weightKg" ? "kg" : "cm"}</small></strong><em className={(latest ?? 0) <= (first ?? 0) ? "is-down" : ""}>{signed((latest ?? 0) - (first ?? 0))}</em></div>
      <svg viewBox="0 0 320 120" role="img" aria-label={`${metric === "weightKg" ? "Vikt" : "Midja"} från ${first?.toFixed(1)} till ${latest?.toFixed(1)}`}>
        <defs><linearGradient id={`chart-fill-${metric}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9784a" stopOpacity=".24" /><stop offset="1" stopColor="#e9784a" stopOpacity="0" /></linearGradient></defs>
        <path className="chart-area" d={`${path(points)} L 320 120 L 0 120 Z`} fill={`url(#chart-fill-${metric})`} />
        <polyline points={points.map((point) => `${point.x},${point.y}`).join(" ")} />
        {points.map((point, index) => <circle key={`${point.x}-${index}`} cx={point.x} cy={point.y} r={index === points.length - 1 ? 4 : 2.5} />)}
      </svg>
    </div>
  );
}

function path(points: Array<{ x: number; y: number }>) { return `M ${points.map((point) => `${point.x} ${point.y}`).join(" L ")}`; }
function signed(value: number) { return `${value > 0 ? "+" : ""}${value.toFixed(1)}`; }
