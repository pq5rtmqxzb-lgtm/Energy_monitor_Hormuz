export const IOGP_ANALYSIS = {
  title: "IOGP Elasticity Analysis: Price Sensitivity to Oil",
  overview:
    "IOGP tracks the S&P Commodity Producers Oil & Gas E&P Index — pure upstream companies whose revenue is almost entirely determined by realized oil prices (S&P Global: 'Average realized prices are the most important operating metric for an E&P company'). This creates a natural leverage effect.",
  metrics: [
    { label: "Beta to Brent", value: "~1.51×", caption: "equity beta" },
    { label: "Basket breakeven", value: "~$40", caption: "per barrel" },
    { label: "Geography", value: "~95%", caption: "NA + Australian" },
    { label: "Hormuz exposure", value: "≈ 0%", caption: "dominant share" },
  ],
  sections: [
    { label: "Observed beta to Brent", detail: "Working figure: ~1.51x equity beta to Brent. This supersedes earlier ~1.2x rough estimates. Consistent with academic E&P literature (typically 1.2–1.8x for pure upstream) and with what the basket has actually delivered through this cycle." },
    { label: "Basket geography (~95% North American + Australian)", detail: "Constituents include CNQ, COP, EOG, FANG, DVN, CTRA, WDS and similar — heavily weighted to U.S. shale, Canadian oil sands, and Australian operators. Zero Hormuz production exposure for the dominant share of the basket. Captures price upside without disruption risk — the non-Hormuz geography is doing what we expected it to do." },
    { label: "Operating leverage mechanism", detail: "E&P companies have high fixed costs and variable revenue. Basket breakeven ~$40/bbl. At ~$106 Brent, margin is ~$66 — the basket is well inside the convex zone. At sustained $115–140 (Bull case anchored on IEA Q3-deficit arithmetic), margins expand further with the relationship remaining non-linear and convex." },
    { label: "Refining margins — tailwind for integrateds", detail: "Per the IEA May OMR: refining margins at 'historically high levels, supported by record middle distillate cracks.' That's a downstream signal — but it means the integrated portion of the basket (Woodside-style integrateds) has a margin tailwind on top of the upstream price benefit. Pure E&Ps with ~$40 breakeven are deep in the convex zone at $100–110 Brent." },
    { label: "Hedging dilution (near-term dampener)", detail: "Most E&P companies hedge 30–60% of production 12–18 months forward. Much of 2026 production was hedged at $70–85, so near-term realized prices lag spot — basket FCF still lags spot one-for-one through Q2 earnings. H2 2026 roll-off thesis hasn't matured yet but remains the structural setup for late-2026 earnings expansion." },
    { label: "Scenario-specific IOGP targets (directional ranges)", detail: "Bull ($115–140 Brent sustained through Q3): IOGP €38–48. | Base ($100–115 Brent): €32–38 hold/up. | Bear ($80–95 Brent): €26–30, floored by IEA Q3-deficit arithmetic. These are directional ranges, not point forecasts." },
    { label: "Key risk: Gulf-exposed producers", detail: "The minority of the basket with Gulf-exposed production may see curtailment even as prices spike. The ~95% North American + Australian weighting limits this risk materially compared to a Gulf-heavy index — but it isn't zero." },
  ],
};
