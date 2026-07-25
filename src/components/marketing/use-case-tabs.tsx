"use client";

import * as React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AUDIENCE_USE_CASES } from "@/data/marketing";
import { cn } from "@/lib/utils";

export function UseCaseTabs() {
  const [activeId, setActiveId] = React.useState(AUDIENCE_USE_CASES[0].id);

  const activeCase = AUDIENCE_USE_CASES.find((c) => c.id === activeId) || AUDIENCE_USE_CASES[0];

  return (
    <div className="space-y-8">
      {/* Segmented Control Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {AUDIENCE_USE_CASES.map((uc) => (
          <button
            key={uc.id}
            type="button"
            onClick={() => setActiveId(uc.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all select-none",
              activeId === uc.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            )}
          >
            {uc.audience}
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-left">
        <div className="space-y-4">
          <span className="inline-block rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold text-indigo-700">
            For {activeCase.audience}
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">
            {activeCase.headline}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {activeCase.description}
          </p>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Value Outcomes
            </div>
            {activeCase.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
            >
              Try {activeCase.examplePromptTitle} in Demo
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900 p-5 text-slate-100 font-mono text-2xs space-y-3 shadow-inner border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
            <span>Template: {activeCase.examplePromptTitle}</span>
            <span className="text-indigo-400 font-semibold">Active</span>
          </div>
          <p className="text-slate-300">
            PromptPilot auto-detects variables in curly brackets and optimizes prompt benchmarking.
          </p>
          <div className="p-2.5 rounded bg-slate-800/80 text-emerald-400 border border-slate-700/60">
            Status: Ready for playground simulation
          </div>
        </div>
      </div>
    </div>
  );
}
