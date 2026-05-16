import { Shield } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { ACTIVE_FRAMEWORKS } from "../data/frameworks";

export function Frameworks() {
  return (
    <Card id="framework" className="scroll-mt-32">
      <CardHeader icon={Shield} iconClass="text-purple-400" title="Active Frameworks">
        <span className="ml-auto text-xs text-gray-600">analytical lens, not commentary</span>
      </CardHeader>
      <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ACTIVE_FRAMEWORKS.map((f, i) => {
          const partial = f.tone === "partial";
          return (
            <div
              key={i}
              className={`rounded-xl p-3 border ${partial ? "bg-amber-950/30 border-amber-900/50" : "bg-gray-800/60 border-gray-700/60"}`}
            >
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${partial ? "text-amber-300" : "text-purple-300"}`}>{f.name}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{f.state}</p>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
