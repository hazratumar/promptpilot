"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "./demo-notice";
import { isValidEmail, isValidPassword } from "@/lib/validation";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";
import { MOCK_USER } from "@/data/user";

export function SignInForm() {
  const router = useRouter();
  const { login } = useSession();
  const { addToast } = useToast();

  const [email, setEmail] = React.useState("demo@promptpilot.app");
  const [password, setPassword] = React.useState("PromptPilot123!");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleFillDemo = () => {
    setEmail("demo@promptpilot.app");
    setPassword("PromptPilot123!");
    setErrors({});
    addToast({
      title: "Demo Credentials Filled",
      description: "Click Sign In to access the workspace.",
      type: "info",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!isValidEmail(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!isValidPassword(password)) {
      errs.password = "Password must be at least 6 characters";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Create session for demo user
      login({
        ...MOCK_USER,
        email: email.trim(),
      });

      addToast({
        title: "Welcome to PromptPilot!",
        description: "Simulated demo session active.",
        type: "success",
      });

      setIsSubmitting(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Sign in to PromptPilot</h1>
        <p className="mt-1 text-xs text-slate-500">
          Enter your details or use the demo account below to continue.
        </p>
      </div>

      <DemoNotice />

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Email Address" required error={errors.email} htmlFor="signin-email">
          <Input
            id="signin-email"
            type="email"
            placeholder="demo@promptpilot.app"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            leftElement={<Mail className="h-4 w-4" />}
          />
        </FormField>

        <FormField
          label="Password"
          required
          error={errors.password}
          htmlFor="signin-password"
          helperText={
            <Link
              href="/forgot-password"
              className="text-2xs font-semibold text-indigo-600 hover:text-indigo-700 float-right"
            >
              Forgot password?
            </Link>
          }
        >
          <PasswordInput
            id="signin-password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
        </FormField>

        <div className="pt-2 space-y-3">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="w-full"
          >
            Sign In to Workspace
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleFillDemo}
            leftIcon={<Sparkles className="h-4 w-4 text-indigo-600" />}
            className="w-full text-xs"
          >
            Fill Demo Account Credentials
          </Button>
        </div>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="font-bold text-indigo-600 hover:text-indigo-700">
          Create Demo Account
        </Link>
      </div>
    </div>
  );
}
