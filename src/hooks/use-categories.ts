"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { MOCK_CATEGORIES } from "@/data/categories";
import { Category } from "@/types/category";

export function useCategories() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const stored = getItem<Category[]>(STORAGE_KEYS.CATEGORIES, []);
    if (stored && Array.isArray(stored) && stored.length > 0) {
      setCategories(stored);
    } else {
      setItem(STORAGE_KEYS.CATEGORIES, MOCK_CATEGORIES);
      setCategories(MOCK_CATEGORIES);
    }
    setIsLoaded(true);
  }, []);

  const saveCategories = (nextCategories: Category[]) => {
    setCategories(nextCategories);
    setItem(STORAGE_KEYS.CATEGORIES, nextCategories);
  };

  const getCategoryBySlug = React.useCallback(
    (slug: string): Category | undefined => {
      return categories.find((c) => c.slug === slug || c.id === slug);
    },
    [categories]
  );

  const addCategory = (data: Omit<Category, "id" | "slug">): Category => {
    const id = `cat-${Date.now()}`;
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newCategory: Category = {
      ...data,
      id,
      slug,
    };

    saveCategories([...categories, newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>): Category | null => {
    let target: Category | null = null;
    const updated = categories.map((c) => {
      if (c.id === id) {
        target = { ...c, ...updates };
        return target;
      }
      return c;
    });

    if (target) {
      saveCategories(updated);
    }
    return target;
  };

  const deleteCategory = (id: string): void => {
    saveCategories(categories.filter((c) => c.id !== id));
  };

  return {
    categories,
    isLoaded,
    getCategoryBySlug,
    addCategory,
    updateCategory,
    deleteCategory,
  };
}
