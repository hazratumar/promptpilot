import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isInvalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isInvalid = false, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "flex min-h-[100px] w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400 font-mono",
          "focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-0 focus-visible:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
          isInvalid
            ? "border-rose-500 focus-visible:outline-rose-600 text-rose-900"
            : "border-slate-300 hover:border-slate-400",
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
