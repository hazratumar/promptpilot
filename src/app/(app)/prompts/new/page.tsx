"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { PromptEditor } from "@/components/prompts/editor/prompt-editor";
import { usePrompts } from "@/hooks/use-prompts";
import { useToast } from "@/hooks/use-toast";
import { Prompt } from "@/types/prompt";

export default function NewPromptPage() {
  const router = useRouter();
  const { addPrompt } = usePrompts();
  const { addToast } = useToast();

  const handleSave = (promptData: Omit<Prompt, "id" | "slug" | "createdAt" | "updatedAt" | "useCount" | "averageScore">) => {
    const created = addPrompt(promptData);
    addToast({
      title: "Prompt Saved Successfully!",
      description: `Created template "${created.title}".`,
      type: "success",
    });
    router.push(`/prompts/${created.id}`);
  };

  return <PromptEditor isEditMode={false} onSave={handleSave} />;
}
