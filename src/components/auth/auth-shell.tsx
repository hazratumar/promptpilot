import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left Form Container */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12 max-w-xl mx-auto w-full">
        <div>
          <div className="flex items-center justify-between mb-8">
            <BrandLogo size="md" />
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>

          <main id="main-content" className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {children}
          </main>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-400">
          PromptPilot Static SaaS &bull; Local Browser Session
        </footer>
      </div>

      {/* Right Desktop Feature Side Panel */}
      <div className="hidden lg:flex flex-1 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden border-l border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-950 pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-600/30 border border-indigo-500/40 px-3.5 py-1.5 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>Browser-First Prompt Engineering</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Organize & Benchmark Your AI Prompts with Confidence
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            PromptPilot provides a dedicated playground for variable parsing, score tracking, and side-by-side run comparisons.
          </p>
        </div>

        <div className="relative z-10 space-y-3 pt-8 border-t border-slate-800/80 max-w-lg text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>100% Client-side local storage persistence</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>No secret keys or API setup required</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Deterministic simulated execution benchmarks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
