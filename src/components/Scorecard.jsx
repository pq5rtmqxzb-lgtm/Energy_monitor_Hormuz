import { ClipboardCheck } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { Pill } from "./Badge";
import { SCORECARD } from "../data/scorecard";

const VERDICT = {
  hit:     { label: "HIT",     pill: "bg-emerald-900 text-emerald-300" },
  partial: { label: "PARTIAL", pill: "bg-amber-900 text-amber-300" },
  miss:    { label: "MISS",    pill: "bg-red-900 text-red-300" },
};

export function Scorecard() {
  const tally = SCORECARD.entries.reduce(
    (acc, e) => ({ ...acc, [e.verdict]: (acc[e.verdict] || 0) + 1 }),
    {}
  );

  return (
    <Card id="scorecard" className="scroll-mt-32">
      <CardHeader icon={ClipboardCheck} iconClass="text-amber-400" title="Scorecard: the May 17 calls, graded">
        <span className="ml-auto text-xs font-mono text-gray-500">
          {tally.hit || 0} hit · {tally.partial || 0} partial · {tally.miss || 0} miss
        </span>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm text-gray-300 leading-relaxed">{SCORECARD.intro}</p>
        <ul className="space-y-1.5">
          {SCORECARD.entries.map((e, i) => {
            const v = VERDICT[e.verdict] || VERDICT.partial;
            return (
              <li key={i} className="bg-gray-800/50 border border-gray-700/40 rounded-xl px-4 py-2.5 flex items-start gap-3">
                <Pill className={`shrink-0 mt-0.5 text-[10px] font-mono ${v.pill}`}>{v.label}</Pill>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-200">{e.call}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{e.outcome}</p>
                </div>
              </li>
            );
          })}
        </ul>
        {SCORECARD.lessons?.length > 0 && (
          <div className="bg-gray-800/40 border border-gray-700/60 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Lessons carried into the re-baseline</h4>
            <ul className="space-y-1.5">
              {SCORECARD.lessons.map((l, i) => (
                <li key={i} className="text-xs text-gray-400 leading-relaxed flex gap-2">
                  <span className="text-amber-400 shrink-0">→</span> {l}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
