import { PromptVariable } from "@/types/prompt";

/**
 * Extracts variable names written as {{variable_name}} in prompt text.
 */
export function extractVariables(content: string): string[] {
  if (!content) return [];
  const matches = content.match(/\{\{([a-zA-Z0-9_]+)\}\}/g);
  if (!matches) return [];

  const names = matches.map((m) => m.replace(/\{\{|\}\}/g, "").trim());
  return Array.from(new Set(names));
}

/**
 * Normalizes extracted token names to PromptVariable definitions.
 */
export function syncVariablesWithContent(
  content: string,
  existingVariables: PromptVariable[] = []
): PromptVariable[] {
  const extractedNames = extractVariables(content);
  const existingMap = new Map(existingVariables.map((v) => [v.name, v]));

  return extractedNames.map((name, index) => {
    if (existingMap.has(name)) {
      return existingMap.get(name)!;
    }
    const label = name
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return {
      id: `v-${Date.now()}-${index}`,
      name,
      label,
      placeholder: `Enter ${label}...`,
      defaultValue: "",
      required: true,
    };
  });
}

/**
 * Replaces {{variable_name}} tokens with values or default values.
 */
export function renderPrompt(
  content: string,
  values: Record<string, string> = {},
  variables: PromptVariable[] = []
): string {
  if (!content) return "";

  let rendered = content;
  const varMap = new Map(variables.map((v) => [v.name, v.defaultValue || ""]));

  // Find all tokens
  const tokens = extractVariables(content);
  for (const token of tokens) {
    const val = values[token] !== undefined ? values[token] : varMap.get(token) || `[${token}]`;
    const regex = new RegExp(`\\{\\{${token}\\}\\}`, "g");
    rendered = rendered.replace(regex, val);
  }

  return rendered;
}
