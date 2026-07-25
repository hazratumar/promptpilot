"use client";

import * as React from "react";
import Link from "next/link";
import { Star, Plus, Compass } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { PromptCard } from "@/components/prompts/prompt-card";
import { usePrompts } from "@/hooks/use-prompts";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/types/prompt";

export default function FavoritesPage() {
  const { prompts, toggleFavorite, duplicatePrompt, updateStatus, deletePrompt } = usePrompts();
  const { addToast } = useToast();
  const [deleteTarget, setDeleteTarget] = React.useState<Prompt | null>(null);

  const favoritePrompts = React.useMemo(() => {
    return prompts.filter((p) => p.isFavorite);
  }, [prompts]);

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
        title="Workspace Favorites"
        description="Quick access to your pinned AI prompt templates."
      />

      {favoritePrompts.length === 0 ? (
        <EmptyState
          icon={<Star className="h-6 w-6 text-amber-500 fill-amber-400" />}
          title="No Favorites Pinned Yet"
          description="Click the star icon on any prompt template in your library to pin it here for rapid access."
          action={
            <Link href="/prompts">
              <Button variant="primary" size="sm" leftIcon={<Compass className="h-4 w-4" />}>
                Browse Prompt Library
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePrompts.map((p) => (
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
