"use client";

import * as React from "react";
import { Check, ShieldCheck } from "lucide-react";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface PlanChangeDialogProps {
  targetPlanId: "free" | "pro" | "team" | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPlan: (planId: "free" | "pro" | "team") => void;
}

export function PlanChangeDialog({
  targetPlanId,
  isOpen,
  onClose,
  onConfirmPlan,
}: PlanChangeDialogProps) {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!targetPlanId) return null;

  const planNames = { free: "Free Developer", pro: "Pro Creator", team: "Enterprise Team" };
  const targetName = planNames[targetPlanId];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmPlan(targetPlanId);
      setIsSubmitting(false);
      addToast({
        title: "Subscription Updated!",
        description: `Successfully upgraded workspace to ${targetName} plan.`,
        type: "success",
      });
      onClose();
    }, 500);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="md">
      <DialogHeader
        title={`Change Plan to ${targetName}`}
        description="Simulated safe browser subscription upgrade."
        onClose={onClose}
      />

      <div className="py-4 space-y-4 text-xs">
        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100 space-y-2">
          <div className="flex items-center gap-2 font-bold text-indigo-900">
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <span>Browser Demo Subscription</span>
          </div>
          <p className="text-2xs text-indigo-700 leading-relaxed">
            This is a simulated SaaS subscription change. No real credit card or payment gateway call will occur.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-bold text-slate-900">What happens next:</div>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Instant access to {targetName} features</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              <span>Simulated storage state updated in LocalStorage</span>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleConfirm}
          isLoading={isSubmitting}
        >
          Confirm Upgrade
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
