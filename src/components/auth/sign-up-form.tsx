"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, ArrowRight } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DemoNotice } from "./demo-notice";
import { isValidEmail, isValidPassword } from "@/lib/validation";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

export function SignUpForm() {
  const router = useRouter();
  const { login } = useSession();
  const { addToast } = useToast();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "Full name is required";
    if (!isValidEmail(email)) errs.email = "Please enter a valid email address";
    if (!isValidPassword(password)) errs.password = "Password must be at least 6 characters";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!agreeTerms) errs.agreeTerms = "You must agree to the demo Terms & Privacy Policy";

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      login({
        id: `usr-demo-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        role: "Prompt Engineer",
        plan: "Pro",
        createdAt: new Date().toISOString(),
      });

      addToast({
        title: "Demo Account Created!",
        description: "Welcome to your PromptPilot workspace.",
        type: "success",
      });

      setIsSubmitting(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Create a PromptPilot Account</h1>
        <p className="mt-1 text-xs text-slate-500">
          Set up your workspace demo account in seconds.
        </p>
      </div>

      <DemoNotice showCredentials={false} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Full Name" required error={errors.name} htmlFor="signup-name">
          <Input
            id="signup-name"
            placeholder="e.g. Alex Rivera"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name}
            leftElement={<User className="h-4 w-4" />}
          />
        </FormField>

        <FormField label="Email Address" required error={errors.email} htmlFor="signup-email">
          <Input
            id="signup-email"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
            leftElement={<Mail className="h-4 w-4" />}
          />
        </FormField>

        <FormField label="Password" required error={errors.password} htmlFor="signup-password">
          <PasswordInput
            id="signup-password"
            placeholder="At least 6 characters..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
        </FormField>

        <FormField label="Confirm Password" required error={errors.confirmPassword} htmlFor="signup-confirm">
          <PasswordInput
            id="signup-confirm"
            placeholder="Re-enter password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isInvalid={!!errors.confirmPassword}
          />
        </FormField>

        <div className="pt-1">
          <Checkbox
            label={
              <span>
                I agree to the{" "}
                <Link href="/terms" className="underline text-indigo-600">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline text-indigo-600">
                  Privacy Policy
                </Link>
              </span>
            }
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          {errors.agreeTerms && (
            <p className="text-xs text-rose-600 font-medium mt-1">{errors.agreeTerms}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="w-full mt-2"
        >
          Create Demo Account
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-bold text-indigo-600 hover:text-indigo-700">
          Sign In
        </Link>
      </div>
    </div>
  );
}
