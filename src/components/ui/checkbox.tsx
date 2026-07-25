import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, checked, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex items-start gap-3 select-none">
        <div className="relative flex items-center pt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-4 w-4 rounded border border-slate-300 bg-white transition-colors flex items-center justify-center cursor-pointer",
              "peer-focus-visible:outline-2 peer-focus-visible:outline-indigo-600 peer-focus-visible:outline-offset-2",
              "peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-checked:text-white",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:bg-slate-100",
              className
            )}
            onClick={() => {
              if (!disabled) {
                const el = document.getElementById(checkboxId);
                if (el) el.click();
              }
            }}
          >
            <Check className="h-3 w-3 opacity-0 peer-checked:opacity-100 stroke-[3]" />
          </div>
        </div>
        {(label || description) && (
          <div className="text-xs">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  "font-medium text-slate-900 cursor-pointer",
                  disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-slate-500 mt-0.5">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";
