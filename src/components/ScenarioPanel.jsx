import { ChevronRight, Clock, Target } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { ImpactBadge, OutlookLabel } from "./Badge";
import { ProbabilityDonut } from "./ProbabilityDonut";
import { Waterfall } from "./Waterfall";
import { SCENARIO_META, SCENARIOS, TAIL_SCENARIOS } from "../data/scenarios";

function SupplyLine({ row, alignment }) {
  if (row.section === "disruptions" || row.section === "mitigations") {
    return (
      <div className="pt-3 pb-1">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${row.section === "disruptions" ? "text-red-400" : "text-emerald-400"}`}>{row.label}</h4>
      </div>
    );
  }
  if (row.section === "gross" || row.section === "mitigations_total" || row.section === "net") {
    const bc = row.section === "gross" ? "border-red-800 bg-red-950/40"
             : row.section === "mitigations_total" ? "border-emerald-800 bg-emerald-950/40"
             : "border-amber-800 bg-amber-950/40";
    const tc = row.section === "gross" ? "text-red-300"
             : row.section === "mitigations_total" ? "text-emerald-300"
             : "text-amber-300";
    return (
      <div className={`rounded-xl px-4 py-3 border ${bc} mt-1 mb-2`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-bold ${tc}`}>{row.label}</span>
          {row.impact && <span className={`text-sm font-mono font-bold tabular-nums ${tc}`}>{row.impact}</span>}
        </div>
        {row.detail && <p className="text-xs text-gray-400 mt-1 leading-relaxed">{row.detail}</p>}
      </div>
    );
  }
  return (
    <div className="bg-gray-800/50 border border-gray-700/40 rounded-xl px-4 py-2.5 flex items-start gap-3">
      <span className={`text-xs font-mono font-bold shrink-0 mt-0.5 w-32 text-right tabular-nums ${row.impact?.startsWith("+") ? "text-emerald-400" : row.impact?.startsWith("-") ? "text-red-400" : "text-gray-400"}`}>
        {row.impact}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-200">{row.event}</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{row.detail}</p>
      </div>
    </div>
  );
}

export function ScenarioPanel({ active, onSelect }) {
  const sc = SCENARIOS[active];
  const meta = SCENARIO_META[active];

  const slices = [
    { key: "bull",    label: "Bull",     value: SCENARIOS.bull.probability, color: SCENARIO_META.bull.fill },
    { key: "base",    label: "Base",     value: SCENARIOS.base.probability, color: SCENARIO_META.base.fill },
    { key: "bear",    label: "Bear",     value: SCENARIOS.bear.probability, color: SCENARIO_META.bear.fill },
    { key: "tail_up", label: "Tail-up",  value: TAIL_SCENARIOS.up.probability, color: "#34d399" },
    { key: "tail_dn", label: "Tail-down", value: TAIL_SCENARIOS.down.probability, color: "#f87171" },
  ];

  return (
    <Card id="scenarios" className="scroll-mt-32">
      <CardHeader icon={Target} iconClass="text-purple-400" title="Scenario Analysis">
        <span className="ml-auto text-xs text-gray-500 hidden sm:inline">Bull/Base/Bear sum to 90% — tail buckets below</span>
      </CardHeader>
      <div className="px-4 py-4 border-b border-gray-800 bg-gray-900/50">
        <ProbabilityDonut
          slices={slices}
          active={active}
          onSelect={(k) => ["bull", "base", "bear"].includes(k) && onSelect(k)}
        />
      </div>
      <div className="flex border-b border-gray-800" role="tablist" aria-label="Scenario cases">
        {["bull", "base", "bear"].map((key) => {
          const m = SCENARIO_META[key];
          const s = SCENARIOS[key];
          const isActive = active === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(key)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500/40 ${isActive ? `${m.bg} ${m.text} border-b-2 ${m.border}` : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/40"}`}
            >
              <span className={`w-2 h-2 rounded-full ${m.dot}`} aria-hidden />
              <span>{m.label}</span>
              {s?.probability != null && (
                <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${isActive ? m.badge : "bg-gray-800 text-gray-500"}`}>{s.probability}%</span>
              )}
            </button>
          );
        })}
      </div>
      {sc ? (
        <CardBody className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <OutlookLabel outlook={sc.outlook} />
            {sc.timeframe && (
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={12} /> {sc.timeframe}
              </span>
            )}
            {sc.probability != null && <span className="text-xs text-gray-500">Probability: <span className="font-mono">{sc.probability}%</span></span>}
            {sc.price_target && <span className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{sc.price_target}</span>}
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">{sc.narrative}</p>
          {sc.price_reasoning && (
            <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Price Target Reasoning</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{sc.price_reasoning}</p>
            </div>
          )}
          {sc.supply_baseline && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Supply &amp; Demand Impact</h3>
              <Waterfall supplyImpacts={sc.supply_impacts} />
              <div className="bg-gray-800/50 border border-gray-700/40 rounded-xl p-3 my-2">
                <p className="text-[11px] font-mono text-gray-400 leading-snug">{sc.supply_baseline}</p>
              </div>
              <div className="space-y-1.5">
                {sc.supply_impacts?.map((row, i) => <SupplyLine key={i} row={row} />)}
              </div>
              {sc.net_supply_impact && (
                <div className="mt-2 bg-gray-800/50 border border-gray-700/60 rounded-xl p-3">
                  <p className="text-xs font-semibold text-gray-300">{sc.net_supply_impact}</p>
                </div>
              )}
            </div>
          )}
          {sc.etf_impacts && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ETF Impact Assessment</h3>
              <div className="space-y-1.5">
                {Object.entries(sc.etf_impacts).map(([ticker, impact]) => (
                  <div key={ticker} className="bg-gray-800/50 border border-gray-700/40 rounded-xl px-4 py-2.5 flex items-center gap-3">
                    <ImpactBadge dir={impact.direction} />
                    <span className="text-sm font-semibold w-14 font-mono">{ticker}</span>
                    <span className="text-xs text-gray-400 flex-1 leading-relaxed">{impact.reasoning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {sc.triggers?.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Triggers to Watch</h3>
              <ul className="flex flex-wrap gap-2">
                {sc.triggers.map((t, i) => (
                  <li key={i}>
                    <span className="bg-gray-800/60 border border-gray-700 text-xs text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                      <ChevronRight size={10} className={meta.text} /> {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      ) : (
        <div className="p-6 text-center text-sm text-gray-600">No data for this scenario.</div>
      )}
    </Card>
  );
}
