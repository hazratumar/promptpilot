"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { PromptEditor } from "@/components/prompts/editor/prompt-editor";
import { Button } from "@/components/ui/button";
import { usePrompts } from "@/hooks/use-prompts";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/types/prompt";

export default function EditPromptPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params?.promptId as string;
  const { getPrompt, updatePrompt, isLoaded } = usePrompts();
  const { addToast } = useToast();

  const prompt = getPrompt(promptId);

  if (isLoaded && !prompt) {
    return (
      <div className="py-12 max-w-xl mx-auto text-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-200">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Prompt Not Found</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Cannot edit prompt <code className="font-mono text-slate-800">{promptId}</code> because it does not exist.
        </p>
        <Link href="/prompts">
          <Button variant="primary" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Return to Prompt Library
          </Button>
        </Link>
      </div>
    );
  }

  if (!prompt) return null;

  const handleSave = (promptData: Omit<Prompt, "id" | "slug" | "createdAt" | "updatedAt" | "useCount" | "averageScore">) => {
    updatePrompt(prompt.id, promptData);
    addToast({
      title: "Prompt Updated",
      description: `Saved changes for "${prompt.title}".`,
      type: "success",
    });
    router.push(`/prompts/${prompt.id}`);
  };

  return <PromptEditor initialPrompt={prompt} isEditMode={true} onSave={handleSave} />;
}
