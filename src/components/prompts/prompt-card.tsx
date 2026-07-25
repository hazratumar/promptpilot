import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromptStatusBadge } from "./prompt-status-badge";
import { PromptActionsMenu, PromptActionsMenuProps } from "./prompt-actions-menu";
import { Prompt } from "@/types/prompt";
import { MOCK_CATEGORIES } from "@/data/categories";

export interface PromptCardProps extends Omit<PromptActionsMenuProps, "prompt"> {
  prompt: Prompt;
}

export function PromptCard({
  prompt,
  onDuplicate,
  onToggleFavorite,
  onUpdateStatus,
  onDeleteRequest,
}: PromptCardProps) {
  const category = MOCK_CATEGORIES.find((c) => c.id === prompt.categoryId);

  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-all group border-slate-200">
      <CardHeader className="p-5 pb-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <PromptStatusBadge status={prompt.status} />
          <div className="flex items-center gap-1">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={() => onToggleFavorite(prompt.id)}
                aria-label={prompt.isFavorite ? "Remove favorite" : "Add favorite"}
                className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
              >
                <Star
                  className={`h-4 w-4 ${
                    prompt.isFavorite ? "fill-amber-400 text-amber-400" : ""
                  }`}
                />
              </button>
            )}
            <PromptActionsMenu
              prompt={prompt}
              onDuplicate={onDuplicate}
              onToggleFavorite={onToggleFavorite}
              onUpdateStatus={onUpdateStatus}
              onDeleteRequest={onDeleteRequest}
            />
          </div>
        </div>

        <Link
          href={`/prompts/${prompt.id}`}
          className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1"
        >
          {prompt.title}
        </Link>
        <CardDescription className="line-clamp-2">{prompt.description}</CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3">
        {/* Category & Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          {category && <Badge variant="outline">{category.name}</Badge>}
          {prompt.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" size="sm">
              #{tag}
            </Badge>
          ))}
          {prompt.tags.length > 2 && (
            <span className="text-2xs text-slate-400 font-medium">
              +{prompt.tags.length - 2}
            </span>
          )}
        </div>

        {/* Variables summary preview */}
        <div className="text-2xs text-slate-500 font-mono bg-slate-50 p-2 rounded-lg border border-slate-100 truncate">
          Vars: {prompt.variables.map((v) => `{{${v.name}}}`).join(", ") || "None"}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-3 justify-between border-t border-slate-100 text-2xs text-slate-500">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="font-bold text-slate-800">
            {prompt.averageScore > 0 ? `${prompt.averageScore} / 10` : "Not tested"}
          </span>
        </div>
        <Link
          href={`/playground?promptId=${prompt.id}`}
          className="font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md hover:bg-indigo-100 transition-colors"
        >
          Test Run
        </Link>
      </CardFooter>
    </Card>
  );
}
