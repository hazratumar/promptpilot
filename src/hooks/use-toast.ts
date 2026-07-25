"use client";

import * as React from "react";
import { ToastItem, ToastType } from "@/components/ui/toast";

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (options: {
    title: string;
    description?: string;
    type?: ToastType;
    duration?: number;
  }) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
