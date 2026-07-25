import { Sliders, Cpu, CheckCircle2, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Prompt } from "@/types/prompt";
import { MOCK_CATEGORIES } from "@/data/categories";
import { formatDate } from "@/lib/utils";

export function PromptMetadataPanel({ prompt }: { prompt: Prompt }) {
  const category = MOCK_CATEGORIES.find((c) => c.id === prompt.categoryId);

  return (
    <div className="space-y-6">
      {/* Metrics & Details Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Prompt Specification
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Category</span>
            <span className="font-semibold text-slate-900">{category?.name || "General"}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Recommended Model</span>
            <Badge variant="default" className="gap-1">
              <Cpu className="h-3 w-3" /> {prompt.recommendedModel}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Quality Score</span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {prompt.averageScore > 0 ? `${prompt.averageScore} / 10` : "Not evaluated"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Total Run Count</span>
            <span className="font-mono font-semibold text-slate-900">{prompt.useCount} runs</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-2xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Created {formatDate(prompt.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Updated {formatDate(prompt.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Variables Specification Manager */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Sliders className="h-4 w-4 text-indigo-600" /> Dynamic Variables ({prompt.variables.length})
          </h3>
        </div>

        {prompt.variables.length === 0 ? (
          <p className="text-xs text-slate-500">No variable tokens defined in prompt template.</p>
        ) : (
          <div className="space-y-2.5">
            {prompt.variables.map((v) => (
              <div key={v.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-indigo-700">
                    &#123;&#123;{v.name}&#125;&#125;
                  </span>
                  {v.required && <Badge variant="destructive" size="sm">Required</Badge>}
                </div>
                <div className="text-xs font-medium text-slate-800">{v.label}</div>
                {v.defaultValue && (
                  <div className="text-2xs font-mono text-slate-500 truncate">
                    Default: &quot;{v.defaultValue}&quot;
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tags Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Tags & Metadata
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {prompt.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
