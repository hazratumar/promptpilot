import Link from "next/link";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function BrandLogo({ className, size = "md", href = "/" }: BrandLogoProps) {
  const iconSizes = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const textSizes = {
    sm: "text-base font-semibold",
    md: "text-lg font-bold",
    lg: "text-2xl font-extrabold",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group select-none", className)}>
      <div className="flex items-center justify-center rounded-lg bg-indigo-600 p-1.5 text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
        <Compass className={cn(iconSizes[size], "transition-transform group-hover:rotate-12")} />
      </div>
      <span className={cn("tracking-tight text-slate-900 font-sans", textSizes[size])}>
        Prompt<span className="text-indigo-600">Pilot</span>
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-indigo-600 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
