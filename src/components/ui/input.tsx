import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", isInvalid = false, leftElement, rightElement, disabled, ...props },
    ref
  ) => {
    return (
      <div className="relative w-full">
        {leftElement && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leftElement}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400",
            "focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-0 focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            isInvalid
              ? "border-rose-500 focus-visible:outline-rose-600 text-rose-900"
              : "border-slate-300 hover:border-slate-400",
            leftElement && "pl-9",
            rightElement && "pr-9",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
