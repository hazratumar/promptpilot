import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ className, children, required, ...props }: LabelProps) {
  return (
    <label
      className={cn("block text-xs font-semibold text-slate-700 mb-1.5", className)}
      {...props}
    >
      {children}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  );
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  type?: "error" | "helper";
}

export function FormMessage({
  className,
  type = "error",
  children,
  ...props
}: FormMessageProps) {
  if (!children) return null;
  return (
    <div
      className={cn(
        "text-xs mt-1.5",
        type === "error" ? "text-rose-600 font-medium" : "text-slate-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: React.ReactNode;
  htmlFor?: string;
}

export function FormField({
  label,
  required,
  error,
  helperText,
  htmlFor,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("w-full space-y-1", className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <FormMessage type="error">{error}</FormMessage>
      ) : helperText ? (
        <FormMessage type="helper">{helperText}</FormMessage>
      ) : null}
    </div>
  );
}
