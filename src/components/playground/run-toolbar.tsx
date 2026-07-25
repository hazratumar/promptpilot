import { Play, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RunToolbarProps {
  isRunning: boolean;
  onRun: () => void;
  onCancel: () => void;
  onReset: () => void;
  hasVariables: boolean;
}

export function RunToolbar({
  isRunning,
  onRun,
  onCancel,
  onReset,
  hasVariables,
}: RunToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2">
        {isRunning ? (
          <Button
            variant="destructive"
            onClick={onCancel}
            leftIcon={<XCircle className="h-4 w-4" />}
          >
            Cancel Simulation
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onRun}
            leftIcon={<Play className="h-4 w-4 fill-white" />}
          >
            Run Simulation
          </Button>
        )}

        <Button variant="outline" onClick={onReset} leftIcon={<RotateCcw className="h-4 w-4" />}>
          Reset Inputs
        </Button>
      </div>

      <div className="text-2xs text-slate-500 font-medium">
        Deterministic Client-Side Mock Engine Active
      </div>
    </div>
  );
}
