import { FileText } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { Pill } from "./Badge";
import { MOU_TRACKER } from "../data/mou";
import { fmtDate } from "../lib/format";

const STATUS = {
  broken:   { label: "BROKEN",   pill: "bg-red-900 text-red-300",         dot: "bg-red-500" },
  halted:   { label: "HALTED",   pill: "bg-red-900 text-red-300",         dot: "bg-red-500" },
  disputed: { label: "DISPUTED", pill: "bg-amber-900 text-amber-300",     dot: "bg-amber-500" },
  pending:  { label: "PENDING",  pill: "bg-amber-900 text-amber-300",     dot: "bg-amber-500" },
  holding:  { label: "HOLDING",  pill: "bg-emerald-900 text-emerald-300", dot: "bg-emerald-500" },
};

function daysBetween(fromIso, toIso) {
  return Math.round((new Date(toIso) - new Date(fromIso)) / 86400000);
}

export function MouTracker() {
  const m = MOU_TRACKER;
  const today = new Date().toISOString().slice(0, 10);
  const elapsed = Math.min(Math.max(daysBetween(m.signed, today), 0), m.windowDays);
  const remaining = m.windowDays - elapsed;
  const pct = (elapsed / m.windowDays) * 100;

  return (
    <Card id="mou" className="scroll-mt-32">
      <CardHeader icon={FileText} iconClass="text-blue-400" title={m.title}>
        <Pill className="ml-auto bg-blue-900 text-blue-300 font-mono">
          {remaining > 0 ? `${remaining}d left in window` : "window expired"}
        </Pill>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm text-gray-300 leading-relaxed">{m.statusLine}</p>

        <div className="bg-gray-800/40 border border-gray-700/60 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-baseline text-xs">
            <span className="text-gray-400">60-day window — signed {fmtDate(m.signed)}</span>
            <span className="font-mono text-gray-300">expires ≈ {fmtDate(m.expires)}</span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-700 to-blue-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500">
            Demining deadline ≈ {fmtDate(m.deminingDeadline)} · day {elapsed} of {m.windowDays}
          </p>
        </div>

        <ul className="space-y-1.5">
          {m.clauses.map((c, i) => {
            const s = STATUS[c.status] || STATUS.disputed;
            return (
              <li key={i} className="bg-gray-800/50 border border-gray-700/40 rounded-xl px-4 py-2.5 flex items-start gap-3">
                <Pill className={`shrink-0 mt-0.5 text-[10px] font-mono ${s.pill}`}>{s.label}</Pill>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-200">{c.clause}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{c.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
