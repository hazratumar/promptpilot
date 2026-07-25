"use client";

import * as React from "react";
import { Cpu, Thermometer } from "lucide-react";
import { Select } from "@/components/ui/select";
import { DEFAULT_DEMO_MODELS } from "@/lib/constants";

export interface RunSettingsProps {
  model: string;
  onModelChange: (model: string) => void;
  temperature: number;
  onTemperatureChange: (temp: number) => void;
}

export function RunSettings({
  model,
  onModelChange,
  temperature,
  onTemperatureChange,
}: RunSettingsProps) {
  return (
    <div className="space-y-4 pt-2 border-t border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="text-2xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-indigo-600" /> Run Settings
        </h3>
      </div>

      <div className="space-y-3.5 text-xs">
        <div>
          <label className="block text-2xs font-semibold text-slate-600 mb-1">
            Target Model (Demo)
          </label>
          <Select value={model} onChange={(e) => onModelChange(e.target.value)}>
            {DEFAULT_DEMO_MODELS.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name} ({m.provider})
              </option>
            ))}
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1 text-2xs">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <Thermometer className="h-3 w-3 text-indigo-600" /> Temperature
            </span>
            <span className="font-mono font-bold text-slate-900">{temperature.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={temperature}
            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-3xs text-slate-400 font-mono mt-1">
            <span>0.00 (Exact)</span>
            <span>0.50 (Balanced)</span>
            <span>1.00 (Creative)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
