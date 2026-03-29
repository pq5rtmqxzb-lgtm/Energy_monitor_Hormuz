# Oil & Energy ETF Tracker

Geopolitical oil market analysis dashboard with scenario modeling.  
Built with React + Vite + Tailwind CSS.

## Features

- Real-time ETF price tracking (IOGP, XLE, VDE, OIH, USO, BNO)
- Brent & WTI crude oil benchmarks
- Geopolitical context panel with event impact analysis
- Houthi double-chokepoint risk assessment (Bab el-Mandeb)
- IOGP elasticity analysis (beta, operating leverage, hedging)
- Bull/Base/Bear scenario models with supply/demand waterfalls
- Elasticity-grounded price targets (Hamilton 2009, Fed research)
- sendPrompt() refresh button for live data updates via Claude

## Setup

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
```

Outputs to `dist/` — deploy to any static host (Vercel, Netlify, GitHub Pages).

## Architecture

Market data and geopolitical context are pre-loaded as constants (fetched by Claude via web search).  
Scenario models use elasticity-grounded reasoning:
- Short-run demand elasticity: ~-0.05 (Hamilton 2009)
- Historical precedent: 1973 embargo (7% shortage → 300% price increase)
- Supply/demand waterfall: gross disruption → itemized mitigations → net deficit

The "Refresh" button calls `sendPrompt()` to request Claude fetch fresh data and update the artifact.
