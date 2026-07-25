"use client";

import * as React from "react";
import { Copy, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function PromptContentViewer({ content }: { content: string }) {
  const { addToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    addToast({
      title: "Copied to Clipboard",
      description: "Prompt text copied cleanly.",
      type: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 text-slate-100 shadow-sm overflow-hidden space-y-0">
      {/* Code Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <FileText className="h-4 w-4 text-indigo-400" />
          <span className="font-mono text-2xs">Prompt Template Code</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          leftIcon={copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          className="text-slate-300 hover:text-white hover:bg-slate-800 text-2xs"
        >
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </div>

      {/* Code Viewer Text Content */}
      <pre className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap text-slate-200">
        {content}
      </pre>
    </div>
  );
}
