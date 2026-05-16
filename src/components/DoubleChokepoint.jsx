import { AlertTriangle } from "lucide-react";
import { Pill } from "./Badge";
import { DOUBLE_CHOKEPOINT_STATUS } from "../data/frameworks";

const TAG_CLS = {
  CONFIRMED: "bg-emerald-900 text-emerald-300",
  PARTIAL:   "bg-amber-900 text-amber-300",
  "NOT REFRESHED": "bg-gray-800 text-gray-400",
};

export function DoubleChokepoint() {
  const s = DOUBLE_CHOKEPOINT_STATUS;
  return (
    <section className="bg-amber-950/30 border border-amber-900/60 rounded-2xl overflow-hidden">
      <div className="px-4 py-3 border-b border-amber-900/50 flex items-center gap-2">
        <AlertTriangle size={16} className="text-amber-400" />
        <h2 className="text-sm font-semibold text-amber-300">{s.title}</h2>
        <Pill className="ml-auto bg-amber-900 text-amber-300">PARTIAL</Pill>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-300">
          <strong className="text-amber-300">Thesis:</strong> {s.thesis}
        </p>
        <p className="text-xs text-gray-400">
          <strong className="text-amber-300/80">Probability framing:</strong> {s.probability}
        </p>
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Evidence</h4>
          <ul className="space-y-1.5">
            {s.evidence.map((e, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                <Pill className={`shrink-0 mt-0.5 text-[10px] uppercase ${TAG_CLS[e.tag] || TAG_CLS.PARTIAL}`}>{e.tag}</Pill>
                <span>{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-amber-950/50 border border-amber-900/40 rounded-xl p-3">
          <p className="text-xs text-amber-200"><strong>Current state:</strong> {s.impact}</p>
        </div>
      </div>
    </section>
  );
}
