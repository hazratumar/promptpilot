"use client";

import * as React from "react";
import { Dialog, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category";

export interface CategoryEditorDialogProps {
  category?: Category | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Category, "id" | "slug">) => void;
}

export function CategoryEditorDialog({
  category,
  isOpen,
  onClose,
  onSave,
}: CategoryEditorDialogProps) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("#4F46E5");
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setColor(category.color || "#4F46E5");
    } else {
      setName("");
      setDescription("");
      setColor("#4F46E5");
    }
    setErrors({});
  }, [category, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "Category name is required";
    if (!description.trim()) errs.description = "Description is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      accent: color,
      color,
      icon: "folder",
    });
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="md">
      <DialogHeader
        title={category ? `Edit Category: ${category.name}` : "Create New Category"}
        description="Organize prompt templates into logical domain collections."
        onClose={onClose}
      />

      <form onSubmit={handleSubmit} className="py-4 space-y-4">
        <FormField label="Category Name" required error={errors.name}>
          <Input
            placeholder="e.g. Data & Analytics"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
          />
        </FormField>

        <FormField label="Description" required error={errors.description}>
          <Textarea
            rows={3}
            placeholder="Prompts designed for SQL generation, pipeline analysis, and data modeling..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={!!errors.description}
          />
        </FormField>

        <FormField label="Accent Color">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-9 w-12 rounded border border-slate-300 p-0.5 cursor-pointer bg-white"
            />
            <span className="font-mono text-xs text-slate-600 uppercase">{color}</span>
          </div>
        </FormField>

        <DialogFooter className="pt-4">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            {category ? "Save Changes" : "Create Category"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
