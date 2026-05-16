import { Activity, AlertTriangle, BarChart3, Calendar, Globe, Shield, Target } from "lucide-react";

const SECTIONS = [
  { id: "markets",   label: "Markets",    icon: Activity },
  { id: "watchlist", label: "Watchlist",  icon: BarChart3 },
  { id: "iogp",      label: "IOGP",       icon: BarChart3 },
  { id: "geo",       label: "Geo",        icon: Globe },
  { id: "timeline",  label: "Timeline",   icon: Calendar },
  { id: "scenarios", label: "Scenarios",  icon: Target },
  { id: "framework", label: "Frameworks", icon: Shield },
  { id: "tail",      label: "Tail",       icon: AlertTriangle },
];

export function SectionNav() {
  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-[64px] z-10 -mx-4 px-4 border-b border-gray-800 bg-gray-950/80 backdrop-blur"
    >
      <ul className="max-w-6xl mx-auto flex gap-1 overflow-x-auto py-2 text-xs no-scrollbar">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-400 hover:text-amber-300 hover:bg-gray-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <Icon size={13} />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
