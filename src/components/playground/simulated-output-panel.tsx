"use client";

import * as React from "react";
import { FlaskConical, Clock, Copy, Check, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { PromptTestResult } from "@/types/test-result";
import { useToast } from "@/hooks/use-toast";

export interface SimulatedOutputPanelProps {
  isRunning: boolean;
  result: PromptTestResult | null;
  error?: string | null;
}

export function SimulatedOutputPanel({
  isRunning,
  result,
  error,
}: SimulatedOutputPanelProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (!result?.output) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    addToast({
      title: "Output Copied",
      description: "Simulated output copied to clipboard.",
      type: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-2xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <FlaskConical className="h-3.5 w-3.5 text-indigo-600" /> Simulated Output Benchmark
        </h3>
        <Badge variant="outline" size="sm">
          Simulated output
        </Badge>
      </div>

      {isRunning ? (
        <div className="py-16 text-center space-y-3">
          <Spinner size="lg" className="mx-auto" />
          <div className="text-xs font-bold text-slate-900">Executing Simulated Run...</div>
          <p className="text-2xs text-slate-500">Calculating token costs & evaluation score breakdown.</p>
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-2">
          <AlertTriangle className="h-6 w-6 text-rose-600 mx-auto" />
          <h4 className="text-xs font-bold text-rose-900">Simulation Error</h4>
          <p className="text-2xs text-rose-700">{error}</p>
        </div>
      ) : result ? (
        <div className="space-y-4">
          {/* Metadata metrics header */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-slate-600">
                <Clock className="h-3.5 w-3.5 text-indigo-600" /> {result.durationMs}ms
              </span>
              <span className="text-slate-400">&bull;</span>
              <span className="font-mono text-slate-600">
                {result.estimatedInputTokens} in / {result.estimatedOutputTokens} out
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-extrabold text-slate-900">{result.scores.overall} / 10</span>
            </div>
          </div>

          {/* Output text */}
          <div className="relative">
            <pre className="rounded-xl bg-slate-50 border border-slate-200 p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap min-h-[160px] max-h-[320px] overflow-y-auto leading-relaxed">
              {result.output}
            </pre>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              className="absolute top-2 right-2 text-2xs bg-white/90"
            >
              {copied ? "Copied" : "Copy Output"}
            </Button>
          </div>

          {/* Scores Breakdown */}
          <div className="grid grid-cols-3 gap-2 text-center text-2xs pt-2 border-t border-slate-100">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400">Clarity</div>
              <div className="font-bold text-slate-900">{result.scores.clarity}</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400">Relevance</div>
              <div className="font-bold text-slate-900">{result.scores.relevance}</div>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400">Completeness</div>
              <div className="font-bold text-slate-900">{result.scores.completeness}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center text-xs text-slate-400 space-y-1">
          <p>No test run executed yet.</p>
          <p className="text-2xs text-slate-400">Click &quot;Run Simulation&quot; to test variables.</p>
        </div>
      )}
    </div>
  );
}
