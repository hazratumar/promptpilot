"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { MOCK_PROMPTS } from "@/data/prompts";
import { Prompt } from "@/types/prompt";

export function usePrompts() {
  const [prompts, setPrompts] = React.useState<Prompt[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const stored = getItem<Prompt[]>(STORAGE_KEYS.PROMPTS, []);
    if (stored && Array.isArray(stored) && stored.length > 0) {
      setPrompts(stored);
    } else {
      // Seed storage with MOCK_PROMPTS
      setItem(STORAGE_KEYS.PROMPTS, MOCK_PROMPTS);
      setPrompts(MOCK_PROMPTS);
    }
    setIsLoaded(true);
  }, []);

  const savePrompts = (nextPrompts: Prompt[]) => {
    setPrompts(nextPrompts);
    setItem(STORAGE_KEYS.PROMPTS, nextPrompts);
  };

  const getPrompt = React.useCallback(
    (id: string): Prompt | undefined => {
      return prompts.find((p) => p.id === id || p.slug === id);
    },
    [prompts]
  );

  const addPrompt = (newPromptData: Omit<Prompt, "id" | "slug" | "createdAt" | "updatedAt" | "useCount" | "averageScore">): Prompt => {
    const id = `prompt-${Date.now()}`;
    const slug = newPromptData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newPrompt: Prompt = {
      ...newPromptData,
      id,
      slug,
      useCount: 0,
      averageScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newPrompt, ...prompts];
    savePrompts(updated);
    return newPrompt;
  };

  const updatePrompt = (id: string, updates: Partial<Prompt>): Prompt | null => {
    let target: Prompt | null = null;
    const updated = prompts.map((p) => {
      if (p.id === id) {
        target = {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        return target;
      }
      return p;
    });

    if (target) {
      savePrompts(updated);
    }
    return target;
  };

  const duplicatePrompt = (id: string): Prompt | null => {
    const original = getPrompt(id);
    if (!original) return null;

    const duplicated: Prompt = {
      ...original,
      id: `prompt-${Date.now()}`,
      title: `${original.title} (Copy)`,
      slug: `${original.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      useCount: 0,
    };

    savePrompts([duplicated, ...prompts]);
    return duplicated;
  };

  const toggleFavorite = (id: string): void => {
    savePrompts(
      prompts.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  const updateStatus = (id: string, status: "draft" | "active" | "archived"): void => {
    savePrompts(
      prompts.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const deletePrompt = (id: string): void => {
    savePrompts(prompts.filter((p) => p.id !== id));
  };

  return {
    prompts,
    isLoaded,
    getPrompt,
    addPrompt,
    updatePrompt,
    duplicatePrompt,
    toggleFavorite,
    updateStatus,
    deletePrompt,
  };
}
