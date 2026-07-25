import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PromptStatusBadge } from "./prompt-status-badge";
import { PromptActionsMenu, PromptActionsMenuProps } from "./prompt-actions-menu";
import { Prompt } from "@/types/prompt";
import { MOCK_CATEGORIES } from "@/data/categories";

export interface PromptListRowProps extends Omit<PromptActionsMenuProps, "prompt"> {
  prompt: Prompt;
}

export function PromptListRow({
  prompt,
  onDuplicate,
  onToggleFavorite,
  onUpdateStatus,
  onDeleteRequest,
}: PromptListRowProps) {
  const category = MOCK_CATEGORIES.find((c) => c.id === prompt.categoryId);

  return (
    <TableRow>
      <TableCell className="font-semibold text-slate-900">
        <div className="flex items-center gap-2">
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
          <div>
            <Link
              href={`/prompts/${prompt.id}`}
              className="font-bold text-slate-900 hover:text-indigo-600 transition-colors line-clamp-1"
            >
              {prompt.title}
            </Link>
            <p className="text-2xs text-slate-500 font-normal line-clamp-1">{prompt.description}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>{category ? <Badge variant="outline">{category.name}</Badge> : "-"}</TableCell>
      <TableCell>
        <PromptStatusBadge status={prompt.status} />
      </TableCell>
      <TableCell className="font-semibold text-slate-700">
        <div className="flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>{prompt.averageScore > 0 ? prompt.averageScore : "N/A"}</span>
        </div>
      </TableCell>
      <TableCell className="font-mono text-slate-500">{prompt.recommendedModel}</TableCell>
      <TableCell className="text-right">
        <PromptActionsMenu
          prompt={prompt}
          onDuplicate={onDuplicate}
          onToggleFavorite={onToggleFavorite}
          onUpdateStatus={onUpdateStatus}
          onDeleteRequest={onDeleteRequest}
        />
      </TableCell>
    </TableRow>
  );
}
