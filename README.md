# Oil & Energy ETF Tracker

Real-time oil and energy ETF monitoring dashboard with geopolitical scenario analysis, built for the 2026 Strait of Hormuz crisis.

## Features

- **ETF Watchlist**: IOGP (primary), XLE, VDE, OIH, USO, BNO with live prices
- **Oil Benchmarks**: Brent Crude & WTI with daily change
- **IOGP Elasticity Analysis**: Price sensitivity, operating leverage, beta analysis
- **Geopolitical Context**: Iran-Hormuz crisis, Houthi developments, diplomatic progress
- **Houthi Double Chokepoint Assessment**: Probability-weighted analysis of Bab el-Mandeb closure risk
- **3-Scenario Model** (Bull/Base/Bear):
  - Full supply/demand waterfall (gross disruption → mitigations → net deficit)
  - Elasticity-grounded price targets (not arbitrary caps)
  - Per-ETF impact assessment with reasoning
  - Key triggers to watch

## Price Target Methodology

All price targets are grounded in:
- **Historical precedent**: 1973 embargo = 7% shortage → 300% price increase
- **Short-run demand elasticity**: ~-0.05 (Hamilton 2009, Fed research)
- **Near-zero short-run supply elasticity** (Caldara et al. 2019)
- **Panic/hoarding amplification** with demand destruction timelines

## Setup

```bash
npm install
npm run dev
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- Lucide React icons

## Disclaimer

For informational and educational purposes only. Not financial advice. Consult a qualified financial advisor before making investment decisions.
