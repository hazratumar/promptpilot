import { PromptTestResult } from "@/types/test-result";

export const MOCK_TEST_RESULTS: PromptTestResult[] = [
  {
    id: "result-1",
    promptId: "prompt-1",
    promptTitle: "Pull Request Reviewer",
    renderedPrompt: `Act as a principal software engineer. Review the following code change written in TypeScript.

Context:
- Feature summary: Add user profile update endpoint
- Code diff / file snippet:
\`\`\`
export async function updateUser(req, res) { ... }
\`\`\`

Provide a constructive code review structured as:
1. High-level Summary
2. Potential Bugs & Security Concerns
3. Performance Improvements
4. Code Cleanliness & Style Recommendations`,
    variableValues: {
      language: "TypeScript",
      feature_summary: "Add user profile update endpoint",
      code_snippet: "export async function updateUser(req, res) { ... }",
    },
    model: "Claude 3.7 Sonnet Demo",
    temperature: 0.2,
    output: `### 1. High-level Summary
The PR introduces the user profile update handler. Overall structure follows REST conventions, but lacks validation sanitization.

### 2. Potential Bugs & Security Concerns
- Missing input validation for payload fields.
- Unhandled async error exceptions could leak internal server state.

### 3. Performance Improvements
- Avoid fetching full user record when updating specific columns.

### 4. Code Cleanliness & Style Recommendations
- Add explicit type annotations for Request and Response objects.`,
    status: "success",
    durationMs: 1420,
    estimatedInputTokens: 180,
    estimatedOutputTokens: 260,
    scores: {
      clarity: 9.5,
      relevance: 9.6,
      completeness: 9.2,
      overall: 9.4,
    },
    notes: "Excellent code review structure. Clear and actionable recommendations.",
    createdAt: "2026-07-24T16:00:00Z",
  },
  {
    id: "result-2",
    promptId: "prompt-2",
    promptTitle: "Landing Page Copy Improver",
    renderedPrompt: `You are an expert SaaS conversion copywriter.

Product Name: PromptPilot
Target Audience: AI developers and product teams
Current Draft Copy:
"Manage and test your AI prompts in one place with score tracking."

Task:
Generate 3 distinct variations of Hero Headline, Subheadline, and CTA button text.`,
    variableValues: {
      product_name: "PromptPilot",
      target_audience: "AI developers and product teams",
      draft_copy: "Manage and test your AI prompts in one place with score tracking.",
    },
    model: "GPT-4.1 Demo",
    temperature: 0.7,
    output: `### Variation 1 (Direct & Clear)
- **Hero Headline:** Ship High-Performing AI Prompts with Confidence
- **Subheadline:** Organize, test, and benchmark prompt quality across models in a unified developer playground.
- **CTA:** Start Testing Prompts Free

### Variation 2 (Pain-Point Driven)
- **Hero Headline:** Stop Guessing Why Your Prompts Fail in Production
- **Subheadline:** Gain full visibility into prompt performance, token costs, and version changes before deploying.
- **CTA:** Compare Prompt Runs

### Variation 3 (Aspiration-Focused)
- **Hero Headline:** Elevate Your Team's AI Output Quality
- **Subheadline:** Empower prompt engineers and product builders to collaborate seamlessly on production prompts.
- **CTA:** Explore Playground`,
    status: "success",
    durationMs: 1180,
    estimatedInputTokens: 140,
    estimatedOutputTokens: 210,
    scores: {
      clarity: 9.2,
      relevance: 9.4,
      completeness: 9.0,
      overall: 9.2,
    },
    notes: "Variation 1 provides strong clarity for technical decision makers.",
    createdAt: "2026-07-23T11:45:00Z",
  },
  {
    id: "result-3",
    promptId: "prompt-4",
    promptTitle: "SQL Query Optimizer",
    renderedPrompt: `Analyze this PostgreSQL 16 query for performance bottlenecks.

Database Engine: PostgreSQL 16
Existing Indexes: users(id), orders(user_id, created_at)
Query:
\`\`\`sql
SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE status = 'active')
\`\`\``,
    variableValues: {
      database_type: "PostgreSQL 16",
      indexes: "users(id), orders(user_id, created_at)",
      sql_query: "SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE status = 'active')",
    },
    model: "GPT-4.1 Demo",
    temperature: 0.1,
    output: `### Bottleneck Analysis
Using an \`IN\` subquery forces PostgreSQL to evaluate or join unindexed status filtering on the \`users\` table.

### Optimized Query Code
\`\`\`sql
SELECT o.*
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.status = 'active';
\`\`\`

### Suggested New Indexes
\`\`\`sql
CREATE INDEX idx_users_status_id ON users(status, id);
\`\`\``,
    status: "success",
    durationMs: 950,
    estimatedInputTokens: 110,
    estimatedOutputTokens: 145,
    scores: {
      clarity: 9.6,
      relevance: 9.5,
      completeness: 9.4,
      overall: 9.5,
    },
    notes: "Direct JOIN optimization significantly improves query plan execution speed.",
    createdAt: "2026-07-25T08:20:00Z",
  },
  {
    id: "result-4",
    promptId: "prompt-3",
    promptTitle: "Customer Interview Synthesizer",
    renderedPrompt: `Analyze the following customer interview transcript for Prompt Playground.

Transcript:
"""
Interviewer: How do you currently test prompts? User: We copy paste into ChatGPT and compare manually...
"""`,
    variableValues: {
      product_area: "Prompt Playground",
      transcript: "Interviewer: How do you currently test prompts? User: We copy paste into ChatGPT and compare manually...",
    },
    model: "Claude 3.7 Sonnet Demo",
    temperature: 0.3,
    output: `### 1. Top User Pain Points
- **Manual Copy-Pasting:** Users waste significant time transferring text between browser tabs.
- **Lack of Benchmarking:** No easy way to view side-by-side run outputs across iterations.

### 2. Feature Requests
- Side-by-side output comparison view.
- Variable template auto-detection.

### 3. Recommended Product Action Items
- Prioritize visual side-by-side diff tool in playground UI.`,
    status: "success",
    durationMs: 1310,
    estimatedInputTokens: 210,
    estimatedOutputTokens: 180,
    scores: {
      clarity: 8.9,
      relevance: 9.0,
      completeness: 8.7,
      overall: 8.8,
    },
    notes: "Accurately highlighted manual copy-paste frustration.",
    createdAt: "2026-07-21T15:30:00Z",
  },
  {
    id: "result-5",
    promptId: "prompt-6",
    promptTitle: "Empathetic Customer Support Resolver",
    renderedPrompt: `Draft a supportive customer service reply.

Customer Problem: Cannot export prompt library JSON file
Internal Solution: Clear browser cache or use Settings -> Export data button.
Tone Requested: Warm, reassuring, and solution-focused`,
    variableValues: {
      customer_issue: "Cannot export prompt library JSON file",
      internal_solution: "Clear browser cache or use Settings -> Export data button.",
      tone_preference: "Warm, reassuring, and solution-focused",
    },
    model: "GPT-4.1 Demo",
    temperature: 0.5,
    output: `Hi there,

Thank you for reaching out! I completely understand how important it is to have immediate access to your prompt backups, and I'm here to help ensure your library exports smoothly.

To resolve this right away:
1. Navigate to **Settings** -> **Data Management** and click **Export Data**.
2. If the button appears inactive, a quick browser refresh or clearing cached data will restore export functionality instantly.

Please let me know if you hit any snags—I'm happy to step in and assist further!

Best regards,
PromptPilot Support Team`,
    status: "success",
    durationMs: 880,
    estimatedInputTokens: 125,
    estimatedOutputTokens: 160,
    scores: {
      clarity: 9.1,
      relevance: 9.2,
      completeness: 8.9,
      overall: 9.0,
    },
    createdAt: "2026-07-24T10:00:00Z",
  },
  {
    id: "result-6",
    promptId: "prompt-7",
    promptTitle: "System Architecture Advisor",
    renderedPrompt: `Analyze the proposed system architecture for Realtime Benchmark Service.`,
    variableValues: {
      system_name: "Realtime Benchmark Service",
      expected_scale: "50,000 runs per day",
      tech_stack: "Next.js, TypeScript, Redis, PostgreSQL",
      architecture_description: "Client submits run request -> Web server queues task in Redis...",
    },
    model: "Local Model Demo",
    temperature: 0.4,
    output: `[Simulated Timeout Warning] Execution took longer than expected due to worker queue depth. Analysis completed with default heuristics.`,
    status: "failed",
    durationMs: 3500,
    estimatedInputTokens: 310,
    estimatedOutputTokens: 45,
    scores: {
      clarity: 5.0,
      relevance: 4.5,
      completeness: 4.0,
      overall: 4.5,
    },
    notes: "Simulated run failure for testing error states.",
    createdAt: "2026-07-21T18:00:00Z",
  },
];
