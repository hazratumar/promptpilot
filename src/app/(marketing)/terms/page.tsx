import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Terms of Service - PromptPilot",
  description: "Terms of Service for PromptPilot static SaaS application.",
};

export default function TermsPage() {
  return (
    <PageContainer className="py-12">
      <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs">
        <PageHeader
          title="Terms of Service"
          description="Last updated: July 25, 2026 &bull; Static SaaS Application Terms"
        />

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          <h3 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h3>
          <p>
            By accessing or using the PromptPilot web application, you agree to these Terms of Service. PromptPilot is provided as a static, browser-based demonstration product for organizing and testing AI prompts.
          </p>

          <h3 className="text-base font-bold text-slate-900">2. Simulated Output Disclaimer</h3>
          <p>
            Prompt execution outputs, score benchmarking metrics, token count estimations, and duration metrics generated within PromptPilot are client-side simulations intended for demonstration and testing purposes. PromptPilot does not warrant real-world LLM provider performance guarantees.
          </p>

          <h3 className="text-base font-bold text-slate-900">3. User Data & Local Storage Responsibility</h3>
          <p>
            Because data is stored in your local browser storage, clearing browser cache or data for the site will delete locally saved prompts unless you have exported a JSON backup.
          </p>

          <h3 className="text-base font-bold text-slate-900">4. Modifications to Terms</h3>
          <p>
            We reserve the right to update these terms at any time as the static application evolves through development phases.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
