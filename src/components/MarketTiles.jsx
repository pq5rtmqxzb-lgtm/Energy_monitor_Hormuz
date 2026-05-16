import { PctBadge } from "./Badge";
import { Sparkline } from "./Sparkline";
import { fmtPrice } from "../lib/format";

const TILES = [
  { key: "brent", label: "Brent Crude", emoji: "🛢️", stroke: "#fbbf24", fill: "rgba(251,191,36,0.15)" },
  { key: "wti",   label: "WTI Crude",   emoji: "🛢️", stroke: "#f97316", fill: "rgba(249,115,22,0.15)" },
];

export function MarketTiles({ market }) {
  return (
    <div id="markets" className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-mt-32">
      {TILES.map(({ key, label, emoji, stroke, fill }) => {
        const data = market?.[key];
        if (!data) return null;
        return (
          <div
            key={key}
            className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 flex flex-col gap-3 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl" aria-hidden>{emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                  <p className="text-2xl font-bold font-mono tabular-nums">{fmtPrice(data.price, "USD")}</p>
                </div>
              </div>
              <PctBadge val={data.change_pct} />
            </div>
            <Sparkline history={data.history} width={300} height={48} stroke={stroke} fill={fill} ariaLabel={`${label} 30-day price history`} />
            {data.note && <p className="text-[11px] text-gray-500 leading-snug">{data.note}</p>}
          </div>
        );
      })}
    </div>
  );
}
