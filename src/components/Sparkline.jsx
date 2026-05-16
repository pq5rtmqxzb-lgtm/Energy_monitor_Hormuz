import { useMemo, useState } from "react";

export function Sparkline({
  history = [],
  width = 220,
  height = 56,
  stroke = "#fbbf24",
  fill = "rgba(251,191,36,0.15)",
  showAxis = false,
  ariaLabel = "price sparkline",
}) {
  const [hover, setHover] = useState(null);

  const { path, area, points, min, max } = useMemo(() => {
    const data = history.filter((p) => p?.close != null);
    if (data.length < 2) return { path: "", area: "", points: [], min: 0, max: 0 };
    const xs = data.map((_, i) => i);
    const ys = data.map((p) => p.close);
    const min = Math.min(...ys);
    const max = Math.max(...ys);
    const pad = (max - min) * 0.12 || 1;
    const yMin = min - pad;
    const yMax = max + pad;
    const w = width;
    const h = height;
    const xStep = (w - 4) / Math.max(xs.length - 1, 1);
    const points = data.map((p, i) => ({
      x: 2 + i * xStep,
      y: h - 2 - ((p.close - yMin) / (yMax - yMin || 1)) * (h - 4),
      close: p.close,
      date: p.date,
    }));
    const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const area = `${path} L${points[points.length - 1].x.toFixed(1)},${h} L${points[0].x.toFixed(1)},${h} Z`;
    return { path, area, points, min, max };
  }, [history, width, height]);

  if (!path) {
    return <div className="text-[10px] text-gray-600 italic">no history</div>;
  }

  const onMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let nearest = points[0];
    let best = Infinity;
    for (const p of points) {
      const d = Math.abs(p.x - x);
      if (d < best) { best = d; nearest = p; }
    }
    setHover(nearest);
  };

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={ariaLabel}
        className="overflow-visible"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <path d={area} fill={fill} stroke="none" />
        <path d={path} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {hover && (
          <>
            <line x1={hover.x} y1={0} x2={hover.x} y2={height} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <circle cx={hover.x} cy={hover.y} r="3" fill={stroke} stroke="#0a0a0a" strokeWidth="1.5" />
          </>
        )}
      </svg>
      {showAxis && (
        <div className="flex justify-between text-[10px] text-gray-600 font-mono mt-0.5">
          <span>{min.toFixed(0)}</span>
          <span>{max.toFixed(0)}</span>
        </div>
      )}
      {hover && (
        <div className="absolute -top-7 px-1.5 py-0.5 text-[10px] font-mono bg-gray-800 border border-gray-700 rounded text-gray-200 pointer-events-none whitespace-nowrap"
             style={{ left: Math.min(Math.max(hover.x - 30, 0), width - 80) }}>
          {hover.date} · {hover.close.toFixed(2)}
        </div>
      )}
    </div>
  );
}
