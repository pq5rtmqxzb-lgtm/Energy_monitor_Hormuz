export const DOUBLE_CHOKEPOINT_STATUS = {
  title: "Double Chokepoint: Largely Stood Down",
  pill: "STOOD DOWN",
  thesis:
    "The framework anticipated simultaneous Hormuz + Bab el-Mandeb pressure. As of July 12 it is largely stood down: the Lebanon front has held a US/Qatar/Iran-mediated ceasefire since June 19 (fragile — Israeli buffer zone, sporadic clashes), and no large-scale Houthi kinetic escalation materialized through the crisis. The single chokepoint, however, is back: Hormuz transit has been halted again since July 7. The double-chokepoint configuration survives only as the tail-up trigger — a Lebanon collapse or Bab el-Mandeb kinetic closure stacking onto the re-halted strait.",
  probability:
    "Probability of the double configuration re-arming: low but non-zero — Israel is not a party to the Islamabad Memorandum, so the MOU breakdown does not mechanically void the Lebanon ceasefire, and no kinetic resumption is reported on that front as of July 12. Bab el-Mandeb data not refreshed since June.",
  evidence: [
    { tag: "CONFIRMED", text: "Israel-Hezbollah ceasefire June 19, mediated by the US, Qatar and Iran, after Hezbollah rejected the June 3 Israel-Lebanon deal" },
    { tag: "CONFIRMED", text: "Ceasefire is fragile by design: Israeli forces hold a southern buffer zone, reserve the right to strike, and sporadic clashes have continued" },
    { tag: "CONFIRMED", text: "MOU ¶1 declared 'permanent termination of military operations on all fronts' including Lebanon — but Israel is not a signatory, so the front has its own separate arrangement" },
    { tag: "CONFIRMED", text: "Hormuz re-halted: zero traceable large-vessel transits on the coordinated Oman-hugging lane since July 7" },
    { tag: "PARTIAL",   text: "Whether the US-Iran breakdown bleeds into the Lebanon front — no kinetic resumption reported there as of July 12, but the mediator set (Iran) is now at war with the guarantor (US)" },
    { tag: "NOT REFRESHED", text: "Bab el-Mandeb traffic counts and Houthi posture since mid-June — flagged for follow-up rather than asserted" },
  ],
  impact:
    "Current state: single-chokepoint risk is live again (Hormuz halted since Jul 7); the second chokepoint is quiet. The double configuration is the bridge from Bull to Tail-up — watch Lebanon ceasefire violations and any Houthi re-mobilization as the early indicators.",
};

// tone values: active | partial | validated | failed | retired
export const ACTIVE_FRAMEWORKS = [
  {
    name: "Phantom ceasefire pattern — FAILED",
    state:
      "Retired, graded a miss. Four iterations (Apr 17, Apr 21, May 4–7, May 13) were phantom; the fifth — Trump calling off the strike wave on May 18 — was real and marked the cycle top at $112. The pattern's own logic ('each retracement shallower') gave no way to identify the real one, which is the definition of a framework that fits until it matters. Kept on the board as a methodological warning: patterns extracted from four points don't survive regime changes.",
    tone: "failed",
  },
  {
    name: "Category error — VALIDATED, now inverted",
    state:
      "Ceasefire and closure were separable, as framed — the MOU delivered both at once (Jun 17), then broke apart into the opposite split: as of July 12 the strait is halted (closure) while talks continue (no formal war). The inversion is the live question: February's closure bought a $58 premium, July's re-halt has bought ~$4. Either demand destruction and the 2027 glut genuinely cap the premium, or the market is committing the April error in mirror image — fading a real supply event because the last regime punished headline-chasing.",
    tone: "validated",
  },
  {
    name: "Glut shadow (new)",
    state:
      "Replaces the deficit anchor. IEA June OMR: 2026 demand −1.1 mb/d YoY (first decline since 2020) after Q2 deliveries fell ~5 mb/d; surplus toward year-end; 2027 first look shows supply +~8 mb/d vs demand +2 — 'a significant overhang emerging next year.' Every escalation rally now sells into a structurally softer forward curve. This is why Bull targets $90–110, not $115–140. Caveat the IEA itself flags: buffers eroded at record pace, stocks near historic lows — a low-stock market can still squeeze violently before the flip.",
    tone: "active",
  },
  {
    name: "Transit-fee deadlock (new)",
    state:
      "The successor to the circular deadlock, one level up. Iran: sovereign right to charge fees and retain authority over passage. US: international waterway, no Iranian control (CENTCOM 'fact check', Jul 9). The MOU papered over this by deferring 'administration of the Strait' to the 60-day track — the ambiguity the deal is now breaking on. Binary and prestige-loaded on both sides; no enforcement mechanism. Resolution formulas to watch: escrowed fees, flag-state carve-outs, third-party administration.",
    tone: "active",
  },
  {
    name: "Succession opacity (new)",
    state:
      "Khamenei (assassinated Feb 28) was buried July 9; successor Mojtaba Khamenei has never appeared publicly since his March 8 appointment and reportedly carries severe injuries. Who arbitrates between deal-faction and escalation-faction in Tehran is unknowable from outside. Widens both tails simultaneously: IRGC autonomy (tail-up) and consolidation failure ending the war on speed (tail-down). A public appearance by Mojtaba is itself a tradeable signal.",
    tone: "partial",
  },
  {
    name: "Three-layer discount stack — RETIRED",
    state:
      "The stack (Dated-vs-futures gap, strip backwardation, implied resolution probability) described a closure-era market. Backwardation is fading as the surplus approaches — the Bear path ends in contango — and no fresh Dated-vs-front print is in the intel pull. Retired until re-sourced; do not carry May's $110 Dated quote forward.",
    tone: "retired",
  },
  {
    name: "Operating leverage",
    state:
      "Still the core equity-transmission mechanism, now working in reverse. Basket breakeven ~$40, beta ~1.51x (survived the round trip — IOGP €27.65 with Brent $76 is directionally consistent). Margin ~$36/bbl at spot vs ~$66 in May. H2 hedge roll-off is live as of this month and is a two-sided amplifier, not a free option: producers roll off $70–85 hedges into a $76 spot and a 2027-surplus strip.",
    tone: "active",
  },
];
