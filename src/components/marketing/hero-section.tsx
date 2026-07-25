import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 border-b border-slate-200/80">
      <PageContainer className="text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-4 py-1.5 text-xs font-semibold text-indigo-700 mb-8 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
          <span>Streamline Your AI Prompt Operations</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl max-w-4xl mx-auto leading-tight">
          Organize, Test & Benchmark AI Prompts in One Workspace
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          PromptPilot helps engineering teams, content creators, and product builders systematically manage prompt libraries, extract variables, and evaluate performance.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-indigo-700 transition-all hover:shadow-lg focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Explore Interactive Demo
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/features"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            See All Features
          </Link>
        </div>

        {/* Local Storage Privacy Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>100% Client-Side Browser Storage &bull; No API Keys Required</span>
        </div>
      </PageContainer>
    </section>
  );
}
