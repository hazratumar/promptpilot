import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled,
  className,
  id,
  ...props
}: SwitchProps) {
  const generatedId = React.useId();
  const switchId = id || generatedId;

  return (
    <div className="flex items-center justify-between gap-4">
      {(label || description) && (
        <div className="text-xs">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                "font-medium text-slate-900 cursor-pointer select-none",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {label}
            </label>
          )}
          {description && <p className="text-slate-500 mt-0.5">{description}</p>}
        </div>
      )}

      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out",
          "focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-indigo-600" : "bg-slate-300",
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
