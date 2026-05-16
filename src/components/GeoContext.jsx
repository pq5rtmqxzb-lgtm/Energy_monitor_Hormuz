import { Globe } from "lucide-react";
import { Card, CardBody, CardHeader } from "./Card";
import { Pill } from "./Badge";
import { GEO } from "../data/geo";

const TONE = {
  bullish: "bg-emerald-400",
  bearish: "bg-red-400",
  neutral: "bg-amber-400",
};

export function GeoContext() {
  return (
    <Card id="geo" className="scroll-mt-32">
      <CardHeader icon={Globe} iconClass="text-blue-400" title="Geopolitical Context">
        <Pill className="ml-auto bg-emerald-900 text-emerald-300 capitalize">{GEO.sentiment}</Pill>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{GEO.summary}</p>
        <ul className="space-y-2">
          {GEO.events.map((ev, i) => (
            <li key={i} className="flex items-start gap-3 bg-gray-800/50 border border-gray-700/60 rounded-xl p-3">
              <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${TONE[ev.impact] || TONE.neutral}`} aria-label={ev.impact} />
              <div className="min-w-0">
                <p className="text-sm font-medium">{ev.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{ev.detail}</p>
                {ev.source && (
                  <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">Source: {ev.source}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
