import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";

export function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      <PageContainer className="text-center relative z-10">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
          <Compass className="h-7 w-7" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto">
          Ready to Elevate Your AI Prompt Workflow?
        </h2>

        <p className="mt-4 text-slate-300 text-base max-w-xl mx-auto leading-relaxed">
          Start organizing your prompts, parsing variables, and benchmarking LLM output quality in your browser right now.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all"
          >
            Launch Workspace Demo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3.5 text-base font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Sign In Demo Account
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
