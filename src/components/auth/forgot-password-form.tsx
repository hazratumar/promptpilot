"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "./demo-notice";
import { isValidEmail } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

export function ForgotPasswordForm() {
  const { addToast } = useToast();
  const [email, setEmail] = React.useState("demo@promptpilot.app");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast({
        title: "Reset Instructions Sent",
        description: "Simulated password reset feedback triggered.",
        type: "success",
      });
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Reset Password</h1>
        <p className="mt-1 text-xs text-slate-500">
          Enter your email address to receive simulated password reset instructions.
        </p>
      </div>

      <DemoNotice showCredentials={false} />

      {isSubmitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Reset Email Sent!</h3>
          <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
            Simulated password reset instructions sent to <strong>{email}</strong>. In this static demo, you can return to sign-in directly.
          </p>
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Email Address" required error={error} htmlFor="forgot-email">
            <Input
              id="forgot-email"
              type="email"
              placeholder="demo@promptpilot.app"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!error}
              leftElement={<Mail className="h-4 w-4" />}
            />
          </FormField>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="w-full"
          >
            Send Reset Instructions
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
