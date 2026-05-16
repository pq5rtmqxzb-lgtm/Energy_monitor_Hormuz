function parseImpactMagnitude(s) {
  if (!s) return null;
  const m = String(s).replace(/,/g, "").match(/(-?\d+(?:\.\d+)?)/);
  return m ? Math.abs(parseFloat(m[1])) : null;
}

function summarizeRow(row) {
  if (!row?.impact) return null;
  return parseImpactMagnitude(row.impact);
}

export function Waterfall({ supplyImpacts }) {
  const gross = supplyImpacts.find((r) => r.section === "gross");
  const mit   = supplyImpacts.find((r) => r.section === "mitigations_total");
  const net   = supplyImpacts.find((r) => r.section === "net");

  const grossVal = summarizeRow(gross);
  const mitVal   = summarizeRow(mit);
  const netVal   = summarizeRow(net);

  if (!grossVal && !mitVal && !netVal) return null;

  const scale = Math.max(grossVal || 0, mitVal || 0, netVal || 0, 1);

  const bar = (label, raw, value, colorClass) => {
    const pct = Math.min((value || 0) / scale, 1) * 100;
    return (
      <div className="space-y-1">
        <div className="flex justify-between items-baseline gap-3 text-xs">
          <span className="text-gray-400">{label}</span>
          <span className="font-mono font-semibold text-gray-200">{raw || "—"}</span>
        </div>
        <div className="h-2.5 rounded-full bg-gray-800 overflow-hidden">
          <div
            className={`h-full ${colorClass} rounded-full transition-all duration-700`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800/40 border border-gray-700/60 rounded-xl p-4 space-y-3">
      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Supply Gap Bridge</h4>
      {bar(gross?.label || "Gross disruption", gross?.impact, grossVal, "bg-gradient-to-r from-red-700 to-red-500")}
      {bar(mit?.label || "Total mitigation", mit?.impact, mitVal, "bg-gradient-to-r from-emerald-700 to-emerald-500")}
      {bar(net?.label || "Net deficit", net?.impact, netVal, "bg-gradient-to-r from-amber-700 to-amber-500")}
      {net?.detail && <p className="text-[11px] text-gray-500 leading-snug">{net.detail}</p>}
    </div>
  );
}
