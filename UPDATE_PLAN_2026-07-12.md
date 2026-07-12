# Update Plan — 2026-07-12

The dashboard's narrative content is frozen at **Sunday, May 17** ("Sunday morning update", timeline ends 2026-05-17), while the auto-refreshed market data runs through **July 10**. The two now flatly contradict each other: the site argues for Brent $100–140 with a "structural floor" at $80–95, while its own `market.json` shows Brent at **$76** and IOGP at **€27.65**. This plan covers what happened, what it means for the site's frameworks, and the file-by-file work to bring the dashboard back to relevance.

---

## 1. What happened since May 17 (event research, sourced)

| Date | Event |
|---|---|
| May 18 | Brent local peak **$112.10**. Trump calls off an imminent wave of strikes to allow negotiation time — start of a >10% slide (CNBC, May 29) |
| Late May | Oil drops ~20% from 2026 peak on ceasefire-talk optimism; US strikes in Iran (~May 27–28) cause only a brief wobble |
| June 14 | US and Iran reach tentative deal to extend ceasefire and reopen the strait (Axios) |
| **June 17** | **Islamabad Memorandum** signed: 14-point MOU. Permanent termination of military operations on all fronts (incl. Israel–Hezbollah); US lifts naval blockade and suspends oil sanctions for 60 days; Iran provides free safe passage for 60 days with demining within 30 days; 60-day negotiation window on the nuclear program, Hormuz administration, sanctions, frozen assets, and a $300B reconstruction plan. Brent hits $78.24, lowest since March 3 |
| June 19 | Geneva talks abruptly postponed; Lebanon fighting erupts; Hormuz traffic recovery still slow (CNBC / Al Jazeera) |
| June 26 – Jul 2 | Brent trades **$71.57–$73.15 — below the ~$74 pre-war level**. Al Jazeera (Jul 2): "levels not seen since start of US-Israel war on Iran" |
| Late Jun / early Jul | Tit-for-tat US–Iran strikes (~Jun 28–29). **Ayatollah Khamenei dies**; talks pause for the funeral (exact date to confirm during implementation) |
| Early July | Iranian attacks on commercial ships near the strait |
| July 7 | US hits **80+ targets** in Iran; revokes the oil-sales waiver and reimposes sanctions (Bloomberg, CNN) |
| July 8 | Trump declares the ceasefire **"over"** at the NATO summit; Brent surges >3% to $78.02, "reversing return to pre-war prices" (Al Jazeera) |
| July 9 | CENTCOM "fact check": Hormuz is an international waterway; Iran insists on charging transit fees — the core MOU interpretation dispute |
| July 10 | Traceable crossings via the Oman-hugging coordinated lane "effectively grind to a halt" — no large broadcasting vessel since Tuesday (Al Jazeera). Brent settles $76.00 |
| July 11 | US strikes ~90 targets after a ship attack; Iran claims missile/drone launches at US targets in **Bahrain and Kuwait**; Trump says ceasefire over but talks continue (CNN, NBC) |

**Current regime in one line:** the strait reopened, prices round-tripped to pre-war, and the MOU is now breaking down into re-escalation — yet Brent sits at $76–78, meaning the market no longer prices the old deficit arithmetic.

---

## 2. Scorecard on the May thesis (prerequisite for credibility)

Before adding new calls, the site should own the old ones:

- **What resolved:** the Bear case (10%) → and then beyond it. The "genuine breakthrough" happened (Islamabad Memorandum ≈ the Bear narrative almost verbatim: phased reopening + sanctions framework).
- **What broke:** the "IEA arithmetic floors the price at $80–95" claim. Brent traded to $71.57. The floor argument assumed the shut-in supply could not restart fast; the June reopening window plus demand destruction repriced the whole curve.
- **What failed:** the **phantom-ceasefire pattern** ("each retracement shallower") — the fifth iteration (May 18 talk window) was the real one. Pattern-extrapolation risk realized.
- **What validated:** the **category error** framework (ceasefire ≠ closure are separable) — and it is validating *again in mirror image right now*: the strait is shut again (Jul 10) while Brent sits at $76, i.e. the market currently prices closure risk at almost nothing. If the site believes its own framework, that divergence is the new story.
- **Position marker:** IOGP €27.65 is inside the old Bear band (€26–30).

---

## 3. File-by-file work plan

### Phase 1 — content refresh (no code changes, highest priority)

1. **`src/data/timeline.js`** — append ~12 entries per the table above (May 18 → July 11), using existing `tone`/`category` tags. Suggested tones: June 17 MOU `bullish→` *for resolution* — note the site's tone convention is oil-position-relative (`bearish` = bad for position? check `Timeline.jsx` usage; current entries mark price spikes "bearish" inconsistently — fix or document the convention while in there).
2. **`src/data/geo.js`** — full rewrite. New `summary` dated July 12 covering: MOU breakdown, sanctions reimposition, Khamenei succession uncertainty, Bahrain/Kuwait strikes (escalation against US bases = live tail-up), shipping halt, and the transit-fee dispute as the new "circular deadlock". Replace all 9 `events`; every current one is from mid-May. `sentiment`: reassess — re-escalation is oil-bullish but the tape is skeptical; "neutral"/mixed is defensible.
3. **Stale hardcoded notes in `public/data/market.json`** — the fetch script preserves `note` fields forever (`note: current[key]?.note`). Brent note still cites "Dated ~$110 via Fortune May 13"; WTI note cites the May 12 close. Update both strings once by hand (or null them and render notes from source-controlled data instead — small `marketData.js` change).
4. **`README.md` Methodology** — replace May-OMR anchors; add a line that the scenario set was re-baselined in July and why.

### Phase 2 — analytical re-baseline (needs fresh data pull first)

5. **`src/data/scenarios.js`** — the Bull/Base/Bear frame is built on a regime that ended June 17. Full rewrite anchored at spot ≈ $76:
   - **Bull (oil up):** re-closure sustains — MOU collapses fully, strait stays shut, premium rebuilds. Target zone to derive from fresh data, plausibly $95–115 rather than $115–140 (market has shown restart speed).
   - **Base:** armed standoff — intermittent transit, strikes contained, 60-day window limps on. Brent chop $70–90.
   - **Bear (oil down):** MOU salvaged / Iranian flexibility post-Khamenei; normalization toward $60–75.
   - **Tails:** up = regional widening (US bases in Bahrain/Kuwait already struck — this is no longer hypothetical), down = accelerated Iranian capitulation under a succession-weakened leadership.
   - Rebuild every `supply_impacts` block from the **June/July IEA OMR** (the May OMR numbers — 12.8 mb/d cumulative losses, >14 mb/d shut-in — are pre-reopening and must not survive the rewrite). Re-estimate probabilities; donut must still sum to 100 with tails.
6. **`src/data/iogp.js`** — re-anchor: margin math at $76 Brent (≈$36/bbl vs the quoted $66 at $106); the H2-2026 hedge roll-off is **now current** (it's July) — promote it from "hasn't matured yet" to live thesis; re-derive scenario ranges from the new scenarios; optionally re-measure the 1.51× beta against the realized Feb→Jul round-trip (the site now owns a full cycle of data to test it).
7. **`src/data/frameworks.js`** — honesty pass, per the scorecard in §2: retire *phantom ceasefire* (mark `failed` — may need a new tone/style in `Frameworks.jsx`); mark *category error* validated-and-inverted (closure without premium is today's mispricing candidate); replace *circular deadlock* with the transit-fee/MOU-interpretation deadlock; retire or re-source the *three-layer discount stack* (no fresh Dated-vs-front data); update *double chokepoint* (Lebanon fighting erupted June 19 → then covered by MOU ¶1 → status after breakdown unknown; refresh CONFIRMED/PARTIAL/NOT-REFRESHED tags); update *operating leverage* hedging text.

### Phase 3 — optional new features (only after 1–2)

8. **MOU tracker component** — the natural new centerpiece: 60-day clock (expires ~Aug 16), per-clause status board (naval blockade: lifted→reimposed Jul 7 · sanctions waiver: revoked Jul 7 · demining: 30-day deadline ≈ Jul 17, days away · free transit: halted Jul 10 · talks: "continuing" per Trump Jul 11).
9. **Scorecard/retrospective panel** — render §2 permanently. A dashboard that publishes falsifiable calls and then grades them is worth more than one that silently rewrites its priors.
10. Verify `npm run build` and the probability donut/URL-state (`#scenario=`) still behave after the data rewrite.

---

## 4. Data to fetch before writing Phase-2 numbers

- IEA **June and July OMR** headline balances (how much shut-in production restarted during the June window; current deficit/surplus).
- Current Dated Brent vs front-month spread (is any physical premium left?).
- OPEC+ July meeting outcome (are they absorbing returning barrels?).
- IOGP constituent H2-2026 hedge coverage; IOGP NAV/price history May→July for the beta re-measure.
- Exact date of Khamenei's death and funeral; status of Lebanon front since the MOU breakdown.

## Sources

- Al Jazeera: [prices slide on reopening hopes (Jun 17)](https://www.aljazeera.com/economy/2026/6/17/oil-prices-continue-slide-amid-hopes-for-peace-opening-of-strait-of-hormuz) · [Lebanon flare, slow traffic (Jun 19)](https://www.aljazeera.com/economy/2026/6/19/oil-prices-rise-as-lebanon-fighting-erupts-and-hormuz-traffic-still-slow) · [strikes threaten reopening (Jun 29)](https://www.aljazeera.com/economy/2026/6/29/oil-prices-rise-as-us-iranian-strikes-threaten-strait-of-hormuz-reopening) · [below pre-war prices (Jul 2)](https://www.aljazeera.com/economy/2026/7/2/oil-prices-fall-to-levels-not-seen-since-start-of-us-israel-war-on-iran) · [oil surges on US strikes (Jul 8)](https://www.aljazeera.com/news/2026/7/8/oil-prices-surge-as-us-strikes-iran-reversing-fall-to-pre-war-levels) · [shipping grinds to halt (Jul 10)](https://www.aljazeera.com/economy/2026/7/10/strait-of-hormuz-shipping-grinds-to-halt-as-us-iran-resume-fighting) · [14-point memorandum text account](https://www.aljazeera.com/news/2026/6/17/read-the-us-account-of-unreleased-14-point-iran-ceasefire-memorandum)
- CNBC: [oil −20% from peak (May 29)](https://www.cnbc.com/2026/05/29/oil-prices-iran-ceasefire-us-trump-strait-hormuz-energy-costs.html) · [US strikes revive fears (May 28)](https://www.cnbc.com/2026/05/28/oil-prices-us-strikes-in-iran-revive-strait-of-hormuz-turmoil-fears.html) · [Geneva talks postponed (Jun 19)](https://www.cnbc.com/2026/06/19/oil-prices-wti-brent-crude-us-iran-deal-strait-hormuz-shipping-recovery.html)
- Axios: [deal to extend ceasefire, open strait (Jun 14)](https://www.axios.com/2026/06/14/us-iran-ceasefire-extended-hormuz-reopen-trump)
- Bloomberg: [US strikes Iran, blocks oil sales (Jul 7)](https://www.bloomberg.com/news/articles/2026-07-07/us-revokes-waiver-allowing-iran-oil-sales-after-tanker-attacks)
- CNN live: [Jul 7 — 80+ targets, sanctions reimposed](https://www.cnn.com/2026/07/07/world/live-news/nato-summit-trump) · [Jul 8 — ceasefire "over" at NATO summit](https://www.cnn.com/2026/07/08/world/live-news/iran-war-nato-summit-ukraine-trump) · [Jul 11 — US strikes after ship attack](https://www.cnn.com/2026/07/11/world/live-news/iran-war-trump?post-id=cmrgp1ose000c356vvu96wlnl)
- NBC: [strikes after Trump says ceasefire over](https://www.nbcnews.com/world/iran/live-blog/live-updates-iran-attacks-gulf-us-strikes-tehran-ships-hormuz-oil-rcna353439) · [tentative deal to end war](https://www.nbcnews.com/world/iran/live-blog/live-updates-trump-iran-deal-end-war-reopen-hormuz-markets-israel-rcna350076)
- RFE/RL: [US insists Iran "does not control" Hormuz (Jul 9)](https://www.rferl.org/a/iran-war-us-hormuz-oil-blockade-gulf-israel/33640284.html)
- House of Commons Library: [US-Iran ceasefire and nuclear talks briefing](https://commonslibrary.parliament.uk/research-briefings/cbp-10637/)
- ABC News: [how the ceasefire and MOU broke down — timeline](https://abcnews.com/Politics/us-iran-ceasefire-mou-broke-timeline/story?id=134622392)
- Wikipedia (background): [2026 Strait of Hormuz crisis](https://en.wikipedia.org/wiki/2026_Strait_of_Hormuz_crisis) · [2026 Iran war ceasefire / Islamabad Memorandum](https://en.wikipedia.org/wiki/Islamabad_Memorandum)
