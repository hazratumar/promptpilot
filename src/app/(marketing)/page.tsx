"use client";

import { HeroSection } from "@/components/marketing/hero-section";
import { ProductPreview } from "@/components/marketing/product-preview";
import { SocialProof } from "@/components/marketing/social-proof";
import { FeatureGrid } from "@/components/marketing/feature-card";
import { WorkflowSteps } from "@/components/marketing/workflow-steps";
import { UseCaseTabs } from "@/components/marketing/use-case-tabs";
import { TestimonialGrid } from "@/components/marketing/testimonial-card";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { CTASection } from "@/components/marketing/cta-section";
import { PageContainer } from "@/components/shared/page-container";

export default function LandingPage() {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Product Preview */}
      <ProductPreview />

      {/* 3. Social Proof */}
      <SocialProof />

      {/* 4. Feature Grid */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Powerful Features for Prompt Engineering</h2>
            <p className="mt-4 text-base text-slate-600">
              Designed from the ground up to replace fragmented prompt notes with a structured benchmarking suite.
            </p>
          </div>
          <FeatureGrid />
        </PageContainer>
      </section>

      {/* 5. Three-Step Workflow */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How PromptPilot Works</h2>
            <p className="mt-4 text-base text-slate-600">A simple three-step methodology for building high-performing prompt pipelines.</p>
          </div>
          <WorkflowSteps />
        </PageContainer>
      </section>

      {/* 6. Use Cases by Audience */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80 text-center">
        <PageContainer>
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Tailored for Every Role</h2>
            <p className="mt-4 text-base text-slate-600">See how different team members utilize PromptPilot to streamline their AI workflows.</p>
          </div>
          <UseCaseTabs />
        </PageContainer>
      </section>

      {/* 7. Sample Testimonials */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What AI Builders Say</h2>
            <p className="mt-4 text-base text-slate-600">Feedback from engineers and product creators using PromptPilot.</p>
          </div>
          <TestimonialGrid />
        </PageContainer>
      </section>

      {/* 8. Pricing Preview */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/80">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-base text-slate-600">Explore plans designed for individual prompt engineers and scaling product teams.</p>
          </div>
          <PricingPreview />
        </PageContainer>
      </section>

      {/* 9. FAQ Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-base text-slate-600">Everything you need to know about PromptPilot static SaaS workspace.</p>
          </div>
          <FAQAccordion />
        </PageContainer>
      </section>

      {/* 10. Final Call to Action */}
      <CTASection />
    </div>
  );
}
