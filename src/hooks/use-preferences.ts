"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";

export interface WorkspacePreferences {
  defaultModel: string;
  defaultTemperature: number;
  viewMode: "grid" | "list";
  itemsPerPage: number;
  compactMode: boolean;
}

const DEFAULT_PREFERENCES: WorkspacePreferences = {
  defaultModel: "Claude 3.7 Sonnet Demo",
  defaultTemperature: 0.4,
  viewMode: "grid",
  itemsPerPage: 12,
  compactMode: false,
};

export function usePreferences() {
  const [preferences, setPreferences] = React.useState<WorkspacePreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const stored = getItem<WorkspacePreferences>(STORAGE_KEYS.PREFERENCES, DEFAULT_PREFERENCES);
    setPreferences({ ...DEFAULT_PREFERENCES, ...stored });
    setIsLoaded(true);
  }, []);

  const updatePreferences = (updates: Partial<WorkspacePreferences>) => {
    const updated = { ...preferences, ...updates };
    setPreferences(updated);
    setItem(STORAGE_KEYS.PREFERENCES, updated);
  };

  return {
    preferences,
    isLoaded,
    updatePreferences,
  };
}
