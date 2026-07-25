"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, AlertCircle } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TagInput } from "./tag-input";
import { VariableList } from "./variable-list";
import { PromptPreview } from "./prompt-preview";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { syncVariablesWithContent } from "@/lib/prompt-variables";
import { MOCK_CATEGORIES } from "@/data/categories";
import { DEFAULT_DEMO_MODELS } from "@/lib/constants";
import { Prompt, PromptVariable } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";

export interface PromptEditorProps {
  initialPrompt?: Prompt;
  isEditMode?: boolean;
  onSave: (promptData: Omit<Prompt, "id" | "slug" | "createdAt" | "updatedAt" | "useCount" | "averageScore">) => void;
}

export function PromptEditor({
  initialPrompt,
  isEditMode = false,
  onSave,
}: PromptEditorProps) {
  const router = useRouter();
  const { addToast } = useToast();

  const [title, setTitle] = React.useState(initialPrompt?.title || "");
  const [description, setDescription] = React.useState(initialPrompt?.description || "");
  const [categoryId, setCategoryId] = React.useState(initialPrompt?.categoryId || MOCK_CATEGORIES[0].id);
  const [status, setStatus] = React.useState<"draft" | "active" | "archived">(initialPrompt?.status || "active");
  const [recommendedModel, setRecommendedModel] = React.useState(initialPrompt?.recommendedModel || DEFAULT_DEMO_MODELS[0].name);
  const [content, setContent] = React.useState(initialPrompt?.content || "");
  const [tags, setTags] = React.useState<string[]>(initialPrompt?.tags || ["engineering"]);
  const [variables, setVariables] = React.useState<PromptVariable[]>(initialPrompt?.variables || []);

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDirty, setIsDirty] = React.useState(false);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = React.useState(false);

  // Sync variables whenever content changes
  React.useEffect(() => {
    setVariables((prev) => syncVariablesWithContent(content, prev));
    setIsDirty(true);
  }, [content]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!title.trim() || title.trim().length < 3) {
      errs.title = "Title must be between 3 and 80 characters";
    }
    if (!description.trim() || description.trim().length < 10) {
      errs.description = "Description must be between 10 and 240 characters";
    }
    if (!content.trim() || content.trim().length < 15) {
      errs.content = "Prompt content must be at least 15 characters";
    }
    if (!categoryId) {
      errs.categoryId = "Please select a category";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = (targetStatus: "draft" | "active" | "archived") => {
    if (!validate()) {
      addToast({
        title: "Validation Failed",
        description: "Please fix highlighted form errors before saving.",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSave({
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        categoryId,
        tags,
        variables,
        recommendedModel,
        status: targetStatus,
        isFavorite: initialPrompt?.isFavorite || false,
        isSaved: true,
      });

      setIsSubmitting(false);
      setIsDirty(false);
    }, 400);
  };

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelConfirmOpen(true);
    } else {
      router.back();
    }
  };

  return (
    <div className="space-y-8">
      {/* Editor Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Cancel & Return
          </button>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {isEditMode ? `Edit Prompt: ${initialPrompt?.title}` : "Create New Prompt Template"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => handleSave("draft")}
            isLoading={isSubmitting}
          >
            Save Draft
          </Button>

          <Button
            variant="primary"
            onClick={() => handleSave("active")}
            isLoading={isSubmitting}
            leftIcon={<Save className="h-4 w-4" />}
          >
            {isEditMode ? "Update Prompt" : "Save Prompt"}
          </Button>
        </div>
      </div>

      {/* Main Grid: Form Left, Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Form Panel */}
        <div className="lg:col-span-7 space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
          <FormField label="Prompt Title" required error={errors.title} htmlFor="prompt-title">
            <Input
              id="prompt-title"
              placeholder="e.g. Pull Request Reviewer"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setIsDirty(true);
              }}
              isInvalid={!!errors.title}
            />
          </FormField>

          <FormField label="Short Description" required error={errors.description} htmlFor="prompt-desc">
            <Input
              id="prompt-desc"
              placeholder="e.g. Systematic code review assistant focusing on security & performance..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setIsDirty(true);
              }}
              isInvalid={!!errors.description}
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" required error={errors.categoryId}>
              <Select
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setIsDirty(true);
                }}
              >
                {MOCK_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Recommended Model" required>
              <Select
                value={recommendedModel}
                onChange={(e) => {
                  setRecommendedModel(e.target.value);
                  setIsDirty(true);
                }}
              >
                {DEFAULT_DEMO_MODELS.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </Select>
            </FormField>
          </div>

          <FormField label="Tags">
            <TagInput
              tags={tags}
              onChange={(newTags) => {
                setTags(newTags);
                setIsDirty(true);
              }}
            />
          </FormField>

          <FormField
            label="Prompt Template Content"
            required
            error={errors.content}
            helperText="Write template text. Tokens written as {{variable_name}} will be auto-detected below."
          >
            <Textarea
              rows={8}
              placeholder="Act as a software engineer. Review the following {{language}} code..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              isInvalid={!!errors.content}
            />
          </FormField>

          {/* Dynamic Variable Manager */}
          <VariableList variables={variables} onChange={setVariables} />
        </div>

        {/* Live Preview Side Panel */}
        <div className="lg:col-span-5 space-y-6">
          <PromptPreview title={title} content={content} variables={variables} />
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isCancelConfirmOpen}
        onClose={() => setIsCancelConfirmOpen(false)}
        onConfirm={() => router.back()}
        title="Discard Unsaved Changes?"
        description="You have unsaved edits in this prompt. Are you sure you want to leave without saving?"
        confirmLabel="Discard Changes"
        variant="destructive"
      />
    </div>
  );
}
