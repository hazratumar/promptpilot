import { Star } from "lucide-react";
import { SAMPLE_TESTIMONIALS, TestimonialItem } from "@/data/marketing";
import { Avatar } from "@/components/ui/avatar";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs space-y-4 flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <Avatar name={testimonial.authorName} size="sm" />
        <div>
          <div className="text-xs font-bold text-slate-900">{testimonial.authorName}</div>
          <div className="text-2xs text-slate-500">
            {testimonial.authorRole} &bull; {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SAMPLE_TESTIMONIALS.map((t) => (
        <TestimonialCard key={t.id} testimonial={t} />
      ))}
    </div>
  );
}
