const FALLBACK_PATH = "data/market.json";

export async function loadMarket() {
  const base = import.meta.env.BASE_URL || "/";
  const url = base.replace(/\/$/, "/") + FALLBACK_PATH;
  const cacheBuster = `?t=${Date.now()}`;
  try {
    const r = await fetch(url + cacheBuster, { cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch (err) {
    console.warn("Failed to load market data:", err);
    return null;
  }
}
