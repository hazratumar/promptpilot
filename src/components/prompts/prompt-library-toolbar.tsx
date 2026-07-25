"use client";

import * as React from "react";
import { Search, LayoutGrid, List, X, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { IconButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_CATEGORIES } from "@/data/categories";

export interface PromptLibraryToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyToggle: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
  totalCount: number;
}

export function PromptLibraryToolbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  favoritesOnly,
  onFavoritesOnlyToggle,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onClearAll,
  hasActiveFilters,
  totalCount,
}: PromptLibraryToolbarProps) {
  return (
    <div className="space-y-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search titles, tags, or template content..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftElement={<Search className="h-4 w-4" />}
            rightElement={
              searchQuery ? (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null
            }
          />
        </div>

        {/* Filters & Actions bar */}
        <div className="flex items-center gap-2.5 flex-wrap justify-between md:justify-end">
          {/* Category Select */}
          <div className="w-36">
            <Select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="all">All Categories</option>
              {MOCK_CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>

          {/* Status Select */}
          <div className="w-32">
            <Select value={selectedStatus} onChange={(e) => onStatusChange(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </Select>
          </div>

          {/* Favorites Toggle */}
          <button
            type="button"
            onClick={onFavoritesOnlyToggle}
            className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors select-none ${
              favoritesOnly
                ? "bg-amber-50 text-amber-900 border-amber-300 font-bold"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${favoritesOnly ? "fill-amber-400 text-amber-500" : "text-slate-400"}`} />
            Favorites
          </button>

          {/* Sort By */}
          <div className="w-36">
            <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="updated">Recently Updated</option>
              <option value="title">Title (A-Z)</option>
              <option value="score">Highest Score</option>
              <option value="useCount">Most Used</option>
            </Select>
          </div>

          {/* Grid / List Toggle */}
          <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-100 p-1">
            <IconButton
              variant={viewMode === "grid" ? "primary" : "ghost"}
              size="sm"
              aria-label="Grid view"
              onClick={() => onViewModeChange("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </IconButton>
            <IconButton
              variant={viewMode === "list" ? "primary" : "ghost"}
              size="sm"
              aria-label="List view"
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-2xs">
          <span className="font-semibold text-slate-500">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary">
              Search: &quot;{searchQuery}&quot;
            </Badge>
          )}
          {selectedCategory !== "all" && (
            <Badge variant="secondary">
              Category: {MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </Badge>
          )}
          {selectedStatus !== "all" && (
            <Badge variant="secondary">Status: {selectedStatus}</Badge>
          )}
          {favoritesOnly && <Badge variant="warning">Favorites Only</Badge>}
          <button
            type="button"
            onClick={onClearAll}
            className="text-indigo-600 font-bold hover:underline ml-auto"
          >
            Clear all filters ({totalCount} results)
          </button>
        </div>
      )}
    </div>
  );
}
