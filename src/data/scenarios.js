export const SCENARIO_META = {
  bull: {
    label: "Bull Case",
    short: "Bull",
    dot: "bg-emerald-500",
    bg: "bg-emerald-950",
    border: "border-emerald-700",
    text: "text-emerald-400",
    badge: "bg-emerald-900 text-emerald-300",
    fill: "#10b981",
    fillSoft: "rgba(16,185,129,0.18)",
  },
  base: {
    label: "Base Case",
    short: "Base",
    dot: "bg-amber-500",
    bg: "bg-amber-950",
    border: "border-amber-700",
    text: "text-amber-400",
    badge: "bg-amber-900 text-amber-300",
    fill: "#f59e0b",
    fillSoft: "rgba(245,158,11,0.18)",
  },
  bear: {
    label: "Bear Case",
    short: "Bear",
    dot: "bg-red-500",
    bg: "bg-red-950",
    border: "border-red-700",
    text: "text-red-400",
    badge: "bg-red-900 text-red-300",
    fill: "#ef4444",
    fillSoft: "rgba(239,68,68,0.18)",
  },
};

export const SCENARIOS = {
  bull: {
    narrative:
      "Hormuz stays closed; the escalation cycle continues — Project Freedom resumes, IRGC kinetics widen, or Lebanon-Israel talks collapse into a broader regional flare. The IEA May OMR already quantifies the structural undersupply (Q2 deficit ~6 mb/d, undersupply through Q3 even on early-June resolution). Bull stacks an escalation premium on top of this duration anchor. Crucially: this is grounded in IEA arithmetic + Morgan Stanley restart-lag math, not in 1973-style elasticity extrapolation (the latter is now the Tail-up bucket).",
    outlook: "strongly_bullish",
    probability: 30,
    supply_baseline:
      "Global production: ~95.1M bbl/day (April, IEA — down 1.8 mb/d MoM) | Global demand: ~103M bbl/day (partial demand destruction underway) | Cumulative supply losses since Feb: 12.8 mb/d",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions (per IEA May OMR)" },
      { event: "Hormuz closure / production shut-in", impact: ">-14.0M bbl/day", detail: "IEA: more than 14 mb/d of production shut-in due to Hormuz closure. Only selective transits via IRGC-controlled Larak Island (Chinese-flagged Yuan Hua Hu passage ahead of Trump-Xi summit). Saudi production at lowest level since 1990." },
      { event: "Iranian export interruption", impact: "-1.5M bbl/day", detail: "Iranian exports recently stalled — first sustained interruption since the conflict began. Removes a previously assumed mitigation." },
      { event: "Bull-case escalation overlay", impact: "-1 to -3M bbl/day", detail: "Project Freedom resumption / IRGC strikes / Lebanon-Israel collapse adds further supply disruption on top of the IEA baseline. Specific magnitude depends on which trigger fires." },
      { section: "gross", label: "Gross Supply Disruption (vs Feb baseline)", impact: "-13 to -16M bbl/day", detail: "Cumulative IEA-confirmed losses (12.8 mb/d) plus escalation overlay." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "SPR coordinated release (already deployed)", impact: "+~1.0M bbl/day", detail: "400M-barrel coordinated release from 32 IEA members. IEA itself now characterizes this as a 'temporary buffer' insufficient to close the gap. Significant portion already drawn." },
      { event: "Selective Hormuz transit via Larak", impact: "+2.0 to +2.5M bbl/day", detail: "IRGC-controlled passage for Chinese/Russian-flagged vessels. China appears to be getting preferential access. Selective, not opening." },
      { event: "Saudi East-West pipeline + UAE Fujairah", impact: "+5.0 to +6.0M bbl/day", detail: "Pre-existing mitigations remain. Saudi production constraint at 1990 lows is the binding factor, not pipeline capacity." },
      { event: "Demand destruction at sustained $100+", impact: "+1.5M bbl/day (effective)", detail: "Already partially priced in — US April CPI at 3.8% YoY with gasoline +28.4% YoY is the real-economy signal." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+~10M bbl/day", detail: "Aggregate of structural + temporary buffers. SPR runs down further; mitigations have limited remaining headroom." },
      { section: "net", label: "Net Structural Deficit (Bull)", impact: "-3 to -6M bbl/day", detail: "Q2 deficit at the wider end of IEA's central estimate, with escalation overlay extending duration. Morgan Stanley: ~1B barrels of 2026 loss from restart/repair/repositioning lag — pushes elevation into H2." },
    ],
    net_supply_impact:
      "Bull: Q2 deficit at IEA's wider end (~6 mb/d) with escalation premium and Morgan Stanley restart-lag pushing elevation into H2 2026. Duration of elevated prices is the thesis — peak is secondary.",
    price_reasoning:
      "Anchor: IEA Q2/Q3 deficit arithmetic. Even on early-June conflict resolution, IEA forecasts undersupply through end-Q3. Bull adds an escalation premium of $10–25 on top of the structural anchor. Refining margins at 'historically high levels' (IEA) with record middle-distillate cracks reinforce the equity transmission. The phantom-ceasefire pattern (Apr 17 / Apr 21 / May 4–7 / May 13) shows each pullback is shallower as structural fundamentals reassert.",
    price_target: "Brent: $115–140 sustained through Q3 | WTI: $108–130 sustained",
    etf_impacts: {
      IOGP: { direction: "up", reasoning: "~1.51x beta to Brent, ~$40 basket breakeven, ~95% North American + Australian (zero Hormuz production exposure for dominant share). At sustained $115–140 Brent margins expand further into the convex zone. H2 2026 hedge roll-off layers additional upside. Directional target range: €38–48." },
      XLE: { direction: "up", reasoning: "Integrateds capture upstream price benefit plus refining-margin tailwind (record distillate cracks per IEA OMR). Cash flows compound." },
      VDE: { direction: "up", reasoning: "Broader US energy basket — operational leverage at $115+ supports multiple expansion alongside earnings." },
      OIH: { direction: "up", reasoning: "OilPrice flagged services names 'best positioned for the pivot away from the Persian Gulf' — non-Gulf capex resumes as the duration thesis gets priced in." },
      USO: { direction: "up", reasoning: "Direct WTI exposure. At $108–130 WTI, USO captures the structural price level with backwardation supporting roll yield." },
      BNO: { direction: "up", reasoning: "Direct Brent exposure. Highest-beta within the basket if escalation overlay fires." },
    },
    triggers: [
      "Project Freedom signals — naval movement leaks, Trump 'much more severe' framing",
      "IRGC kinetic activity / strikes",
      "Lebanon-Israel talks collapse in Washington today",
      "Trump-Xi summit: Iran sidelined or punted",
      "Iranian backlash against Chinese preferential transit",
    ],
    timeframe: "2–4 months (Q2–Q3 duration emphasized)",
  },
  base: {
    narrative:
      "April 8 'life support' ceasefire holds in some form despite repeated violations; selective transits continue (China carve-out via Larak) but no real reopening. Brent range-bound $100–115 anchored on IEA Q2 deficit of ~6 mb/d. Circular deadlock intact — US wants Hormuz reopened as precondition; Iran wants ceasefire first; no enforcement mechanism. Per the category-error framework, the market repeatedly conflates ceasefire signals with closure resolution — but they're separable, and the IEA's arithmetic floors the duration leg.",
    outlook: "bullish",
    probability: 50,
    supply_baseline:
      "Global production: ~95.1M bbl/day (April, IEA) | Global demand: ~103M bbl/day | Cumulative supply losses since Feb: 12.8 mb/d",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions (per IEA May OMR)" },
      { event: "Hormuz closure / production shut-in", impact: ">-14.0M bbl/day", detail: "Per IEA: more than 14 mb/d shut-in. Selective transits via Larak continue but don't materially close the gap." },
      { event: "Iranian export interruption", impact: "-1.5M bbl/day", detail: "First sustained interruption since conflict began. Removes a previously assumed offset." },
      { section: "gross", label: "Gross Supply Disruption (vs Feb baseline)", impact: "-12 to -14M bbl/day", detail: "IEA-confirmed cumulative losses of 12.8 mb/d since February." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "SPR release (deployed; depleting)", impact: "+~1.0M bbl/day", detail: "IEA-characterized 'temporary buffer' — drawdown continues but headroom shrinks." },
      { event: "Larak Island selective transit (China carve-out)", impact: "+2.0 to +2.5M bbl/day", detail: "IRGC-controlled passage for allied-flag vessels. Chinese supertanker transit ahead of Trump-Xi summit reinforces this channel." },
      { event: "Saudi East-West + UAE Fujairah pipelines", impact: "+5.0 to +6.0M bbl/day", detail: "Pre-existing structural mitigations. Saudi 1990-low production cap is the binding factor." },
      { event: "Demand destruction at $100+", impact: "+1.5M bbl/day (effective)", detail: "US CPI / gasoline data confirms real-economy elasticity at current levels." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+~10M bbl/day", detail: "Sufficient to keep markets functioning but not to close the deficit." },
      { section: "net", label: "Net Structural Deficit (Base)", impact: "-~6M bbl/day", detail: "Aligned with IEA's central Q2 deficit estimate. Persists through Q3 per IEA even on resolution — Morgan Stanley restart-lag extends elevation into H2." },
    ],
    net_supply_impact:
      "Base: IEA-quantified Q2 deficit of ~6 mb/d; SPR running down; duration of elevated prices is the binding constraint, not peak prices.",
    price_reasoning:
      "IEA arithmetic floors the price level. Three-layer discount stack still applies: futures-vs-physical gap (smaller than April's ~$37 but still pointing the same direction — Fortune-cited Dated quote of $110.87 on May 13 vs front-month ~$106 unverified but consistent with pattern), strip backwardation, and implied resolution probability all keep equities at a discount to spot reality. Phantom-ceasefire pattern (Apr 17, Apr 21, May 4–7, May 13) shows each retracement shallower as the structural anchor reasserts.",
    price_target: "Brent: $100–115 sustained | WTI: $95–108 sustained",
    etf_impacts: {
      IOGP: { direction: "up", reasoning: "At $100–115 Brent and ~$40 breakeven, basket margins are ~$60–75. ~1.51x beta supports IOGP holding the €32–38 range with modest upside as H2 hedge roll-off approaches. Directional: hold/up." },
      XLE: { direction: "up", reasoning: "Integrateds with refining-margin tailwind (record middle distillate cracks per IEA) hold or extend. Cash flow strength supports buybacks and dividends." },
      VDE: { direction: "up", reasoning: "Duration thesis modestly supportive — basket holds elevated levels rather than mean-reverting." },
      OIH: { direction: "up", reasoning: "Services capex commitments stay intact at sustained $100+. Non-Gulf-pivot names continue to benefit." },
      USO: { direction: "flat", reasoning: "WTI range-bound $95–108. Front-month-vs-Dated dynamic dampens direct exposure relative to E&P equities." },
      BNO: { direction: "flat", reasoning: "Brent range $100–115. Direct exposure but capped by base-case range; equities capture more upside via operating leverage." },
    },
    triggers: [
      "Trump-Xi readouts on Iran specifically — Chinese commitments on Iranian oil purchases",
      "IOGP.AS open at 09:00 CET — first read on how Amsterdam digests the IEA OMR",
      "Lebanon-Israel Washington talks outcome today",
      "Iranian / IRGC response to Chinese preferential transit",
      "Dated Brent vs front-month: clean confirmation of the spread",
      "OPEC+ stance on coordinated SPR-replacement signaling",
    ],
    timeframe: "2–4 months",
  },
  bear: {
    narrative:
      "Genuine breakthrough — phased Hormuz reopening + sanctions framework via Pakistan-mediated talks or Trump-Xi-brokered terms. Iran allows commercial transit; selective passage scales into broader access. BUT the downside is capped by the IEA's own arithmetic: even assuming the conflict ends by early June, the market remains 'severely undersupplied through the end of 3Q26.' Morgan Stanley layers another ~1B barrels of 2026 loss from restart/repair/repositioning lag. The risk premium unwinds but the structural floor holds.",
    outlook: "bearish",
    probability: 10,
    supply_baseline:
      "Global production: ~95.1M bbl/day (April, IEA) | Global demand: ~103M bbl/day | Cumulative supply losses since Feb: 12.8 mb/d",
    supply_impacts: [
      { section: "disruptions", label: "Residual Disruptions (post-breakthrough)" },
      { event: "Hormuz reopening transition", impact: "-3 to -5M bbl/day", detail: "Per IEA: restart of shut-in production, repair of refineries, and tanker repositioning takes months. Morgan Stanley quantifies ~1B barrels of 2026 supply lost to this lag." },
      { event: "Insurance / shipping friction", impact: "-0.5M bbl/day", detail: "Insurance premiums and rerouting unwind gradually; not instantaneous." },
      { section: "gross", label: "Gross Residual Disruption", impact: "-3.5 to -5.5M bbl/day", detail: "Even on breakthrough, IEA forecasts undersupply through end-Q3. Floor is structural, not narrative." },
      { section: "mitigations", label: "Supply Recovery & Demand Response" },
      { event: "Phased Hormuz transit restoration", impact: "+8 to +12M bbl/day phased", detail: "Gradual restoration of pre-crisis flows. Full recovery takes Q3–Q4." },
      { event: "Iranian exports resume", impact: "+1.5M bbl/day", detail: "Conditional on sanctions framework. Speed depends on negotiated terms." },
      { event: "Demand response to lower prices", impact: "-1.0M bbl/day (re-bound)", detail: "Demand recovers as gasoline retreats from +28% YoY peak." },
      { section: "mitigations_total", label: "Net Supply Recovery", impact: "+~10M bbl/day phased", detail: "Substantial but not complete by end-Q3." },
      { section: "net", label: "Net Market Balance (Bear)", impact: "Structural deficit narrows but persists through Q3", detail: "IEA's own arithmetic: undersupply through end-3Q26 even on June resolution. The Bear case is 'less elevated,' not 'collapsed.'" },
    ],
    net_supply_impact:
      "Bear: risk premium unwinds but structural deficit persists through Q3. Brent floors well above pre-crisis levels.",
    price_reasoning:
      "The $14–18/bbl Goldman-style risk premium unwinds on breakthrough confirmation, but IEA arithmetic floors the move. Pre-crisis $75–85 is not the reachable downside — IEA's Q3-deficit math implies $80–95 as the structural floor. Phantom-ceasefire pattern history shows the market reflexively over-discounts resolution probability on announcements; expect overshoot to test the lower end before stabilizing.",
    price_target: "Brent: $80–95 | WTI: $75–88",
    etf_impacts: {
      IOGP: { direction: "down", reasoning: "Basket margins compress from ~$65/bbl (at $106) to ~$45/bbl at $85. ~1.51x beta means IOGP gives back to €26–30 range. H1 hedges provide some downside protection; H2 roll-off is structurally supportive even at lower spot prices." },
      XLE: { direction: "down", reasoning: "Integrateds give back some of the premium but refining-margin tailwind cushions; buyback support firmer than pure-play E&P." },
      VDE: { direction: "down", reasoning: "Broader basket gives back. Mid-cap names with higher breakevens hit hardest." },
      OIH: { direction: "down", reasoning: "Services see capex review fears. But non-Gulf-pivot positioning offers relative protection." },
      USO: { direction: "down", reasoning: "WTI retraces toward $75–88. Direct commodity exposure — most vulnerable to the de-escalation trade." },
      BNO: { direction: "down", reasoning: "Brent unwinds risk premium; BNO highest direct exposure to the trade. Still floored by IEA Q3 math." },
    },
    triggers: [
      "Formal ceasefire terms beyond April 8 'life support' framework",
      "Phased Hormuz transit announced — clear schedule",
      "Iranian export resumption / sanctions framework",
      "Pakistan / Trump-Xi mediated breakthrough",
      "OPEC+ coordinates to absorb returning Gulf supply",
    ],
    timeframe: "2–3 months",
  },
};

export const TAIL_SCENARIOS = {
  intro:
    "Tail buckets sit outside Bull/Base/Bear. Probabilities sum with the three focal cases to 100% (Bull 30 + Base 50 + Bear 10 + Tail-up 7 + Tail-down 3).",
  up: {
    label: "Tail-up",
    probability: 7,
    direction: "up",
    narrative:
      "Major kinetic resumption or regional widening — direct US-Iran kinetic resumption, Lebanon-Israel full flare-up, or actual Bab el-Mandeb kinetic closure (vs the current threat-only state). Brent breaks $140 with rapid path to elasticity-driven extreme prices. IOGP sharp up.",
  },
  down: {
    label: "Tail-down",
    probability: 3,
    direction: "down",
    narrative:
      "Sudden capacity restoration plus Iranian capitulation on accelerated timeline — full Hormuz reopening within weeks. Risk premium fully unwinds; spot drops below $80. IOGP sharp down, but still floored by IEA Q3 deficit arithmetic in the medium term.",
  },
};
