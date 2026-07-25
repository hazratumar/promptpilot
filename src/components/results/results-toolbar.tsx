"use client";

import * as React from "react";
import { Search, X, GitCompare, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface ResultsToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedModel: string;
  onModelChange: (m: string) => void;
  selectedStatus: string;
  onStatusChange: (s: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  selectedCount: number;
  onCompareSelected: () => void;
  onExportSelected: () => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function ResultsToolbar({
  searchQuery,
  onSearchChange,
  selectedModel,
  onModelChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  selectedCount,
  onCompareSelected,
  onExportSelected,
  onClearAll,
  hasActiveFilters,
}: ResultsToolbarProps) {
  return (
    <div className="space-y-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search prompt title, output, model, or notes..."
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

        <div className="flex items-center gap-2.5 flex-wrap justify-between md:justify-end">
          <div className="w-36">
            <Select value={selectedModel} onChange={(e) => onModelChange(e.target.value)}>
              <option value="all">All Models</option>
              <option value="Claude 3.7 Sonnet Demo">Claude 3.7 Sonnet</option>
              <option value="GPT-4.1 Demo">GPT-4.1 Demo</option>
              <option value="Gemini 2.5 Pro Demo">Gemini 2.5 Pro</option>
              <option value="Local Model Demo">Local Model</option>
            </Select>
          </div>

          <div className="w-32">
            <Select value={selectedStatus} onChange={(e) => onStatusChange(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </Select>
          </div>

          <div className="w-36">
            <Select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="score">Highest Score</option>
              <option value="duration">Fastest Duration</option>
              <option value="title">Prompt Title</option>
            </Select>
          </div>

          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={onCompareSelected}
                disabled={selectedCount < 2 || selectedCount > 3}
                leftIcon={<GitCompare className="h-3.5 w-3.5" />}
              >
                Compare ({selectedCount})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onExportSelected}
                leftIcon={<Download className="h-3.5 w-3.5" />}
              >
                Export JSON
              </Button>
            </div>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 flex-wrap text-2xs">
          <span className="font-semibold text-slate-500">Active filters:</span>
          {searchQuery && <Badge variant="secondary">Search: &quot;{searchQuery}&quot;</Badge>}
          {selectedModel !== "all" && <Badge variant="secondary">Model: {selectedModel}</Badge>}
          {selectedStatus !== "all" && <Badge variant="secondary">Status: {selectedStatus}</Badge>}
          <button
            type="button"
            onClick={onClearAll}
            className="text-indigo-600 font-bold hover:underline ml-auto"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
