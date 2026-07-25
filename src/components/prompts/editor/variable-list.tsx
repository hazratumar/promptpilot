"use client";

import * as React from "react";
import { Sliders, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PromptVariable } from "@/types/prompt";

export interface VariableListProps {
  variables: PromptVariable[];
  onChange: (variables: PromptVariable[]) => void;
}

export function VariableList({ variables, onChange }: VariableListProps) {
  const updateVariable = (id: string, updates: Partial<PromptVariable>) => {
    onChange(
      variables.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  if (variables.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500 space-y-1">
        <Sliders className="h-5 w-5 mx-auto text-slate-400 mb-1" />
        <p className="font-semibold text-slate-700">No variable tokens detected yet</p>
        <p>
          Write tokens inside double curly brackets in prompt content like{" "}
          <code className="font-mono text-indigo-600 font-bold">&#123;&#123;variable_name&#125;&#125;</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sliders className="h-4 w-4 text-indigo-600" /> Dynamic Variables ({variables.length})
        </h3>
        <span className="text-2xs text-slate-400">Auto-extracted from prompt text</span>
      </div>

      <div className="space-y-3">
        {variables.map((v) => (
          <div
            key={v.id}
            className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                &#123;&#123;{v.name}&#125;&#125;
              </span>
              <Checkbox
                label="Required"
                checked={v.required}
                onChange={(e) => updateVariable(v.id, { required: e.target.checked })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  Field Label
                </label>
                <Input
                  value={v.label}
                  onChange={(e) => updateVariable(v.id, { label: e.target.value })}
                  placeholder="e.g. Programming Language"
                />
              </div>

              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  Placeholder Text
                </label>
                <Input
                  value={v.placeholder}
                  onChange={(e) => updateVariable(v.id, { placeholder: e.target.value })}
                  placeholder="e.g. TypeScript"
                />
              </div>
            </div>

            <div>
              <label className="block text-2xs font-semibold text-slate-600 mb-1">
                Default Testing Value
              </label>
              <Input
                value={v.defaultValue || ""}
                onChange={(e) => updateVariable(v.id, { defaultValue: e.target.value })}
                placeholder="e.g. TypeScript"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
