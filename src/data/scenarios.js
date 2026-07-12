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

// Re-baselined 2026-07-12 for the post-Islamabad-Memorandum regime.
// Anchors: Brent $76 / WTI $71.51 spot (Jul 10 settle); IEA July OMR (June supply
// 98.8 mb/d, Gulf exports 16.1 vs ~24 mb/d pre-war); IEA June OMR demand destruction
// (2026 demand −1.1 mb/d YoY, year-end surplus, 2027 overhang). The May scenario set
// (closure-era, deficit-anchored) is graded in the Scorecard section.
export const SCENARIOS = {
  bull: {
    narrative:
      "Re-closure sustains. The MOU is dead in practice — strikes continue past the funeral window, the transit-fee dispute proves unbridgeable, and traceable Hormuz crossings stay at zero for weeks. The June reopening (+6.5 mb/d of Gulf exports) reverses and the market has to re-price a supply loss it just finished un-pricing. Crucially, Bull is now a premium-rebuild thesis, not a deficit-arithmetic thesis: demand is structurally ~5 mb/d smaller than in February, buyers have proven mitigation works, and the 2027 overhang caps the far curve. That is why the target is $90–110, not the $115–140 of the May regime.",
    outlook: "bullish",
    probability: 25,
    supply_baseline:
      "Global production: 98.8M bbl/day (June, IEA July OMR — +4.1 mb/d MoM, still 9.4 mb/d below pre-war) | Gulf exports incl. bypass: 16.1 mb/d vs ~24 pre-war | 2026 demand: −1.1 mb/d YoY (first decline since 2020)",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions (re-closure path)" },
      { event: "June reopening reverses", impact: "-6.0 to -8.0M bbl/day", detail: "Zero traceable crossings since Jul 7. The +6.5 mb/d of Gulf export recovery re-lost if the halt sustains, plus attrition of the bypass-security umbrella that let stuck tankers exit in June." },
      { event: "Iranian exports re-sanctioned", impact: "-1.0M bbl/day", detail: "Waiver revoked Jul 7. The MOU-era assumption of resuming Iranian barrels comes back out of every H2 balance." },
      { event: "Escalation overlay", impact: "-1.0 to -2.0M bbl/day", detail: "Strikes on export or bypass infrastructure (East-West pipeline, Fujairah, loading terminals) — the specific Bull kicker. Bahrain/Kuwait strikes show targeting is already widening beyond Iran proper." },
      { section: "gross", label: "Gross Supply Disruption (vs June run-rate)", impact: "-8 to -11M bbl/day", detail: "Reopening reversal plus sanctions plus escalation overlay." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "Saudi East-West + UAE Fujairah bypass", impact: "+5.0 to +6.0M bbl/day", detail: "Proven at scale through the February–June closure. Saudi exports near pre-war; UAE (now outside OPEC) restoring flows fast. The binding constraint is field capacity, not pipes." },
      { event: "Demand destruction (realized)", impact: "+~3.0M bbl/day (effective)", detail: "Q2 deliveries fell ~5 mb/d — elasticity proved far larger than the −0.05 short-run figure the May framework used. A smaller demand base absorbs a re-closure far more cheaply." },
      { event: "OPEC+ spare / quota normalization", impact: "+~1.0M bbl/day", detail: "Two consecutive quota hikes (Jul, Aug) with compensation extended to end-2026. Non-Gulf members produce into any premium." },
      { event: "Residual SPR headroom", impact: "+~0.5M bbl/day", detail: "Buffers eroded 'at a record pace' (IEA) — the 400M-barrel release is largely spent. Thin, but politically certain to be used." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+~9 to 10M bbl/day", detail: "The mitigation stack that ended February's panic is still standing. That is the structural difference between this Bull and the last one." },
      { section: "net", label: "Net Balance (Bull)", impact: "-1 to -3M bbl/day", detail: "A real deficit, but a fraction of February's. Stocks — already near historic lows per the IEA — resume draining, which is what pays the premium." },
    ],
    net_supply_impact:
      "Bull: sustained re-closure recreates a 1–3 mb/d deficit against depleted inventories. The premium rebuilds from $76, but into a demand base ~5 mb/d smaller and a 2027 curve in surplus — elevation, not repetition of Q1.",
    price_reasoning:
      "February's closure moved Brent ~$58; July's re-halt has moved it ~$4 so far. If zero-transit persists for weeks against historic-low stocks, that gap closes from below — but the ceiling is structurally lower than in Q1: realized demand elasticity, a proven bypass stack, OPEC+ normalization, and the IEA's 2027 overhang all sell into rallies. $90–110 prices a durable re-closure premium without the February panic arithmetic.",
    price_target: "Brent: $90–110 | WTI: $85–105",
    etf_impacts: {
      IOGP: { direction: "up", reasoning: "From €27.65, a move to $90–110 Brent takes basket margin from ~$36/bbl back to $50–70 over the ~$40 breakeven; ~1.51x beta and the now-live H2 hedge roll-off compound it. Directional range €31–36. Note the ceiling: the 2027 strip in surplus caps what the market will pay for 2027 earnings." },
      XLE: { direction: "up", reasoning: "From $55.08, integrateds re-capture upstream price plus refining margins that stayed firm through the demand-destruction phase (product shortages did much of the demand damage). Buyback capacity intact after the H1 cash harvest." },
      VDE: { direction: "up", reasoning: "From $155.50, the broad basket follows crude up, but with less multiple expansion than Q1 — the 2027 overhang is a known number now." },
      OIH: { direction: "flat", reasoning: "From $380.24, services are the odd one out: a re-closure premium doesn't fund capex when operators can see the IEA's 2027 surplus. Held up best through the June collapse (+1.5% Jul 10); limited further torque either way." },
      USO: { direction: "up", reasoning: "From $108.70, direct WTI exposure captures the premium rebuild; renewed backwardation on prompt tightness would restore positive roll." },
      BNO: { direction: "up", reasoning: "From $42.15, highest direct torque to a Brent premium rebuild in the basket." },
    },
    triggers: [
      "Zero traceable Hormuz transits persisting beyond mid-July (currently: none since Jul 7)",
      "Strikes on export/bypass infrastructure — East-West pipeline, Fujairah, Gulf loading terminals",
      "Formal termination of the MOU (vs Trump's 'over' rhetoric while talks continue)",
      "Iran closing the Larak channel to Chinese/allied-flag vessels too — end of selective passage",
      "Escalation of the Bahrain/Kuwait strikes into sustained GCC-wide targeting (tail-up handoff)",
    ],
    timeframe: "1–3 months (premium rebuild phase)",
  },
  base: {
    narrative:
      "Armed standoff. The shooting and the talking continue in parallel — exactly the July 11 configuration ('ceasefire over, talks continue'). Transit resumes in fits: convoys, selective corridors, insurance-priced passages, without either full closure or credible normalization. The 60-day window (to ~Aug 16) gets extended or fudged rather than resolved, because the transit-fee/sovereignty question underneath it is binary and neither side can concede it yet. Brent chops in a $70–90 band: escalation headlines buy a few dollars, the IEA's surplus arithmetic sells them back. The May regime's category error inverts — the discipline now is not confusing kinetic noise with a supply regime change in either direction.",
    outlook: "neutral",
    probability: 45,
    supply_baseline:
      "Global production: 98.8M bbl/day (June, IEA July OMR) | Gulf exports: 16.1 mb/d vs ~24 pre-war | 2026 demand: −1.1 mb/d YoY | Stocks near historic lows, surplus forecast toward year-end",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions (standoff path)" },
      { event: "Intermittent Hormuz transit", impact: "-3.0 to -5.0M bbl/day", detail: "Against the June run-rate: episodic convoy passages and selective corridors rather than the halt sustaining at zero or recovering to 16+ mb/d. Insurance and crewing costs keep a friction floor under every barrel." },
      { event: "Iranian exports re-sanctioned", impact: "-1.0M bbl/day", detail: "Waiver stays revoked while the standoff lasts; reinstatement is a Bear-case trigger, not a Base-case feature." },
      { section: "gross", label: "Gross Supply Disruption (vs June run-rate)", impact: "-4 to -6M bbl/day", detail: "Meaningful, but roughly half of what the Bull path implies." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "Bypass pipelines at capacity", impact: "+5.0 to +6.0M bbl/day", detail: "East-West + Fujairah running flat out is simply the operating state now, not a contingency." },
      { event: "Demand destruction (persisting)", impact: "+~3.0M bbl/day (effective)", detail: "Q2's −5 mb/d delivery plunge doesn't fully rebound while prices chop and product supply stays tight." },
      { event: "OPEC+ normalization", impact: "+~1.0M bbl/day", detail: "Monthly ~190 kb/d increments compound; Saudi/UAE flows near pre-war." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+~9M bbl/day", detail: "The stack covers most of the standoff-sized hole." },
      { section: "net", label: "Net Balance (Base)", impact: "-0 to -1M bbl/day", detail: "Roughly balanced to slightly short. Stocks stabilize near lows rather than draining hard or rebuilding — which is what keeps the band $70–90 instead of trending." },
    ],
    net_supply_impact:
      "Base: near-balance. The market is one headline from either edge of the band, but the physical pull is weak in both directions — deficit too small to squeeze, surplus not yet arrived.",
    price_reasoning:
      "Spot $76 sits almost exactly at the middle of the regime's information: a halted strait (bullish) against a shrunken demand base and an approaching surplus (bearish). Chop is the base case precisely because both anchors are real. Watch the stock data: IEA warns global inventories could touch historic lows before the year-end flip — a low-stock market chops violently, so $70–90 is a band, not a promise of calm.",
    price_target: "Brent: $70–90 range | WTI: $66–85 range",
    etf_impacts: {
      IOGP: { direction: "flat", reasoning: "At $70–90 Brent, basket margin is $30–50 over breakeven — solid but no longer expanding. From €27.65, range €26–31. The live H2 hedge roll-off is the differentiated angle: producers re-hedging into a 2027-surplus strip locks in less than bulls hope." },
      XLE: { direction: "flat", reasoning: "Integrateds' refining exposure is the relative winner while product markets stay tighter than crude. Range-bound with a dividend/buyback floor." },
      VDE: { direction: "flat", reasoning: "Broad basket ranges with crude; higher-breakeven mid-caps underperform within it." },
      OIH: { direction: "down", reasoning: "The standoff is the worst configuration for services: no price signal strong enough to fund capex, and the 2027 overhang argues for discipline. Operators defer; OIH's war-regime gains are the vulnerable leg." },
      USO: { direction: "flat", reasoning: "Chop is unkind to a front-month roll vehicle; as the curve flattens toward the year-end surplus, roll yield decays from tailwind to neutral." },
      BNO: { direction: "flat", reasoning: "Same structure as USO on the Brent curve." },
    },
    triggers: [
      "Talks resuming post-funeral despite ongoing strikes (Trump Jul 11: ceasefire over, talks continue)",
      "First convoy/selective transit after the Jul 7 halt — confirms intermittent, not closed",
      "Demining 30-day deadline (~Jul 17) passing unmet without formal MOU termination",
      "60-day window (~Aug 16) extended, renegotiated, or quietly ignored",
      "IEA stock data: draws toward historic lows would tighten the band's floor",
    ],
    timeframe: "2–4 months (through the MOU window and its aftermath)",
  },
  bear: {
    narrative:
      "The deal survives its own breakdown. Post-funeral, a consolidating leadership in Tehran (or an IRGC deal-faction) trades the transit-fee claim for sanctions relief and the $300B reconstruction track; Geneva reconvenes; the waiver is reinstated. Transit re-normalizes toward the pre-war 24 mb/d run-rate through Q3 and the market's attention snaps to what the IEA has been printing since June: demand in its first annual decline since 2020, OPEC+ adding barrels monthly, and a 2027 balance with a 'significant overhang'. The war premium — all $4–8 of what's left — vanishes, and the glut gets pulled forward. Note what this Bear is NOT: it is not the May Bear. There is no 'IEA arithmetic floors the move at $80–95' — that floor broke at $71.57 on July 1 and the demand data explains why.",
    outlook: "bearish",
    probability: 20,
    supply_baseline:
      "Global production: 98.8M bbl/day (June, IEA July OMR) | Gulf exports: 16.1 mb/d recovering toward ~24 | 2027 first look: supply +~8 mb/d vs demand +2 mb/d — 'significant overhang'",
    supply_impacts: [
      { section: "disruptions", label: "Residual Disruptions (salvage path)" },
      { event: "Post-salvage friction", impact: "-2.0 to -3.0M bbl/day", detail: "Demining (the 30-day commitment was never verified), insurance normalization, convoy unwinding, crew confidence. June proved this unwinds in weeks, not months, once the security umbrella is credible." },
      { section: "gross", label: "Gross Residual Disruption", impact: "-2 to -3M bbl/day", detail: "Transitional, shrinking monthly." },
      { section: "mitigations", label: "Supply Recovery & Demand Response" },
      { event: "Hormuz transit re-normalization", impact: "+4.0 to +6.0M bbl/day", detail: "From the 16.1 mb/d June rate toward the ~24 mb/d pre-war run-rate through Q3–Q4. June's +6.5 mb/d in a single month is the proof of pace." },
      { event: "Iranian exports return", impact: "+1.0 to +1.5M bbl/day", detail: "Waiver reinstated under the salvaged framework; Iranian barrels price aggressively to regain share." },
      { event: "OPEC+ continues normalization", impact: "+~0.5M bbl/day", detail: "Monthly increments continue into a softening market — the group has shown no appetite to defend price at the expense of quota politics, and the UAE outside the tent produces at will." },
      { event: "Demand recovery (partial)", impact: "-1.0 to -2.0M bbl/day (offset)", detail: "Some of Q2's destroyed demand returns as prices fall — but the IEA pegs 2027 recovery at only +2 mb/d, so the rebound is the smaller force." },
      { section: "mitigations_total", label: "Net Supply Recovery", impact: "+5 to +7M bbl/day phased", detail: "Recovery overwhelms residual friction within a quarter." },
      { section: "net", label: "Net Market Balance (Bear)", impact: "Surplus by Q4 2026", detail: "The IEA's central path — surplus toward year-end, overhang in 2027 — arrives on schedule or early. Stocks rebuild from historic lows; the curve flips to contango." },
    ],
    net_supply_impact:
      "Bear: normalization pulls the IEA's year-end surplus forward. The question stops being 'how high is the premium' and becomes 'where does OPEC+ defend' — and this cycle has given no evidence of a defended floor.",
    price_reasoning:
      "The premium left to unwind is small ($4–8), so the Bear move is mostly the glut getting priced: 2027 supply +8 mb/d vs demand +2. July 1's $71.57 print — with the strait merely hesitant, not even fully normalized — shows where the market clears on de-escalation alone. Full normalization plus returning Iranian barrels plus OPEC+ increments probes the $60s. Contango arrives with the surplus, adding roll drag to any long-commodity expression.",
    price_target: "Brent: $60–72 | WTI: $56–68",
    etf_impacts: {
      IOGP: { direction: "down", reasoning: "At $60–72 Brent, basket margin compresses to $20–32 over breakeven; from €27.65, the range is €22–26. The H1 hedges that dampened the upside are expiring exactly when they'd finally help — the H2 roll-off cuts both ways, which the May analysis under-weighted." },
      XLE: { direction: "down", reasoning: "Integrateds fall less: refining and chemicals cushion, balance sheets came out of H1 flush. The defensive leg of the basket." },
      VDE: { direction: "down", reasoning: "Higher-breakeven mid-caps in the broad basket get hit hardest as the strip flattens into 2027." },
      OIH: { direction: "down", reasoning: "Most exposed: normalization plus a 2027 overhang means capex discipline everywhere at once. The 'non-Gulf pivot' thesis that carried OIH to $380 assumes spending that a $65 strip doesn't fund." },
      USO: { direction: "down", reasoning: "Falling flat price plus emerging contango — the worst configuration for a front-month roll vehicle." },
      BNO: { direction: "down", reasoning: "Direct Brent downside; same contango drag as USO once the surplus arrives." },
    },
    triggers: [
      "Geneva talks reconvening with a transit-fee compromise formula (escrow, flagged-fee carve-outs, UN administration)",
      "Oil-sales waiver reinstated / sanctions re-suspended",
      "First post-halt week of normal (pre-June-level) traceable transits",
      "Post-funeral consolidation signals from Tehran — Mojtaba appearing publicly would itself be one",
      "OPEC+ accelerating quota restoration into the recovery (confirms no defended floor)",
    ],
    timeframe: "2–4 months (salvage plus normalization)",
  },
};

export const TAIL_SCENARIOS = {
  intro:
    "Tail buckets sit outside Bull/Base/Bear. Probabilities sum with the three focal cases to 100% (Bull 25 + Base 45 + Bear 20 + Tail-up 6 + Tail-down 4).",
  up: {
    label: "Tail-up",
    probability: 6,
    direction: "up",
    narrative:
      "Regional war. The Bahrain/Kuwait strikes escalate into sustained targeting of GCC states and US basing; Gulf export and bypass infrastructure (East-West pipeline, Fujairah, loading terminals) is hit; the Lebanon ceasefire collapses; Bab el-Mandeb goes from threat to kinetic closure. Both chokepoints shut against historic-low inventories. Brent breaks $120 fast — but note even this tail is fed by a demand base ~5 mb/d smaller than February's, so 'fast' does not mean March's $132 is the ceiling or the floor.",
  },
  down: {
    label: "Tail-down",
    probability: 4,
    direction: "down",
    narrative:
      "Succession rupture. The post-Khamenei structure fails to consolidate — an invisible Supreme Leader proves unable to arbitrate, and a faction moves to end the war on speed: full reopening, fee claim dropped, sanctions deal accepted within weeks. The remaining premium vanishes into the IEA's year-end surplus and the 2027 overhang gets priced immediately. Brent below $60; contango; IOGP sharp down with no arithmetic floor — that argument died on July 1.",
  },
};
