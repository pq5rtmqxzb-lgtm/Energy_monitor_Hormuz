import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { TIMELINE } from "../data/timeline";
import { fmtDate } from "../lib/format";

const TONE = {
  bullish: { dot: "bg-emerald-500", ring: "ring-emerald-500/40", text: "text-emerald-300" },
  bearish: { dot: "bg-red-500",      ring: "ring-red-500/40",      text: "text-red-300" },
  neutral: { dot: "bg-amber-500",    ring: "ring-amber-500/40",    text: "text-amber-300" },
};

export function Timeline() {
  const [active, setActive] = useState(TIMELINE.length - 1);
  const ev = TIMELINE[active];
  const tone = TONE[ev?.tone] || TONE.neutral;

  return (
    <Card id="timeline" className="scroll-mt-32">
      <CardHeader icon={Calendar} iconClass="text-purple-400" title="Crisis Timeline">
        <span className="ml-auto text-xs text-gray-500 hidden sm:inline">click to inspect</span>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="overflow-x-auto -mx-1 px-1">
          <div className="relative min-w-[640px] py-6">
            <div className="absolute left-2 right-2 top-1/2 h-px bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
            <ul className="relative flex justify-between items-center">
              {TIMELINE.map((t, i) => {
                const ti = TONE[t.tone] || TONE.neutral;
                const isActive = i === active;
                return (
                  <li key={i}>
                    <button
                      onClick={() => setActive(i)}
                      aria-label={`${fmtDate(t.date)}: ${t.label}`}
                      className={`group flex flex-col items-center gap-1 focus:outline-none ${isActive ? "" : "opacity-80 hover:opacity-100"}`}
                    >
                      <span className={`text-[10px] font-mono ${isActive ? ti.text : "text-gray-500"}`}>{t.date.slice(5)}</span>
                      <span className={`w-3 h-3 rounded-full ${ti.dot} ${isActive ? `ring-4 ${ti.ring}` : ""} transition-all`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {ev && (
          <div className="bg-gray-800/50 border border-gray-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className={`inline-block w-2 h-2 rounded-full ${tone.dot}`} aria-hidden />
              <time dateTime={ev.date} className="font-mono">{fmtDate(ev.date)}</time>
              <span className="px-1.5 py-0.5 rounded bg-gray-800 text-[10px] uppercase tracking-wider text-gray-400">{ev.category}</span>
            </div>
            <h3 className="text-sm font-semibold">{ev.label}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{ev.detail}</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
