import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PlanCardProps {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
  billingCycle: "monthly" | "annual";
  onSelectPlan: (planId: string) => void;
}

export function PlanCard({
  id,
  name,
  priceMonthly,
  priceYearly,
  description,
  features,
  isPopular = false,
  isCurrent = false,
  billingCycle,
  onSelectPlan,
}: PlanCardProps) {
  const price = billingCycle === "annual" ? priceYearly : priceMonthly;

  return (
    <Card
      className={`p-6 flex flex-col justify-between relative transition-all border-2 ${
        isPopular
          ? "border-indigo-600 shadow-xl bg-white scale-[1.02]"
          : "border-slate-200 shadow-2xs hover:shadow-md"
      }`}
    >
      {isPopular && (
        <Badge
          variant="default"
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 px-3 py-1 font-bold shadow-xs"
        >
          Most Popular
        </Badge>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{name}</h3>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            ${price}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            / month {billingCycle === "annual" ? "(billed annually)" : ""}
          </span>
        </div>

        <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
          <div className="font-bold text-2xs uppercase tracking-wider text-slate-400">
            Included Features
          </div>
          {features.map((feat) => (
            <div key={feat} className="flex items-start gap-2 text-slate-700">
              <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100">
        <Button
          variant={isCurrent ? "secondary" : isPopular ? "primary" : "outline"}
          size="lg"
          className="w-full"
          disabled={isCurrent}
          onClick={() => onSelectPlan(id)}
        >
          {isCurrent ? "Current Active Plan" : `Upgrade to ${name}`}
        </Button>
      </div>
    </Card>
  );
}
