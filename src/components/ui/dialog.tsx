"use client";

import * as React from "react";
import { X } from "lucide-react";
import { IconButton } from "./button";
import { cn } from "@/lib/utils";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export function Dialog({
  isOpen,
  onClose,
  children,
  className,
  maxWidth = "md",
}: DialogProps) {
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Overlay Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl transition-all animate-in zoom-in-95 sm:my-8 z-10",
          maxWidths[maxWidth],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({
  title,
  description,
  onClose,
  className,
}: {
  title: string;
  description?: string;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4 pb-4 border-b border-slate-100", className)}>
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {onClose && (
        <IconButton
          variant="ghost"
          size="sm"
          aria-label="Close dialog"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 -mr-1.5 -mt-1.5"
        >
          <X className="h-4 w-4" />
        </IconButton>
      )}
    </div>
  );
}

export function DialogFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-2.5 pt-4 border-t border-slate-100 mt-6",
        className
      )}
    >
      {children}
    </div>
  );
}
