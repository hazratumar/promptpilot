"use client";

import * as React from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, isInvalid = false, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <Lock className="h-4 w-4" />
        </div>

        <input
          type={showPassword ? "text" : "password"}
          ref={ref}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-lg border bg-white pl-9 pr-10 py-2 text-sm text-slate-900 shadow-2xs transition-colors placeholder:text-slate-400 font-mono",
            "focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-0 focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            isInvalid
              ? "border-rose-500 focus-visible:outline-rose-600 text-rose-900"
              : "border-slate-300 hover:border-slate-400",
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 rounded-md"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
