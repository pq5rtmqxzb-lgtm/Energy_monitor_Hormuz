import { useState } from "react";

export function ProbabilityDonut({ slices, active, onSelect }) {
  const [hover, setHover] = useState(null);
  const total = slices.reduce((s, x) => s + x.value, 0) || 100;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;
  const arcs = slices.map((s) => {
    const length = (s.value / total) * circumference;
    const arc = { ...s, length, offset, gap: circumference - length };
    offset += length;
    return arc;
  });

  const focused = hover ?? active ?? slices[0]?.key;
  const focusedSlice = slices.find((s) => s.key === focused) || slices[0];

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="-60 -60 120 120" className="w-32 h-32 shrink-0 -rotate-90" role="img" aria-label="Scenario probability distribution">
        <circle r={radius} fill="none" stroke="#1f2937" strokeWidth="14" />
        {arcs.map((a) => {
          const isFocus = a.key === focused;
          return (
            <circle
              key={a.key}
              r={radius}
              fill="none"
              stroke={a.color}
              strokeWidth={isFocus ? 18 : 14}
              strokeDasharray={`${a.length} ${a.gap}`}
              strokeDashoffset={-a.offset}
              opacity={focused && !isFocus ? 0.45 : 1}
              onMouseEnter={() => setHover(a.key)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect?.(a.key)}
              style={{ cursor: onSelect ? "pointer" : "default", transition: "all 0.18s ease" }}
            />
          );
        })}
      </svg>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-2xl font-bold tabular-nums" style={{ color: focusedSlice?.color }}>
            {focusedSlice?.value}%
          </span>
          <span className="text-sm font-semibold text-gray-300">{focusedSlice?.label}</span>
        </div>
        <ul className="mt-2 space-y-1">
          {slices.map((s) => (
            <li key={s.key}>
              <button
                onMouseEnter={() => setHover(s.key)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect?.(s.key)}
                aria-label={`${s.label}: ${s.value} percent`}
                className={`w-full flex items-center gap-2 text-xs px-1.5 py-0.5 rounded transition-colors ${s.key === focused ? "bg-gray-800" : "hover:bg-gray-800/50"}`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="text-gray-300 truncate">{s.label}</span>
                <span className="ml-auto font-mono text-gray-400 tabular-nums">{s.value}%</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
