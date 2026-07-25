import { STORAGE_KEYS } from "./constants";
import { UserProfile } from "@/types/user";

/**
 * Safe local storage getter with SSR guard and JSON parse error handling.
 */
export function getItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch (error) {
    console.warn(`[PromptPilot Storage] Error reading key "${key}":`, error);
    return fallback;
  }
}

/**
 * Safe local storage setter with SSR guard.
 */
export function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[PromptPilot Storage] Error writing key "${key}":`, error);
  }
}

/**
 * Safe local storage remover with SSR guard.
 */
export function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[PromptPilot Storage] Error removing key "${key}":`, error);
  }
}

export interface DemoSession {
  user: UserProfile;
  authenticatedAt: string;
  isDemo: boolean;
}

export function getDemoSession(): DemoSession | null {
  return getItem<DemoSession | null>(STORAGE_KEYS.SESSION, null);
}

export function saveDemoSession(user: UserProfile): DemoSession {
  const session: DemoSession = {
    user,
    authenticatedAt: new Date().toISOString(),
    isDemo: true,
  };
  setItem(STORAGE_KEYS.SESSION, session);
  return session;
}

export function clearDemoSession(): void {
  removeItem(STORAGE_KEYS.SESSION);
}

export function clearAllStorage(): void {
  if (typeof window === "undefined") return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith("promptpilot.")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch (error) {
    console.warn("[PromptPilot Storage] Error clearing storage:", error);
  }
}
