"use client";

import * as React from "react";
import { Download, Clock, Star, Copy, Check } from "lucide-react";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PromptTestResult } from "@/types/test-result";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export interface ResultDetailDialogProps {
  result: PromptTestResult | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ResultDetailDialog({
  result,
  isOpen,
  onClose,
}: ResultDetailDialogProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  if (!result) return null;

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prompt-result-${result.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({
      title: "JSON Export Downloaded",
      description: `Exported result ${result.id}.json safely in browser.`,
      type: "success",
    });
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    addToast({
      title: "Output Copied",
      description: "Result output copied to clipboard.",
      type: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <DialogHeader
        title={`Run Inspection: ${result.promptTitle}`}
        description={`Executed on ${formatDate(result.createdAt)} \u2022 ${result.model}`}
        onClose={onClose}
      />

      <div className="py-4 space-y-5 text-xs">
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3">
            <Badge variant={result.status === "success" ? "success" : "destructive"}>
              {result.status}
            </Badge>
            <span className="font-mono text-slate-600 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-indigo-600" /> {result.durationMs}ms
            </span>
            <span className="text-slate-400">&bull;</span>
            <span className="font-mono text-slate-600">
              {result.estimatedInputTokens} in / {result.estimatedOutputTokens} out
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span>{result.scores.overall} / 10</span>
          </div>
        </div>

        {/* Rendered Prompt Text */}
        <div className="space-y-1.5">
          <div className="font-bold uppercase text-2xs tracking-wider text-slate-400">
            Rendered Prompt
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-2xs leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap border border-slate-800">
            {result.renderedPrompt}
          </pre>
        </div>

        {/* Output Text */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between font-bold uppercase text-2xs tracking-wider text-slate-400">
            <span>Model Output Text</span>
            <button
              type="button"
              onClick={handleCopyOutput}
              className="text-indigo-600 hover:underline font-semibold flex items-center gap-1"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied" : "Copy text"}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap">
            {result.output}
          </pre>
        </div>

        {/* Evaluation Scores Breakdown */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 text-2xs">Clarity</div>
            <div className="font-extrabold text-slate-900 mt-0.5">{result.scores.clarity}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 text-2xs">Relevance</div>
            <div className="font-extrabold text-slate-900 mt-0.5">{result.scores.relevance}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 text-2xs">Completeness</div>
            <div className="font-extrabold text-slate-900 mt-0.5">{result.scores.completeness}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-950">
            <div className="text-indigo-600 text-2xs font-bold">Overall Score</div>
            <div className="font-extrabold text-indigo-900 mt-0.5">{result.scores.overall}</div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleExportJson}
          leftIcon={<Download className="h-4 w-4" />}
        >
          Export JSON
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
