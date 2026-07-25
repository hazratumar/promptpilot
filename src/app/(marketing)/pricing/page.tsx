"use client";

import * as React from "react";
import { Check, Sparkles, HelpCircle } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";
import { PlanCard } from "@/components/pricing/plan-card";
import { PlanChangeDialog } from "@/components/pricing/plan-change-dialog";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { CTASection } from "@/components/marketing/cta-section";
import { MOCK_PRICING_PLANS } from "@/data/pricing";
import { useSubscription } from "@/hooks/use-subscription";

export default function PricingPage() {
  const { subscription, changePlan } = useSubscription();
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "annual">("monthly");
  const [selectedPlanId, setSelectedPlanId] = React.useState<"free" | "pro" | "team" | null>(null);

  return (
    <div className="py-12 space-y-16">
      <PageContainer>
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-2xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200">
            Transparent SaaS Pricing
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
            Flexible Plans for AI Users & Prompt Engineers
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Start organizing, testing, and benchmarking your AI prompt pipeline today.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold ${billingCycle === "monthly" ? "text-slate-900" : "text-slate-500"}`}>
              Monthly Billing
            </span>

            <button
              type="button"
              onClick={() => setBillingCycle((prev) => (prev === "monthly" ? "annual" : "monthly"))}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-200 transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-indigo-600 shadow ring-0 transition duration-200 ease-in-out ${
                  billingCycle === "annual" ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>

            <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === "annual" ? "text-slate-900" : "text-slate-500"}`}>
              Annual Billing
              <span className="text-2xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {MOCK_PRICING_PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              id={plan.id}
              name={plan.name}
              priceMonthly={plan.priceMonthly}
              priceYearly={plan.priceYearly}
              description={plan.tagline}
              features={plan.features}
              isPopular={plan.isPopular}
              isCurrent={subscription.planId === plan.id}
              billingCycle={billingCycle}
              onSelectPlan={(id) => setSelectedPlanId(id as any)}
            />
          ))}
        </div>

        {/* Feature Matrix Table */}
        <div className="mt-20 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Feature Matrix Comparison</h2>
            <p className="text-xs text-slate-500">Detailed breakdown of workspace features across plans.</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="p-4 font-bold text-slate-900">Feature</th>
                  <th className="p-4 font-bold text-slate-900 text-center">Free Developer</th>
                  <th className="p-4 font-bold text-indigo-700 text-center bg-indigo-50/50">Pro Creator</th>
                  <th className="p-4 font-bold text-slate-900 text-center">Enterprise Team</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Prompt Storage</td>
                  <td className="p-4 text-center">Up to 10 Prompts</td>
                  <td className="p-4 text-center font-bold text-indigo-700 bg-indigo-50/20">Unlimited Prompts</td>
                  <td className="p-4 text-center font-bold">Unlimited Prompts</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Test Simulations / Month</td>
                  <td className="p-4 text-center">50 Runs</td>
                  <td className="p-4 text-center font-bold text-indigo-700 bg-indigo-50/20">Unlimited Runs</td>
                  <td className="p-4 text-center font-bold">Unlimited Runs</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">Side-by-Side Comparisons</td>
                  <td className="p-4 text-center text-slate-400">&mdash;</td>
                  <td className="p-4 text-center bg-indigo-50/20"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-800">JSON Backup & Restore</td>
                  <td className="p-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center bg-indigo-50/20"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <FAQAccordion />
        </div>

        {/* CTA */}
        <div className="mt-20">
          <CTASection />
        </div>
      </PageContainer>

      <PlanChangeDialog
        targetPlanId={selectedPlanId}
        isOpen={!!selectedPlanId}
        onClose={() => setSelectedPlanId(null)}
        onConfirmPlan={(planId) => changePlan(planId, billingCycle)}
      />
    </div>
  );
}
