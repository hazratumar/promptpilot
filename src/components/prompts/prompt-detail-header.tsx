import Link from "next/link";
import { ArrowLeft, Play, Edit, Copy, Star, Trash2 } from "lucide-react";
import { Button, IconButton } from "@/components/ui/button";
import { PromptStatusBadge } from "./prompt-status-badge";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";

export interface PromptDetailHeaderProps {
  prompt: Prompt;
  onToggleFavorite: (id: string) => void;
  onDeleteRequest: (prompt: Prompt) => void;
}

export function PromptDetailHeader({
  prompt,
  onToggleFavorite,
  onDeleteRequest,
}: PromptDetailHeaderProps) {
  const { addToast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    addToast({
      title: "Content Copied",
      description: "Prompt template text copied to clipboard.",
      type: "success",
    });
  };

  return (
    <div className="space-y-4 border-b border-slate-200 pb-6 mb-6">
      <div className="flex items-center justify-between">
        <Link
          href="/prompts"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Prompt Library
        </Link>
        <PromptStatusBadge status={prompt.status} />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {prompt.title}
            </h1>
            <button
              type="button"
              onClick={() => onToggleFavorite(prompt.id)}
              aria-label={prompt.isFavorite ? "Unfavorite" : "Favorite"}
              className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
            >
              <Star
                className={`h-5 w-5 ${
                  prompt.isFavorite ? "fill-amber-400 text-amber-400" : ""
                }`}
              />
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {prompt.description}
          </p>
        </div>

        {/* Header Action Bar */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Link href={`/playground?promptId=${prompt.id}`}>
            <Button variant="primary" leftIcon={<Play className="h-4 w-4 fill-white" />}>
              Test in Playground
            </Button>
          </Link>

          <Link href={`/prompts/${prompt.id}/edit`}>
            <Button variant="outline" leftIcon={<Edit className="h-4 w-4" />}>
              Edit
            </Button>
          </Link>

          <IconButton
            variant="outline"
            aria-label="Copy prompt text"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </IconButton>

          <IconButton
            variant="destructive"
            aria-label="Delete prompt"
            onClick={() => onDeleteRequest(prompt)}
          >
            <Trash2 className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
