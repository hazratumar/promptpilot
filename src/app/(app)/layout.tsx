"use client";

import * as React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { PageContainer } from "@/components/shared/page-container";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main id="main-content" className="flex-1 py-6">
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </div>
  );
}
