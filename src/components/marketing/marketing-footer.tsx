import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { PageContainer } from "@/components/shared/page-container";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-xs text-slate-600">
      <PageContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <BrandLogo size="md" />
          <p className="text-slate-500 leading-relaxed">
            The browser-first prompt engineering workspace for organizing, testing, and improving AI prompts.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-3">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className="hover:text-indigo-600 transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">
                Dashboard Demo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-3">Demo Workspace</h4>
          <p className="text-slate-500 leading-relaxed mb-3">
            PromptPilot operates completely client-side in your browser using local storage.
          </p>
          <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-2xs font-semibold text-slate-700 border border-slate-200">
            Phase 3 Active &bull; Version 1.0
          </div>
        </div>
      </PageContainer>

      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-slate-400 text-2xs">
        &copy; 2026 PromptPilot Static SaaS. All rights reserved.
      </div>
    </footer>
  );
}
