import { Droplets, RefreshCw } from "lucide-react";
import { freshnessTone, relativeTime } from "../lib/format";

export function Header({ snapshotLabel, asOf, onRefresh }) {
  const tone = freshnessTone(asOf);
  const dotCls = tone === "fresh" ? "bg-emerald-400" : tone === "stale" ? "bg-amber-400" : "bg-red-400";

  return (
    <header className="border-b border-gray-800 bg-gray-950/85 backdrop-blur supports-[backdrop-filter]:bg-gray-950/70 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-900/30">
            <Droplets size={22} className="text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold tracking-tight truncate">
              Oil &amp; Energy ETF Tracker
            </h1>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotCls}`} aria-hidden />
              <span>Market snapshot:</span>
              <span className="text-gray-300 font-mono">{snapshotLabel}</span>
              {asOf && <span className="text-gray-600">· data {relativeTime(asOf)}</span>}
            </p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          aria-label="Reload latest market data"
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-900/30 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-950"
        >
          <RefreshCw size={16} /> Reload
        </button>
      </div>
    </header>
  );
}
