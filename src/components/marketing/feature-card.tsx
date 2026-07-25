import {
  FolderKanban,
  Sliders,
  FlaskConical,
  GitCompare,
  BarChart3,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { FeatureItem, MARKETING_FEATURES } from "@/data/marketing";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, LucideIcon> = {
  FolderKanban,
  Sliders,
  FlaskConical,
  GitCompare,
  BarChart3,
  ShieldCheck,
};

export function FeatureCard({ feature }: { feature: FeatureItem }) {
  const Icon = iconMap[feature.iconName] || FolderKanban;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:shadow-md transition-all hover:border-indigo-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Icon className="h-5 w-5" />
        </div>
        {feature.badge && <Badge variant="secondary">{feature.badge}</Badge>}
      </div>

      <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
        {feature.title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MARKETING_FEATURES.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </div>
  );
}
