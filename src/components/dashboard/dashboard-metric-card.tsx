import * as React from "react";
import { Card } from "@/components/ui/card";
import { MiniTrend, MiniTrendProps } from "./mini-trend";
import { cn } from "@/lib/utils";

export interface DashboardMetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: MiniTrendProps;
  subtitle?: string;
  className?: string;
}

export function DashboardMetricCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  className,
}: DashboardMetricCardProps) {
  return (
    <Card className={cn("p-5 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md transition-shadow", className)}>
      <div className="flex items-center justify-between">
        <span className="text-2xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      <div>
        <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>
        <div className="mt-2 flex items-center justify-between">
          {trend ? (
            <MiniTrend {...trend} />
          ) : subtitle ? (
            <span className="text-2xs text-slate-500 font-medium">{subtitle}</span>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
