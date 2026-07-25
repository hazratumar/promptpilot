import { PromptTestResult } from "@/types/test-result";

export interface RunOptions {
  promptId: string;
  promptTitle: string;
  renderedPrompt: string;
  variableValues: Record<string, string>;
  model: string;
  temperature: number;
  categorySlug?: string;
  signal?: AbortSignal;
  forceFail?: boolean;
}

/**
 * Estimates token counts for text.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.trim().length / 4));
}

/**
 * Deterministically generates realistic simulated LLM output, token count, duration, and score benchmarking metrics.
 */
export async function executeMockRun(options: RunOptions): Promise<PromptTestResult> {
  const {
    promptId,
    promptTitle,
    renderedPrompt,
    variableValues,
    model,
    temperature,
    categorySlug = "general",
    signal,
    forceFail = false,
  } = options;

  // Add simulated execution delay (800ms - 1200ms)
  const delayMs = 800 + Math.abs(hashCode(renderedPrompt + model)) % 500;

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => resolve(), delayMs);

    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Run cancelled by user", "AbortError"));
      });
    }
  });

  if (forceFail || variableValues["__force_fail"] === "true") {
    return {
      id: `res-${Date.now()}`,
      promptId,
      promptTitle,
      renderedPrompt,
      variableValues,
      model,
      temperature,
      output: "[Simulated Model Failure] Required variable format invalid or execution timeout reached.",
      status: "failed",
      durationMs: delayMs,
      estimatedInputTokens: estimateTokens(renderedPrompt),
      estimatedOutputTokens: 25,
      scores: {
        clarity: 4.0,
        relevance: 4.0,
        completeness: 3.5,
        overall: 3.8,
      },
      notes: "Execution simulated failure scenario.",
      createdAt: new Date().toISOString(),
    };
  }

  // Deterministic output response generator
  const output = generateDeterministicOutput(promptTitle, categorySlug, variableValues, model);
  const inputTokens = estimateTokens(renderedPrompt);
  const outputTokens = estimateTokens(output);

  // Deterministic score calculation
  const hash = Math.abs(hashCode(renderedPrompt + model + String(temperature)));
  const clarity = 8.5 + (hash % 12) / 10;
  const relevance = 8.6 + ((hash >> 2) % 12) / 10;
  const completeness = 8.4 + ((hash >> 4) % 12) / 10;
  const overall = Number(((clarity + relevance + completeness) / 3).toFixed(1));

  return {
    id: `res-${Date.now()}`,
    promptId,
    promptTitle,
    renderedPrompt,
    variableValues,
    model,
    temperature,
    output,
    status: "success",
    durationMs: delayMs,
    estimatedInputTokens: inputTokens,
    estimatedOutputTokens: outputTokens,
    scores: {
      clarity: Number(clarity.toFixed(1)),
      relevance: Number(relevance.toFixed(1)),
      completeness: Number(completeness.toFixed(1)),
      overall,
    },
    notes: `Simulated run on ${model} with temp ${temperature}.`,
    createdAt: new Date().toISOString(),
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

function generateDeterministicOutput(
  title: string,
  category: string,
  vars: Record<string, string>,
  model: string
): string {
  const varSummary = Object.entries(vars)
    .map(([k, v]) => `- **${k}:** ${v}`)
    .join("\n");

  if (title.toLowerCase().includes("review") || category.includes("engineering")) {
    return `### 1. High-level Summary
Reviewed code snippet for input validation, security practices, and error handling. Overall structure adheres to standard engineering guidelines.

### 2. Analysis & Recommendations
${varSummary || "- Verified code logic"}

- **Security:** Ensure payload sanitization before executing database operations.
- **Performance:** Avoid unnecessary re-renders or database sub-queries.
- **Style:** Maintain consistent explicit TypeScript type annotations.

*Generated with ${model} [Simulated Output]*`;
  }

  if (title.toLowerCase().includes("copy") || category.includes("marketing")) {
    return `### Headline Variation 1 (High Impact)
**Boost Your Workflow Output 3x Faster with ${vars["product_name"] || "PromptPilot"}**

### Subheadline
${vars["draft_copy"] || "Organize, test, and benchmark your AI prompt pipeline in a unified browser workspace."}

### Call to Action
- Primary Button: "Start Free Workspace Demo"
- Secondary Button: "Compare Run Benchmarks"

*Generated with ${model} [Simulated Output]*`;
  }

  return `### Simulated Execution Output for "${title}"

Processed inputs:
${varSummary || "- Standard parameters"}

### Key Findings & Output Summary
1. Input variables successfully bound to template context.
2. Structured output adheres to specified formatting guidelines.
3. Execution completed cleanly with ${model}.

*Simulated output generated by PromptPilot*`;
}
