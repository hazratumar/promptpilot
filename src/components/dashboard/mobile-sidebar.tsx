"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, FileText, FlaskConical, BarChart3, GitCompare, Star, FolderKanban, User, Settings, CreditCard } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { cn } from "@/lib/utils";

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_GROUPS = [
  {
    title: "Overview",
    items: [{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Workspace",
    items: [
      { href: "/prompts", label: "Prompts", icon: FileText },
      { href: "/playground", label: "Playground", icon: FlaskConical },
      { href: "/results", label: "Test Results", icon: BarChart3 },
      { href: "/compare", label: "Compare Runs", icon: GitCompare },
    ],
  },
  {
    title: "Organization",
    items: [
      { href: "/favorites", label: "Favorites", icon: Star },
      { href: "/categories", label: "Categories", icon: FolderKanban },
    ],
  },
  {
    title: "Account",
    items: [
      { href: "/profile", label: "Profile", icon: User },
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/billing", label: "Billing", icon: CreditCard },
    ],
  },
];

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-white flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        <div className="p-4 space-y-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <BrandLogo size="md" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 text-2xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                {group.title}
              </div>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                        isActive
                          ? "bg-indigo-50 text-indigo-700 shadow-2xs font-bold"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-indigo-600" : "text-slate-400")} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 text-center text-xs text-slate-400">
          PromptPilot Workspace &bull; Mobile
        </div>
      </div>
    </div>
  );
}
