import { FileText } from "lucide-react";
import { estimateTokens } from "@/lib/mock-runner";

export function RenderedPromptPanel({ text }: { text: string }) {
  const tokenEstimate = estimateTokens(text);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-2xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-indigo-600" /> Rendered Prompt Preview
        </h3>
        <span className="text-2xs font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          ~{tokenEstimate} Input Tokens
        </span>
      </div>

      <div className="rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs leading-relaxed min-h-[220px] max-h-[360px] overflow-y-auto whitespace-pre-wrap border border-slate-800">
        {text || <span className="text-slate-500 italic">Select a prompt and fill variables to generate rendered preview...</span>}
      </div>
    </div>
  );
}
