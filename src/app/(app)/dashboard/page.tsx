"use client";

import * as React from "react";
import Link from "next/link";
import {
  FileText,
  FlaskConical,
  BarChart3,
  Star,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { DashboardMetricCard } from "@/components/dashboard/dashboard-metric-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { PromptActivityList } from "@/components/dashboard/prompt-activity-list";
import { CategorySummary } from "@/components/dashboard/category-summary";
import { MOCK_PROMPTS } from "@/data/prompts";
import { MOCK_TEST_RESULTS } from "@/data/test-results";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useSession();

  const activeCount = MOCK_PROMPTS.filter((p) => p.status === "active").length;
  const avgScore = (
    MOCK_PROMPTS.reduce((sum, p) => sum + p.averageScore, 0) / MOCK_PROMPTS.length
  ).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Welcome Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {user?.name?.split(" ")[0] || "Alex"} 👋
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Overview of your prompt engineering workspace and recent test benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/prompts/new">
            <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
              New Prompt
            </Button>
          </Link>
          <Link href="/playground">
            <Button variant="outline" leftIcon={<FlaskConical className="h-4 w-4 text-indigo-600" />}>
              Test Playground
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardMetricCard
          title="Total Prompts"
          value={MOCK_PROMPTS.length}
          icon={<FileText className="h-5 w-5" />}
          trend={{ value: `${activeCount} active`, type: "up", label: "in library" }}
        />

        <DashboardMetricCard
          title="Tests Run"
          value={MOCK_TEST_RESULTS.length}
          icon={<FlaskConical className="h-5 w-5" />}
          trend={{ value: "+12%", type: "up", label: "vs last week" }}
        />

        <DashboardMetricCard
          title="Avg Quality Score"
          value={`${avgScore} / 10`}
          icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
          subtitle="Evaluation quality scale"
        />

        <DashboardMetricCard
          title="Categories"
          value="6"
          icon={<BarChart3 className="h-5 w-5" />}
          subtitle="Engineering & Marketing"
        />
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Quick Actions
        </h2>
        <QuickActions />
      </div>

      {/* Main Grid: Recently Edited Prompts & Side Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prompts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recently Updated Prompts</h2>
            <Link
              href="/prompts"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View all library
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {MOCK_PROMPTS.slice(0, 5).map((prompt) => (
              <div
                key={prompt.id}
                className="p-4 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/prompts/${prompt.id}`}
                      className="font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors truncate"
                    >
                      {prompt.title}
                    </Link>
                    {prompt.isFavorite && (
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{prompt.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-xs">
                  <span className="inline-flex items-center gap-1 font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    {prompt.averageScore}
                  </span>
                  <Link
                    href={`/playground?promptId=${prompt.id}`}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 px-2.5 py-1 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    Run Test
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets: Category Distribution & Recent Activity */}
        <div className="space-y-6">
          <CategorySummary />
          <PromptActivityList />
        </div>
      </div>
    </div>
  );
}
