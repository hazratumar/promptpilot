"use client";

import * as React from "react";
import { getItem, setItem } from "@/lib/storage";
import { STORAGE_KEYS } from "@/lib/constants";
import { MOCK_TEST_RESULTS } from "@/data/test-results";
import { PromptTestResult } from "@/types/test-result";

export function useTestResults() {
  const [results, setResults] = React.useState<PromptTestResult[]>([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const stored = getItem<PromptTestResult[]>(STORAGE_KEYS.RESULTS, []);
    if (stored && Array.isArray(stored) && stored.length > 0) {
      setResults(stored);
    } else {
      setItem(STORAGE_KEYS.RESULTS, MOCK_TEST_RESULTS);
      setResults(MOCK_TEST_RESULTS);
    }
    setIsLoaded(true);
  }, []);

  const saveResults = (nextResults: PromptTestResult[]) => {
    setResults(nextResults);
    setItem(STORAGE_KEYS.RESULTS, nextResults);
  };

  const addResult = (newResult: PromptTestResult): void => {
    const updated = [newResult, ...results];
    saveResults(updated);
  };

  const deleteResult = (id: string): void => {
    saveResults(results.filter((r) => r.id !== id));
  };

  const deleteMultipleResults = (ids: string[]): void => {
    const set = new Set(ids);
    saveResults(results.filter((r) => !set.has(r.id)));
  };

  return {
    results,
    isLoaded,
    addResult,
    deleteResult,
    deleteMultipleResults,
  };
}
