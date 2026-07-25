"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Settings, CreditCard, LogOut, ChevronUp } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useSession } from "@/hooks/use-session";
import { useToast } from "@/hooks/use-toast";

export function UserMenu() {
  const router = useRouter();
  const { user, logout } = useSession();
  const { addToast } = useToast();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-slate-200/50 transition-colors text-left focus-visible:outline-2 focus-visible:outline-indigo-600"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={user?.name || "Alex Rivera"} size="sm" />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 truncate">
                {user?.name || "Alex Rivera"}
              </div>
              <div className="text-2xs text-slate-500 truncate">
                {user?.email || "demo@promptpilot.app"}
              </div>
            </div>
          </div>
          <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="right" className="w-56">
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          <User className="h-4 w-4" /> Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          <Settings className="h-4 w-4" /> Workspace Preferences
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/billing")}>
          <CreditCard className="h-4 w-4" /> Subscription & Billing
        </DropdownMenuItem>
        <DropdownMenuItem destructive onClick={handleSignOut}>
          <LogOut className="h-4 w-4" /> Sign Out Demo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
