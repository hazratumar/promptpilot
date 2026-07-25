"use client";

import * as React from "react";
import { Sliders, AlertCircle } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PromptVariable } from "@/types/prompt";

export interface VariableInputPanelProps {
  variables: PromptVariable[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  errors?: Record<string, string>;
}

export function VariableInputPanel({
  variables,
  values,
  onChange,
  errors = {},
}: VariableInputPanelProps) {
  const handleChange = (name: string, val: string) => {
    onChange({
      ...values,
      [name]: val,
    });
  };

  if (variables.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500 bg-slate-50">
        This prompt template contains no dynamic variable tokens.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-2xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sliders className="h-3.5 w-3.5 text-indigo-600" /> Dynamic Variable Inputs ({variables.length})
        </h3>
      </div>

      <div className="space-y-3.5">
        {variables.map((v) => {
          const val = values[v.name] !== undefined ? values[v.name] : v.defaultValue || "";
          const isLongText = v.name.includes("content") || v.name.includes("snippet") || v.name.includes("transcript") || v.name.includes("logs") || v.name.includes("copy");

          return (
            <FormField
              key={v.id}
              label={v.label}
              required={v.required}
              error={errors[v.name]}
            >
              {isLongText ? (
                <Textarea
                  rows={3}
                  placeholder={v.placeholder}
                  value={val}
                  onChange={(e) => handleChange(v.name, e.target.value)}
                  isInvalid={!!errors[v.name]}
                />
              ) : (
                <Input
                  placeholder={v.placeholder}
                  value={val}
                  onChange={(e) => handleChange(v.name, e.target.value)}
                  isInvalid={!!errors[v.name]}
                />
              )}
            </FormField>
          );
        })}
      </div>
    </div>
  );
}
