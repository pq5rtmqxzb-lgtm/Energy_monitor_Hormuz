# Oil &amp; Energy ETF Tracker

Static-site dashboard tracking oil &amp; energy ETFs and the geopolitical context of the 2026 Strait of Hormuz crisis. Hosted entirely on GitHub Pages — no backend, no external services beyond GitHub Actions.

> **Re-baselined 2026-07-12** for the post-Islamabad-Memorandum regime: the June 17 MOU reopened the strait, Brent round-tripped below its pre-war level, and the deal is now breaking down into re-escalation. The May closure-era scenario set is graded in the Scorecard section rather than silently rewritten.

## Features

- **ETF watchlist** — IOGP (primary), XLE, VDE, OIH, USO, BNO with daily closes and sparklines
- **Crude benchmarks** — Brent &amp; WTI front-month with 30-day sparkline
- **Performance chart** — normalized % change vs start of window for all series
- **IOGP elasticity analysis** — beta, breakeven, geography, hedging dilution, scenario targets
- **Geopolitical context** — curated event list with source attribution
- **Crisis timeline** — clickable horizontal strip from Feb to present
- **MOU tracker** — clause-by-clause status of the June 17 Islamabad Memorandum with the 60-day window clock
- **Double-chokepoint assessment** — tagged evidence (CONFIRMED / PARTIAL / NOT REFRESHED)
- **Scenario engine** — Bull / Base / Bear with probability donut, supply-gap bridge, ETF impact, triggers
- **Scorecard** — the May 17 calls graded hit / partial / miss against realized outcomes
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

Price targets (re-baselined 2026-07-12, anchored at $76 Brent spot) are grounded in:

- **IEA July 2026 OMR** — June supply +4.1 mb/d to 98.8 mb/d as Hormuz flows resumed; still 9.4 mb/d below pre-war; Gulf exports 16.1 mb/d vs ~24 pre-war; the July 7–8 escalation "clouds the outlook"
- **IEA June 2026 OMR** — 2026 demand −1.1 mb/d YoY (first annual decline since 2020) after Q2 deliveries fell ~5 mb/d; surplus expected toward year-end; 2027 first look: supply +~8 mb/d vs demand +2 mb/d ("significant overhang")
- **Realized demand elasticity** — Q2's delivery plunge showed short-run elasticity far larger than the −0.05 literature figure once product shortages amplify the price signal (this was the May framework's costliest assumption; see Scorecard)
- **OPEC+ normalization** — monthly ~190 kb/d quota increments with compensation extended to end-2026; Saudi exports near pre-war; UAE producing outside OPEC
- **Proven mitigation stack** — East-West + Fujairah bypass at 5–6 mb/d demonstrated at scale through the February–June closure

Retired anchors from the May regime (kept for the record, graded in the Scorecard): IEA May OMR Q2-deficit arithmetic, Morgan Stanley restart-lag math, the three-layer discount stack, and the phantom-ceasefire pattern.

## Disclaimer

For informational and educational purposes only. Not financial advice.
