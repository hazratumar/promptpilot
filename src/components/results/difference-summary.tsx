import { GitCompare, TrendingUp, Zap, Award } from "lucide-react";
import { PromptTestResult } from "@/types/test-result";

export function DifferenceSummary({ results }: { results: PromptTestResult[] }) {
  if (results.length < 2) return null;

  // Find best scoring run
  const sortedByScore = [...results].sort((a, b) => b.scores.overall - a.scores.overall);
  const bestScoreRun = sortedByScore[0];

  // Find fastest duration run
  const sortedBySpeed = [...results].sort((a, b) => a.durationMs - b.durationMs);
  const fastestRun = sortedBySpeed[0];

  // Token efficiency
  const lowestTokensRun = [...results].sort(
    (a, b) =>
      a.estimatedInputTokens + a.estimatedOutputTokens - (b.estimatedInputTokens + b.estimatedOutputTokens)
  )[0];

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
        <h3 className="text-sm font-bold text-indigo-950 flex items-center gap-2">
          <GitCompare className="h-4 w-4 text-indigo-600" /> Comparison Insights & Diff Summary
        </h3>
        <span className="text-2xs font-bold text-indigo-600 bg-white px-2.5 py-1 rounded-full border border-indigo-200">
          Comparing {results.length} Runs
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 bg-white rounded-xl border border-indigo-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-700">
            <Award className="h-4 w-4" /> Highest Quality Score
          </div>
          <div className="font-extrabold text-slate-900 text-sm">{bestScoreRun.scores.overall} / 10</div>
          <div className="text-2xs text-slate-500 font-medium truncate">
            Run: {bestScoreRun.model} ({bestScoreRun.promptTitle})
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-indigo-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-indigo-700">
            <Zap className="h-4 w-4 text-indigo-600" /> Lowest Execution Latency
          </div>
          <div className="font-extrabold text-slate-900 text-sm">{fastestRun.durationMs}ms</div>
          <div className="text-2xs text-slate-500 font-medium truncate">
            Run: {fastestRun.model} ({fastestRun.promptTitle})
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-indigo-100 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-purple-700">
            <TrendingUp className="h-4 w-4 text-purple-600" /> Most Token Efficient
          </div>
          <div className="font-extrabold text-slate-900 text-sm">
            {lowestTokensRun.estimatedInputTokens + lowestTokensRun.estimatedOutputTokens} tokens
          </div>
          <div className="text-2xs text-slate-500 font-medium truncate">
            Run: {lowestTokensRun.model}
          </div>
        </div>
      </div>
    </div>
  );
}
