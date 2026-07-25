"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { UserProfile } from "@/types/user";
import { MOCK_USER } from "@/data/user";

export function useProfile() {
  const [profile, setProfile] = React.useState<UserProfile>(MOCK_USER);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const stored = getItem<UserProfile>(STORAGE_KEYS.PROFILE, MOCK_USER);
    setProfile({ ...MOCK_USER, ...stored });
    setIsLoaded(true);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    setItem(STORAGE_KEYS.PROFILE, updated);
  };

  return {
    profile,
    isLoaded,
    updateProfile,
  };
}
