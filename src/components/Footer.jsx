import { GitCommit } from "lucide-react";
import { BUILD_TIME, COMMIT_URL, GIT_SHA, GIT_SHA_SHORT, REPO_URL } from "../lib/buildInfo";
import { fmtDateTime } from "../lib/format";

export function Footer({ marketAsOf }) {
  return (
    <footer className="border-t border-gray-800 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span>Built <time dateTime={BUILD_TIME}>{fmtDateTime(BUILD_TIME)}</time></span>
        <span className="text-gray-700">·</span>
        {GIT_SHA !== "dev" ? (
          <a href={COMMIT_URL} target="_blank" rel="noreferrer noopener"
             className="inline-flex items-center gap-1 hover:text-amber-400 transition-colors font-mono">
            <GitCommit size={12} /> {GIT_SHA_SHORT}
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 font-mono">
            <GitCommit size={12} /> dev
          </span>
        )}
        {marketAsOf && (
          <>
            <span className="text-gray-700">·</span>
            <span>Market data as of <time dateTime={marketAsOf} className="font-mono">{fmtDateTime(marketAsOf)}</time></span>
          </>
        )}
        <span className="ml-auto">
          <a href={REPO_URL} target="_blank" rel="noreferrer noopener" className="hover:text-amber-400 transition-colors">Source on GitHub →</a>
        </span>
      </div>
    </footer>
  );
}
