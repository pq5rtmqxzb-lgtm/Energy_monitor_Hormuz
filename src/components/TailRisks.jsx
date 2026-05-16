import { AlertTriangle } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { ImpactBadge } from "./Badge";
import { TAIL_SCENARIOS } from "../data/scenarios";

export function TailRisks() {
  return (
    <Card id="tail" className="scroll-mt-32">
      <CardHeader icon={AlertTriangle} iconClass="text-purple-400" title="Tail Risks">
        <span className="ml-auto text-xs text-gray-600">10% combined probability</span>
      </CardHeader>
      <CardBody className="space-y-3">
        <p className="text-xs text-gray-500">{TAIL_SCENARIOS.intro}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[TAIL_SCENARIOS.up, TAIL_SCENARIOS.down].map((t, i) => (
            <article
              key={i}
              className={`rounded-xl p-3 border ${t.direction === "up" ? "bg-emerald-950/30 border-emerald-900/50" : "bg-red-950/30 border-red-900/50"}`}
            >
              <header className="flex items-center gap-2 mb-1.5">
                <ImpactBadge dir={t.direction} />
                <h4 className={`text-xs font-bold uppercase tracking-wider ${t.direction === "up" ? "text-emerald-300" : "text-red-300"}`}>{t.label}</h4>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded font-mono font-medium ${t.direction === "up" ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`}>{t.probability}%</span>
              </header>
              <p className="text-xs text-gray-400 leading-relaxed">{t.narrative}</p>
            </article>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
