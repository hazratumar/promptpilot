import Link from "next/link";
import { Plus, FlaskConical, FolderKanban, GitCompare } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      label: "Create New Prompt",
      description: "Define template variables & model",
      href: "/prompts/new",
      icon: Plus,
      variant: "primary",
    },
    {
      label: "Test Playground",
      description: "Simulate runs & evaluate output",
      href: "/playground",
      icon: FlaskConical,
      variant: "secondary",
    },
    {
      label: "Browse Library",
      description: "Explore all saved prompts",
      href: "/prompts",
      icon: FolderKanban,
      variant: "outline",
    },
    {
      label: "Compare Runs",
      description: "Side-by-side benchmark diff",
      href: "/compare",
      icon: GitCompare,
      variant: "outline",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.href}
            href={act.href}
            className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-200 shadow-2xs hover:shadow-xs transition-all group"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {act.label}
              </div>
              <div className="text-2xs text-slate-500 mt-0.5">{act.description}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
