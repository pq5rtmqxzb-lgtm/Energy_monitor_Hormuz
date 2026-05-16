export const DOUBLE_CHOKEPOINT_STATUS = {
  title: "Double Chokepoint: PARTIAL Validation",
  thesis:
    "Six weeks in, the framework is partially confirmed — but in a different shape than the late-March 'kinetic closure' framing implied. Bab el-Mandeb traffic is sharply reduced and rerouting is happening (Hapag-Lloyd discloses $50–60M/week in extra costs; major carriers continue to pause Trans-Suez sailings); insurance premiums remain elevated. But the kinetic Houthi escalation hasn't materialized at scale. The threat alone is doing the work.",
  probability:
    "Probability of full Bab el-Mandeb kinetic closure: held pending refreshed Houthi-kinetics data (not in today's intel). Threat-effect on shipping and insurance: confirmed. Posture: directional / partial validation, not full validation.",
  evidence: [
    { tag: "CONFIRMED", text: "Shipping rerouting persists — Hapag-Lloyd disclosed $50–60M/week extra costs from Hormuz blockage" },
    { tag: "CONFIRMED", text: "Insurance premiums for Red Sea / Bab el-Mandeb transit remain elevated" },
    { tag: "CONFIRMED", text: "Major carriers (Maersk, Hapag-Lloyd, CMA CGM) continue Trans-Suez pauses or reduced frequency" },
    { tag: "PARTIAL",   text: "Houthi public threats around Bab el-Mandeb remain in posture — but no large-scale kinetic strikes on shipping in recent weeks" },
    { tag: "NOT REFRESHED", text: "Specific Bab el-Mandeb traffic counts and recent Houthi kinetic activity weren't in today's intel pull — flagged for follow-up rather than asserted" },
    { tag: "CONFIRMED", text: "Saudi Yanbu exports remain within Houthi strike range — risk envelope unchanged" },
  ],
  impact:
    "Current state: the threat is doing the work without a kinetic closure event. Shipping costs, insurance, and rerouting friction are real but contained. A full kinetic closure remains the Tail-up trigger; the partial validation supports the Base case duration thesis (premium persistence) rather than the late-March Bull-case catastrophe arithmetic.",
};

export const ACTIVE_FRAMEWORKS = [
  {
    name: "Phantom ceasefire pattern",
    state:
      "Confirmed iterations: Apr 17, Apr 21, May 4–7, May 13 partial pullback. Markets strip both escalation AND closure premia on ceasefire announcements when only the escalation premium is warranted. Each retracement shallower as structural fundamentals reassert.",
    tone: "active",
  },
  {
    name: "Category error",
    state:
      "Hormuz closure is separable from ceasefire / escalation. Trading the difference is the edge. May 13 pullback on Trump-Xi mediation hopes is the latest instance — front-month gave back ~$2 but the IEA-quantified structural deficit is unchanged.",
    tone: "active",
  },
  {
    name: "Circular deadlock",
    state:
      "US wants Hormuz reopened as ceasefire precondition; Iran wants ceasefire first; no enforcement mechanism. Stable equilibrium — supports Base case duration thesis. Trump's 'massive life support' framing on the April 8 ceasefire fits the pattern.",
    tone: "active",
  },
  {
    name: "Three-layer discount stack",
    state:
      "Equities embed (1) futures-vs-physical gap (Dated vs front-month — Fortune $110.87 vs ICE ~$106 on May 13 unverified but directionally consistent), (2) strip backwardation, (3) implied resolution probability. Thesis hinges on duration of elevated prices, not peak.",
    tone: "active",
  },
  {
    name: "Double chokepoint — PARTIAL",
    state:
      "Bab el-Mandeb traffic reduced and rerouting confirmed (Hapag-Lloyd $50–60M/wk); insurance elevated. But kinetic Houthi escalation hasn't materialized at scale. The threat alone is doing the work. Don't claim full validation. See dedicated block above.",
    tone: "partial",
  },
  {
    name: "Operating leverage",
    state:
      "IOGP basket breakeven ~$40, beta ~1.51x to Brent (working figure; supersedes earlier 1.2x rough estimate), ~95% North American + Australian, hedging dampener rolls off H2 2026.",
    tone: "active",
  },
];
