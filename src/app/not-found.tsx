import Link from "next/link";
import { Compass, Home, LayoutDashboard } from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <header className="border-b border-slate-200 bg-white py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BrandLogo />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Compass className="h-8 w-8 animate-pulse" />
          </div>

          <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 mb-2">
            404 Error
          </span>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Page Not Found
          </h1>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Sorry, we couldn&apos;t find the prompt route or page you were looking for. It might have been moved or removed.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors"
            >
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        PromptPilot Static SaaS &bull; Phase 1 Foundation
      </footer>
    </div>
  );
}
