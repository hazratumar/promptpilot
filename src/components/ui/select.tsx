import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  isInvalid?: boolean;
  options?: Array<{ label: string; value: string; disabled?: boolean }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, isInvalid = false, children, options, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full appearance-none rounded-lg border bg-white pl-3 pr-8 py-2 text-sm text-slate-900 shadow-2xs transition-colors",
            "focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-0 focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50",
            isInvalid
              ? "border-rose-500 focus-visible:outline-rose-600 text-rose-900"
              : "border-slate-300 hover:border-slate-400",
            className
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-500">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
