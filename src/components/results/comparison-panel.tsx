import { Star, Clock, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PromptTestResult } from "@/types/test-result";

export function ComparisonPanel({ results }: { results: PromptTestResult[] }) {
  if (results.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-${results.length} gap-6`}>
      {results.map((res, index) => (
        <div
          key={res.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-2xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                Run Option #{index + 1}
              </span>
              <Badge variant={res.status === "success" ? "success" : "destructive"}>
                {res.status}
              </Badge>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{res.promptTitle}</h3>
              <div className="flex items-center gap-2 text-2xs text-slate-500 mt-1 font-mono">
                <Cpu className="h-3.5 w-3.5 text-indigo-600" />
                <span>{res.model}</span>
                <span>(Temp {res.temperature.toFixed(2)})</span>
              </div>
            </div>

            {/* Overall Score Badge */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span className="text-2xs font-semibold text-slate-600">Quality Score</span>
              <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {res.scores.overall} / 10
              </span>
            </div>

            {/* Rendered Prompt Preview */}
            <div className="space-y-1">
              <span className="text-3xs font-bold uppercase text-slate-400">Rendered Prompt</span>
              <pre className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-3xs leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap">
                {res.renderedPrompt}
              </pre>
            </div>

            {/* Output Preview */}
            <div className="space-y-1">
              <span className="text-3xs font-bold uppercase text-slate-400">Model Output</span>
              <pre className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                {res.output}
              </pre>
            </div>
          </div>

          {/* Footer Metrics */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-2xs font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-indigo-600" /> {res.durationMs}ms
            </span>
            <span>{res.estimatedInputTokens + res.estimatedOutputTokens} total tokens</span>
          </div>
        </div>
      ))}
    </div>
  );
}
