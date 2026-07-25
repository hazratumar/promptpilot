import { Badge } from "@/components/ui/badge";

export function PromptStatusBadge({ status }: { status: "draft" | "active" | "archived" }) {
  const map = {
    active: { variant: "success" as const, label: "Active" },
    draft: { variant: "warning" as const, label: "Draft" },
    archived: { variant: "secondary" as const, label: "Archived" },
  };

  const current = map[status] || map.active;
  return <Badge variant={current.variant}>{current.label}</Badge>;
}
