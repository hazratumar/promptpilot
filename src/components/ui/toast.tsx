"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const type = toast.type || "info";

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />,
    info: <Info className="h-4 w-4 text-indigo-500 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-200 bg-white",
    error: "border-rose-200 bg-white",
    info: "border-indigo-200 bg-white",
  };

  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-3 w-full max-w-sm rounded-xl border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-5 duration-200 pointer-events-auto",
        borders[type]
      )}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-900">{toast.title}</h4>
        {toast.description && (
          <p className="mt-0.5 text-2xs text-slate-500 leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-md"
        aria-label="Dismiss toast"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
