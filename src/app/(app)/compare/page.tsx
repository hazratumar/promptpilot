"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GitCompare, ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Spinner } from "@/components/ui/spinner";
import { ComparisonPanel } from "@/components/results/comparison-panel";
import { DifferenceSummary } from "@/components/results/difference-summary";
import { useTestResults } from "@/hooks/use-test-results";

function CompareContent() {
  const searchParams = useSearchParams();
  const rawIds = searchParams?.get("ids") || "";
  const { results, isLoaded } = useTestResults();

  const selectedIds = React.useMemo(() => {
    if (!rawIds) return [];
    return rawIds.split(",").map((s) => s.trim()).filter(Boolean);
  }, [rawIds]);

  const targetResults = React.useMemo(() => {
    if (selectedIds.length > 0) {
      return results.filter((r) => selectedIds.includes(r.id));
    }
    return results.slice(0, 2);
  }, [results, selectedIds]);

  if (isLoaded && targetResults.length < 2) {
    return (
      <EmptyState
        icon={<GitCompare className="h-6 w-6" />}
        title="Select 2 or 3 Test Runs to Compare"
        description="Comparison requires at least 2 recorded test results. Go to the Test Results page or run simulations in the Playground."
        action={
          <Link href="/results">
            <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Select Runs from Results
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <DifferenceSummary results={targetResults} />
      <ComparisonPanel results={targetResults} />
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prompt Run Comparisons"
        description="Side-by-side performance benchmarking across models, prompt template variations, and variable sets."
        actions={
          <Link href="/results">
            <Button variant="outline" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Back to Test Results
            </Button>
          </Link>
        }
      />

      <React.Suspense fallback={<div className="py-12 text-center"><Spinner size="lg" /></div>}>
        <CompareContent />
      </React.Suspense>
    </div>
  );
}
