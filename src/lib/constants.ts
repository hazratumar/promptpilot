export const APP_NAME = "PromptPilot";
export const APP_DESCRIPTION =
  "Organize, create, test, compare, and improve your AI prompts with confidence.";

export const STORAGE_KEYS = {
  PROMPTS: "promptpilot.prompts.v1",
  RESULTS: "promptpilot.results.v1",
  CATEGORIES: "promptpilot.categories.v1",
  SESSION: "promptpilot.session.v1",
  PREFERENCES: "promptpilot.preferences.v1",
  PROFILE: "promptpilot.profile.v1",
  SUBSCRIPTION: "promptpilot.subscription.v1",
} as const;

export const DEFAULT_DEMO_MODELS = [
  { id: "gpt-4.1-demo", name: "GPT-4.1 Demo", provider: "OpenAI" },
  { id: "claude-sonnet-demo", name: "Claude 3.7 Sonnet Demo", provider: "Anthropic" },
  { id: "gemini-pro-demo", name: "Gemini 2.5 Pro Demo", provider: "Google" },
  { id: "local-model-demo", name: "Llama 3 Local Demo", provider: "Meta" },
] as const;

export const MARKETING_NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
] as const;

export const DASHBOARD_NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard", iconName: "LayoutDashboard" },
  { href: "/prompts", label: "Prompts", iconName: "FileText" },
  { href: "/playground", label: "Playground", iconName: "FlaskConical" },
  { href: "/results", label: "Test Results", iconName: "BarChart3" },
  { href: "/compare", label: "Compare Runs", iconName: "GitCompare" },
  { href: "/favorites", label: "Favorites", iconName: "Star" },
  { href: "/categories", label: "Categories", iconName: "FolderKanban" },
] as const;
