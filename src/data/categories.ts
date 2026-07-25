import { PromptCategory } from "@/types/category";

export const MOCK_CATEGORIES: PromptCategory[] = [
  {
    id: "cat-engineering",
    name: "Software Engineering",
    slug: "engineering",
    description: "Prompts for code reviews, refactoring, documentation, and debugging.",
    icon: "Code2",
    accent: "violet",
  },
  {
    id: "cat-marketing",
    name: "Marketing & Copywriting",
    slug: "marketing",
    description: "Prompts for ad copy, landing pages, email campaigns, and SEO content.",
    icon: "Megaphone",
    accent: "indigo",
  },
  {
    id: "cat-product",
    name: "Product & Strategy",
    slug: "product",
    description: "Prompts for PRDs, user interview analysis, feature specs, and roadmap prioritization.",
    icon: "Layers",
    accent: "blue",
  },
  {
    id: "cat-analytics",
    name: "Data & Analytics",
    slug: "analytics",
    description: "Prompts for SQL queries, metrics dashboard design, and statistical data insights.",
    icon: "BarChart",
    accent: "cyan",
  },
  {
    id: "cat-support",
    name: "Customer Experience",
    slug: "customer-experience",
    description: "Prompts for support responses, onboarding emails, and CSAT recovery scripts.",
    icon: "Headphones",
    accent: "emerald",
  },
  {
    id: "cat-design",
    name: "Design & UX",
    slug: "design-ux",
    description: "Prompts for microcopy generation, design critique summaries, and accessibility specs.",
    icon: "Palette",
    accent: "purple",
  },
];
