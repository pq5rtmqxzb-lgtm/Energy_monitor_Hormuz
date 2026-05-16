import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Globe } from "lucide-react";
import { Header } from "./components/Header";
import { SectionNav } from "./components/SectionNav";
import { MarketTiles } from "./components/MarketTiles";
import { Watchlist } from "./components/Watchlist";
import { PerformanceChart } from "./components/PerformanceChart";
import { IOGPAnalysis } from "./components/IOGPAnalysis";
import { GeoContext } from "./components/GeoContext";
import { Timeline } from "./components/Timeline";
import { DoubleChokepoint } from "./components/DoubleChokepoint";
import { Frameworks } from "./components/Frameworks";
import { ScenarioPanel } from "./components/ScenarioPanel";
import { TailRisks } from "./components/TailRisks";
import { Disclaimer } from "./components/Disclaimer";
import { Footer } from "./components/Footer";
import { DEFAULT_ETFS, STORAGE_KEY } from "./data/etfList";
import { loadMarket } from "./lib/marketData";
import { useHashParam } from "./lib/urlState";

export default function App() {
  const [etfs, setEtfs] = useState(DEFAULT_ETFS);
  const [market, setMarket] = useState(null);
  const [loadingMarket, setLoadingMarket] = useState(true);
  const [marketError, setMarketError] = useState(null);
  const [activeScenario, setActiveScenario] = useHashParam("scenario", "bull");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) setEtfs(parsed);
      }
    } catch { /* ignore */ }
  }, []);

  const reloadMarket = useCallback(async () => {
    setLoadingMarket(true);
    const data = await loadMarket();
    if (data) {
      setMarket(data);
      setMarketError(null);
    } else {
      setMarketError("Could not load market data. The dashboard will retry on the next reload.");
    }
    setLoadingMarket(false);
  }, []);

  useEffect(() => { reloadMarket(); }, [reloadMarket]);

  const saveEtfs = useCallback((next) => {
    setEtfs(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  const addEtf = useCallback(({ ticker, name }) => {
    if (etfs.some((e) => e.ticker === ticker)) return;
    saveEtfs([...etfs, { ticker, name }]);
  }, [etfs, saveEtfs]);

  const removeEtf = useCallback((ticker) => {
    saveEtfs(etfs.filter((e) => e.ticker !== ticker));
  }, [etfs, saveEtfs]);

  const snapshotLabel = useMemo(() => market?.snapshot_label || "loading…", [market]);

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-amber-500/30">
      <Header
        snapshotLabel={snapshotLabel}
        asOf={market?.as_of}
        onRefresh={reloadMarket}
      />
      <main className="max-w-6xl mx-auto px-4 pb-10">
        <SectionNav />
        <div className="space-y-6 mt-6">
          <div className="bg-blue-950/30 border border-blue-900/50 rounded-2xl px-4 py-3 flex items-start gap-3">
            <Globe size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-200/90 space-y-1">
              <p>
                Market and geopolitical analysis. The dashboard reads a daily JSON snapshot from{" "}
                <code className="font-mono text-blue-300">/data/market.json</code> updated by a GitHub Actions cron job — fully hosted on GitHub Pages.
              </p>
              <p className="text-blue-200/70">
                <strong>Data discipline:</strong> IOGP.AS prices not shown before 09:00 CET. Distinguish IOGP.AS (EUR) / IOGP.L (USD) / IS0D.DE. Brent &amp; WTI shown are front-month unless explicitly flagged as Dated. Source hierarchy: originals (EIA, IEA, PortWatch, Lloyd's, filings) &gt; Tier-1 wires &gt; specialist analysis &gt; aggregators.
              </p>
            </div>
          </div>

          {marketError && (
            <div className="bg-amber-950/50 border border-amber-800 rounded-2xl p-4 flex items-start gap-3" role="alert">
              <AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-300">{marketError}</p>
            </div>
          )}

          {loadingMarket && !market ? (
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-10 text-center text-sm text-gray-500">
              Loading market snapshot…
            </div>
          ) : market ? (
            <>
              <MarketTiles market={market} />
              <Watchlist etfs={etfs} market={market} onAdd={addEtf} onRemove={removeEtf} />
              <PerformanceChart market={market} />
              <IOGPAnalysis />
              <GeoContext />
              <Timeline />
              <DoubleChokepoint />
              <Frameworks />
              <ScenarioPanel active={activeScenario} onSelect={setActiveScenario} />
              <TailRisks />
              <Disclaimer snapshotLabel={snapshotLabel} />
            </>
          ) : null}
        </div>
      </main>
      <Footer marketAsOf={market?.as_of} />
    </div>
  );
}
