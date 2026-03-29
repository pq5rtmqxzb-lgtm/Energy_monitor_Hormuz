# Oil & Energy ETF Tracker

Real-time oil and energy ETF tracking dashboard with geopolitical scenario analysis, built during the 2026 Strait of Hormuz crisis.

## Features

- **ETF Watchlist**: IOGP (primary), XLE, VDE, OIH, USO, BNO with live prices
- **Oil Benchmarks**: Brent Crude & WTI spot prices
- **Geopolitical Context**: AI-curated events affecting oil markets
- **Houthi Double Chokepoint Assessment**: Probability-weighted analysis of Bab el-Mandeb closure risk
- **IOGP Elasticity Analysis**: Price sensitivity, operating leverage, hedging impact, and scenario targets
- **3-Tab Scenario Engine**: Bull / Base / Bear cases with:
  - Supply/demand waterfall (gross disruption → mitigations → net deficit)
  - Elasticity-grounded price targets (based on Hamilton 2009, Fed research)
  - Per-ETF impact assessment
  - Key triggers to watch

## Scenario Methodology

All price targets are grounded in:
- **Historical precedent**: 1973 embargo (~7% shortage → 300% price increase)
- **Short-run demand elasticity**: ~-0.05 (Hamilton 2009)
- **Near-zero short-run supply elasticity** (Caldara et al. 2019)
- **Panic/hoarding amplification** with demand destruction timelines

## Setup

```bash
npm install
npm run dev
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS 4
- Lucide React icons

## Disclaimer

For informational and educational purposes only. Not financial advice.
