import { useState } from "react";
import { BarChart3, Plus, X } from "lucide-react";
import { Card, CardHeader } from "./Card";
import { PctBadge } from "./Badge";
import { Sparkline } from "./Sparkline";
import { fmtPrice } from "../lib/format";

export function Watchlist({ etfs, market, onAdd, onRemove }) {
  const [showAdd, setShowAdd] = useState(false);
  const [newTicker, setNewTicker] = useState("");
  const [newName, setNewName] = useState("");

  const submit = () => {
    if (!newTicker.trim()) return;
    onAdd({ ticker: newTicker.trim().toUpperCase(), name: newName.trim() || newTicker.trim().toUpperCase() });
    setNewTicker(""); setNewName(""); setShowAdd(false);
  };

  return (
    <Card id="watchlist" className="scroll-mt-32">
      <CardHeader icon={BarChart3} iconClass="text-amber-500" title="ETF Watchlist">
        <span className="text-xs text-gray-600 ml-1">{etfs.length} ETFs</span>
        <button
          onClick={() => setShowAdd((s) => !s)}
          aria-label="Add ETF to watchlist"
          className="ml-auto text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50 rounded px-1"
        >
          <Plus size={14} /> Add ETF
        </button>
      </CardHeader>
      {showAdd && (
        <div className="px-4 py-3 bg-gray-800/60 border-b border-gray-700 flex gap-2 items-end flex-wrap">
          <div>
            <label className="text-xs text-gray-400 block mb-1" htmlFor="add-ticker">Ticker</label>
            <input id="add-ticker" value={newTicker} onChange={(e) => setNewTicker(e.target.value)} placeholder="e.g. XOP"
                   className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white w-24 focus:outline-none focus:border-amber-500 font-mono" />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1" htmlFor="add-name">Name (optional)</label>
            <input id="add-name" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. SPDR S&P Oil & Gas"
                   className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white w-56 focus:outline-none focus:border-amber-500" />
          </div>
          <button onClick={submit} className="bg-amber-600 hover:bg-amber-500 text-white text-sm px-4 py-1.5 rounded-lg font-medium transition-colors">Add</button>
          <button onClick={() => setShowAdd(false)} className="text-gray-500 hover:text-gray-300 text-sm px-2 py-1.5 transition-colors">Cancel</button>
        </div>
      )}
      <ul className="divide-y divide-gray-800">
        {etfs.map((etf) => {
          const d = market?.etfs?.[etf.ticker];
          const currency = d?.currency || etf.currency || "USD";
          return (
            <li key={etf.ticker} className="px-4 py-3 flex items-center justify-between hover:bg-gray-800/40 transition-colors group">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${etf.primary ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-orange-900/30" : "bg-gray-800 text-gray-300"}`}>
                  {etf.ticker.slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    {etf.ticker}
                    {etf.primary && <span className="text-[10px] bg-amber-900 text-amber-300 px-1.5 py-0.5 rounded uppercase tracking-wider">Primary</span>}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{etf.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <Sparkline history={d?.history || []} width={120} height={32} stroke={etf.primary ? "#fbbf24" : "#94a3b8"} fill={etf.primary ? "rgba(251,191,36,0.12)" : "rgba(148,163,184,0.10)"} ariaLabel={`${etf.ticker} price history`} />
                </div>
                <div className="text-right min-w-[5.5rem]">
                  {d?.awaitingOpen ? (
                    <p className="text-xs text-gray-400 italic">Awaiting open</p>
                  ) : d ? (
                    <>
                      <p className="text-sm font-semibold font-mono tabular-nums">{fmtPrice(d.price, currency)}</p>
                      <PctBadge val={d.change_pct} />
                    </>
                  ) : (
                    <span className="text-gray-600">—</span>
                  )}
                </div>
                {!etf.primary && (
                  <button
                    onClick={() => onRemove(etf.ticker)}
                    aria-label={`Remove ${etf.ticker} from watchlist`}
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-gray-600 hover:text-red-400 transition-all p-1 -m-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500/40"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
