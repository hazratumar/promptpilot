import Link from "next/link";
import { Check } from "lucide-react";
import { MOCK_PRICING_PLANS } from "@/data/pricing";
import { Badge } from "@/components/ui/badge";

export function PricingPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {MOCK_PRICING_PLANS.map((plan) => (
        <div
          key={plan.id}
          className={`rounded-2xl bg-white p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
            plan.isPopular
              ? "border-2 border-indigo-600 shadow-lg ring-4 ring-indigo-50"
              : "border border-slate-200 shadow-2xs"
          }`}
        >
          {plan.isPopular && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge variant="default" className="shadow-xs">
                Most Popular
              </Badge>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
            <p className="mt-1 text-xs text-slate-500 min-h-[32px]">{plan.tagline}</p>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                ${plan.priceMonthly}
              </span>
              <span className="text-xs font-semibold text-slate-500">/ month</span>
            </div>

            <ul className="mt-6 space-y-3 text-xs text-slate-700">
              {plan.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100">
            <Link
              href="/pricing"
              className={`w-full flex items-center justify-center rounded-xl py-3 text-xs font-bold transition-colors ${
                plan.isPopular
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              {plan.ctaLabel}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
