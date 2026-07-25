import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DemoNoticeProps {
  className?: string;
  showCredentials?: boolean;
}

export function DemoNotice({ className, showCredentials = true }: DemoNoticeProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-indigo-50/90 border border-indigo-200/80 p-3.5 flex items-start gap-3 text-xs text-indigo-950 shadow-2xs",
        className
      )}
    >
      <Info className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
      <div className="space-y-1">
        <span className="font-bold text-indigo-900 block">Frontend Demo Authentication</span>
        <p className="text-2xs text-indigo-800/90 leading-relaxed">
          Authentication is safely simulated in your browser. Passwords are never sent to a server or saved anywhere.
        </p>
        {showCredentials && (
          <div className="pt-1 text-2xs font-mono text-indigo-950">
            Demo Account: <span className="font-bold">demo@promptpilot.app</span> &bull; Pass: <span className="font-bold">PromptPilot123!</span>
          </div>
        )}
      </div>
    </div>
  );
}
