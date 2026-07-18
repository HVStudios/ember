export function buildTrendPoints(values: Array<{ x: number; y: number }>, width: number, height: number) {
  if (!values.length) return [];
  const minX = Math.min(...values.map((value) => value.x));
  const maxX = Math.max(...values.map((value) => value.x));
  const minY = Math.min(...values.map((value) => value.y));
  const maxY = Math.max(...values.map((value) => value.y));
  const xRange = Math.max(1, maxX - minX);
  const yRange = Math.max(1, maxY - minY);
  return values.map((value) => ({
    x: ((value.x - minX) / xRange) * width,
    y: 10 + (1 - ((value.y - minY) / yRange)) * (height - 20),
  }));
}
