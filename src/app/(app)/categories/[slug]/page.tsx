"use client";

import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, FolderKanban, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PromptCard } from "@/components/prompts/prompt-card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useCategories } from "@/hooks/use-categories";
import { usePrompts } from "@/hooks/use-prompts";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/types/prompt";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { getCategoryBySlug } = useCategories();
  const { prompts, toggleFavorite, duplicatePrompt, updateStatus, deletePrompt } = usePrompts();
  const { addToast } = useToast();

  const [deleteTarget, setDeleteTarget] = React.useState<Prompt | null>(null);

  const category = getCategoryBySlug(slug);

  const categoryPrompts = React.useMemo(() => {
    if (!category) return [];
    return prompts.filter((p) => p.categoryId === category.id);
  }, [category, prompts]);

  if (!category) {
    return (
      <div className="py-12 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Category Not Found</h2>
        <Link href="/categories">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Return to Categories
          </Button>
        </Link>
      </div>
    );
  }

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
      <div className="flex items-center gap-2">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All Categories
        </Link>
      </div>

      <PageHeader
        title={category.name}
        description={category.description}
        actions={
          <Link href="/prompts/new">
            <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
              Create Prompt
            </Button>
          </Link>
        }
      />

      {categoryPrompts.length === 0 ? (
        <EmptyState
          icon={<FolderKanban className="h-6 w-6 text-indigo-600" />}
          title={`No prompts in "${category.name}" yet`}
          description="Start building this collection by creating a new prompt template."
          action={
            <Link href="/prompts/new">
              <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                Create Prompt
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryPrompts.map((p) => (
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
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Prompt?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete Prompt"
        variant="destructive"
      />
    </div>
  );
}
