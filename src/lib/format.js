const CURRENCY_SYMBOL = { USD: "$", EUR: "€", GBP: "£" };

export function fmtPrice(v, currency = "USD") {
  if (v == null || Number.isNaN(v)) return "—";
  const sym = CURRENCY_SYMBOL[currency] ?? "$";
  return sym + v.toFixed(2);
}

export function fmtPct(v, digits = 2) {
  if (v == null || Number.isNaN(v)) return "—";
  const sign = v >= 0 ? "+" : "";
  return sign + v.toFixed(digits) + "%";
}

export function fmtDate(iso, opts = {}) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      ...opts,
    });
  } catch {
    return iso;
  }
}

export function fmtDateTime(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function relativeTime(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Date.now() - then;
  const min = Math.round(diffMs / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.round(day / 30);
  return `${mo}mo ago`;
}

export function freshnessTone(iso) {
  if (!iso) return "stale";
  const diffH = (Date.now() - new Date(iso).getTime()) / 3600000;
  if (diffH < 36) return "fresh";
  if (diffH < 24 * 7) return "stale";
  return "old";
}
