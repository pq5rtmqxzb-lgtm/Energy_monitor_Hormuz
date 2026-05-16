#!/usr/bin/env node
/**
 * Refreshes public/data/market.json from Yahoo Finance's public chart endpoint.
 * Designed to be tolerant: if any individual symbol fails, the previous value
 * for that symbol is preserved so the dashboard never goes blank.
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "data", "market.json");

const SYMBOLS = {
  brent: { yahoo: "BZ=F",    currency: "USD" },
  wti:   { yahoo: "CL=F",    currency: "USD" },
  etfs: {
    IOGP: { yahoo: "IOGP.AS", currency: "EUR" },
    XLE:  { yahoo: "XLE",     currency: "USD" },
    VDE:  { yahoo: "VDE",     currency: "USD" },
    OIH:  { yahoo: "OIH",     currency: "USD" },
    USO:  { yahoo: "USO",     currency: "USD" },
    BNO:  { yahoo: "BNO",     currency: "USD" },
  },
};

const RANGE = "3mo";
const INTERVAL = "1d";

async function fetchChart(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${INTERVAL}&range=${RANGE}&includePrePost=false&events=div%2Csplit`;
  const r = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; energy-monitor/1.0; +https://github.com/pq5rtmqxzb-lgtm/Energy_monitor_Hormuz)",
      "Accept": "application/json,text/plain,*/*",
    },
  });
  if (!r.ok) throw new Error(`HTTP ${r.status} for ${symbol}`);
  const json = await r.json();
  const result = json?.chart?.result?.[0];
  if (!result) throw new Error(`No chart result for ${symbol}`);
  const timestamps = result.timestamp || [];
  const closes = result.indicators?.quote?.[0]?.close || [];
  const meta = result.meta || {};
  const history = timestamps
    .map((t, i) => ({ date: new Date(t * 1000).toISOString().slice(0, 10), close: closes[i] }))
    .filter((p) => p.close != null)
    .map((p) => ({ date: p.date, close: Math.round(p.close * 100) / 100 }));
  if (!history.length) throw new Error(`Empty history for ${symbol}`);
  const last = history[history.length - 1];
  const prev = history[history.length - 2];
  const change_pct = prev ? Math.round(((last.close - prev.close) / prev.close) * 10000) / 100 : null;
  return {
    price: last.close,
    change_pct,
    as_of: last.date,
    regular_market_time: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : null,
    history: history.slice(-45),
  };
}

async function main() {
  let current;
  try {
    current = JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    current = { etfs: {} };
  }

  const next = {
    ...current,
    brent: { ...(current.brent || {}) },
    wti:   { ...(current.wti || {}) },
    etfs:  { ...(current.etfs || {}) },
  };

  let updated = 0;

  // Brent / WTI
  for (const key of ["brent", "wti"]) {
    const def = SYMBOLS[key];
    try {
      const live = await fetchChart(def.yahoo);
      next[key] = {
        ...next[key],
        ...live,
        currency: def.currency,
        note: current[key]?.note ?? null,
      };
      updated++;
      console.log(`  ✓ ${key.toUpperCase()} @ ${live.price} (${live.as_of})`);
    } catch (err) {
      console.warn(`  ✗ ${key.toUpperCase()} failed: ${err.message} — preserving previous`);
    }
  }

  // ETFs
  for (const [ticker, def] of Object.entries(SYMBOLS.etfs)) {
    try {
      const live = await fetchChart(def.yahoo);
      next.etfs[ticker] = { ...(next.etfs[ticker] || {}), ...live, currency: def.currency };
      updated++;
      console.log(`  ✓ ${ticker} @ ${live.price} (${live.as_of})`);
    } catch (err) {
      console.warn(`  ✗ ${ticker} failed: ${err.message} — preserving previous`);
    }
  }

  if (updated === 0) {
    console.warn("\nNo symbols updated successfully — leaving market.json untouched.");
    return;
  }

  // Use most recent as_of across all series as canonical snapshot
  const allDates = [
    next.brent?.as_of,
    next.wti?.as_of,
    ...Object.values(next.etfs || {}).map((e) => e.as_of),
  ].filter(Boolean);
  allDates.sort();
  next.as_of = new Date().toISOString();
  next.snapshot_label = `${allDates[allDates.length - 1]} (auto-refresh)`;
  next.source = "Yahoo Finance chart endpoint";

  await writeFile(OUT, JSON.stringify(next, null, 2) + "\n");
  console.log(`\nWrote ${OUT} (${updated} symbols updated)`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
