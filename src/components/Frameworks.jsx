import { Shield } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { ACTIVE_FRAMEWORKS } from "../data/frameworks";

const TONE_CLS = {
  active:    { box: "bg-gray-800/60 border-gray-700/60",     title: "text-purple-300" },
  partial:   { box: "bg-amber-950/30 border-amber-900/50",   title: "text-amber-300" },
  validated: { box: "bg-emerald-950/30 border-emerald-900/50", title: "text-emerald-300" },
  failed:    { box: "bg-red-950/30 border-red-900/50",       title: "text-red-300" },
  retired:   { box: "bg-gray-800/40 border-gray-700/40 opacity-75", title: "text-gray-400" },
};

export function Frameworks() {
  return (
    <Card id="framework" className="scroll-mt-32">
      <CardHeader icon={Shield} iconClass="text-purple-400" title="Active Frameworks">
        <span className="ml-auto text-xs text-gray-600">analytical lens, not commentary</span>
      </CardHeader>
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ACTIVE_FRAMEWORKS.map((f, i) => {
          const t = TONE_CLS[f.tone] || TONE_CLS.active;
          return (
            <div key={i} className={`rounded-xl p-3 border ${t.box}`}>
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${t.title}`}>{f.name}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{f.state}</p>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
