"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { User, Key, Shield, LogOut, Save } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { PasswordInput } from "@/components/auth/password-input";
import { useProfile } from "@/hooks/use-profile";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  const { logout } = useSession();
  const { addToast } = useToast();

  const [name, setName] = React.useState(profile.name);
  const [role, setRole] = React.useState(profile.role || "Senior Prompt Engineer");
  const [bio, setBio] = React.useState(profile.bio || "");

  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateProfile({ name, role, bio });
      setIsSaving(false);
      addToast({
        title: "Profile Saved",
        description: "Your user profile details were updated in local browser storage.",
        type: "success",
      });
    }, 400);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password confirmation does not match.");
      return;
    }

    addToast({
      title: "Password Updated",
      description: "Simulated password change completed safely in browser.",
      type: "success",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSignOut = () => {
    logout();
    addToast({
      title: "Signed Out",
      description: "Demo session cleared safely from local storage.",
      type: "info",
    });
    router.push("/sign-in");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <PageHeader
        title="User Profile & Security"
        description="Manage your account profile details, credentials, and model preferences."
      />

      {/* Profile Details Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <Avatar name={name} size="lg" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">{name}</h2>
            <p className="text-xs text-slate-500">{profile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name" required>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormField>

          <FormField label="Job Title / Role">
            <Input value={role} onChange={(e) => setRole(e.target.value)} />
          </FormField>
        </div>

        <FormField label="Bio & Purpose">
          <Textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about how you use PromptPilot..."
          />
        </FormField>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" type="submit" isLoading={isSaving} leftIcon={<Save className="h-4 w-4" />}>
            Save Profile Details
          </Button>
        </div>
      </form>

      {/* Password Change Form */}
      <form onSubmit={handlePasswordChange} className="space-y-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-600" /> Security & Password (Simulated)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test password validation rules safely in local browser state.
          </p>
        </div>

        {passwordError && (
          <div className="p-3 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
            {passwordError}
          </div>
        )}

        <div className="space-y-4 max-w-md">
          <FormField label="Current Password">
            <PasswordInput value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
          </FormField>

          <FormField label="New Password">
            <PasswordInput value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </FormField>

          <FormField label="Confirm New Password">
            <PasswordInput value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormField>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="outline" type="submit">
            Update Password
          </Button>
        </div>
      </form>

      {/* Sign Out Card */}
      <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Sign Out Demo Session</h3>
          <p className="text-xs text-slate-500 mt-0.5">Clear local demo session token and return to Sign In screen.</p>
        </div>
        <Button variant="destructive" onClick={handleSignOut} leftIcon={<LogOut className="h-4 w-4" />}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
