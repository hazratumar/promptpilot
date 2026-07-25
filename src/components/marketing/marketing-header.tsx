"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { PageContainer } from "@/components/shared/page-container";
import { MobileMarketingMenu } from "./mobile-marketing-menu";
import { MARKETING_NAV_LINKS } from "@/lib/constants";

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <PageContainer className="flex h-16 items-center justify-between">
          <BrandLogo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {MARKETING_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs & Mobile trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
            >
              Open Workspace
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </PageContainer>
      </header>

      <MobileMarketingMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
