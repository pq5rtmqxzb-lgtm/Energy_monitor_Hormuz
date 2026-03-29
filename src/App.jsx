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
    IOGP: { price: 32.20, currency: "EUR", change_pct: 1.87 },
    XLE: { price: 62.56, currency: "USD", change_pct: 1.69 },
    VDE: { price: 174.14, currency: "USD", change_pct: 1.57 },
    OIH: { price: 410.79, currency: "USD", change_pct: 1.00 },
    USO: { price: 124.20, currency: "USD", change_pct: 5.92 },
    BNO: { price: 50.55, currency: "USD", change_pct: 3.65 },
  },
  brent: { price: 112.57, change_pct: 4.22 },
  wti: { price: 99.64, change_pct: 5.46 },
  date: "2026-03-28 (Fri close)",
};

const PRELOADED_GEO = {
  summary: "Oil prices are at their highest since July 2022, with Brent at $112.57 and WTI briefly crossing $100. The Houthis have officially entered the war \u2014 firing ballistic missiles at Israel on March 28, opening a new front and dramatically raising the probability of a Bab el-Mandeb closure. Meanwhile, the physical Dubai crude price surged to $126/bbl, signaling that paper futures are underpricing the real supply crunch. Trump extended Iran\u2019s Strait deadline by 10 days to April 6.",
  events: [
    { title: "Houthis enter the war \u2014 fire missiles at Israel", impact: "bullish", detail: "Houthis launched ballistic missiles at Israeli military sites on March 28, their first attack of the Iran war. Houthi deputy info minister: \u2018Closing Bab al-Mandeb is among our options.\u2019" },
    { title: "Saudi East-West pipeline at full 7M bbl/day capacity", impact: "bearish", detail: "Bloomberg reports Saudi pipeline now running at full 7M bbl/day capacity. Yanbu exports reached 5M bbl/day crude + 700-900K bbl/day products. Key mitigation \u2014 but vulnerable if Bab el-Mandeb closes." },
    { title: "Dubai physical crude at $126 \u2014 paper vs physical divergence", impact: "bullish", detail: "Dubai physical crude at $126/bbl vs Brent futures at $112.57. JPMorgan warns this divergence cannot persist \u2014 futures must reprice higher." },
    { title: "Iran allows 20 Pakistani ships through Hormuz", impact: "bearish", detail: "Pakistan secured deal for 20 vessels (2/day) to transit Hormuz. Modest volume but signals Iran willingness to negotiate access bilaterally." },
    { title: "USS Tripoli + 3,500 Marines arrive in Middle East", impact: "bullish", detail: "Pentagon weighing deployment options including possible seizure of Iran Kharg Island \u2014 source of most Iranian oil exports." },
    { title: "Trump extends Hormuz deadline to April 6", impact: "neutral", detail: "Extended strike deadline by 10 days. Claims talks going well; Iran denies negotiations. 15-point plan reportedly on the table." },
  ],
  sentiment: "bullish",
};

const PRELOADED_SCENARIOS = {
  bull: {
    narrative: "The double chokepoint scenario materializes: Houthis execute their declared Hour Zero and close the Bab el-Mandeb Strait, cutting off Saudi Arabia last viable export route via the Red Sea port of Yanbu. With both Hormuz and Bab el-Mandeb closed, roughly 24-25M bbl/day of oil flows are disrupted. With short-run demand elasticity of ~-0.05 (Hamilton 2009), a 15% supply deficit implies prices must rise ~300% from the pre-crisis $85 base \u2014 pointing to Brent $250-340+. Macquarie $200/bbl estimate may prove conservative.",
    outlook: "strongly_bullish",
    probability: 30,
    supply_baseline: "Global production: ~104M bbl/day | Global demand: ~103M bbl/day | Buffer: ~1M bbl/day",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions" },
      { event: "Strait of Hormuz closed (since Mar 2)", impact: "-17.8M bbl/day", detail: "Iran yuan toll system blocks ~18% of global supply. Only ~33 vessels transited via Iran Larak Island toll in late March." },
      { event: "Houthis close Bab el-Mandeb", impact: "-6.5M bbl/day", detail: "Saudi Yanbu pipeline exports become unreachable for Asian buyers. ~30 tankers near Yanbu within Houthi strike range." },
      { event: "Iraq force majeure (southern fields)", impact: "-0.5M bbl/day", detail: "Foreign-operated fields shut; Kuwait refinery attacks reduce refined product output." },
      { section: "gross", label: "Gross Supply Disruption", impact: "-24.8M bbl/day", detail: "Roughly 24% of global production offline or stranded." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "Saudi East-West pipeline (Abqaiq to Yanbu)", impact: "+7.0M bbl/day capacity", detail: "Bloomberg (March 28): pipeline now at full 7M bbl/day capacity. However, if Bab el-Mandeb closes, all maritime exports from Yanbu are stranded." },
      { event: "Saudi Yanbu export viability", impact: "-6.5M bbl/day (negated)", detail: "Bab el-Mandeb closure renders all Yanbu maritime exports undeliverable to Asian buyers (75% of Saudi exports). Only ~0.5M bbl/day viable via overland." },
      { event: "UAE pipeline to Fujairah (bypasses Hormuz)", impact: "+1.5M bbl/day", detail: "ADCOP pipeline moves Abu Dhabi crude to Fujairah on Gulf of Oman \u2014 outside Hormuz." },
      { event: "Iran own exports (unaffected)", impact: "+1.5M bbl/day", detail: "Iran continues exporting ~1.5M bbl/day primarily to China via its own tanker fleet." },
      { event: "Hormuz toll system (Chinese/Russian vessels)", impact: "+2.5M bbl/day", detail: "Iran Larak Island toll allows allied-flag vessels through at $1-2M/vessel." },
      { event: "U.S. shale production ramp-up", impact: "+0.3M bbl/day", detail: "U.S. at 13.6M bbl/day (EIA). Shale response takes 6-9 months at scale." },
      { event: "U.S. SPR emergency release", impact: "+1.0M bbl/day (temporary)", detail: "Strategic Petroleum Reserve at ~350M barrels. Sustained release of ~1M bbl/day realistic." },
      { event: "Canadian and Brazilian production increase", impact: "+0.2M bbl/day", detail: "Trans Mountain pipeline expansion adds Canadian export capacity. Brazil pre-salt near capacity." },
      { event: "Demand destruction from $130+ prices", impact: "+1.5M bbl/day (effective)", detail: "JPMorgan estimates 1.5M bbl/day demand reduction at sustained $130+ prices." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+9.0M bbl/day", detail: "Sum of: Iran exports (+1.5), toll transit (+2.5), UAE pipeline (+1.5), Saudi overland (+0.5), SPR (+1.0), U.S. shale (+0.3), Canada/Brazil (+0.2), demand destruction (+1.5)." },
      { section: "net", label: "Net Structural Deficit", impact: "-15.8M bbl/day", detail: "Catastrophic, unprecedented deficit \u2014 roughly 15% of global consumption. No combination of mitigations can fully offset simultaneous closure of both straits." },
    ],
    net_supply_impact: "Effective deficit: ~15.8M bbl/day. Physical shortages begin in Asia within 2-3 weeks and spread globally within 6 weeks (per JPMorgan).",
    price_reasoning: "Historical precedent: the 1973 embargo removed ~7% of supply and caused a 300% price increase ($3 to $12). A 15% deficit is 2x worse. With short-run demand elasticity of ~-0.05 (Hamilton 2009), destroying 15% of demand via price alone requires a ~300% increase from pre-crisis $85 base = ~$340/bbl. Even at -0.10, the math yields ~$210/bbl. Panic buying, sovereign hoarding, and absence of historical parallel further amplify. $200/bbl is a floor, not a ceiling.",
    price_target: "Brent: $200-350+ | WTI: $180-320+",
    etf_impacts: {
      IOGP: { direction: "up", reasoning: "Pure E&P exposure with ~1.2x observed beta to Brent. Operating leverage is convex: at $200+ Brent, margins expand 3.6x+ from pre-crisis. Target: 55-90+ EUR (70-180%+ upside)." },
      XLE: { direction: "up", reasoning: "Integrated majors (XOM, CVX) see record cash flows from both upstream margins and downstream refining spreads." },
      VDE: { direction: "up", reasoning: "Mid-cap shale producers are most operationally leveraged \u2014 at $200+ oil, even marginal wells become extremely profitable." },
      OIH: { direction: "up", reasoning: "Oil services demand spikes as every non-OPEC producer races to drill. Services pricing power returns to 2014 peak levels." },
      USO: { direction: "up", reasoning: "Direct WTI exposure \u2014 at $180-320+ WTI, USO could see 50-150%+ upside. Backwardation deepens." },
      BNO: { direction: "up", reasoning: "Brent at $200-350+ makes BNO the single highest-beta play. Elasticity math: 15% deficit / 0.05 = 300% price increase from $85 base." },
    },
    triggers: ["Houthi Hour Zero declaration and first Bab el-Mandeb strike", "Iran signals Houthis to activate", "Saudi Yanbu exports become unreachable", "U.S. SPR emergency drawdown announced"],
    timeframe: "1-3 months",
  },
  base: {
    narrative: "Hormuz remains closed but Houthis limit actions to missile strikes on Israel \u2014 they hold Bab el-Mandeb as an ace card, not yet deploying it. Saudi Arabia East-West pipeline at full 7M bbl/day capacity (Bloomberg, March 28) partially offsets Gulf disruption via Yanbu, with 5M bbl/day crude exports flowing through the Red Sea. Diplomatic channels show fragile progress: Pakistan secures transit for 20 ships, Trump April 6 deadline creates a forcing function.",
    outlook: "bullish",
    probability: 50,
    supply_baseline: "Global production: ~104M bbl/day | Global demand: ~103M bbl/day | Buffer: ~1M bbl/day",
    supply_impacts: [
      { section: "disruptions", label: "Supply Disruptions" },
      { event: "Strait of Hormuz partially reopens", impact: "-8.0M bbl/day", detail: "Iran toll system continues but allows more vessels. Partial transit resumes at $1-2M/vessel fees." },
      { event: "Bab el-Mandeb under threat but open", impact: "-1.0M bbl/day", detail: "Houthi threats cause ~30% traffic reduction. Maersk/Hapag-Lloyd pause Trans-Suez but tankers still transit." },
      { event: "Iraq partial resumption", impact: "-0.3M bbl/day", detail: "Partial force majeure lifted; some foreign-operated fields resume at reduced capacity." },
      { section: "gross", label: "Gross Supply Disruption", impact: "-9.3M bbl/day", detail: "Significant but manageable disruption \u2014 roughly 9% of global production." },
      { section: "mitigations", label: "Mitigations & Offsets" },
      { event: "Saudi East-West pipeline (Yanbu viable)", impact: "+5.0M bbl/day", detail: "Bloomberg (March 28): pipeline at full 7M bbl/day capacity. With Bab el-Mandeb open, Yanbu exports of 5M bbl/day crude reach Asian buyers." },
      { event: "UAE Fujairah pipeline", impact: "+1.5M bbl/day", detail: "ADCOP pipeline continues moving Abu Dhabi crude outside Hormuz." },
      { event: "U.S. shale + Canada + Brazil", impact: "+0.5M bbl/day", detail: "Non-OPEC production edges higher. U.S. reaches 13.6M bbl/day per EIA forecast." },
      { event: "Iranian toll transit volume", impact: "+2.0M bbl/day", detail: "Chinese/Russian-flagged vessels continue transiting Hormuz via Iran Larak Island toll system." },
      { section: "mitigations_total", label: "Total Effective Mitigation", impact: "+9.0M bbl/day", detail: "Sum of: Saudi pipeline (+5.0), UAE pipeline (+1.5), non-OPEC (+0.5), Iranian toll transit (+2.0). Bloomberg confirmation of 7M bbl/day Saudi pipeline capacity materially improves the base case." },
      { section: "net", label: "Net Structural Deficit", impact: "-0.3M bbl/day", detail: "Near-balanced market if Bab el-Mandeb stays open and Hormuz partially reopens. Saudi pipeline is the critical swing factor." },
    ],
    net_supply_impact: "Net deficit: ~0.3M bbl/day \u2014 near-balanced but fragile. Saudi 7M bbl/day pipeline capacity is the critical factor keeping markets stable.",
    price_reasoning: "A 0.3M bbl/day deficit is only ~0.3% of global consumption. But the market prices risk, not just current flows. With Houthis now active and Bab el-Mandeb closure explicitly among their options, futures embed a significant risk premium. The Dubai physical-to-Brent-futures gap ($126 vs $112.57) shows the physical market is already tighter than futures suggest.",
    price_target: "Brent: $95-115 | WTI: $88-105",
    etf_impacts: {
      IOGP: { direction: "up", reasoning: "At $95-115 Brent, E&P constituents see margins of $55-75/bbl (breakeven ~$40). With 1.2x observed beta and hedges rolling off H2, IOGP consolidates at 30-38 EUR." },
      XLE: { direction: "flat", reasoning: "Integrated majors consolidate. Strong cash flow supports dividends but upside capped by pullback from $112 peak." },
      VDE: { direction: "flat", reasoning: "Broader basket stabilizes; mid-cap names may see profit-taking after 28% YTD run." },
      OIH: { direction: "up", reasoning: "Services demand stays elevated \u2014 producers maintain capex plans even with modest oil pullback." },
      USO: { direction: "flat", reasoning: "WTI range-bound at $88-105. Physical market tight (Dubai $126) supports prices, but Trump jawboning dampens futures." },
      BNO: { direction: "flat", reasoning: "Brent holds $95-115 range. Physical-futures gap gradually closes as the market reprices." },
    },
    triggers: ["Trump April 6 deadline outcome", "Iran toll system pricing/volume data", "Houthi internal factional decision", "OPEC+ April meeting decision", "Saudi Yanbu throughput data"],
    timeframe: "1-3 months",
  },
  bear: {
    narrative: "Ceasefire reached by mid-April via Pakistan-mediated talks. Iran reopens Hormuz fully; Houthis stand down \u2014 despite having entered the war, internal faction prioritizing territorial consolidation prevails. The $15-20 risk premium rapidly unwinds. However, this scenario became less likely on March 28: Houthi entry, Iran continued defiance, and USS Tripoli deployment all point toward escalation.",
    outlook: "bearish",
    probability: 20,
    supply_baseline: "Global production: ~104M bbl/day | Global demand: ~103M bbl/day (pre-crisis) | Buffer: ~1M bbl/day",
    supply_impacts: [
      { section: "disruptions", label: "Remaining Disruptions (post-ceasefire)" },
      { event: "Hormuz reopening transition period", impact: "-2.0M bbl/day", detail: "Full commercial transit takes 2-4 weeks to normalize. Insurance rates remain elevated during transition." },
      { event: "Red Sea residual risk", impact: "-0.3M bbl/day", detail: "Houthi stand-down not fully trusted. Insurance premiums stay elevated for 1-2 months." },
      { section: "gross", label: "Gross Residual Disruption", impact: "-2.3M bbl/day", detail: "Temporary disruption during ceasefire implementation. Fully resolves within 4-6 weeks." },
      { section: "mitigations", label: "Supply Recovery & Demand Destruction" },
      { event: "Hormuz transit fully restored", impact: "+17.8M bbl/day restored", detail: "Iran dismantles toll system per ceasefire terms. Full commercial transit resumes within 2-4 weeks." },
      { event: "Iraq resumes production", impact: "+0.5M bbl/day restored", detail: "Force majeure lifted on foreign-operated fields. Southern Iraq exports resume via Basra terminal." },
      { event: "Demand destruction persists", impact: "-1.5M bbl/day demand", detail: "Asian refiners already cut runs after weeks of $100+ crude. Takes 2-3 months to fully recover." },
      { event: "OPEC+ oversupply risk", impact: "+0.5M bbl/day excess", detail: "Returning Gulf production + weakened demand + existing non-OPEC ramp = surplus." },
      { section: "mitigations_total", label: "Net Supply Recovery", impact: "+17.3M bbl/day restored", detail: "Near-complete restoration minus demand destruction lag." },
      { section: "net", label: "Net Market Balance", impact: "+2.0M bbl/day surplus", detail: "Market flips to oversupply. Inventory builds accelerate. Contango returns to futures curve." },
    ],
    net_supply_impact: "Net: market flips to ~2M bbl/day oversupply. Inventory builds accelerate. Contango returns. Oil prices overshoot to downside as risk premium fully unwinds.",
    price_reasoning: "The $14-18/bbl risk premium (Goldman estimate) unwinds fully, returning Brent to pre-crisis fundamental value of ~$75-85. But prices typically overshoot: the 1991 Gulf War resolution saw oil drop 30% below pre-crisis levels. A 2M bbl/day surplus with demand destruction lag creates a contango structure. Post-crisis trough could briefly touch $65 before stabilizing around $70-80.",
    price_target: "Brent: $65-80 | WTI: $60-75",
    etf_impacts: {
      IOGP: { direction: "down", reasoning: "E&P margins compress from $72/bbl (at $112 Brent) to $25-40/bbl at $65-80. With 1.2x beta, IOGP gives back 20-30% to 20-26 EUR. Hedges provide some downside protection in H1." },
      XLE: { direction: "down", reasoning: "Large-cap energy sells off 10-15% but outperforms pure-play E&P due to buyback support and diversified revenue." },
      VDE: { direction: "down", reasoning: "Broader sell-off hits mid/small-cap energy hardest \u2014 VDE wider basket amplifies the downside." },
      OIH: { direction: "down", reasoning: "Services stocks decline sharply as producers signal capex reviews. Rig count guidance pulled." },
      USO: { direction: "down", reasoning: "WTI retraces 25-30% toward $70 \u2014 USO sees sharpest decline as direct commodity tracker. Contango returns." },
      BNO: { direction: "down", reasoning: "Brent plunges as full risk premium unwinds \u2014 BNO most exposed to the de-escalation trade." },
    },
    triggers: ["U.S.-Iran ceasefire terms announced", "Hormuz transit fully resumed", "Houthi internal faction wins (territorial focus)", "Asian import data shows demand destruction", "OPEC+ emergency meeting called"],
    timeframe: "1-2 months",
  },
};

const HOUTHI_ASSESSMENT = {
  title: "ELEVATED: Double Chokepoint Risk \u2014 Houthis Now Active in War",
  thesis: "Houthis have entered the Iran war (March 28) and explicitly stated that closing the Bab el-Mandeb Strait is among their options. The question is no longer if, but when.",
  probability: "45-55% within next 14 days (upgraded from 35-40%)",
  evidence: [
    "CONFIRMED: Houthis fired ballistic missiles at Israel on March 28 \u2014 first attack of the Iran war",
    "Houthi deputy info minister: We are conducting this battle in stages, and closing Bab al-Mandeb is among our options",
    "Houthi military spokesperson declared attacks will continue until aggression against all fronts ceases",
    "Al Jazeera correspondent describes Bab el-Mandeb as the Houthis ace card for economic warfare",
    "Houthi red lines include: US using Red Sea for attacks on Iran, escalating attacks, broader country participation",
    "Maersk, Hapag-Lloyd, CMA CGM already paused all Trans-Suez sailings \u2014 Bab el-Mandeb traffic sharply reduced",
    "Saudi Yanbu exports now at 5M bbl/day (Bloomberg) \u2014 all within Houthi strike range",
    "USS Gerald Ford in Crete for repairs \u2014 sending it back to Red Sea risks 2024-style high-tempo attacks",
    "Axios: Houthis have not yet used their nuclear option of closing Bab el-Mandeb \u2014 but all preconditions are now met",
  ],
  impact: "If executed: ~6-7M bbl/day of additional oil flows disrupted. Saudi Arabia 5M bbl/day Yanbu exports become undeliverable. Combined with Hormuz closure, net deficit reaches ~15.8M bbl/day after mitigations. Elasticity math (15% deficit / 0.05 demand elasticity) implies Brent $250-350+.",
};

const IOGP_ANALYSIS = {
  title: "IOGP Elasticity Analysis: Price Sensitivity to Oil",
  overview: "IOGP tracks the S&P Commodity Producers Oil & Gas E&P Index \u2014 pure upstream companies whose revenue is almost entirely determined by realized oil prices. This creates a natural leverage effect: E&P stocks amplify oil price moves due to high fixed costs and variable revenue.",
  sections: [
    { label: "Observed beta (YTD 2026)", detail: "Brent rose ~33% from ~$85 pre-crisis to $112.57. IOGP rose ~40% over the same period (from ~EUR23 to EUR32.20). This implies an observed equity beta to oil of approximately 1.2x. Consistent with academic literature on E&P equity betas (typically 1.2-1.8x for pure upstream)." },
    { label: "Operating leverage mechanism", detail: "E&P companies have high fixed costs and variable revenue. If breakeven is ~$40/bbl, margin at $85 Brent is $45. At $200, margin is $160 (3.6x increase from 2.4x price move = 1.5x leverage). At $300, margin is $260 (5.8x increase from 3.5x price move = 1.65x leverage). The higher oil goes, the MORE leveraged E&P earnings become. The relationship is non-linear and convex." },
    { label: "Hedging dilution (near-term dampener)", detail: "Most E&P companies hedge 30-60% of production 12-18 months forward. At current prices, much of 2026 production was hedged at $70-85 \u2014 well below spot. This dampens near-term realized prices. But as hedges roll off in H2 2026, the full spot price flows through to earnings. Source: RBN Energy analysis." },
    { label: "Scenario-specific IOGP targets", detail: "Bull ($200-350 Brent): IOGP margin leverage of 1.5-1.7x, plus multiple expansion. IOGP could reach EUR55-90+ (70-180% upside from EUR32.20). Base ($95-115): IOGP consolidates at EUR28-36. Bear ($65-80): IOGP retraces to EUR20-25 (25-35% downside)." },
    { label: "Key risk: Gulf-exposed producers", detail: "IOGP index includes global E&P companies, some with Gulf-exposed production. In a double-chokepoint scenario, Gulf producers may see production curtailed even as prices spike. Non-Gulf producers (U.S. shale, Canadian oil sands, Brazilian pre-salt) benefit most." },
  ],
};

const STORAGE_KEY = "oil-etf-watchlist-v2";
const SCENARIO_META = {
  bull: { label: "Bull Case", emoji: "\u{1F7E2}", bg: "bg-emerald-950", border: "border-emerald-700", text: "text-emerald-400", badge: "bg-emerald-900 text-emerald-300" },
  base: { label: "Base Case", emoji: "\u{1F7E1}", bg: "bg-amber-950", border: "border-amber-700", text: "text-amber-400", badge: "bg-amber-900 text-amber-300" },
  bear: { label: "Bear Case", emoji: "\u{1F534}", bg: "bg-red-950", border: "border-red-700", text: "text-red-400", badge: "bg-red-900 text-red-300" },
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
      setError("sendPrompt not available here. Copy this and paste in the chat: Refresh Oil ETF Tracker with latest prices and scenarios.");
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
              <p className="text-xs text-gray-500">Market data & scenarios: {market.date}</p>
            </div>
          </div>
          <button onClick={requestRefresh} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-orange-900/30">
            <RefreshCw size={16} />
            Refresh Data & Scenarios
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-blue-950/30 border border-blue-900/50 rounded-2xl px-4 py-3 flex items-center gap-3">
          <Globe size={16} className="text-blue-400 shrink-0" />
          <p className="text-xs text-blue-300">Market data and geopolitical analysis as of <strong>{market.date}</strong>. Click <strong>Refresh Data & Scenarios</strong> to ask Claude for the latest data.</p>
        </div>
        {error && (
          <div className="bg-amber-950/50 border border-amber-800 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-300">{error}</p>
          </div>
        )}

        {/* Benchmarks */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Brent Crude", data: market.brent, icon: "\u{1F6E2}\uFE0F" },
            { label: "WTI Crude", data: market.wti, icon: "\u{1F6E2}\uFE0F" },
          ].map(({ label, data, icon }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
                  <p className="text-xl font-bold">${data.price.toFixed(2)}</p>
                </div>
              </div>
              <PctBadge val={data.change_pct} />
            </div>
          ))}
        </div>
        {/* ETF Watchlist */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-amber-500" />
              <h2 className="text-sm font-semibold">ETF Watchlist</h2>
              <span className="text-xs text-gray-600">{etfs.length} ETFs</span>
            </div>
            <button onClick={() => setShowAdd(!showAdd)} className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
              <Plus size={14} /> Add ETF
            </button>
          </div>
          {showAdd && (
            <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex gap-2 items-end flex-wrap">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Ticker</label>
                <input value={newTicker} onChange={e => setNewTicker(e.target.value)} placeholder="e.g. XOP" className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white w-24 focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Name (optional)</label>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. SPDR S&P Oil & Gas" className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white w-56 focus:outline-none focus:border-amber-500" />
              </div>
              <button onClick={addEtf} className="bg-amber-600 hover:bg-amber-500 text-white text-sm px-4 py-1.5 rounded-lg font-medium transition-colors">Add</button>
              <button onClick={() => setShowAdd(false)} className="text-gray-500 hover:text-gray-300 text-sm px-2 py-1.5 transition-colors">Cancel</button>
            </div>
          )}
          <div className="divide-y divide-gray-800">
            {etfs.map(etf => {
              const d = market.etfs[etf.ticker];
              return (
                <div key={etf.ticker} className="px-4 py-3 flex items-center justify-between hover:bg-gray-800 transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${etf.primary ? "bg-amber-600 text-white" : "bg-gray-700 text-gray-300"}`}>
                      {etf.ticker.slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold flex items-center gap-1.5">
                        {etf.ticker}
                        {etf.primary && <span className="text-xs bg-amber-900 text-amber-300 px-1.5 py-0.5 rounded">PRIMARY</span>}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{etf.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {d ? `${d.currency === "EUR" ? "\u20AC" : "$"}${d.price.toFixed(2)}` : <span className="text-gray-600">\u2014</span>}
                      </p>
                      {d && <PctBadge val={d.change_pct} />}
                    </div>
                    {!etf.primary && (
                      <button onClick={() => removeEtf(etf.ticker)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"><X size={14} /></button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* IOGP Elasticity Analysis */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <BarChart3 size={16} className="text-amber-400" />
            <h2 className="text-sm font-semibold">{IOGP_ANALYSIS.title}</h2>
            <span className="ml-auto text-xs px-2 py-0.5 rounded font-medium bg-amber-900 text-amber-300">PRIMARY ETF</span>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-300 leading-relaxed">{IOGP_ANALYSIS.overview}</p>
            {IOGP_ANALYSIS.sections.map((s, i) => (
              <div key={i} className="bg-gray-800 rounded-xl p-3">
                <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">{s.label}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Geopolitical Context */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <Globe size={16} className="text-blue-400" />
            <h2 className="text-sm font-semibold">Geopolitical Context</h2>
            <span className="ml-auto text-xs px-2 py-0.5 rounded font-medium bg-emerald-900 text-emerald-300">{geo.sentiment}</span>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-300 leading-relaxed mb-4">{geo.summary}</p>
            <div className="space-y-2">
              {geo.events.map((ev, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-800 rounded-xl p-3">
                  <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${ev.impact === "bullish" ? "bg-emerald-400" : ev.impact === "bearish" ? "bg-red-400" : "bg-amber-400"}`} />
                  <div>
                    <p className="text-sm font-medium">{ev.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ev.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Houthi Double Chokepoint Assessment */}
        <div className="bg-red-950/30 border border-red-900 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-red-900/50 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-400" />
            <h2 className="text-sm font-semibold text-red-300">{HOUTHI_ASSESSMENT.title}</h2>
            <span className="ml-auto text-xs px-2 py-0.5 rounded font-medium bg-red-900 text-red-300">P: {HOUTHI_ASSESSMENT.probability}</span>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-300"><strong className="text-red-300">Thesis:</strong> {HOUTHI_ASSESSMENT.thesis}</p>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Supporting Evidence</h4>
              <div className="space-y-1">
                {HOUTHI_ASSESSMENT.evidence.map((e, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="text-red-400 mt-0.5 shrink-0">\u2022</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-red-950/50 rounded-xl p-3">
              <p className="text-xs text-red-300"><strong>Impact if triggered:</strong> {HOUTHI_ASSESSMENT.impact}</p>
            </div>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
            <Target size={16} className="text-purple-400" />
            <h2 className="text-sm font-semibold">Scenario Analysis</h2>
          </div>
          <div className="flex border-b border-gray-800">
            {["bull", "base", "bear"].map(key => {
              const m = SCENARIO_META[key];
              const s = scenarios[key];
              const active = activeTab === key;
              return (
                <button key={key} onClick={() => setActiveTab(key)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    active ? `${m.bg} ${m.text} border-b-2 ${m.border}` : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"}`}>
                  <span>{m.emoji}</span><span>{m.label}</span>
                  {s?.probability != null && (
                    <span className={`text-xs px-1.5 py-0.5 rounded ${active ? m.badge : "bg-gray-800 text-gray-500"}`}>{s.probability}%</span>
                  )}
                </button>
              );
            })}
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
              {sc.price_reasoning && (
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Price Target Reasoning</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{sc.price_reasoning}</p>
                </div>
              )}
              {sc.probability != null && (
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-700 ${
                    activeTab === "bull" ? "bg-emerald-500" : activeTab === "base" ? "bg-amber-500" : "bg-red-500"
                  }`} style={{ width: `${Math.min(sc.probability, 100)}%` }} />
                </div>
              )}

              {sc.supply_baseline && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Supply & Demand Impact</h3>
                  <div className="bg-gray-800 rounded-xl p-3 mb-2">
                    <p className="text-xs font-mono text-gray-400">{sc.supply_baseline}</p>
                  </div>
                  <div className="space-y-1.5">
                    {sc.supply_impacts?.map((si, i) => {
                      if (si.section === "disruptions" || si.section === "mitigations") {
                        return (
                          <div key={i} className="pt-2 pb-1">
                            <h4 className={`text-xs font-bold uppercase tracking-wider ${si.section === "disruptions" ? "text-red-400" : "text-emerald-400"}`}>{si.label}</h4>
                          </div>
                        );
                      }
                      if (si.section === "gross" || si.section === "mitigations_total" || si.section === "net") {
                        const borderColor = si.section === "gross" ? "border-red-800 bg-red-950/50" : si.section === "mitigations_total" ? "border-emerald-800 bg-emerald-950/50" : "border-amber-800 bg-amber-950/50";
                        const textColor = si.section === "gross" ? "text-red-300" : si.section === "mitigations_total" ? "text-emerald-300" : "text-amber-300";
                        return (
                          <div key={i} className={`rounded-xl px-4 py-3 border ${borderColor} mt-1 mb-2`}>
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-bold ${textColor}`}>{si.label}</span>
                              {si.impact && <span className={`text-sm font-mono font-bold ${textColor}`}>{si.impact}</span>}
                            </div>
                            {si.detail && <p className="text-xs text-gray-400 mt-1">{si.detail}</p>}
                          </div>
                        );
                      }
                      return (
                        <div key={i} className="bg-gray-800 rounded-xl px-4 py-2.5 flex items-start gap-3">
                          <span className={`text-xs font-mono font-bold shrink-0 mt-0.5 w-32 text-right ${
                            si.impact.startsWith("+") ? "text-emerald-400" : si.impact.startsWith("-") ? "text-red-400" : "text-gray-400"
                          }`}>{si.impact}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-200">{si.event}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{si.detail}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {sc.net_supply_impact && (
                    <div className="mt-2 bg-gray-800 border border-gray-700 rounded-xl p-3">
                      <p className="text-xs font-semibold text-gray-300">{sc.net_supply_impact}</p>
                    </div>
                  )}
                </div>
              )}

              {sc.etf_impacts && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ETF Impact Assessment</h3>
                  <div className="space-y-1.5">
                    {Object.entries(sc.etf_impacts).map(([ticker, impact]) => (
                      <div key={ticker} className="bg-gray-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
                        <ImpactBadge dir={impact.direction} />
                        <span className="text-sm font-semibold w-14">{ticker}</span>
                        <span className="text-xs text-gray-400 flex-1">{impact.reasoning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {sc.triggers?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Triggers to Watch</h3>
                  <div className="flex flex-wrap gap-2">
                    {sc.triggers.map((t, i) => (
                      <span key={i} className="bg-gray-800 border border-gray-700 text-xs text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                        <ChevronRight size={10} className={scMeta.text} /> {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-gray-600">No data for this scenario.</div>
          )}
        </div>
        {/* Disclaimer */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-start gap-3">
          <Shield size={16} className="text-gray-600 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong className="text-gray-500">Disclaimer:</strong> For informational and educational purposes only. Not financial advice. Market data sourced via web search on {market.date} and may be delayed. AI-generated scenarios should not be relied upon for investment decisions. Consult a qualified financial advisor.
          </p>
        </div>
      </div>
    </div>
  );
}
