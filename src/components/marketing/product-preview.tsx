import { Play, CheckCircle2, Sliders, Star, FileText, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ProductPreview() {
  return (
    <div className="relative mx-auto max-w-5xl px-4 sm:px-6 -mt-10 sm:-mt-14 mb-16">
      <div className="rounded-2xl border border-slate-300 bg-slate-900 p-2 sm:p-3 shadow-2xl">
        {/* Mock Browser Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-slate-400 hidden sm:inline">
              promptpilot.app/playground?promptId=prompt-1
            </span>
          </div>
          <Badge variant="success" size="sm">
            Live Workspace Preview
          </Badge>
        </div>

        {/* Mock App Interface Grid */}
        <div className="bg-slate-50 text-slate-900 rounded-xl p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          {/* Left Panel: Variable Form */}
          <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-indigo-600" /> Dynamic Variables
              </span>
              <span className="text-2xs text-slate-400">3 detected</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  language <span className="text-rose-500">*</span>
                </label>
                <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-mono text-slate-800">
                  TypeScript
                </div>
              </div>

              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  feature_summary <span className="text-rose-500">*</span>
                </label>
                <div className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 font-sans text-slate-800">
                  Add user profile update endpoint
                </div>
              </div>

              <div>
                <label className="block text-2xs font-semibold text-slate-600 mb-1">
                  code_snippet <span className="text-rose-500">*</span>
                </label>
                <div className="rounded-lg border border-slate-300 bg-slate-50 p-2 font-mono text-2xs text-slate-700 h-16 overflow-hidden">
                  export async function updateUser(req, res) &#123; ... &#125;
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-2xs text-slate-500">Model: Claude 3.7 Sonnet</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-2xs font-bold text-white shadow-2xs"
                >
                  <Play className="h-3 w-3 fill-white" /> Simulate Run
                </button>
              </div>
            </div>
          </div>

          {/* Center Panel: Rendered Prompt */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-indigo-600" /> Rendered Template
              </span>
              <span className="text-2xs text-emerald-600 font-semibold">180 Tokens</span>
            </div>

            <div className="rounded-lg bg-slate-900 text-slate-100 p-3 font-mono text-2xs leading-relaxed h-52 overflow-hidden border border-slate-800">
              <span className="text-indigo-400">Act as a principal software engineer.</span>
              <br />
              Review the code change in TypeScript.
              <br />
              <br />
              Context:
              <br />
              - Summary: Add user profile update endpoint
              <br />
              - Code snippet:
              <br />
              <span className="text-emerald-400">export async function updateUser(...)</span>
            </div>
          </div>

          {/* Right Panel: Simulated Output */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FlaskConical className="h-4 w-4 text-emerald-600" /> Output Benchmark
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold text-slate-900">9.4 / 10</span>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-800 space-y-2 border border-slate-200 h-52 overflow-hidden">
              <div className="font-semibold text-slate-900 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 1. High-level Summary
              </div>
              <p className="text-2xs text-slate-600">
                PR introduces profile endpoint. Good structure, but needs input validation sanitization.
              </p>
              <div className="font-semibold text-slate-900 mt-2">2. Security Recommendation</div>
              <p className="text-2xs text-slate-600">
                Sanitize payload fields to prevent unhandled error leaks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
