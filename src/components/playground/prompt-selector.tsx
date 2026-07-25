"use client";

import * as React from "react";
import { Compass, Sparkles } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Prompt } from "@/types/prompt";

export interface PromptSelectorProps {
  prompts: Prompt[];
  selectedPromptId: string;
  onSelectPromptId: (id: string) => void;
}

export function PromptSelector({
  prompts,
  selectedPromptId,
  onSelectPromptId,
}: PromptSelectorProps) {
  return (
    <div className="space-y-1.5 w-full">
      <label className="block text-2xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Compass className="h-3.5 w-3.5 text-indigo-600" /> Select Prompt Template
        </span>
        <span className="text-2xs text-slate-400 font-normal">{prompts.length} available</span>
      </label>

      <Select
        value={selectedPromptId}
        onChange={(e) => onSelectPromptId(e.target.value)}
      >
        <option value="" disabled>
          Choose a prompt template...
        </option>
        {prompts.map((p) => (
          <option key={p.id} value={p.id}>
            {p.title} ({p.variables.length} vars)
          </option>
        ))}
      </Select>
    </div>
  );
}
