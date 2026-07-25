import Link from "next/link";
import { ArrowLeft, Compass, Construction } from "lucide-react";
import { PageContainer } from "./page-container";

interface PlaceholderPageProps {
  title: string;
  category: string;
  description: string;
  route: string;
  backHref?: string;
  backLabel?: string;
}

export function PlaceholderPage({
  title,
  category,
  description,
  route,
  backHref = "/dashboard",
  backLabel = "Back to Dashboard",
}: PlaceholderPageProps) {
  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
          <Construction className="h-7 w-7" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 mb-4">
          <Compass className="h-3.5 w-3.5 text-indigo-600" />
          <span>{category}</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          {description}
        </p>

        <div className="mt-6 rounded-lg bg-slate-50 border border-slate-200/80 p-3 text-xs font-mono text-slate-500">
          Route: <span className="text-slate-800 font-semibold">{route}</span>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Go to Landing Page
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
