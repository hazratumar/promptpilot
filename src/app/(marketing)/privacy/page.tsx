import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Privacy Policy - PromptPilot",
  description: "Privacy Policy for the static browser-local PromptPilot application.",
};

export default function PrivacyPage() {
  return (
    <PageContainer className="py-12">
      <div className="max-w-3xl mx-auto space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-2xs">
        <PageHeader
          title="Privacy Policy"
          description="Last updated: July 25, 2026 &bull; Browser-First Local Data Guarantee"
        />

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
          <h3 className="text-base font-bold text-slate-900">1. Client-Side Data Storage</h3>
          <p>
            PromptPilot operates as a static frontend web application. All prompt records, templates, dynamic variable configurations, test run histories, evaluation scores, and workspace preferences are stored exclusively inside your web browser using HTML5 <code>localStorage</code>.
          </p>

          <h3 className="text-base font-bold text-slate-900">2. No External Network Data Transfer</h3>
          <p>
            We do not collect, transmit, or store your prompts or test outputs on remote servers. Prompt execution simulations run entirely in browser memory using deterministic local algorithms. No API secret keys, passwords, or personal credentials leave your local browser environment.
          </p>

          <h3 className="text-base font-bold text-slate-900">3. Analytics and Tracking</h3>
          <p>
            PromptPilot contains zero third-party tracking scripts, advertising beacons, or analytics SDKs.
          </p>

          <h3 className="text-base font-bold text-slate-900">4. Managing & Clearing Your Data</h3>
          <p>
            You retain complete ownership and control over your prompt data. You can export your full workspace as a JSON file or clear all local storage records at any time via the <strong>Settings</strong> page.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
