"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  BarChart3,
  GitCompare,
  Star,
  FolderKanban,
  User,
  Settings,
  CreditCard,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { UserMenu } from "./user-menu";
import { cn } from "@/lib/utils";

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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 border-r border-slate-200 bg-white flex-col justify-between shrink-0 min-h-screen">
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <BrandLogo size="md" />
        </div>

        {NAV_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            <div className="px-3 text-2xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
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
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors select-none",
                      isActive
                        ? "bg-indigo-50 text-indigo-700 shadow-2xs font-bold"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-indigo-600" : "text-slate-400"
                      )}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/60">
        <UserMenu />
      </div>
    </aside>
  );
}
