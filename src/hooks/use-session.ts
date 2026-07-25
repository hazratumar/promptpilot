"use client";

import * as React from "react";
import { getDemoSession, saveDemoSession, clearDemoSession, DemoSession } from "@/lib/storage";
import { MOCK_USER } from "@/data/user";
import { UserProfile } from "@/types/user";

export function useSession() {
  const [session, setSession] = React.useState<DemoSession | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const existing = getDemoSession();
    if (existing) {
      setSession(existing);
    } else {
      // Initialize with default demo user session if none exists
      const defaultSession = saveDemoSession(MOCK_USER);
      setSession(defaultSession);
    }
    setIsLoading(false);
  }, []);

  const login = (user: UserProfile) => {
    const newSession = saveDemoSession(user);
    setSession(newSession);
  };

  const logout = () => {
    clearDemoSession();
    setSession(null);
  };

  return {
    session,
    user: session?.user || MOCK_USER,
    isLoggedIn: !!session,
    isLoading,
    login,
    logout,
  };
}
