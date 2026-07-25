"use client";

import * as React from "react";
import Link from "next/link";
import { Plus, FileText, Compass } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { PromptLibraryToolbar } from "@/components/prompts/prompt-library-toolbar";
import { PromptCard } from "@/components/prompts/prompt-card";
import { PromptListRow } from "@/components/prompts/prompt-list-row";
import { usePrompts } from "@/hooks/use-prompts";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/types/prompt";

export default function PromptsPage() {
  const {
    prompts,
    duplicatePrompt,
    toggleFavorite,
    updateStatus,
    deletePrompt,
  } = usePrompts();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 250);

  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [favoritesOnly, setFavoritesOnly] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("newest");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  const [deleteTarget, setDeleteTarget] = React.useState<Prompt | null>(null);

  // Search & Filter Logic
  const filteredPrompts = React.useMemo(() => {
    return prompts.filter((p) => {
      // Search
      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesContent = p.content.toLowerCase().includes(q);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesContent && !matchesTags) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== "all" && p.categoryId !== selectedCategory) {
        return false;
      }

      // Status
      if (selectedStatus !== "all" && p.status !== selectedStatus) {
        return false;
      }

      // Favorites
      if (favoritesOnly && !p.isFavorite) {
        return false;
      }

      return true;
    });
  }, [prompts, debouncedSearch, selectedCategory, selectedStatus, favoritesOnly]);

  // Sort Logic
  const sortedPrompts = React.useMemo(() => {
    return [...filteredPrompts].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === "updated") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "score") {
        return b.averageScore - a.averageScore;
      }
      if (sortBy === "useCount") {
        return b.useCount - a.useCount;
      }
      return 0;
    });
  }, [filteredPrompts, sortBy]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "all" ||
    selectedStatus !== "all" ||
    favoritesOnly;

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setFavoritesOnly(false);
  };

  const handleDuplicate = (id: string) => {
    const dup = duplicatePrompt(id);
    if (dup) {
      addToast({
        title: "Prompt Duplicated",
        description: `Created copy "${dup.title}".`,
        type: "success",
      });
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deletePrompt(deleteTarget.id);
    addToast({
      title: "Prompt Deleted",
      description: `Removed "${deleteTarget.title}" from library.`,
      type: "error",
    });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Prompt Library"
        description="Browse, search, filter, and manage your AI prompt templates."
        actions={
          <Link href="/prompts/new">
            <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
              Create Prompt
            </Button>
          </Link>
        }
      />

      <PromptLibraryToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        favoritesOnly={favoritesOnly}
        onFavoritesOnlyToggle={() => setFavoritesOnly((prev) => !prev)}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onClearAll={handleClearAll}
        hasActiveFilters={hasActiveFilters}
        totalCount={sortedPrompts.length}
      />

      {/* Main List / Grid Display */}
      {sortedPrompts.length === 0 ? (
        <EmptyState
          icon={hasActiveFilters ? <FileText className="h-6 w-6" /> : <Compass className="h-6 w-6" />}
          title={hasActiveFilters ? "No matching prompts found" : "Your prompt library is empty"}
          description={
            hasActiveFilters
              ? "No prompts match your current search query or active filter settings."
              : "Start organizing your AI workflows by creating your first prompt template."
          }
          action={
            hasActiveFilters ? (
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                Clear All Filters
              </Button>
            ) : (
              <Link href="/prompts/new">
                <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                  Create Prompt
                </Button>
              </Link>
            )
          }
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPrompts.map((p) => (
            <PromptCard
              key={p.id}
              prompt={p}
              onDuplicate={handleDuplicate}
              onToggleFavorite={toggleFavorite}
              onUpdateStatus={updateStatus}
              onDeleteRequest={setDeleteTarget}
            />
          ))}
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prompt Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quality Score</TableHead>
              <TableHead>Recommended Model</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPrompts.map((p) => (
              <PromptListRow
                key={p.id}
                prompt={p}
                onDuplicate={handleDuplicate}
                onToggleFavorite={toggleFavorite}
                onUpdateStatus={updateStatus}
                onDeleteRequest={setDeleteTarget}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Prompt?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Prompt"
        variant="destructive"
      />
    </div>
  );
}
