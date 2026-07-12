// Grades the May 17 scenario set against realized June-July outcomes.
// verdict values: hit | partial | miss
export const SCORECARD = {
  asOf: "2026-07-12",
  intro:
    "The May 17 snapshot published falsifiable calls. This section grades them against what actually happened, because a dashboard that only rewrites its priors silently isn't worth reading. Net assessment: the probability mass was on the wrong case, the direction of the miss was systematic (underweighting resolution and demand elasticity), and the two structural frameworks split — one failed, one validated.",
  entries: [
    {
      call: "Base case, 50%: closure persists, Brent $100–115 sustained for 2–4 months",
      outcome:
        "Closure ended via the June 17 Islamabad Memorandum, five weeks after the call. Brent left the range on May 26 and never returned; it traded $71.57 by July 1.",
      verdict: "miss",
    },
    {
      call: "Bull case, 30%: escalation premium on top of the deficit anchor, $115–140",
      outcome:
        "Brent's post-call high was $112.10 on May 18 — the day the de-escalation began. The escalation that eventually came (July) arrived after the deficit anchor had dissolved, and bought a ~$4 premium.",
      verdict: "miss",
    },
    {
      call: "Bear case, 10%: genuine breakthrough — phased reopening plus sanctions framework",
      outcome:
        "This is nearly a clause-for-clause description of the Islamabad Memorandum (reopening, sanctions suspension, negotiation track). The 10% case happened. Direction right, probability badly underweighted.",
      verdict: "partial",
    },
    {
      call: "Bear floor: 'IEA arithmetic floors the move at $80–95; pre-crisis $75–85 is not reachable'",
      outcome:
        "Brent settled below $75 in eight sessions between June 24 and July 7, bottoming at $71.57 on July 1 — through the floor and below the pre-crisis level. The floor logic missed that demand would fall ~5 mb/d in Q2, balancing the market from the other side.",
      verdict: "miss",
    },
    {
      call: "Phantom-ceasefire pattern: 'each retracement shallower as structural fundamentals reassert'",
      outcome:
        "The fifth iteration (May 18) was real and marked the cycle top. The pattern offered no way to distinguish phantom from real, and it broke exactly when it was most load-bearing.",
      verdict: "miss",
    },
    {
      call: "Category error framework: ceasefire and closure are separable — trade the difference",
      outcome:
        "Validated twice: the MOU resolved both legs at once in June, and July has re-split them the other way (strait halted, talks continuing, premium ~$4). The framework survived the regime change; it is the basis of the current re-baseline.",
      verdict: "hit",
    },
    {
      call: "IOGP Bear band: €26–30 if Brent unwinds to $80–95",
      outcome:
        "IOGP printed €27.65 on July 9 — inside the band — even though Brent overshot the assumed range to $72–76. The equity leg (beta ~1.51x plus hedge dampening) was modeled better than the commodity leg.",
      verdict: "partial",
    },
    {
      call: "Tail-down, 3%: full reopening within weeks on an accelerated timeline",
      outcome:
        "Reopening came ~4 weeks after the May 18 pivot via negotiated MOU. Materially the tail-down path, assigned 3% combined with capitulation framing. Underweighted like the Bear.",
      verdict: "partial",
    },
    {
      call: "Duration thesis: 'severely undersupplied through end-3Q26 even on early-June resolution' anchors elevated prices into H2",
      outcome:
        "Resolution came mid-June; by July the IEA forecast a year-end surplus and a 2027 overhang. Demand destruction (−1.1 mb/d 2026, first decline since 2020) did the balancing the thesis assumed impossible. The single most consequential analytical miss of the cycle.",
      verdict: "miss",
    },
  ],
  lessons: [
    "Elasticity assumptions set the floor argument — the −0.05 short-run figure was off by an order of magnitude once product shortages amplified the price signal.",
    "A pattern fitted on four points (phantom ceasefires) is a description, not a framework; it failed at the first regime change.",
    "Probability mass should follow falsifiable structure (the category-error split), not narrative momentum — the two calls that survived were the two that were mechanically, not narratively, grounded.",
  ],
};
