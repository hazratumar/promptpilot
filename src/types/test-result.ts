export type PromptTestResult = {
  id: string;
  promptId: string;
  promptTitle: string;
  renderedPrompt: string;
  variableValues: Record<string, string>;
  model: string;
  temperature: number;
  output: string;
  status: "success" | "failed";
  durationMs: number;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  scores: {
    clarity: number;
    relevance: number;
    completeness: number;
    overall: number;
  };
  notes?: string;
  createdAt: string;
};
