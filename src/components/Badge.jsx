import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export function PctBadge({ val, size = 14 }) {
  if (val == null || Number.isNaN(val)) return <span className="text-gray-500">—</span>;
  const pos = val >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-medium font-mono tabular-nums ${pos ? "text-emerald-400" : "text-red-400"}`}>
      {pos ? <TrendingUp size={size} /> : <TrendingDown size={size} />}
      {pos ? "+" : ""}{val.toFixed(2)}%
    </span>
  );
}

export function OutlookLabel({ outlook }) {
  const map = {
    strongly_bullish: { label: "Strongly Bullish", cls: "bg-emerald-900 text-emerald-300" },
    bullish:          { label: "Bullish",          cls: "bg-emerald-900 text-emerald-300" },
    neutral:          { label: "Neutral",          cls: "bg-amber-900 text-amber-300" },
    bearish:          { label: "Bearish",          cls: "bg-red-900 text-red-300" },
    strongly_bearish: { label: "Strongly Bearish", cls: "bg-red-900 text-red-300" },
  };
  const m = map[outlook] || map.neutral;
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${m.cls}`}>{m.label}</span>;
}

export function ImpactBadge({ dir, size = 16 }) {
  const m = {
    up:   { icon: TrendingUp,   cls: "text-emerald-400" },
    down: { icon: TrendingDown, cls: "text-red-400" },
    flat: { icon: Minus,        cls: "text-amber-400" },
  };
  const d = m[dir] || m.flat;
  const Icon = d.icon;
  return <Icon size={size} className={d.cls} aria-label={dir} />;
}

export function Pill({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded font-medium ${className}`}>
      {children}
    </span>
  );
}
