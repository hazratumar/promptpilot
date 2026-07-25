"use client";

import * as React from "react";
import { Plus, FolderKanban } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/categories/category-card";
import { CategoryEditorDialog } from "@/components/categories/category-editor-dialog";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useCategories } from "@/hooks/use-categories";
import { usePrompts } from "@/hooks/use-prompts";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@/types/category";

export default function CategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { prompts } = usePrompts();
  const { addToast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [editCategory, setEditCategory] = React.useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Category | null>(null);

  const handleSave = (data: Omit<Category, "id" | "slug">) => {
    if (editCategory) {
      updateCategory(editCategory.id, data);
      addToast({
        title: "Category Updated",
        description: `Updated category "${data.name}".`,
        type: "success",
      });
      setEditCategory(null);
    } else {
      const created = addCategory(data);
      addToast({
        title: "Category Created",
        description: `Added "${created.name}" to workspace.`,
        type: "success",
      });
      setIsCreateOpen(false);
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    deleteCategory(deleteTarget.id);
    addToast({
      title: "Category Removed",
      description: `Deleted category "${deleteTarget.name}".`,
      type: "error",
    });
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Group and organize your AI prompt library into domain collections."
        actions={
          <Button
            variant="primary"
            onClick={() => setIsCreateOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Create Category
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = prompts.filter((p) => p.categoryId === cat.id).length;
          return (
            <CategoryCard
              key={cat.id}
              category={cat}
              promptCount={count}
              onEdit={setEditCategory}
              onDelete={setDeleteTarget}
            />
          );
        })}
      </div>

      <CategoryEditorDialog
        isOpen={isCreateOpen || !!editCategory}
        category={editCategory}
        onClose={() => {
          setIsCreateOpen(false);
          setEditCategory(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Category?"
        description={`Are you sure you want to delete category "${deleteTarget?.name}"?`}
        confirmLabel="Delete Category"
        variant="destructive"
      />
    </div>
  );
}
