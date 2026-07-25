import { MOCK_CATEGORIES } from "@/data/categories";
import { MOCK_PROMPTS } from "@/data/prompts";

export function CategorySummary() {
  const categoryCounts = MOCK_CATEGORIES.map((cat) => {
    const count = MOCK_PROMPTS.filter((p) => p.categoryId === cat.id).length;
    return {
      ...cat,
      count,
      percentage: Math.round((count / MOCK_PROMPTS.length) * 100),
    };
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Category Distribution</h3>
        <span className="text-2xs font-semibold text-slate-400">{MOCK_PROMPTS.length} prompts total</span>
      </div>

      <div className="space-y-3.5">
        {categoryCounts.map((cat) => (
          <div key={cat.id} className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">{cat.name}</span>
              <span className="text-2xs font-bold text-slate-500">
                {cat.count} {cat.count === 1 ? "prompt" : "prompts"} ({cat.percentage}%)
              </span>
            </div>
            {/* HTML/CSS Bar */}
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${Math.max(cat.percentage, 8)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
