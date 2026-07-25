import Link from "next/link";
import { FolderKanban, ArrowRight, Edit, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import { Category } from "@/types/category";

export interface CategoryCardProps {
  category: Category;
  promptCount: number;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export function CategoryCard({
  category,
  promptCount,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <Card className="p-5 flex flex-col justify-between hover:shadow-md transition-all group border-slate-200">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 font-bold">
            <FolderKanban className="h-5 w-5" />
          </div>

          <div className="flex items-center gap-1">
            {onEdit && (
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => onEdit(category)}
                aria-label="Edit category"
              >
                <Edit className="h-3.5 w-3.5 text-slate-400 hover:text-slate-600" />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                variant="ghost"
                size="sm"
                onClick={() => onDelete(category)}
                aria-label="Delete category"
              >
                <Trash2 className="h-3.5 w-3.5 text-slate-400 hover:text-rose-600" />
              </IconButton>
            )}
          </div>
        </div>

        <div>
          <Link
            href={`/categories/${category.slug}`}
            className="font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors"
          >
            {category.name}
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
        <Badge variant="secondary" size="sm">
          {promptCount} {promptCount === 1 ? "prompt" : "prompts"}
        </Badge>

        <Link
          href={`/categories/${category.slug}`}
          className="text-2xs font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center gap-1"
        >
          View Collection <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </Card>
  );
}
