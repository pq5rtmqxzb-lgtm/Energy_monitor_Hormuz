import { BarChart3 } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { Pill } from "./Badge";
import { IOGP_ANALYSIS } from "../data/iogp";

export function IOGPAnalysis() {
  return (
    <Card id="iogp" className="scroll-mt-32">
      <CardHeader icon={BarChart3} iconClass="text-amber-400" title={IOGP_ANALYSIS.title}>
        <Pill className="ml-auto bg-amber-900 text-amber-300">PRIMARY ETF</Pill>
      </CardHeader>
      <CardBody className="space-y-4">
        <p className="text-sm text-gray-300 leading-relaxed">{IOGP_ANALYSIS.overview}</p>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {IOGP_ANALYSIS.metrics.map((m) => (
            <div key={m.label} className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-3">
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">{m.label}</dt>
              <dd className="mt-1 font-mono text-lg font-bold tabular-nums">{m.value}</dd>
              <p className="text-[11px] text-gray-500">{m.caption}</p>
            </div>
          ))}
        </dl>
        <div className="space-y-2">
          {IOGP_ANALYSIS.sections.map((s, i) => (
            <details key={i} className="group bg-gray-800/50 border border-gray-700/60 rounded-xl">
              <summary className="px-3 py-2.5 cursor-pointer select-none flex items-center justify-between gap-3 text-xs font-semibold text-amber-400 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-amber-500/40 rounded-xl">
                <span>{s.label}</span>
                <span className="text-gray-600 group-open:rotate-90 transition-transform">›</span>
              </summary>
              <div className="px-3 pb-3 text-xs text-gray-400 leading-relaxed">{s.detail}</div>
            </details>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
