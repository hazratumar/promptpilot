"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Eye, Edit, Play, Copy, Star, Archive, ArchiveRestore, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/button";
import { Prompt } from "@/types/prompt";
import { useToast } from "@/hooks/use-toast";

export interface PromptActionsMenuProps {
  prompt: Prompt;
  onDuplicate?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onUpdateStatus?: (id: string, status: "draft" | "active" | "archived") => void;
  onDeleteRequest?: (prompt: Prompt) => void;
}

export function PromptActionsMenu({
  prompt,
  onDuplicate,
  onToggleFavorite,
  onUpdateStatus,
  onDeleteRequest,
}: PromptActionsMenuProps) {
  const router = useRouter();
  const { addToast } = useToast();

  const handleCopyContent = () => {
    navigator.clipboard.writeText(prompt.content);
    addToast({
      title: "Content Copied",
      description: `Copied prompt content for "${prompt.title}".`,
      type: "success",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton variant="ghost" size="sm" aria-label={`Actions for ${prompt.title}`}>
          <MoreVertical className="h-4 w-4" />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="right" className="w-48">
        <DropdownMenuItem onClick={() => router.push(`/prompts/${prompt.id}`)}>
          <Eye className="h-4 w-4" /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/prompts/${prompt.id}/edit`)}>
          <Edit className="h-4 w-4" /> Edit Prompt
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/playground?promptId=${prompt.id}`)}>
          <Play className="h-4 w-4 text-indigo-600" /> Test in Playground
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyContent}>
          <Copy className="h-4 w-4" /> Copy Prompt Text
        </DropdownMenuItem>
        {onToggleFavorite && (
          <DropdownMenuItem onClick={() => onToggleFavorite(prompt.id)}>
            <Star className="h-4 w-4 text-amber-500" />{" "}
            {prompt.isFavorite ? "Unfavorite" : "Add Favorite"}
          </DropdownMenuItem>
        )}
        {onUpdateStatus && (
          <DropdownMenuItem
            onClick={() =>
              onUpdateStatus(
                prompt.id,
                prompt.status === "archived" ? "active" : "archived"
              )
            }
          >
            {prompt.status === "archived" ? (
              <>
                <ArchiveRestore className="h-4 w-4" /> Restore Prompt
              </>
            ) : (
              <>
                <Archive className="h-4 w-4" /> Archive Prompt
              </>
            )}
          </DropdownMenuItem>
        )}
        {onDuplicate && (
          <DropdownMenuItem onClick={() => onDuplicate(prompt.id)}>
            <Copy className="h-4 w-4" /> Duplicate
          </DropdownMenuItem>
        )}
        {onDeleteRequest && (
          <DropdownMenuItem destructive onClick={() => onDeleteRequest(prompt)}>
            <Trash2 className="h-4 w-4" /> Delete Prompt
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
