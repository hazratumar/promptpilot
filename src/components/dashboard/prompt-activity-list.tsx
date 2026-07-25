import { PlayCircle, Edit3, Star, Plus } from "lucide-react";
import { ActivityItem, MOCK_ACTIVITIES } from "@/data/dashboard";

export function PromptActivityList() {
  const icons = {
    test_run: <PlayCircle className="h-4 w-4 text-indigo-600" />,
    prompt_created: <Plus className="h-4 w-4 text-emerald-600" />,
    prompt_updated: <Edit3 className="h-4 w-4 text-amber-600" />,
    favorite_added: <Star className="h-4 w-4 text-amber-500 fill-amber-400" />,
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold text-slate-900">Recent Workspace Activity</h3>
        <span className="text-2xs font-semibold text-slate-400">Live Timeline</span>
      </div>

      <div className="space-y-4">
        {MOCK_ACTIVITIES.map((act: ActivityItem) => (
          <div key={act.id} className="flex items-start gap-3 text-xs">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 mt-0.5">
              {icons[act.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-900 truncate">{act.title}</div>
              <div className="text-2xs text-slate-500 mt-0.5 line-clamp-1">
                {act.description}
              </div>
            </div>
            <span className="text-2xs text-slate-400 shrink-0 font-medium">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
