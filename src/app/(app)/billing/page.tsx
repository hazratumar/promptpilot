"use client";

import * as React from "react";
import Link from "next/link";
import { CreditCard, ShieldCheck, CheckCircle2, RefreshCw, Calendar, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { PlanChangeDialog } from "@/components/pricing/plan-change-dialog";
import { useSubscription } from "@/hooks/use-subscription";

export default function BillingPage() {
  const { subscription, changePlan, cancelSubscription } = useSubscription();
  const [targetPlanId, setTargetPlanId] = React.useState<"free" | "pro" | "team" | null>(null);

  const mockInvoices = [
    { id: "inv-2026-07", date: "Jul 25, 2026", amount: "$19.00", status: "Paid", pdf: "Invoice-07.pdf" },
    { id: "inv-2026-06", date: "Jun 25, 2026", amount: "$19.00", status: "Paid", pdf: "Invoice-06.pdf" },
    { id: "inv-2026-05", date: "May 25, 2026", amount: "$19.00", status: "Paid", pdf: "Invoice-05.pdf" },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="Subscription & Billing"
        description="Manage active plan tier, billing cycle, payment method details, and invoice records."
      />

      {/* Current Active Plan Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{subscription.planName}</h2>
              <Badge variant="success">
                {subscription.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Billed {subscription.billingCycle} &bull; Next renewal on Aug 25, 2026
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" onClick={() => setTargetPlanId("team")}>
              Upgrade Plan
            </Button>
            <Link href="/pricing">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                View All Plans
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-slate-400 font-medium">Monthly Price</div>
            <div className="text-base font-extrabold text-slate-900">
              {subscription.planId === "free" ? "$0" : subscription.planId === "pro" ? "$19.00" : "$49.00"} / mo
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-slate-400 font-medium">Billing Period</div>
            <div className="text-base font-extrabold text-slate-900 capitalize">
              {subscription.billingCycle}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <div className="text-slate-400 font-medium">Prompt Limit</div>
            <div className="text-base font-extrabold text-emerald-600">
              {subscription.planId === "free" ? "10 Prompts" : "Unlimited Prompts"}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-indigo-600" /> Simulated Payment Method
          </h3>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-12 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-2xs font-mono">
              {subscription.paymentMethodBrand}
            </div>
            <div>
              <div className="font-bold text-slate-900">
                {subscription.paymentMethodBrand} ending in {subscription.paymentMethodLast4}
              </div>
              <div className="text-2xs text-slate-500">Expires 12/2028</div>
            </div>
          </div>

          <Badge variant="outline" size="sm">Default Card</Badge>
        </div>
      </div>

      {/* Invoices History Table */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">Billing History & Invoices</h3>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono text-xs font-bold text-slate-900">{inv.id}</TableCell>
                <TableCell className="text-xs text-slate-600">{inv.date}</TableCell>
                <TableCell className="font-bold text-slate-900">{inv.amount}</TableCell>
                <TableCell>
                  <Badge variant="success" size="sm">
                    {inv.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PlanChangeDialog
        targetPlanId={targetPlanId}
        isOpen={!!targetPlanId}
        onClose={() => setTargetPlanId(null)}
        onConfirmPlan={(planId) => changePlan(planId)}
      />
    </div>
  );
}
