"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
}

export function TagInput({ tags, onChange, maxTags = 10 }: TagInputProps) {
  const [inputVal, setInputVal] = React.useState("");

  const addTag = (val: string) => {
    const trimmed = val.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!trimmed) return;
    if (tags.includes(trimmed)) {
      setInputVal("");
      return;
    }
    if (tags.length >= maxTags) return;

    onChange([...tags, trimmed]);
    setInputVal("");
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputVal);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg border border-slate-300 bg-white min-h-[42px] focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-slate-400 hover:text-rose-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {tags.length < maxTags && (
          <input
            type="text"
            placeholder={tags.length === 0 ? "Type tag & press Enter..." : "Add tag..."}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addTag(inputVal)}
            className="flex-1 text-xs bg-transparent border-0 focus:outline-none p-1 min-w-[100px] text-slate-900 placeholder:text-slate-400 font-sans"
          />
        )}
      </div>
      <p className="text-2xs text-slate-500">
        Press Enter or comma to add tags ({tags.length}/{maxTags} max).
      </p>
    </div>
  );
}
