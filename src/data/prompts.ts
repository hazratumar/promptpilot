import { Prompt } from "@/types/prompt";

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: "prompt-1",
    title: "Pull Request Reviewer",
    slug: "pull-request-reviewer",
    description: "Systematic code review assistant focusing on performance, security, edge cases, and readability.",
    content: `Act as a principal software engineer. Review the following code change written in {{language}}.

Context:
- Feature summary: {{feature_summary}}
- Code diff / file snippet:
\`\`\`
{{code_snippet}}
\`\`\`

Provide a constructive code review structured as:
1. High-level Summary
2. Potential Bugs & Security Concerns
3. Performance Improvements
4. Code Cleanliness & Style Recommendations`,
    categoryId: "cat-engineering",
    tags: ["code-review", "github", "engineering", "quality"],
    variables: [
      { id: "v1", name: "language", label: "Programming Language", placeholder: "TypeScript", defaultValue: "TypeScript", required: true },
      { id: "v2", name: "feature_summary", label: "Feature Summary", placeholder: "Add user profile endpoint", defaultValue: "Add user profile update endpoint", required: true },
      { id: "v3", name: "code_snippet", label: "Code Snippet", placeholder: "Paste code here...", defaultValue: "export async function updateUser(req, res) { ... }", required: true },
    ],
    recommendedModel: "Claude 3.7 Sonnet Demo",
    status: "active",
    isFavorite: true,
    isSaved: true,
    useCount: 142,
    averageScore: 9.4,
    createdAt: "2026-06-10T09:30:00Z",
    updatedAt: "2026-07-20T14:15:00Z",
    lastTestedAt: "2026-07-24T16:00:00Z",
  },
  {
    id: "prompt-2",
    title: "Landing Page Copy Improver",
    slug: "landing-page-copy-improver",
    description: "Transforms technical feature descriptions into high-converting hero headlines and value propositions.",
    content: `You are an expert SaaS conversion copywriter. 

Product Name: {{product_name}}
Target Audience: {{target_audience}}
Current Draft Copy:
"{{draft_copy}}"

Task:
Generate 3 distinct variations of Hero Headline, Subheadline, and CTA button text.`,
    categoryId: "cat-marketing",
    tags: ["copywriting", "landing-page", "conversion", "saas"],
    variables: [
      { id: "v4", name: "product_name", label: "Product Name", placeholder: "PromptPilot", defaultValue: "PromptPilot", required: true },
      { id: "v5", name: "target_audience", label: "Target Audience", placeholder: "AI users", defaultValue: "AI developers and product teams", required: true },
      { id: "v6", name: "draft_copy", label: "Current Draft Copy", placeholder: "Draft...", defaultValue: "Manage and test your AI prompts in one place with score tracking.", required: true },
    ],
    recommendedModel: "GPT-4.1 Demo",
    status: "active",
    isFavorite: true,
    isSaved: true,
    useCount: 98,
    averageScore: 9.1,
    createdAt: "2026-06-15T11:00:00Z",
    updatedAt: "2026-07-18T10:20:00Z",
    lastTestedAt: "2026-07-23T11:45:00Z",
  },
  {
    id: "prompt-3",
    title: "Customer Interview Synthesizer",
    slug: "customer-interview-synthesizer",
    description: "Extracts key insights, pain points, feature requests, and direct quotes from user research transcripts.",
    content: `Analyze the following customer interview transcript for {{product_area}}.

Transcript:
"""
{{transcript}}
"""

Extract structured insights:
1. Top 3 User Pain Points (with direct quotes)
2. Feature Requests & Desired Outcomes
3. Unexpected Workarounds
4. Recommended Product Action Items`,
    categoryId: "cat-product",
    tags: ["user-research", "product", "synthesis", "ux"],
    variables: [
      { id: "v7", name: "product_area", label: "Product Area", placeholder: "Playground", defaultValue: "Prompt Playground", required: true },
      { id: "v8", name: "transcript", label: "Interview Transcript", placeholder: "Paste transcript...", defaultValue: "Interviewer: How do you currently test prompts? User: We copy paste into ChatGPT...", required: true },
    ],
    recommendedModel: "Claude 3.7 Sonnet Demo",
    status: "active",
    isFavorite: false,
    isSaved: true,
    useCount: 64,
    averageScore: 8.8,
    createdAt: "2026-06-20T14:00:00Z",
    updatedAt: "2026-07-12T09:10:00Z",
    lastTestedAt: "2026-07-21T15:30:00Z",
  },
  {
    id: "prompt-4",
    title: "SQL Query Optimizer",
    slug: "sql-query-optimizer",
    description: "Analyzes slow SQL queries and recommends index strategies, subquery refactoring, and joins optimization.",
    content: `Analyze this {{database_type}} query for performance bottlenecks.

Database Engine: {{database_type}}
Existing Indexes: {{indexes}}
Query:
\`\`\`sql
{{sql_query}}
\`\`\`

Provide Bottleneck Analysis, Optimized Query Code, and Suggested New Indexes.`,
    categoryId: "cat-analytics",
    tags: ["sql", "database", "performance", "optimization"],
    variables: [
      { id: "v9", name: "database_type", label: "Database Engine", placeholder: "PostgreSQL 16", defaultValue: "PostgreSQL 16", required: true },
      { id: "v10", name: "indexes", label: "Existing Indexes", placeholder: "idx_users", defaultValue: "users(id), orders(user_id, created_at)", required: false },
      { id: "v11", name: "sql_query", label: "SQL Query", placeholder: "SELECT...", defaultValue: "SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE status = 'active')", required: true },
    ],
    recommendedModel: "GPT-4.1 Demo",
    status: "active",
    isFavorite: true,
    isSaved: true,
    useCount: 112,
    averageScore: 9.3,
    createdAt: "2026-05-18T08:00:00Z",
    updatedAt: "2026-07-19T17:40:00Z",
    lastTestedAt: "2026-07-25T08:20:00Z",
  },
  {
    id: "prompt-5",
    title: "Release Notes Generator",
    slug: "release-notes-generator",
    description: "Converts git commit logs or PR descriptions into customer-facing product update notes.",
    content: `Generate user-friendly release notes for version {{version_number}} of {{product_name}}.

Raw Commit Logs:
{{commit_logs}}`,
    categoryId: "cat-engineering",
    tags: ["changelog", "release-notes", "documentation"],
    variables: [
      { id: "v12", name: "version_number", label: "Version Number", placeholder: "v2.1.0", defaultValue: "v2.1.0", required: true },
      { id: "v13", name: "product_name", label: "Product Name", placeholder: "PromptPilot", defaultValue: "PromptPilot", required: true },
      { id: "v14", name: "commit_logs", label: "Commit Logs", placeholder: "Logs...", defaultValue: "- feat: add prompt comparison view\n- fix: solve prompt variable parsing issue", required: true },
    ],
    recommendedModel: "Gemini 2.5 Pro Demo",
    status: "active",
    isFavorite: false,
    isSaved: false,
    useCount: 45,
    averageScore: 8.6,
    createdAt: "2026-06-28T16:00:00Z",
    updatedAt: "2026-07-15T12:00:00Z",
    lastTestedAt: "2026-07-19T13:10:00Z",
  },
  {
    id: "prompt-6",
    title: "Empathetic Customer Support Resolver",
    slug: "empathetic-customer-support-resolver",
    description: "Drafts thoughtful, clear, and reassuring responses to sensitive customer support inquiries.",
    content: `Draft a supportive customer service reply.

Customer Problem: {{customer_issue}}
Internal Solution: {{internal_solution}}`,
    categoryId: "cat-support",
    tags: ["customer-support", "email", "empathy"],
    variables: [
      { id: "v15", name: "customer_issue", label: "Customer Issue", placeholder: "Export failed", defaultValue: "Cannot export prompt library JSON file", required: true },
      { id: "v16", name: "internal_solution", label: "Internal Solution", placeholder: "Solution...", defaultValue: "Clear browser cache or use Settings -> Export data button.", required: true },
    ],
    recommendedModel: "GPT-4.1 Demo",
    status: "active",
    isFavorite: false,
    isSaved: true,
    useCount: 78,
    averageScore: 9.0,
    createdAt: "2026-07-01T10:00:00Z",
    updatedAt: "2026-07-22T08:45:00Z",
    lastTestedAt: "2026-07-24T10:00:00Z",
  },
  {
    id: "prompt-7",
    title: "System Architecture Advisor",
    slug: "system-architecture-advisor",
    description: "Evaluates architectural trade-offs, scalability bottlenecks, and data flows for new system designs.",
    content: `Analyze system architecture for {{system_name}}. Expected Scale: {{expected_scale}}. Architecture: {{architecture_description}}`,
    categoryId: "cat-engineering",
    tags: ["architecture", "systems", "scalability"],
    variables: [
      { id: "v18", name: "system_name", label: "System Name", placeholder: "Benchmark Service", defaultValue: "Realtime Benchmark Service", required: true },
      { id: "v19", name: "expected_scale", label: "Expected Scale", placeholder: "Scale...", defaultValue: "50,000 runs per day", required: true },
      { id: "v21", name: "architecture_description", label: "Architecture Description", placeholder: "Description...", defaultValue: "Client submits run -> Web server queues task in Redis...", required: true },
    ],
    recommendedModel: "Claude 3.7 Sonnet Demo",
    status: "draft",
    isFavorite: false,
    isSaved: false,
    useCount: 19,
    averageScore: 8.7,
    createdAt: "2026-07-05T13:00:00Z",
    updatedAt: "2026-07-21T18:00:00Z",
    lastTestedAt: "2026-07-21T18:00:00Z",
  },
  {
    id: "prompt-8",
    title: "Cold Email Personalizer",
    slug: "cold-email-personalizer",
    description: "Generates tailored outbound email hooks connecting prospect research with product value proposition.",
    content: `Write a concise 4-sentence email to {{prospect_title}} at {{company_name}}. Context: {{prospect_context}}. Value Prop: {{value_prop}}`,
    categoryId: "cat-marketing",
    tags: ["outreach", "cold-email", "sales"],
    variables: [
      { id: "v22", name: "prospect_title", label: "Prospect Title", placeholder: "Head of AI", defaultValue: "Head of AI Product", required: true },
      { id: "v23", name: "company_name", label: "Company Name", placeholder: "Acme", defaultValue: "Acme AI", required: true },
      { id: "v24", name: "prospect_context", label: "Prospect Context", placeholder: "Context...", defaultValue: "Expanding their AI agent engineering team.", required: true },
      { id: "v25", name: "value_prop", label: "Value Proposition", placeholder: "Value...", defaultValue: "PromptPilot standardizes prompt testing 5x faster.", required: true },
    ],
    recommendedModel: "GPT-4.1 Demo",
    status: "active",
    isFavorite: false,
    isSaved: true,
    useCount: 52,
    averageScore: 8.9,
    createdAt: "2026-07-10T15:30:00Z",
    updatedAt: "2026-07-20T11:15:00Z",
    lastTestedAt: "2026-07-23T14:20:00Z",
  },
  {
    id: "prompt-9",
    title: "API Documentation Writer",
    slug: "api-documentation-writer",
    description: "Creates comprehensive REST or GraphQL endpoint documentation with cURL examples and schema tables.",
    content: `Write developer documentation for the {{endpoint_name}} endpoint ({{http_method}} {{endpoint_path}}). Request payload: {{request_body}}`,
    categoryId: "cat-engineering",
    tags: ["api", "docs", "developer-experience"],
    variables: [
      { id: "v26", name: "endpoint_name", label: "Endpoint Name", placeholder: "Create Prompt", defaultValue: "Create Prompt Endpoint", required: true },
      { id: "v27", name: "http_method", label: "HTTP Method", placeholder: "POST", defaultValue: "POST", required: true },
      { id: "v28", name: "endpoint_path", label: "Endpoint Path", placeholder: "/api/prompts", defaultValue: "/v1/prompts", required: true },
      { id: "v29", name: "request_body", label: "Request Body", placeholder: "JSON...", defaultValue: "{ title: string, content: string, categoryId: string }", required: true },
    ],
    recommendedModel: "Claude 3.7 Sonnet Demo",
    status: "active",
    isFavorite: true,
    isSaved: true,
    useCount: 88,
    averageScore: 9.3,
    createdAt: "2026-06-01T08:00:00Z",
    updatedAt: "2026-07-17T16:00:00Z",
    lastTestedAt: "2026-07-22T09:40:00Z",
  },
  {
    id: "prompt-10",
    title: "UX Microcopy Writer",
    slug: "ux-microcopy-writer",
    description: "Crafts concise, friendly button labels, error toasts, and empty state strings for web apps.",
    content: `Generate microcopy variations for {{ui_element_type}} when {{user_action_context}}.`,
    categoryId: "cat-design",
    tags: ["ux", "microcopy", "design", "ui"],
    variables: [
      { id: "v30", name: "ui_element_type", label: "UI Element Type", placeholder: "Error Toast", defaultValue: "Error Toast Notification", required: true },
      { id: "v31", name: "user_action_context", label: "User Action Context", placeholder: "Export failed", defaultValue: "User attempted JSON export while offline", required: true },
    ],
    recommendedModel: "GPT-4.1 Demo",
    status: "active",
    isFavorite: false,
    isSaved: false,
    useCount: 37,
    averageScore: 8.7,
    createdAt: "2026-06-22T10:00:00Z",
    updatedAt: "2026-07-14T11:20:00Z",
  },
  {
    id: "prompt-11",
    title: "Feature PRD Spec Generator",
    slug: "feature-prd-spec-generator",
    description: "Outlines product requirements, user stories, acceptance criteria, and edge cases.",
    content: `Draft a Product Requirements Document (PRD) for {{feature_name}}. Goal: {{feature_goal}}. User Persona: {{user_persona}}`,
    categoryId: "cat-product",
    tags: ["prd", "spec", "product", "requirements"],
    variables: [
      { id: "v32", name: "feature_name", label: "Feature Name", placeholder: "Side-by-Side Comparison", defaultValue: "Side-by-Side Prompt Comparison Engine", required: true },
      { id: "v33", name: "feature_goal", label: "Feature Goal", placeholder: "Compare runs...", defaultValue: "Enable prompt engineers to benchmark 2-3 runs simultaneously", required: true },
      { id: "v34", name: "user_persona", label: "User Persona", placeholder: "AI Developer", defaultValue: "Lead AI Engineer", required: true },
    ],
    recommendedModel: "Claude 3.7 Sonnet Demo",
    status: "active",
    isFavorite: true,
    isSaved: true,
    useCount: 104,
    averageScore: 9.5,
    createdAt: "2026-05-25T14:00:00Z",
    updatedAt: "2026-07-24T18:00:00Z",
    lastTestedAt: "2026-07-25T10:15:00Z",
  },
  {
    id: "prompt-12",
    title: "Ad Copy Generator (Google & Meta)",
    slug: "ad-copy-generator",
    description: "Generates compliant Google Search headlines and Meta ad descriptions tailored to value propositions.",
    content: `Generate high-CTR ad copy for {{target_platform}}. Product: {{product_name}}. Value Prop: {{value_prop}}`,
    categoryId: "cat-marketing",
    tags: ["ads", "marketing", "google-ads", "facebook-ads"],
    variables: [
      { id: "v35", name: "target_platform", label: "Target Platform", placeholder: "Google Search Ads", defaultValue: "Google Search & Meta Ads", required: true },
      { id: "v36", name: "product_name", label: "Product Name", placeholder: "PromptPilot", defaultValue: "PromptPilot", required: true },
      { id: "v37", name: "value_prop", label: "Value Proposition", placeholder: "Organize AI prompts...", defaultValue: "Organize and benchmark AI prompts in local browser storage.", required: true },
    ],
    recommendedModel: "GPT-4.1 Demo",
    status: "active",
    isFavorite: false,
    isSaved: true,
    useCount: 49,
    averageScore: 8.9,
    createdAt: "2026-06-12T12:00:00Z",
    updatedAt: "2026-07-16T15:00:00Z",
  },
  {
    id: "prompt-13",
    title: "Database Schema Architect",
    slug: "database-schema-architect",
    description: "Designs normalized relational PostgreSQL tables with foreign key constraints and index suggestions.",
    content: `Design PostgreSQL schema tables for domain model: {{domain_model}}. Key entities: {{key_entities}}`,
    categoryId: "cat-engineering",
    tags: ["database", "postgres", "schema", "sql"],
    variables: [
      { id: "v38", name: "domain_model", label: "Domain Model", placeholder: "Prompt Benchmark Suite", defaultValue: "Prompt Benchmarking SaaS", required: true },
      { id: "v39", name: "key_entities", label: "Key Entities", placeholder: "Prompts, Runs, Categories", defaultValue: "Prompt, PromptTestResult, PromptCategory, User", required: true },
    ],
    recommendedModel: "Claude 3.7 Sonnet Demo",
    status: "archived",
    isFavorite: false,
    isSaved: false,
    useCount: 31,
    averageScore: 8.5,
    createdAt: "2026-05-10T11:00:00Z",
    updatedAt: "2026-07-02T16:00:00Z",
  },
  {
    id: "prompt-14",
    title: "Customer Onboarding Sequence",
    slug: "customer-onboarding-sequence",
    description: "Drafts a 3-email welcome drip sequence introducing new users to product features.",
    content: `Write a 3-part email onboarding drip sequence for new users signing up for {{product_name}}. Step 1: {{step_1_focus}}`,
    categoryId: "cat-support",
    tags: ["onboarding", "email", "retention"],
    variables: [
      { id: "v40", name: "product_name", label: "Product Name", placeholder: "PromptPilot", defaultValue: "PromptPilot", required: true },
      { id: "v41", name: "step_1_focus", label: "Step 1 Focus", placeholder: "Create first prompt", defaultValue: "Create first prompt & extract variables", required: true },
    ],
    recommendedModel: "GPT-4.1 Demo",
    status: "active",
    isFavorite: false,
    isSaved: true,
    useCount: 62,
    averageScore: 9.0,
    createdAt: "2026-06-08T09:00:00Z",
    updatedAt: "2026-07-19T14:30:00Z",
  },
  {
    id: "prompt-15",
    title: "SEO Blog Article Outline",
    slug: "seo-blog-article-outline",
    description: "Generates comprehensive H2/H3 blog post outlines targeting specific keyword intent.",
    content: `Generate an SEO-optimized blog outline for target keyword: {{target_keyword}}. Target Audience: {{target_audience}}`,
    categoryId: "cat-marketing",
    tags: ["seo", "blog", "content", "outline"],
    variables: [
      { id: "v42", name: "target_keyword", label: "Target Keyword", placeholder: "prompt engineering playground", defaultValue: "best prompt engineering playground tools 2026", required: true },
      { id: "v43", name: "target_audience", label: "Target Audience", placeholder: "AI Engineers", defaultValue: "AI Product Managers and Prompt Engineers", required: true },
    ],
    recommendedModel: "Gemini 2.5 Pro Demo",
    status: "active",
    isFavorite: false,
    isSaved: true,
    useCount: 71,
    averageScore: 9.1,
    createdAt: "2026-06-04T13:00:00Z",
    updatedAt: "2026-07-18T09:15:00Z",
  },
];
