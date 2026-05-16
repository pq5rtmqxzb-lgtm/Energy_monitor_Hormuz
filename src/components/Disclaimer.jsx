import { Shield } from "lucide-react";

export function Disclaimer({ snapshotLabel }) {
  return (
    <aside className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 flex items-start gap-3">
      <Shield size={16} className="text-gray-600 mt-0.5 shrink-0" />
      <p className="text-xs text-gray-500 leading-relaxed">
        <strong className="text-gray-400">Disclaimer:</strong> For informational and educational purposes only. Not financial
        advice. Market data sourced via scheduled fetch on {snapshotLabel} and may be delayed. AI-generated scenarios
        should not be relied upon for investment decisions. Consult a qualified financial advisor.
      </p>
    </aside>
  );
}
