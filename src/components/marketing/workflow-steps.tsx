import { FileCode, PlayCircle, TrendingUp, type LucideIcon } from "lucide-react";
import { WORKFLOW_STEPS, WorkflowStep } from "@/data/marketing";

const iconMap: Record<string, LucideIcon> = {
  FileCode,
  PlayCircle,
  TrendingUp,
};

export function WorkflowSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      {WORKFLOW_STEPS.map((step: WorkflowStep) => {
        const Icon = iconMap[step.iconName] || FileCode;
        return (
          <div
            key={step.stepNumber}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-indigo-600 font-mono">
                {step.stepNumber}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
