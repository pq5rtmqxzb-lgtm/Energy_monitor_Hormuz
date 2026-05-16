# Oil &amp; Energy ETF Tracker

Static-site dashboard tracking oil &amp; energy ETFs and the geopolitical context of the 2026 Strait of Hormuz crisis. Hosted entirely on GitHub Pages — no backend, no external services beyond GitHub Actions.

## Features

- **ETF watchlist** — IOGP (primary), XLE, VDE, OIH, USO, BNO with daily closes and sparklines
- **Crude benchmarks** — Brent &amp; WTI front-month with 30-day sparkline
- **Performance chart** — normalized % change vs start of window for all series
- **IOGP elasticity analysis** — beta, breakeven, geography, hedging dilution, scenario targets
- **Geopolitical context** — curated event list with source attribution
- **Crisis timeline** — clickable horizontal strip from Feb to present
- **Double-chokepoint assessment** — tagged evidence (CONFIRMED / PARTIAL / NOT REFRESHED)
- **Scenario engine** — Bull / Base / Bear with probability donut, supply-gap bridge, ETF impact, triggers
- **Tail risks** — Tail-up / Tail-down sitting outside the Bull/Base/Bear frame
- **URL state** — `#scenario=bull|base|bear` is shareable

## How market data stays fresh on GitHub Pages

A scheduled GitHub Action ([`update-market-data.yml`](.github/workflows/update-market-data.yml)) runs every weekday at 22:00 UTC. It executes [`scripts/fetch-market-data.mjs`](scripts/fetch-market-data.mjs), which pulls 3 months of daily closes from Yahoo Finance's public chart endpoint for Brent (`BZ=F`), WTI (`CL=F`) and the watchlist ETFs. The script writes `public/data/market.json` and commits any change, which retriggers the existing Pages deploy. If any symbol fails the previous values are preserved.

The dashboard fetches `data/market.json` at load with `cache: no-store`, so the **Reload** button surfaces the latest snapshot without a redeploy of static assets.

## Setup

```bash
npm install
npm run dev        # http://localhost:5173/Energy_monitor_Hormuz/
npm run build      # outputs to dist/
```

## Tech

- React 18 + Vite 5
- Tailwind CSS 4 (CSS-based theme tokens)
- Lucide React icons
- Hand-rolled SVG charts (sparkline, line chart, probability donut, supply-gap bars)
- No external chart library, no analytics, no tracking
- Build-time injection of `__BUILD_TIME__` and `__GIT_SHA__` via Vite `define`

## Project layout

```
src/
  App.jsx              composition root
  data/                content modules (scenarios, geo, frameworks, timeline, …)
  lib/                 helpers (format, urlState, marketData, buildInfo)
  components/          one component per file
public/
  data/market.json     daily-refreshed market snapshot (committed)
  favicon.svg
scripts/
  fetch-market-data.mjs  Action-run script that refreshes market.json
.github/workflows/
  deploy.yml             builds &amp; deploys on push to main
  update-market-data.yml weekday cron that refreshes market.json
```

## Methodology

Price targets are grounded in:

- **IEA May 2026 OMR** — Q2 deficit ~6 mb/d; undersupply through Q3 even on early-June conflict resolution
- **Morgan Stanley restart-lag math** — ~1B barrels of 2026 supply loss from restart / repair / repositioning
- **Short-run demand elasticity** ~ −0.05 (Hamilton 2009)
- **Near-zero short-run supply elasticity** (Caldara et al. 2019)
- **Three-layer discount stack** — futures vs Dated, strip backwardation, implied resolution probability

## Disclaimer

For informational and educational purposes only. Not financial advice.
