import { useState, useEffect, useCallback } from "react";
import { RefreshCw, TrendingUp, TrendingDown, Minus, Plus, X, AlertTriangle, Globe, ChevronRight, Droplets, BarChart3, Shield, Target, Clock } from "lucide-react";

const BUILD_TIME = new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

const DEFAULT_ETFS = [
  { ticker: "IOGP", name: "iShares Oil & Gas E&P UCITS", primary: true },
  { ticker: "XLE", name: "Energy Select Sector SPDR" },
  { ticker: "VDE", name: "Vanguard Energy ETF" },
  { ticker: "OIH", name: "VanEck Oil Services ETF" },
  { ticker: "USO", name: "United States Oil Fund" },
  { ticker: "BNO", name: "United States Brent Oil Fund" },
];

const PRELOADED_MARKET = {
  etfs: {
    IOGP: { awaitingOpen: true, currency: "EUR" },
    XLE: { price: 62.56, currency: "USD", change_pct: 1.69, stale: true, as_of: "2026-03-28" },
    VDE: { price: 174.14, currency: "USD", change_pct: 1.57, stale: true, as_of: "2026-03-28" },
    OIH: { price: 410.79, currency: "USD", change_pct: 1.00, stale: true, as_of: "2026-03-28" },
    USO: { price: 124.20, currency: "USD", change_pct: 5.92, stale: true, as_of: "2026-03-28" },
    BNO: { price: 50.55, currency: "USD", change_pct: 3.65, stale: true, as_of: "2026-03-28" },
  },
  brent: { price: 106.00, change_pct: -1.6, note: "front-month, approximate; last confirmed close was May 12 settle $107.77 (+3.4%) before partial pullback on Trump-Xi mediation hopes" },
  wti: { price: 101.50, change_pct: -0.7, note: "front-month, back below $102 from $102.18 May 12 close" },
  date: "2026-05-14 (Thu, pre-Amsterdam open, 07:16 CET)",
};

const PRELOADED_GEO = {
  summary: "Six weeks into the crisis, the structural picture has hardened. The IEA's May Oil Market Report \u2014 the most consequential single data drop of the cycle \u2014 quantifies a Q2 deficit of ~6 mb/d, with >14 mb/d of production shut-in from the Hormuz closure and 12.8 mb/d of cumulative supply losses since February. Crucially, the IEA states the market remains 'severely undersupplied through the end of 3Q26 even assuming the conflict ends by early June' \u2014 making the 'duration of elevated prices' leg of the thesis arithmetic rather than directional. The April 8 ceasefire is the active formal framework but has been repeatedly violated; Trump called it 'massive life support' Monday after rejecting Iran's counterproposal. Brent has retraced to ~$106 from the late-March peak as markets oscillate on mediation rumors (phantom ceasefire pattern: iterations Apr 17, Apr 21, May 4\u20137, and the May 13 partial pullback). Trump arrived in Beijing yesterday for the Xi summit; a Chinese-flagged supertanker transited Hormuz via IRGC-controlled Larak Island ahead of the meeting \u2014 selective passage, not opening.",
  events: [
    { title: "IEA May OMR: undersupply through Q3 even on early-June resolution", impact: "bullish", detail: "Q2 deficit ~6 mb/d; >14 mb/d production shut-in from Hormuz; 12.8 mb/d cumulative supply losses since February; global oil supply fell 1.8 mb/d in April to 95.1 mb/d. The 400M-barrel coordinated SPR release (32 IEA members) has already been deployed and is now characterized by IEA itself as a 'temporary buffer' insufficient to close the gap. Morgan Stanley: ~1B barrels of 2026 loss from restart/repair/repositioning lag." },
    { title: "Trump arrives in Beijing for Xi summit \u2014 Iran on agenda", impact: "neutral", detail: "Trump explicitly framed trade as priority; Iran sidelined or punted would be bullish for the position (no near-term Hormuz progress). Watch for Chinese commitments on Iranian oil purchases." },
    { title: "Yuan Hua Hu transits Hormuz via Larak Island \u2014 selective passage", impact: "bullish", detail: "Chinese-flagged supertanker passed through the IRGC-controlled northern route ahead of the Trump-Xi meeting. China appears to be getting preferential access. This is selective passage, not opening \u2014 reinforces 'life support' base case rather than reopening." },
    { title: "April 8 ceasefire on 'massive life support' \u2014 Trump rejects Iran counterproposal", impact: "bullish", detail: "Ceasefire framework repeatedly violated. Trump's Monday rejection of Iran's counteroffer drove Brent +3.4% to $107.77 on May 12; WTI +4.2% to $102.18. Circular deadlock intact: US wants Hormuz reopened as precondition; Iran wants ceasefire first; no enforcement mechanism." },
    { title: "US April CPI 3.8% YoY \u2014 highest since May 2023", impact: "neutral", detail: "Energy was 40% of the print; gasoline +28.4% YoY. Real-economy pressure mounting \u2014 raises political stakes around any sustained price elevation but doesn't shift the supply picture." },
    { title: "Saudi production at lowest level since 1990; Iranian exports stalled", impact: "bullish", detail: "Saudi output at multi-decade lows. Iranian exports recently stalled \u2014 first sustained interruption since the conflict began. Supply-side data continues to confirm the structural deficit." },
    { title: "Hapag-Lloyd discloses $50\u201360M/week extra cost from Hormuz blockage", impact: "bullish", detail: "Real-economy data point on the cost of disruption. Shipping rerouting is confirmed and measurable. Insurance premiums remain elevated." },
    { title: "Lebanon-Israel US-mediated talks today in Washington", impact: "neutral", detail: "New round of talks. Collapse here re-introduces double-chokepoint risk and pressures Hormuz indirectly. Outcome distribution is asymmetric \u2014 stability is the base case; collapse is the tail-up trigger." },
  ],
  sentiment: "bullish",
};

const PRELOADED_SCENARIOS = {
  bull: {
    narrative: "Hormuz stays closed; the escalation cycle continues \u2014 Project Freedom resumes, IRGC kinetics widen, or Lebanon-Israel talks collapse into a broader regional flare. The IEA May OMR already quantifies the structural undersupply (Q2 deficit ~6 mb/d, undersupply through Q3 even on early-June resolution). Bull stacks an escalation premium on top of this duration anchor. Crucially: this is grounded in IEA arithmetic + Morgan Stanley restart-lag math, not in 1973-style elasticity extrapolation (the latter is now the Tail-up bucket).",
    outlook: "strongly_bullish",
    probability: 30,
    supply_baseline: "Global production: ~95.1M bbl/day (April, IEA \u2014 down 1.8 mb/d MoM) | Global demand: ~103M bbl/day (partial demand destruction underway) | Cumulative supply losses since Feb: 12.8 mb/d",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions (per IEA May OMR)" },
      { event: "Hormuz closure / production shut-in", impact: ">-14.0M bbl/day", detail: "IEA: more than 14 mb/d of production shut-in due to Hormuz closure. Only selective transits via IRGC-controlled Larak Island (Chinese-flagged Yuan Hua Hu passage ahead of Trump-Xi summit). Saudi production at lowest level since 1990." },
      { event: "Iranian export interruption", impact: "-1.5M bbl/day", detail: "Iranian exports recently stalled \u2014 first sustained interruption since the conflict began. Removes a previously assumed mitigation." },
      { event: "Bull-case escalation overlay", impact: "-1 to -3M bbl/day", detail: "Project Freedom resumption / IRGC strikes / Lebanon-Israel collapse adds further supply disruption on top of the IEA baseline. Specific magnitude depends on which trigger fires." },
      { section: "gross", label: "Gross Supply Disruption (vs Feb baseline)", impact: "-13 to -16M bbl/day", detail: "Cumulative IEA-confirmed losses (12.8 mb/d) plus escalation overlay." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "SPR coordinated release (already deployed)", impact: "+~1.0M bbl/day", detail: "400M-barrel coordinated release from 32 IEA members. IEA itself now characterizes this as a 'temporary buffer' insufficient to close the gap. Significant portion already drawn." },
      { event: "Selective Hormuz transit via Larak", impact: "+2.0 to +2.5M bbl/day", detail: "IRGC-controlled passage for Chinese/Russian-flagged vessels. China appears to be getting preferential access. Selective, not opening." },
      { event: "Saudi East-West pipeline + UAE Fujairah", impact: "+5.0 to +6.0M bbl/day", detail: "Pre-existing mitigations remain. Saudi production constraint at 1990 lows is the binding factor, not pipeline capacity." },
      { event: "Demand destruction at sustained $100+", impact: "+1.5M bbl/day (effective)", detail: "Already partially priced in \u2014 US April CPI at 3.8% YoY with gasoline +28.4% YoY is the real-economy signal." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+~10M bbl/day", detail: "Aggregate of structural + temporary buffers. SPR runs down further; mitigations have limited remaining headroom." },
      { section: "net", label: "Net Structural Deficit (Bull)", impact: "-3 to -6M bbl/day", detail: "Q2 deficit at the wider end of IEA's central estimate, with escalation overlay extending duration. Morgan Stanley: ~1B barrels of 2026 loss from restart/repair/repositioning lag \u2014 pushes elevation into H2." },
    ],
    net_supply_impact: "Bull: Q2 deficit at IEA's wider end (~6 mb/d) with escalation premium and Morgan Stanley restart-lag pushing elevation into H2 2026. Duration of elevated prices is the thesis \u2014 peak is secondary.",
    price_reasoning: "Anchor: IEA Q2/Q3 deficit arithmetic. Even on early-June conflict resolution, IEA forecasts undersupply through end-Q3. Bull adds an escalation premium of $10\u201325 on top of the structural anchor. Refining margins at 'historically high levels' (IEA) with record middle-distillate cracks reinforce the equity transmission. The phantom-ceasefire pattern (Apr 17 / Apr 21 / May 4\u20137 / May 13) shows each pullback is shallower as structural fundamentals reassert.",
    price_target: "Brent: $115\u2013140 sustained through Q3 | WTI: $108\u2013130 sustained",
    etf_impacts: {
      IOGP: { direction: "up", reasoning: "~1.51x beta to Brent, ~$40 basket breakeven, ~95% North American + Australian (zero Hormuz production exposure for dominant share). At sustained $115\u2013140 Brent margins expand further into the convex zone. H2 2026 hedge roll-off layers additional upside. Directional target range: \u20ac38\u201348." },
      XLE: { direction: "up", reasoning: "Integrateds capture upstream price benefit plus refining-margin tailwind (record distillate cracks per IEA OMR). Cash flows compound." },
      VDE: { direction: "up", reasoning: "Broader US energy basket \u2014 operational leverage at $115+ supports multiple expansion alongside earnings." },
      OIH: { direction: "up", reasoning: "OilPrice flagged services names 'best positioned for the pivot away from the Persian Gulf' \u2014 non-Gulf capex resumes as the duration thesis gets priced in." },
      USO: { direction: "up", reasoning: "Direct WTI exposure. At $108\u2013130 WTI, USO captures the structural price level with backwardation supporting roll yield." },
      BNO: { direction: "up", reasoning: "Direct Brent exposure. Highest-beta within the basket if escalation overlay fires." },
    },
    triggers: ["Project Freedom signals \u2014 naval movement leaks, Trump 'much more severe' framing", "IRGC kinetic activity / strikes", "Lebanon-Israel talks collapse in Washington today", "Trump-Xi summit: Iran sidelined or punted", "Iranian backlash against Chinese preferential transit"],
    timeframe: "2\u20134 months (Q2\u2013Q3 duration emphasized)",
  },

  base: {
    narrative: "April 8 'life support' ceasefire holds in some form despite repeated violations; selective transits continue (China carve-out via Larak) but no real reopening. Brent range-bound $100\u2013115 anchored on IEA Q2 deficit of ~6 mb/d. Circular deadlock intact \u2014 US wants Hormuz reopened as precondition; Iran wants ceasefire first; no enforcement mechanism. Per the category-error framework, the market repeatedly conflates ceasefire signals with closure resolution \u2014 but they're separable, and the IEA's arithmetic floors the duration leg.",
    outlook: "bullish",
    probability: 50,
    supply_baseline: "Global production: ~95.1M bbl/day (April, IEA) | Global demand: ~103M bbl/day | Cumulative supply losses since Feb: 12.8 mb/d",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions (per IEA May OMR)" },
      { event: "Hormuz closure / production shut-in", impact: ">-14.0M bbl/day", detail: "Per IEA: more than 14 mb/d shut-in. Selective transits via Larak continue but don't materially close the gap." },
      { event: "Iranian export interruption", impact: "-1.5M bbl/day", detail: "First sustained interruption since conflict began. Removes a previously assumed offset." },
      { section: "gross", label: "Gross Supply Disruption (vs Feb baseline)", impact: "-12 to -14M bbl/day", detail: "IEA-confirmed cumulative losses of 12.8 mb/d since February." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "SPR release (deployed; depleting)", impact: "+~1.0M bbl/day", detail: "IEA-characterized 'temporary buffer' \u2014 drawdown continues but headroom shrinks." },
      { event: "Larak Island selective transit (China carve-out)", impact: "+2.0 to +2.5M bbl/day", detail: "IRGC-controlled passage for allied-flag vessels. Chinese supertanker transit ahead of Trump-Xi summit reinforces this channel." },
      { event: "Saudi East-West + UAE Fujairah pipelines", impact: "+5.0 to +6.0M bbl/day", detail: "Pre-existing structural mitigations. Saudi 1990-low production cap is the binding factor." },
      { event: "Demand destruction at $100+", impact: "+1.5M bbl/day (effective)", detail: "US CPI / gasoline data confirms real-economy elasticity at current levels." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+~10M bbl/day", detail: "Sufficient to keep markets functioning but not to close the deficit." },
      { section: "net", label: "Net Structural Deficit (Base)", impact: "-~6M bbl/day", detail: "Aligned with IEA's central Q2 deficit estimate. Persists through Q3 per IEA even on resolution \u2014 Morgan Stanley restart-lag extends elevation into H2." },
    ],
    net_supply_impact: "Base: IEA-quantified Q2 deficit of ~6 mb/d; SPR running down; duration of elevated prices is the binding constraint, not peak prices.",
    price_reasoning: "IEA arithmetic floors the price level. Three-layer discount stack still applies: futures-vs-physical gap (smaller than April's ~$37 but still pointing the same direction \u2014 Fortune-cited Dated quote of $110.87 on May 13 vs front-month ~$106 unverified but consistent with pattern), strip backwardation, and implied resolution probability all keep equities at a discount to spot reality. Phantom-ceasefire pattern (Apr 17, Apr 21, May 4\u20137, May 13) shows each retracement shallower as the structural anchor reasserts.",
    price_target: "Brent: $100\u2013115 sustained | WTI: $95\u2013108 sustained",
    etf_impacts: {
      IOGP: { direction: "up", reasoning: "At $100\u2013115 Brent and ~$40 breakeven, basket margins are ~$60\u201375. ~1.51x beta supports IOGP holding the \u20ac32\u201338 range with modest upside as H2 hedge roll-off approaches. Directional: hold/up." },
      XLE: { direction: "up", reasoning: "Integrateds with refining-margin tailwind (record middle distillate cracks per IEA) hold or extend. Cash flow strength supports buybacks and dividends." },
      VDE: { direction: "up", reasoning: "Duration thesis modestly supportive \u2014 basket holds elevated levels rather than mean-reverting." },
      OIH: { direction: "up", reasoning: "Services capex commitments stay intact at sustained $100+. Non-Gulf-pivot names continue to benefit." },
      USO: { direction: "flat", reasoning: "WTI range-bound $95\u2013108. Front-month-vs-Dated dynamic dampens direct exposure relative to E&P equities." },
      BNO: { direction: "flat", reasoning: "Brent range $100\u2013115. Direct exposure but capped by base-case range; equities capture more upside via operating leverage." },
    },
    triggers: ["Trump-Xi readouts on Iran specifically \u2014 Chinese commitments on Iranian oil purchases", "IOGP.AS open at 09:00 CET \u2014 first read on how Amsterdam digests the IEA OMR", "Lebanon-Israel Washington talks outcome today", "Iranian / IRGC response to Chinese preferential transit", "Dated Brent vs front-month: clean confirmation of the spread", "OPEC+ stance on coordinated SPR-replacement signaling"],
    timeframe: "2\u20134 months",
  },
  bear: {
    narrative: "Genuine breakthrough \u2014 phased Hormuz reopening + sanctions framework via Pakistan-mediated talks or Trump-Xi-brokered terms. Iran allows commercial transit; selective passage scales into broader access. BUT the downside is capped by the IEA's own arithmetic: even assuming the conflict ends by early June, the market remains 'severely undersupplied through the end of 3Q26.' Morgan Stanley layers another ~1B barrels of 2026 loss from restart/repair/repositioning lag. The risk premium unwinds but the structural floor holds.",
    outlook: "bearish",
    probability: 10,
    supply_baseline: "Global production: ~95.1M bbl/day (April, IEA) | Global demand: ~103M bbl/day | Cumulative supply losses since Feb: 12.8 mb/d",
    supply_impacts: [
      { section: "disruptions", label: "Residual Disruptions (post-breakthrough)" },
      { event: "Hormuz reopening transition", impact: "-3 to -5M bbl/day", detail: "Per IEA: restart of shut-in production, repair of refineries, and tanker repositioning takes months. Morgan Stanley quantifies ~1B barrels of 2026 supply lost to this lag." },
      { event: "Insurance / shipping friction", impact: "-0.5M bbl/day", detail: "Insurance premiums and rerouting unwind gradually; not instantaneous." },
      { section: "gross", label: "Gross Residual Disruption", impact: "-3.5 to -5.5M bbl/day", detail: "Even on breakthrough, IEA forecasts undersupply through end-Q3. Floor is structural, not narrative." },
      { section: "mitigations", label: "Supply Recovery & Demand Response" },
      { event: "Phased Hormuz transit restoration", impact: "+8 to +12M bbl/day phased", detail: "Gradual restoration of pre-crisis flows. Full recovery takes Q3\u2013Q4." },
      { event: "Iranian exports resume", impact: "+1.5M bbl/day", detail: "Conditional on sanctions framework. Speed depends on negotiated terms." },
      { event: "Demand response to lower prices", impact: "-1.0M bbl/day (re-bound)", detail: "Demand recovers as gasoline retreats from +28% YoY peak." },
      { section: "mitigations_total", label: "Net Supply Recovery", impact: "+~10M bbl/day phased", detail: "Substantial but not complete by end-Q3." },
      { section: "net", label: "Net Market Balance (Bear)", impact: "Structural deficit narrows but persists through Q3", detail: "IEA's own arithmetic: undersupply through end-3Q26 even on June resolution. The Bear case is 'less elevated,' not 'collapsed.'" },
    ],
    net_supply_impact: "Bear: risk premium unwinds but structural deficit persists through Q3. Brent floors well above pre-crisis levels.",
    price_reasoning: "The $14\u201318/bbl Goldman-style risk premium unwinds on breakthrough confirmation, but IEA arithmetic floors the move. Pre-crisis $75\u201385 is not the reachable downside \u2014 IEA's Q3-deficit math implies $80\u201395 as the structural floor. Phantom-ceasefire pattern history shows the market reflexively over-discounts resolution probability on announcements; expect overshoot to test the lower end before stabilizing.",
    price_target: "Brent: $80\u201395 | WTI: $75\u201388",
    etf_impacts: {
      IOGP: { direction: "down", reasoning: "Basket margins compress from ~$65/bbl (at $106) to ~$45/bbl at $85. ~1.51x beta means IOGP gives back to \u20ac26\u201330 range. H1 hedges provide some downside protection; H2 roll-off is structurally supportive even at lower spot prices." },
      XLE: { direction: "down", reasoning: "Integrateds give back some of the premium but refining-margin tailwind cushions; buyback support firmer than pure-play E&P." },
      VDE: { direction: "down", reasoning: "Broader basket gives back. Mid-cap names with higher breakevens hit hardest." },
      OIH: { direction: "down", reasoning: "Services see capex review fears. But non-Gulf-pivot positioning offers relative protection." },
      USO: { direction: "down", reasoning: "WTI retraces toward $75\u201388. Direct commodity exposure \u2014 most vulnerable to the de-escalation trade." },
      BNO: { direction: "down", reasoning: "Brent unwinds risk premium; BNO highest direct exposure to the trade. Still floored by IEA Q3 math." },
    },
    triggers: ["Formal ceasefire terms beyond April 8 'life support' framework", "Phased Hormuz transit announced \u2014 clear schedule", "Iranian export resumption / sanctions framework", "Pakistan / Trump-Xi mediated breakthrough", "OPEC+ coordinates to absorb returning Gulf supply"],
    timeframe: "2\u20133 months",
  },
};

const DOUBLE_CHOKEPOINT_STATUS = {
  title: "Double Chokepoint: PARTIAL Validation",
  thesis: "Six weeks in, the framework is partially confirmed \u2014 but in a different shape than the late-March 'kinetic closure' framing implied. Bab el-Mandeb traffic is sharply reduced and rerouting is happening (Hapag-Lloyd discloses $50\u201360M/week in extra costs; major carriers continue to pause Trans-Suez sailings); insurance premiums remain elevated. But the kinetic Houthi escalation hasn't materialized at scale. The threat alone is doing the work.",
  probability: "Probability of full Bab el-Mandeb kinetic closure: held pending refreshed Houthi-kinetics data (not in today's intel). Threat-effect on shipping and insurance: confirmed. Posture: directional / partial validation, not full validation.",
  evidence: [
    "CONFIRMED: Shipping rerouting persists \u2014 Hapag-Lloyd disclosed $50\u201360M/week extra costs from Hormuz blockage",
    "CONFIRMED: Insurance premiums for Red Sea / Bab el-Mandeb transit remain elevated",
    "CONFIRMED: Major carriers (Maersk, Hapag-Lloyd, CMA CGM) continue Trans-Suez pauses or reduced frequency",
    "PARTIAL: Houthi public threats around Bab el-Mandeb remain in posture \u2014 but no large-scale kinetic strikes on shipping in recent weeks",
    "NOT REFRESHED: Specific Bab el-Mandeb traffic counts and recent Houthi kinetic activity weren't in today's intel pull \u2014 flagged for follow-up rather than asserted",
    "Saudi Yanbu exports remain within Houthi strike range \u2014 risk envelope unchanged",
  ],
  impact: "Current state: the threat is doing the work without a kinetic closure event. Shipping costs, insurance, and rerouting friction are real but contained. A full kinetic closure remains the Tail-up trigger; the partial validation supports the Base case duration thesis (premium persistence) rather than the late-March Bull-case catastrophe arithmetic.",
};

const IOGP_ANALYSIS = {
  title: "IOGP Elasticity Analysis: Price Sensitivity to Oil",
  overview: "IOGP tracks the S&P Commodity Producers Oil & Gas E&P Index \u2014 pure upstream companies whose revenue is almost entirely determined by realized oil prices (S&P Global: 'Average realized prices are the most important operating metric for an E&P company'). This creates a natural leverage effect.",
  sections: [
    { label: "Observed beta to Brent", detail: "Working figure: ~1.51x equity beta to Brent. This supersedes earlier ~1.2x rough estimates. Consistent with academic E&P literature (typically 1.2\u20131.8x for pure upstream) and with what the basket has actually delivered through this cycle." },
    { label: "Basket geography (~95% North American + Australian)", detail: "Constituents include CNQ, COP, EOG, FANG, DVN, CTRA, WDS and similar \u2014 heavily weighted to U.S. shale, Canadian oil sands, and Australian operators. Zero Hormuz production exposure for the dominant share of the basket. Captures price upside without disruption risk \u2014 the non-Hormuz geography is doing what we expected it to do." },
    { label: "Operating leverage mechanism", detail: "E&P companies have high fixed costs and variable revenue. Basket breakeven ~$40/bbl. At ~$106 Brent, margin is ~$66 \u2014 the basket is well inside the convex zone. At sustained $115\u2013140 (Bull case anchored on IEA Q3-deficit arithmetic), margins expand further with the relationship remaining non-linear and convex." },
    { label: "Refining margins \u2014 tailwind for integrateds", detail: "Per the IEA May OMR: refining margins at 'historically high levels, supported by record middle distillate cracks.' That's a downstream signal \u2014 but it means the integrated portion of the basket (Woodside-style integrateds) has a margin tailwind on top of the upstream price benefit. Pure E&Ps with ~$40 breakeven are deep in the convex zone at $100\u2013110 Brent." },
    { label: "Hedging dilution (near-term dampener)", detail: "Most E&P companies hedge 30\u201360% of production 12\u201318 months forward. Much of 2026 production was hedged at $70\u201385, so near-term realized prices lag spot \u2014 basket FCF still lags spot one-for-one through Q2 earnings. H2 2026 roll-off thesis hasn't matured yet but remains the structural setup for late-2026 earnings expansion." },
    { label: "Scenario-specific IOGP targets (directional ranges)", detail: "Bull ($115\u2013140 Brent sustained through Q3): IOGP \u20ac38\u201348. | Base ($100\u2013115 Brent): \u20ac32\u201338 hold/up. | Bear ($80\u201395 Brent): \u20ac26\u201330, floored by IEA Q3-deficit arithmetic. These are directional ranges, not point forecasts." },
    { label: "Key risk: Gulf-exposed producers", detail: "The minority of the basket with Gulf-exposed production may see curtailment even as prices spike. The ~95% North American + Australian weighting limits this risk materially compared to a Gulf-heavy index \u2014 but it isn't zero." },
  ],
};

const TAIL_SCENARIOS = {
  intro: "Tail buckets sit outside Bull/Base/Bear. Probabilities sum with the three focal cases to 100% (Bull 30 + Base 50 + Bear 10 + Tail-up 7 + Tail-down 3).",
  up: {
    label: "Tail-up",
    probability: 7,
    direction: "up",
    narrative: "Major kinetic resumption or regional widening \u2014 direct US-Iran kinetic resumption, Lebanon-Israel full flare-up, or actual Bab el-Mandeb kinetic closure (vs the current threat-only state). Brent breaks $140 with rapid path to elasticity-driven extreme prices. IOGP sharp up.",
  },
  down: {
    label: "Tail-down",
    probability: 3,
    direction: "down",
    narrative: "Sudden capacity restoration plus Iranian capitulation on accelerated timeline \u2014 full Hormuz reopening within weeks. Risk premium fully unwinds; spot drops below $80. IOGP sharp down, but still floored by IEA Q3 deficit arithmetic in the medium term.",
  },
};

const ACTIVE_FRAMEWORKS = [
  {
    name: "Phantom ceasefire pattern",
    state: "Confirmed iterations: Apr 17, Apr 21, May 4\u20137, May 13 partial pullback. Markets strip both escalation AND closure premia on ceasefire announcements when only the escalation premium is warranted. Each retracement shallower as structural fundamentals reassert.",
    tone: "active",
  },
  {
    name: "Category error",
    state: "Hormuz closure is separable from ceasefire / escalation. Trading the difference is the edge. May 13 pullback on Trump-Xi mediation hopes is the latest instance \u2014 front-month gave back ~$2 but the IEA-quantified structural deficit is unchanged.",
    tone: "active",
  },
  {
    name: "Circular deadlock",
    state: "US wants Hormuz reopened as ceasefire precondition; Iran wants ceasefire first; no enforcement mechanism. Stable equilibrium \u2014 supports Base case duration thesis. Trump's 'massive life support' framing on the April 8 ceasefire fits the pattern.",
    tone: "active",
  },
  {
    name: "Three-layer discount stack",
    state: "Equities embed (1) futures-vs-physical gap (Dated vs front-month \u2014 Fortune $110.87 vs ICE ~$106 on May 13 unverified but directionally consistent), (2) strip backwardation, (3) implied resolution probability. Thesis hinges on duration of elevated prices, not peak.",
    tone: "active",
  },
  {
    name: "Double chokepoint \u2014 PARTIAL",
    state: "Bab el-Mandeb traffic reduced and rerouting confirmed (Hapag-Lloyd $50\u201360M/wk); insurance elevated. But kinetic Houthi escalation hasn't materialized at scale. The threat alone is doing the work. Don't claim full validation. See dedicated block below.",
    tone: "partial",
  },
  {
    name: "Operating leverage",
    state: "IOGP basket breakeven ~$40, beta ~1.51x to Brent (working figure; supersedes earlier 1.2x rough estimate), ~95% North American + Australian, hedging dampener rolls off H2 2026.",
    tone: "active",
  },
];

const STORAGE_KEY = "oil-etf-watchlist-v2";
const SCENARIO_META = {
  bull: { label: "Bull Case", emoji: "\ud83d\udfe2", bg: "bg-emerald-950", border: "border-emerald-700", text: "text-emerald-400", badge: "bg-emerald-900 text-emerald-300" },
  base: { label: "Base Case", emoji: "\ud83d\udfe1", bg: "bg-amber-950", border: "border-amber-700", text: "text-amber-400", badge: "bg-amber-900 text-amber-300" },
  bear: { label: "Bear Case", emoji: "\ud83d\udd34", bg: "bg-red-950", border: "border-red-700", text: "text-red-400", badge: "bg-red-900 text-red-300" },
};

const PctBadge = ({ val }) => {
  if (val == null) return <span className="text-gray-500">\u2014</span>;
  const pos = val >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-sm font-medium ${pos ? "text-emerald-400" : "text-red-400"}`}>
      {pos ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      {pos ? "+" : ""}{val.toFixed(2)}%
    </span>
  );
};

const OutlookLabel = ({ outlook }) => {
  const map = {
    strongly_bullish: { label: "Strongly Bullish", cls: "bg-emerald-900 text-emerald-300" },
    bullish: { label: "Bullish", cls: "bg-emerald-900 text-emerald-300" },
    neutral: { label: "Neutral", cls: "bg-amber-900 text-amber-300" },
    bearish: { label: "Bearish", cls: "bg-red-900 text-red-300" },
    strongly_bearish: { label: "Strongly Bearish", cls: "bg-red-900 text-red-300" },
  };
  const m = map[outlook] || map.neutral;
  return <span className={`px-2 py-0.5 rounded text-xs font-semibold ${m.cls}`}>{m.label}</span>;
};

const ImpactBadge = ({ dir }) => {
  const m = { up: { icon: TrendingUp, cls: "text-emerald-400" }, down: { icon: TrendingDown, cls: "text-red-400" }, flat: { icon: Minus, cls: "text-amber-400" } };
  const d = m[dir] || m.flat;
  const Icon = d.icon;
  return <Icon size={16} className={d.cls} />;
};

export default function App() {
  const [etfs, setEtfs] = useState(DEFAULT_ETFS);
  const [market] = useState(PRELOADED_MARKET);
  const [geo] = useState(PRELOADED_GEO);
  const [scenarios] = useState(PRELOADED_SCENARIOS);
  const [activeTab, setActiveTab] = useState("bull");
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTicker, setNewTicker] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get(STORAGE_KEY); if (r?.value) setEtfs(JSON.parse(r.value)); } catch {}
    })();
  }, []);

  const saveEtfs = useCallback(async (list) => {
    setEtfs(list);
    try { await window.storage.set(STORAGE_KEY, JSON.stringify(list)); } catch {}
  }, []);

  const addEtf = () => {
    if (!newTicker.trim()) return;
    const t = newTicker.trim().toUpperCase();
    if (etfs.find(e => e.ticker === t)) return;
    saveEtfs([...etfs, { ticker: t, name: newName.trim() || t }]);
    setNewTicker(""); setNewName(""); setShowAdd(false);
  };

  const removeEtf = (ticker) => saveEtfs(etfs.filter(e => e.ticker !== ticker));

  const requestRefresh = () => {
    const tickers = etfs.map(e => e.ticker).join(", ");
    if (typeof window.sendPrompt === "function") {
      window.sendPrompt("Refresh Oil ETF Tracker: Please fetch the latest prices for " + tickers + ", Brent & WTI crude, update the geopolitical context, and regenerate all three scenario models with the supply/demand waterfall. Update the artifact with fresh data.");
    } else {
      setError("sendPrompt not available here. Copy this and paste in the chat: 'Refresh Oil ETF Tracker with latest prices and scenarios.'");
    }
  };

  const sc = scenarios[activeTab];
  const scMeta = SCENARIO_META[activeTab];

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Droplets size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Oil & Energy ETF Tracker <span className="text-xs font-normal text-gray-600">built {BUILD_TIME}</span></h1>
              <p className="text-xs text-gray-500">Market snapshot: <span className="text-gray-300">{market.date}</span></p>
            </div>
          </div>
          <button onClick={requestRefresh} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-900/30">
            <RefreshCw size={16} /> Refresh Data & Scenarios
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-blue-950/30 border border-blue-900/50 rounded-2xl px-4 py-3 flex items-start gap-3">
          <Globe size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-300 space-y-1">
            <p>Market and geopolitical analysis as of <strong>{market.date}</strong>. Click <strong>Refresh Data & Scenarios</strong> to ask Claude for fresh data.</p>
            <p className="text-blue-300/80"><strong>Data discipline:</strong> IOGP.AS prices not shown before 09:00 CET. Distinguish IOGP.AS (EUR) / IOGP.L (USD) / IS0D.DE. Brent &amp; WTI shown are front-month unless explicitly flagged as Dated. Source hierarchy: originals (EIA, IEA, PortWatch, Lloyd's, filings) &gt; Tier-1 wires &gt; specialist analysis &gt; aggregators.</p>
          </div>
        </div>
        {error && (<div className="bg-amber-950/50 border border-amber-800 rounded-2xl p-4 flex items-start gap-3"><AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" /><p className="text-xs text-amber-300">{error}</p></div>)}
        <div className="grid grid-cols-2 gap-4">
          {[{ label: "Brent Crude", data: market.brent, icon: "\ud83d\udee2\ufe0f" },{ label: "WTI Crude", data: market.wti, icon: "\ud83d\udee2\ufe0f" }].map(({ label, data, icon }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><span className="text-2xl">{icon}</span><div><p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p><p className="text-xl font-bold">${data.price.toFixed(2)}</p></div></div>
                <PctBadge val={data.change_pct} />
              </div>
              {data.note && <p className="text-[10px] text-gray-500 leading-snug">{data.note}</p>}
            </div>
          ))}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2"><BarChart3 size={16} className="text-amber-500" /><h2 className="text-sm font-semibold">ETF Watchlist</h2><span className="text-xs text-gray-600">{etfs.length} ETFs</span></div>
            <button onClick={() => setShowAdd(!showAdd)} className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"><Plus size={14} /> Add ETF</button>
          </div>
          {showAdd && (<div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex gap-2 items-end flex-wrap"><div><label className="text-xs text-gray-400 block mb-1">Ticker</label><input value={newTicker} onChange={e => setNewTicker(e.target.value)} placeholder="e.g. XOP" className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white w-24 focus:outline-none focus:border-amber-500" /></div><div><label className="text-xs text-gray-400 block mb-1">Name (optional)</label><input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. SPDR S&P Oil & Gas" className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white w-56 focus:outline-none focus:border-amber-500" /></div><button onClick={addEtf} className="bg-amber-600 hover:bg-amber-500 text-white text-sm px-4 py-1.5 rounded-lg font-medium transition-colors">Add</button><button onClick={() => setShowAdd(false)} className="text-gray-500 hover:text-gray-300 text-sm px-2 py-1.5 transition-colors">Cancel</button></div>)}
          <div className="divide-y divide-gray-800">
            {etfs.map(etf => { const d = market.etfs[etf.ticker]; const sym = d?.currency === "EUR" ? "\u20ac" : "$"; return (
              <div key={etf.ticker} className="px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors group">
                <div className="flex items-center gap-3 min-w-0"><div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${etf.primary ? "bg-amber-600 text-white" : "bg-gray-700 text-gray-300"}`}>{etf.ticker.slice(0, 2)}</div><div className="min-w-0"><p className="text-sm font-semibold flex items-center gap-1.5">{etf.ticker}{etf.primary && <span className="text-xs bg-amber-900 text-amber-300 px-1.5 py-0.5 rounded">PRIMARY</span>}</p><p className="text-xs text-gray-500 truncate">{etf.name}</p></div></div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    {d?.awaitingOpen ? (
                      <p className="text-xs text-gray-400 italic">Awaiting 09:00 CET open</p>
                    ) : d ? (
                      <>
                        <p className="text-sm font-semibold flex items-center justify-end gap-1.5">
                          <span>{sym}{d.price.toFixed(2)}</span>
                          {d.stale && <span className="text-[10px] uppercase tracking-wider bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded">as of {d.as_of}</span>}
                        </p>
                        <PctBadge val={d.change_pct} />
                      </>
                    ) : (
                      <span className="text-gray-600">\u2014</span>
                    )}
                  </div>
                  {!etf.primary && (<button onClick={() => removeEtf(etf.ticker)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"><X size={14} /></button>)}
                </div>
              </div>); })}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2"><BarChart3 size={16} className="text-amber-400" /><h2 className="text-sm font-semibold">{IOGP_ANALYSIS.title}</h2><span className="ml-auto text-xs px-2 py-0.5 rounded font-medium bg-amber-900 text-amber-300">PRIMARY ETF</span></div>
          <div className="p-4 space-y-3"><p className="text-sm text-gray-300 leading-relaxed">{IOGP_ANALYSIS.overview}</p>{IOGP_ANALYSIS.sections.map((s, i) => (<div key={i} className="bg-gray-800 rounded-xl p-3"><h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">{s.label}</h4><p className="text-xs text-gray-400 leading-relaxed">{s.detail}</p></div>))}</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2"><Globe size={16} className="text-blue-400" /><h2 className="text-sm font-semibold">Geopolitical Context</h2><span className="ml-auto text-xs px-2 py-0.5 rounded font-medium bg-emerald-900 text-emerald-300">{geo.sentiment}</span></div>
          <div className="p-4"><p className="text-sm text-gray-300 leading-relaxed mb-4">{geo.summary}</p><div className="space-y-2">{geo.events.map((ev, i) => (<div key={i} className="flex items-start gap-3 bg-gray-800 rounded-xl p-3"><span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${ev.impact === "bullish" ? "bg-emerald-400" : ev.impact === "bearish" ? "bg-red-400" : "bg-amber-400"}`} /><div><p className="text-sm font-medium">{ev.title}</p><p className="text-xs text-gray-400 mt-0.5">{ev.detail}</p></div></div>))}</div></div>
        </div>
        <div className="bg-amber-950/30 border border-amber-900 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-amber-900/50 flex items-center gap-2"><AlertTriangle size={16} className="text-amber-400" /><h2 className="text-sm font-semibold text-amber-300">{DOUBLE_CHOKEPOINT_STATUS.title}</h2><span className="ml-auto text-xs px-2 py-0.5 rounded font-medium bg-amber-900 text-amber-300">PARTIAL</span></div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-300"><strong className="text-amber-300">Thesis:</strong> {DOUBLE_CHOKEPOINT_STATUS.thesis}</p>
            <p className="text-xs text-gray-400"><strong className="text-amber-300/80">Probability framing:</strong> {DOUBLE_CHOKEPOINT_STATUS.probability}</p>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Evidence (confirmed / partial / not refreshed)</h4>
              <div className="space-y-1">{DOUBLE_CHOKEPOINT_STATUS.evidence.map((e, i) => (<div key={i} className="flex items-start gap-2 text-xs text-gray-400"><span className="text-amber-400 mt-0.5 shrink-0">\u2022</span><span>{e}</span></div>))}</div>
            </div>
            <div className="bg-amber-950/50 rounded-xl p-3"><p className="text-xs text-amber-200"><strong>Current state:</strong> {DOUBLE_CHOKEPOINT_STATUS.impact}</p></div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2"><Shield size={16} className="text-purple-400" /><h2 className="text-sm font-semibold">Active Frameworks</h2><span className="ml-auto text-xs text-gray-600">analytical lens, not commentary</span></div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {ACTIVE_FRAMEWORKS.map((f, i) => (
              <div key={i} className={`rounded-xl p-3 border ${f.tone === "partial" ? "bg-amber-950/30 border-amber-900/50" : "bg-gray-800 border-gray-700"}`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${f.tone === "partial" ? "text-amber-300" : "text-purple-300"}`}>{f.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{f.state}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2"><Target size={16} className="text-purple-400" /><h2 className="text-sm font-semibold">Scenario Analysis</h2><span className="ml-auto text-xs text-gray-500">Bull/Base/Bear sum to 90% — tail buckets below</span></div>
          <div className="flex border-b border-gray-800">
            {["bull", "base", "bear"].map(key => { const m = SCENARIO_META[key]; const s = scenarios[key]; const active = activeTab === key; return (
              <button key={key} onClick={() => setActiveTab(key)} className={`flex-1 px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${active ? `${m.bg} ${m.text} border-b-2 ${m.border}` : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"}`}>
                <span>{m.emoji}</span><span>{m.label}</span>{s?.probability != null && (<span className={`text-xs px-1.5 py-0.5 rounded ${active ? m.badge : "bg-gray-800 text-gray-500"}`}>{s.probability}%</span>)}
              </button>); })}
          </div>
          {sc ? (
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <OutlookLabel outlook={sc.outlook} />
                {sc.timeframe && <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {sc.timeframe}</span>}
                {sc.probability != null && <span className="text-xs text-gray-500">Probability: {sc.probability}%</span>}
                {sc.price_target && <span className="text-xs font-mono bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{sc.price_target}</span>}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{sc.narrative}</p>
              {sc.price_reasoning && (<div className="bg-gray-800 border border-gray-700 rounded-xl p-4"><h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Price Target Reasoning</h3><p className="text-xs text-gray-400 leading-relaxed">{sc.price_reasoning}</p></div>)}
              {sc.probability != null && (<div className="w-full bg-gray-800 rounded-full h-2"><div className={`h-2 rounded-full transition-all duration-700 ${activeTab === "bull" ? "bg-emerald-500" : activeTab === "base" ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${Math.min(sc.probability, 100)}%` }} /></div>)}
              {sc.supply_baseline && (<div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Supply & Demand Impact</h3>
                <div className="bg-gray-800 rounded-xl p-3 mb-2"><p className="text-xs font-mono text-gray-400">{sc.supply_baseline}</p></div>
                <div className="space-y-1.5">
                  {sc.supply_impacts?.map((si, i) => {
                    if (si.section === "disruptions" || si.section === "mitigations") { return (<div key={i} className="pt-2 pb-1"><h4 className={`text-xs font-bold uppercase tracking-wider ${si.section === "disruptions" ? "text-red-400" : "text-emerald-400"}`}>{si.label}</h4></div>); }
                    if (si.section === "gross" || si.section === "mitigations_total" || si.section === "net") {
                      const bc = si.section === "gross" ? "border-red-800 bg-red-950/50" : si.section === "mitigations_total" ? "border-emerald-800 bg-emerald-950/50" : "border-amber-800 bg-amber-950/50";
                      const tc = si.section === "gross" ? "text-red-300" : si.section === "mitigations_total" ? "text-emerald-300" : "text-amber-300";
                      return (<div key={i} className={`rounded-xl px-4 py-3 border ${bc} mt-1 mb-2`}><div className="flex items-center justify-between"><span className={`text-sm font-bold ${tc}`}>{si.label}</span>{si.impact && <span className={`text-sm font-mono font-bold ${tc}`}>{si.impact}</span>}</div>{si.detail && <p className="text-xs text-gray-400 mt-1">{si.detail}</p>}</div>);
                    }
                    return (<div key={i} className="bg-gray-800 rounded-xl px-4 py-2.5 flex items-start gap-3"><span className={`text-xs font-mono font-bold shrink-0 mt-0.5 w-32 text-right ${si.impact.startsWith("+") ? "text-emerald-400" : si.impact.startsWith("-") ? "text-red-400" : "text-gray-400"}`}>{si.impact}</span><div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-200">{si.event}</p><p className="text-xs text-gray-500 mt-0.5">{si.detail}</p></div></div>);
                  })}
                </div>
                {sc.net_supply_impact && (<div className="mt-2 bg-gray-800 border border-gray-700 rounded-xl p-3"><p className="text-xs font-semibold text-gray-300">{sc.net_supply_impact}</p></div>)}
              </div>)}
              {sc.etf_impacts && (<div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ETF Impact Assessment</h3>
                <div className="space-y-1.5">{Object.entries(sc.etf_impacts).map(([ticker, impact]) => (<div key={ticker} className="bg-gray-800 rounded-xl px-4 py-2.5 flex items-center gap-3"><ImpactBadge dir={impact.direction} /><span className="text-sm font-semibold w-14">{ticker}</span><span className="text-xs text-gray-400 flex-1">{impact.reasoning}</span></div>))}</div>
              </div>)}
              {sc.triggers?.length > 0 && (<div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Triggers to Watch</h3>
                <div className="flex flex-wrap gap-2">{sc.triggers.map((t, i) => (<span key={i} className="bg-gray-800 border border-gray-700 text-xs text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><ChevronRight size={10} className={scMeta.text} /> {t}</span>))}</div>
              </div>)}
            </div>
          ) : (<div className="p-6 text-center text-sm text-gray-600">No data for this scenario.</div>)}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2"><AlertTriangle size={16} className="text-purple-400" /><h2 className="text-sm font-semibold">Tail Risks</h2><span className="ml-auto text-xs text-gray-600">10% combined probability</span></div>
          <div className="p-4 space-y-3">
            <p className="text-xs text-gray-500">{TAIL_SCENARIOS.intro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[TAIL_SCENARIOS.up, TAIL_SCENARIOS.down].map((t, i) => (
                <div key={i} className={`rounded-xl p-3 border ${t.direction === "up" ? "bg-emerald-950/30 border-emerald-900/50" : "bg-red-950/30 border-red-900/50"}`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <ImpactBadge dir={t.direction} />
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${t.direction === "up" ? "text-emerald-300" : "text-red-300"}`}>{t.label}</h4>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded font-medium ${t.direction === "up" ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"}`}>{t.probability}%</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{t.narrative}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-start gap-3">
          <Shield size={16} className="text-gray-600 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed"><strong className="text-gray-500">Disclaimer:</strong> For informational and educational purposes only. Not financial advice. Market data sourced via web search on {market.date} and may be delayed. AI-generated scenarios should not be relied upon for investment decisions. Consult a qualified financial advisor.</p>
        </div>
      </div>
    </div>
  );
}
