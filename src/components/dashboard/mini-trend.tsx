import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MiniTrendProps {
  value: string;
  type?: "up" | "down" | "neutral";
  label?: string;
}

export function MiniTrend({ value, type = "up", label }: MiniTrendProps) {
  const styles = {
    up: "bg-emerald-50 text-emerald-700 border-emerald-200",
    down: "bg-rose-50 text-rose-700 border-rose-200",
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const icons = {
    up: <TrendingUp className="h-3 w-3 text-emerald-600" />,
    down: <TrendingDown className="h-3 w-3 text-rose-600" />,
    neutral: <Minus className="h-3 w-3 text-slate-500" />,
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-2xs font-bold border",
          styles[type]
        )}
      >
        {icons[type]}
        {value}
      </span>
      {label && <span className="text-2xs text-slate-400 font-medium">{label}</span>}
    </div>
  );
}
