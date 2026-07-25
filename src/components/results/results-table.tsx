import Link from "next/link";
import { Eye, Star, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import { PromptTestResult } from "@/types/test-result";
import { formatDate } from "@/lib/utils";

export interface ResultsTableProps {
  results: PromptTestResult[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: (selectAll: boolean) => void;
  onViewResult: (result: PromptTestResult) => void;
  onDeleteResult: (result: PromptTestResult) => void;
}

export function ResultsTable({
  results,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onViewResult,
  onDeleteResult,
}: ResultsTableProps) {
  const allSelected = results.length > 0 && selectedIds.length === results.length;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox
              checked={allSelected}
              onChange={(e) => onSelectAll(e.target.checked)}
              aria-label="Select all test results"
            />
          </TableHead>
          <TableHead>Prompt Title</TableHead>
          <TableHead>Model & Temp</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Tokens (In/Out)</TableHead>
          <TableHead>Overall Score</TableHead>
          <TableHead>Executed At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {results.map((res) => {
          const isSelected = selectedIds.includes(res.id);

          return (
            <TableRow key={res.id} className={isSelected ? "bg-indigo-50/50" : undefined}>
              <TableCell>
                <Checkbox
                  checked={isSelected}
                  onChange={() => onToggleSelect(res.id)}
                  aria-label={`Select result for ${res.promptTitle}`}
                />
              </TableCell>
              <TableCell className="font-semibold text-slate-900">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{res.promptTitle}</span>
                  <Badge variant={res.status === "success" ? "success" : "destructive"} size="sm">
                    {res.status}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-slate-600">
                {res.model} <span className="text-slate-400">({res.temperature.toFixed(2)})</span>
              </TableCell>
              <TableCell className="font-mono text-xs text-slate-600">
                {res.durationMs}ms
              </TableCell>
              <TableCell className="font-mono text-xs text-slate-600">
                {res.estimatedInputTokens} / {res.estimatedOutputTokens}
              </TableCell>
              <TableCell className="font-bold text-slate-900">
                <div className="flex items-center gap-1 text-emerald-600">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{res.scores.overall}</span>
                </div>
              </TableCell>
              <TableCell className="text-2xs text-slate-500 font-normal">
                {formatDate(res.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewResult(res)}
                    aria-label="Inspect result"
                  >
                    <Eye className="h-4 w-4 text-slate-600" />
                  </IconButton>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteResult(res)}
                    aria-label="Delete result"
                  >
                    <Trash2 className="h-4 w-4 text-rose-500" />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
