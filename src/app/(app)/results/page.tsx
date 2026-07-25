"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart3, FlaskConical, GitCompare, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ResultsToolbar } from "@/components/results/results-toolbar";
import { ResultsTable } from "@/components/results/results-table";
import { ResultDetailDialog } from "@/components/results/result-detail-dialog";
import { useTestResults } from "@/hooks/use-test-results";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useToast } from "@/hooks/use-toast";
import { PromptTestResult } from "@/types/test-result";

export default function ResultsPage() {
  const router = useRouter();
  const { results, deleteResult, deleteMultipleResults } = useTestResults();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 250);

  const [selectedModel, setSelectedModel] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("newest");

  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [activeInspectResult, setActiveInspectResult] = React.useState<PromptTestResult | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<PromptTestResult | null>(null);

  // Filter Logic
  const filteredResults = React.useMemo(() => {
    return results.filter((res) => {
      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase();
        const matchTitle = res.promptTitle.toLowerCase().includes(q);
        const matchOutput = res.output.toLowerCase().includes(q);
        const matchModel = res.model.toLowerCase().includes(q);
        if (!matchTitle && !matchOutput && !matchModel) return false;
      }

      if (selectedModel !== "all" && res.model !== selectedModel) return false;
      if (selectedStatus !== "all" && res.status !== selectedStatus) return false;

      return true;
    });
  }, [results, debouncedSearch, selectedModel, selectedStatus]);

  // Sort Logic
  const sortedResults = React.useMemo(() => {
    return [...filteredResults].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "score") {
        return b.scores.overall - a.scores.overall;
      }
      if (sortBy === "duration") {
        return a.durationMs - b.durationMs;
      }
      if (sortBy === "title") {
        return a.promptTitle.localeCompare(b.promptTitle);
      }
      return 0;
    });
  }, [filteredResults, sortBy]);

  const hasActiveFilters = searchQuery !== "" || selectedModel !== "all" || selectedStatus !== "all";

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedModel("all");
    setSelectedStatus("all");
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (selectAll: boolean) => {
    if (selectAll) {
      setSelectedIds(sortedResults.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCompareSelected = () => {
    if (selectedIds.length < 2 || selectedIds.length > 3) {
      addToast({
        title: "Invalid Selection",
        description: "Select 2 or 3 test runs to launch side-by-side comparison.",
        type: "info",
      });
      return;
    }
    router.push(`/compare?ids=${selectedIds.join(",")}`);
  };

  const handleExportSelected = () => {
    const selectedRecords = results.filter((r) => selectedIds.includes(r.id));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedRecords, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prompt-results-export-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({
      title: "Batch Export Downloaded",
      description: `Exported ${selectedRecords.length} results safely in browser.`,
      type: "success",
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteResult(deleteTarget.id);
    setSelectedIds((prev) => prev.filter((i) => i !== deleteTarget.id));
    addToast({
      title: "Test Result Deleted",
      description: "Removed benchmark record.",
      type: "error",
    });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Test Results & Benchmarks"
        description="Review historical prompt execution runs, output quality scores, and export test data."
        actions={
          <Link href="/playground">
            <Button variant="primary" leftIcon={<FlaskConical className="h-4 w-4" />}>
              Test Playground
            </Button>
          </Link>
        }
      />

      <ResultsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        selectedCount={selectedIds.length}
        onCompareSelected={handleCompareSelected}
        onExportSelected={handleExportSelected}
        onClearAll={handleClearAll}
        hasActiveFilters={hasActiveFilters}
      />

      {sortedResults.length === 0 ? (
        <EmptyState
          icon={<BarChart3 className="h-6 w-6" />}
          title={hasActiveFilters ? "No matching test results" : "No benchmark runs recorded yet"}
          description={
            hasActiveFilters
              ? "No test results match your current search query or active filter settings."
              : "Run prompt simulations in the testing playground to record evaluation scores and latency metrics."
          }
          action={
            hasActiveFilters ? (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                Clear All Filters
              </Button>
            ) : (
              <Link href="/playground">
                <Button variant="primary" size="sm" leftIcon={<FlaskConical className="h-4 w-4" />}>
                  Go to Playground
                </Button>
              </Link>
            )
          }
        />
      ) : (
        <ResultsTable
          results={sortedResults}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onViewResult={setActiveInspectResult}
          onDeleteResult={setDeleteTarget}
        />
      )}

      {/* Inspect Dialog */}
      <ResultDetailDialog
        result={activeInspectResult}
        isOpen={!!activeInspectResult}
        onClose={() => setActiveInspectResult(null)}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Test Result?"
        description="Are you sure you want to delete this test result benchmark record?"
        confirmLabel="Delete Record"
        variant="destructive"
      />
    </div>
  );
}
