import { SignInForm } from "@/components/auth/sign-in-form";

export const metadata = {
  title: "Sign In - PromptPilot Demo",
  description: "Sign in to your PromptPilot static SaaS demo workspace.",
};

export default function SignInPage() {
  return <SignInForm />;
}
