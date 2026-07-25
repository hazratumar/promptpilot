"use client";

import * as React from "react";
import { Search, Menu } from "lucide-react";
import { NotificationMenu } from "./notification-menu";
import { UserMenu } from "./user-menu";
import { CommandDialog } from "./command-dialog";
import { useSession } from "@/hooks/use-session";
import { Badge } from "@/components/ui/badge";

export interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export function Topbar({ onOpenMobileMenu }: TopbarProps) {
  const { user } = useSession();
  const [isCommandOpen, setIsCommandOpen] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 w-full max-w-md">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open mobile menu"
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Search trigger button */}
          <button
            type="button"
            onClick={() => setIsCommandOpen(true)}
            className="relative w-full flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 pl-3 pr-2 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:border-slate-300 transition-colors text-left"
          >
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">Search prompts, tags, categories...</span>
            <kbd className="hidden sm:inline-block ml-auto shrink-0 rounded bg-white px-1.5 py-0.5 text-2xs font-mono text-slate-400 border border-slate-200">
              Ctrl+K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <NotificationMenu />
          <Badge variant="default" className="hidden sm:inline-flex">
            {user?.plan || "Pro"} Plan
          </Badge>
          <div className="md:hidden">
            <UserMenu />
          </div>
        </div>
      </header>

      <CommandDialog isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
}
