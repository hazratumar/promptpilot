import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { FeatureGrid } from "@/components/marketing/feature-card";
import { UseCaseTabs } from "@/components/marketing/use-case-tabs";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata = {
  title: "Features - PromptPilot",
  description: "Explore all prompt engineering, benchmarking, and management features of PromptPilot.",
};

export default function FeaturesPage() {
  return (
    <div>
      <section className="py-12 bg-white border-b border-slate-200">
        <PageContainer>
          <PageHeader
            title="Comprehensive Prompt Engineering Features"
            description="Built to help teams organize, test, compare, and optimize prompts with full local privacy."
          />
          <FeatureGrid />
        </PageContainer>
      </section>

      <section className="py-16 bg-slate-50 border-b border-slate-200 text-center">
        <PageContainer>
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Role-Specific Workflows
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Discover how PromptPilot adapts to your specific team responsibilities.
            </p>
          </div>
          <UseCaseTabs />
        </PageContainer>
      </section>

      <CTASection />
    </div>
  );
}
