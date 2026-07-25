"use client";

import * as React from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { MARKETING_NAV_LINKS } from "@/lib/constants";

export interface MobileMarketingMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMarketingMenu({ isOpen, onClose }: MobileMarketingMenuProps) {
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
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-white">
      {/* Drawer Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200">
        <BrandLogo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close mobile menu"
          className="p-2 text-slate-500 hover:text-slate-900 rounded-lg"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-y-auto py-8 px-6 space-y-8">
        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
          >
            Home
          </Link>
          {MARKETING_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-100 space-y-3">
          <Link
            href="/sign-in"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Sign In to Demo
          </Link>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700"
          >
            Open Dashboard Workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="py-4 px-6 border-t border-slate-100 text-center text-xs text-slate-400">
        PromptPilot Static SaaS &bull; Mobile View
      </div>
    </div>
  );
}
