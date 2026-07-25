"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, FlaskConical, BarChart3, Star, Compass, ArrowRight } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { MOCK_PROMPTS } from "@/data/prompts";

export interface CommandDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandDialog({ isOpen, onClose }: CommandDialogProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const filteredPrompts = React.useMemo(() => {
    if (!query.trim()) return MOCK_PROMPTS.slice(0, 4);
    const q = query.toLowerCase();
    return MOCK_PROMPTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [query]);

  const navShortcuts = [
    { label: "Dashboard Workspace", href: "/dashboard", icon: Compass },
    { label: "Prompt Library", href: "/prompts", icon: FileText },
    { label: "Testing Playground", href: "/playground", icon: FlaskConical },
    { label: "Test Results History", href: "/results", icon: BarChart3 },
    { label: "Workspace Favorites", href: "/favorites", icon: Star },
  ];

  const handleNavigate = (href: string) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="lg" className="p-0 overflow-hidden">
      {/* Search Input Bar */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-white">
        <Search className="h-4 w-4 text-indigo-600 shrink-0" />
        <input
          type="text"
          placeholder="Search prompts, categories, tags, or workspace actions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full text-sm text-slate-900 placeholder:text-slate-400 bg-transparent border-0 focus:outline-none"
        />
        <kbd className="hidden sm:inline-block rounded bg-slate-100 px-2 py-0.5 text-2xs font-mono text-slate-500 border border-slate-200">
          ESC
        </kbd>
      </div>

      {/* Results List */}
      <div className="p-3 max-h-96 overflow-y-auto space-y-4">
        {/* Navigation Section */}
        <div>
          <div className="px-3 py-1 text-2xs font-bold uppercase tracking-wider text-slate-400">
            Quick Navigation
          </div>
          <div className="space-y-1 mt-1">
            {navShortcuts.map((nav) => {
              const Icon = nav.icon;
              return (
                <button
                  key={nav.href}
                  type="button"
                  onClick={() => handleNavigate(nav.href)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-indigo-600" />
                    <span>{nav.label}</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 opacity-50" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Prompts Section */}
        <div>
          <div className="px-3 py-1 text-2xs font-bold uppercase tracking-wider text-slate-400">
            Prompts ({filteredPrompts.length})
          </div>
          <div className="space-y-1 mt-1">
            {filteredPrompts.length === 0 ? (
              <div className="px-3 py-2 text-xs text-slate-500">No prompt templates match query.</div>
            ) : (
              filteredPrompts.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleNavigate(`/prompts/${p.id}`)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-100 transition-colors text-left"
                >
                  <div>
                    <div className="font-bold text-slate-900">{p.title}</div>
                    <div className="text-2xs text-slate-500 line-clamp-1">{p.description}</div>
                  </div>
                  <span className="text-2xs font-semibold text-indigo-600 shrink-0">Score {p.averageScore}</span>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
