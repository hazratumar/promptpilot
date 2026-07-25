"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Plus } from "lucide-react";
import { PromptDetailHeader } from "@/components/prompts/prompt-detail-header";
import { PromptContentViewer } from "@/components/prompts/prompt-content-viewer";
import { PromptMetadataPanel } from "@/components/prompts/prompt-metadata-panel";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Button } from "@/components/ui/button";
import { usePrompts } from "@/hooks/use-prompts";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/types/prompt";

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params?.promptId as string;
  const { getPrompt, toggleFavorite, deletePrompt, isLoaded } = usePrompts();
  const { addToast } = useToast();

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const prompt = getPrompt(promptId);

  if (isLoaded && !prompt) {
    return (
      <div className="py-12 max-w-xl mx-auto text-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Prompt Not Found</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          The requested prompt (ID: <code className="font-mono text-slate-800">{promptId}</code>) could not be located in your local prompt library.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link href="/prompts">
            <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Return to Prompt Library
            </Button>
          </Link>
          <Link href="/prompts/new">
            <Button variant="outline" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Create New Prompt
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!prompt) return null;

  const handleDelete = () => {
    deletePrompt(prompt.id);
    addToast({
      title: "Prompt Deleted",
      description: `Removed "${prompt.title}" from library.`,
      type: "error",
    });
    router.push("/prompts");
  };

  return (
    <div className="space-y-6">
      <PromptDetailHeader
        prompt={prompt}
        onToggleFavorite={toggleFavorite}
        onDeleteRequest={() => setIsDeleteOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Main Panel: Prompt Code Viewer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prompt Template Content
            </h2>
            <PromptContentViewer content={prompt.content} />
          </div>
        </div>

        {/* Right Sidebar: Metadata Specification */}
        <div className="lg:col-span-4">
          <PromptMetadataPanel prompt={prompt} />
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Prompt?"
        description={`Are you sure you want to delete "${prompt.title}"? This will return you to the prompt library.`}
        confirmLabel="Delete Prompt"
        variant="destructive"
      />
    </div>
  );
}
