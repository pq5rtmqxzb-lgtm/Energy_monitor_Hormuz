import { useMemo, useState } from "react";
import { Activity } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";

const PALETTE = [
  "#fbbf24", "#60a5fa", "#34d399", "#f472b6", "#a78bfa", "#fb923c", "#22d3ee", "#f87171",
];

function normalize(series) {
  if (!series || series.length < 2) return [];
  const base = series[0].close;
  if (!base) return [];
  return series.map((p) => ({ date: p.date, value: ((p.close - base) / base) * 100 }));
}

export function PerformanceChart({ market }) {
  const datasets = useMemo(() => {
    if (!market) return [];
    const sets = [];
    if (market.brent?.history?.length) sets.push({ key: "Brent", history: normalize(market.brent.history) });
    if (market.wti?.history?.length) sets.push({ key: "WTI", history: normalize(market.wti.history) });
    for (const [ticker, d] of Object.entries(market.etfs || {})) {
      if (d?.history?.length) sets.push({ key: ticker, history: normalize(d.history) });
    }
    return sets;
  }, [market]);

  const [enabled, setEnabled] = useState(() => new Set(datasets.map((d) => d.key)));
  const toggle = (k) => setEnabled((prev) => {
    const next = new Set(prev);
    next.has(k) ? next.delete(k) : next.add(k);
    return next;
  });

  const dates = datasets[0]?.history.map((p) => p.date) || [];
  const active = datasets.filter((d) => enabled.has(d.key));
  const allValues = active.flatMap((d) => d.history.map((p) => p.value));
  const minY = Math.min(0, ...(allValues.length ? allValues : [0]));
  const maxY = Math.max(0, ...(allValues.length ? allValues : [0]));
  const padY = (maxY - minY) * 0.08 || 1;
  const yMin = minY - padY;
  const yMax = maxY + padY;

  const W = 720;
  const H = 240;
  const padL = 36, padR = 12, padT = 12, padB = 24;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const xAt = (i, n) => padL + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const yAt = (v) => padT + innerH - ((v - yMin) / (yMax - yMin || 1)) * innerH;
  const zeroY = yAt(0);

  const ticks = useMemo(() => {
    const step = (yMax - yMin) / 4;
    return [0, 1, 2, 3, 4].map((i) => yMin + i * step);
  }, [yMin, yMax]);

  return (
    <Card className="scroll-mt-32">
      <CardHeader icon={Activity} iconClass="text-amber-400" title="Performance vs 30 days ago">
        <span className="ml-auto text-xs text-gray-500">% change from start of window</span>
      </CardHeader>
      <CardBody className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {datasets.map((d, i) => {
            const on = enabled.has(d.key);
            const color = PALETTE[i % PALETTE.length];
            return (
              <button
                key={d.key}
                onClick={() => toggle(d.key)}
                aria-pressed={on}
                className={`px-2 py-1 rounded-md text-xs font-medium border transition-colors ${on ? "border-gray-600 bg-gray-800 text-gray-200" : "border-gray-800 bg-gray-900 text-gray-600 hover:text-gray-400"}`}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" style={{ background: on ? color : "#374151" }} />
                {d.key}
              </button>
            );
          })}
        </div>
        <div className="overflow-x-auto -mx-1">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="ETF and crude performance chart">
            {ticks.map((t, i) => (
              <g key={i}>
                <line x1={padL} y1={yAt(t)} x2={W - padR} y2={yAt(t)} stroke="rgba(255,255,255,0.05)" />
                <text x={padL - 6} y={yAt(t) + 3} textAnchor="end" fontSize="10" fill="#6b7280" fontFamily="ui-monospace, monospace">
                  {t.toFixed(0)}%
                </text>
              </g>
            ))}
            <line x1={padL} y1={zeroY} x2={W - padR} y2={zeroY} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 3" />
            {active.map((d) => {
              const idx = datasets.indexOf(d);
              const color = PALETTE[idx % PALETTE.length];
              const n = d.history.length;
              const path = d.history.map((p, i) => `${i === 0 ? "M" : "L"}${xAt(i, n).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(" ");
              return <path key={d.key} d={path} fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />;
            })}
            {dates.length > 0 && (
              <>
                <text x={padL} y={H - 6} fontSize="10" fill="#6b7280" fontFamily="ui-monospace, monospace">{dates[0]}</text>
                <text x={W - padR} y={H - 6} textAnchor="end" fontSize="10" fill="#6b7280" fontFamily="ui-monospace, monospace">{dates[dates.length - 1]}</text>
              </>
            )}
          </svg>
        </div>
      </CardBody>
    </Card>
  );
}
