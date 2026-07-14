// Status values: broken | halted | disputed | pending | holding
export const MOU_TRACKER = {
  title: "Islamabad Memorandum Tracker",
  signed: "2026-06-17",
  windowDays: 60,
  expires: "2026-08-16",
  deminingDeadline: "2026-07-17",
  statusLine:
    "Signed June 17 by the US and Iranian presidents: a 14-point MOU ending the war and opening a 60-day window to negotiate final terms. As of July 12 it is broken in practice but not formally terminated — Trump declared it 'over' on July 8 while confirming talks continue. Clause-by-clause state below.",
  clauses: [
    {
      clause: "¶1 — Permanent termination of military operations on all fronts",
      status: "broken",
      detail:
        "US strikes on 80+ targets Jul 7 and ~90 targets Jul 11 (retaliation for Iranian attacks on commercial ships); Iranian missiles and drones claimed against US bases in Bahrain and Kuwait. Trump: ceasefire 'over' (Jul 8).",
    },
    {
      clause: "US naval blockade of Iranian ports lifted",
      status: "broken",
      detail:
        "Reversed in effect: the US is again blocking Iranian oil sales as of Jul 7. The blockade's formal status is unclear; its practical effect is back.",
    },
    {
      clause: "US oil sanctions suspended for 60 days",
      status: "broken",
      detail:
        "Waiver allowing Iranian oil sales revoked Jul 7 in retaliation for the tanker attacks — the first formal clause reversal by either side.",
    },
    {
      clause: "Iran: free safe passage for commercial vessels (60 days)",
      status: "halted",
      detail:
        "Worked June through early July (Gulf exports +6.5 mb/d in June). Since Jul 7: zero traceable large-vessel transits on the coordinated lane, and Iran now asserts a right to charge transit fees — the opposite of the free-passage commitment.",
    },
    {
      clause: "Iran: demining of the strait within 30 days",
      status: "pending",
      detail:
        "Deadline ≈ July 17 — five days out at this update, never independently verified, and moot while shooting continues. Formal non-completion would give Washington a clean legal exit from the MOU.",
    },
    {
      clause: "60-day negotiation track (nuclear program, administration of the strait, sanctions, frozen assets, $300B reconstruction)",
      status: "disputed",
      detail:
        "Geneva session postponed Jun 19; talks paused for the Khamenei funeral (Jul 4–9); Trump says talks continue despite declaring the ceasefire over. The unresolved 'administration of the Strait' clause — transit fees vs international waterway — is the crack the deal is breaking on. Window runs to ≈ Aug 16.",
    },
    {
      clause: "Lebanon front: end of Israel-Hezbollah hostilities",
      status: "holding",
      detail:
        "Held since the separate June 19 US/Qatar/Iran-mediated ceasefire — fragile (Israeli buffer zone, sporadic clashes) but no kinetic resumption reported as of Jul 12. Israel is not an MOU signatory, so this front does not mechanically fall with the memorandum.",
    },
  ],
};
