"use client";

import * as React from "react";
import { Eye, FileText, CheckCircle2 } from "lucide-react";
import { renderPrompt } from "@/lib/prompt-variables";
import { PromptVariable } from "@/types/prompt";

export interface PromptPreviewProps {
  title: string;
  content: string;
  variables: PromptVariable[];
}

export function PromptPreview({ title, content, variables }: PromptPreviewProps) {
  const rendered = React.useMemo(() => {
    return renderPrompt(content, {}, variables);
  }, [content, variables]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Eye className="h-4 w-4 text-indigo-600" /> Live Template Preview
        </h3>
        <span className="text-2xs text-slate-400">Default variables applied</span>
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-bold text-slate-900">
          {title || "Untitled Prompt"}
        </h4>
        <div className="rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs leading-relaxed min-h-[160px] whitespace-pre-wrap border border-slate-800">
          {rendered || <span className="text-slate-500 italic">Prompt template preview will appear here...</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 text-2xs text-slate-500 pt-2 border-t border-slate-100">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        <span>Preview displays default variable values in real time.</span>
      </div>
    </div>
  );
}
