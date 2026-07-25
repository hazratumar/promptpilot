"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { Spinner } from "@/components/ui/spinner";
import { PromptSelector } from "@/components/playground/prompt-selector";
import { VariableInputPanel } from "@/components/playground/variable-input-panel";
import { RunSettings } from "@/components/playground/run-settings";
import { RenderedPromptPanel } from "@/components/playground/rendered-prompt-panel";
import { SimulatedOutputPanel } from "@/components/playground/simulated-output-panel";
import { RunToolbar } from "@/components/playground/run-toolbar";
import { renderPrompt } from "@/lib/prompt-variables";
import { executeMockRun } from "@/lib/mock-runner";
import { usePrompts } from "@/hooks/use-prompts";
import { useTestResults } from "@/hooks/use-test-results";
import { useToast } from "@/hooks/use-toast";
import { PromptTestResult } from "@/types/test-result";
import { MOCK_CATEGORIES } from "@/data/categories";

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const initialPromptId = searchParams?.get("promptId") || "";

  const { prompts, updatePrompt, isLoaded } = usePrompts();
  const { addResult } = useTestResults();
  const { addToast } = useToast();

  const [selectedPromptId, setSelectedPromptId] = React.useState(initialPromptId);
  const [variableValues, setVariableValues] = React.useState<Record<string, string>>({});
  const [model, setModel] = React.useState("Claude 3.7 Sonnet Demo");
  const [temperature, setTemperature] = React.useState(0.4);

  const [isRunning, setIsRunning] = React.useState(false);
  const [runResult, setRunResult] = React.useState<PromptTestResult | null>(null);
  const [runError, setRunError] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});

  const abortControllerRef = React.useRef<AbortController | null>(null);

  React.useEffect(() => {
    if (isLoaded && prompts.length > 0) {
      if (initialPromptId && prompts.some((p) => p.id === initialPromptId)) {
        setSelectedPromptId(initialPromptId);
      } else if (!selectedPromptId) {
        setSelectedPromptId(prompts[0].id);
      }
    }
  }, [isLoaded, prompts, initialPromptId, selectedPromptId]);

  const activePrompt = React.useMemo(() => {
    return prompts.find((p) => p.id === selectedPromptId) || null;
  }, [prompts, selectedPromptId]);

  React.useEffect(() => {
    if (activePrompt) {
      const defaults: Record<string, string> = {};
      activePrompt.variables.forEach((v) => {
        defaults[v.name] = v.defaultValue || "";
      });
      setVariableValues(defaults);
      setModel(activePrompt.recommendedModel || "Claude 3.7 Sonnet Demo");
      setRunResult(null);
      setRunError(null);
      setFieldErrors({});
    }
  }, [activePrompt]);

  const renderedText = React.useMemo(() => {
    if (!activePrompt) return "";
    return renderPrompt(activePrompt.content, variableValues, activePrompt.variables);
  }, [activePrompt, variableValues]);

  const validate = (): boolean => {
    if (!activePrompt) return false;
    const errs: Record<string, string> = {};

    for (const v of activePrompt.variables) {
      if (v.required) {
        const val = variableValues[v.name];
        if (!val || !val.trim()) {
          errs[v.name] = `${v.label} is required`;
        }
      }
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRun = async () => {
    if (!activePrompt) return;
    if (!validate()) {
      addToast({
        title: "Validation Error",
        description: "Please fill required variable fields.",
        type: "error",
      });
      return;
    }

    setIsRunning(true);
    setRunError(null);

    const category = MOCK_CATEGORIES.find((c) => c.id === activePrompt.categoryId);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await executeMockRun({
        promptId: activePrompt.id,
        promptTitle: activePrompt.title,
        renderedPrompt: renderedText,
        variableValues,
        model,
        temperature,
        categorySlug: category?.slug || "general",
        signal: controller.signal,
      });

      setRunResult(res);
      addResult(res);

      updatePrompt(activePrompt.id, {
        useCount: (activePrompt.useCount || 0) + 1,
        lastTestedAt: new Date().toISOString(),
      });

      addToast({
        title: "Run Simulation Completed",
        description: `Score: ${res.scores.overall} / 10 (${res.durationMs}ms)`,
        type: "success",
      });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") {
        addToast({
          title: "Run Cancelled",
          description: "Simulation execution was cancelled.",
          type: "info",
        });
      } else {
        setRunError("Execution error occurred during simulation.");
      }
    } finally {
      setIsRunning(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const handleReset = () => {
    if (activePrompt) {
      const defaults: Record<string, string> = {};
      activePrompt.variables.forEach((v) => {
        defaults[v.name] = v.defaultValue || "";
      });
      setVariableValues(defaults);
      setFieldErrors({});
      setRunResult(null);
      setRunError(null);
    }
  };

  return (
    <div className="space-y-6">
      <RunToolbar
        isRunning={isRunning}
        onRun={handleRun}
        onCancel={handleCancel}
        onReset={handleReset}
        hasVariables={!!activePrompt && activePrompt.variables.length > 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <PromptSelector
            prompts={prompts}
            selectedPromptId={selectedPromptId}
            onSelectPromptId={setSelectedPromptId}
          />

          {activePrompt && (
            <>
              <VariableInputPanel
                variables={activePrompt.variables}
                values={variableValues}
                onChange={setVariableValues}
                errors={fieldErrors}
              />

              <RunSettings
                model={model}
                onModelChange={setModel}
                temperature={temperature}
                onTemperatureChange={setTemperature}
              />
            </>
          )}
        </div>

        <div className="lg:col-span-8 space-y-6">
          <RenderedPromptPanel text={renderedText} />

          <SimulatedOutputPanel
            isRunning={isRunning}
            result={runResult}
            error={runError}
          />
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prompt Testing Playground"
        description="Simulate prompt execution, test dynamic variable values, and evaluate output quality score benchmarks."
      />

      <React.Suspense fallback={<div className="py-12 text-center"><Spinner size="lg" /></div>}>
        <PlaygroundContent />
      </React.Suspense>
    </div>
  );
}
