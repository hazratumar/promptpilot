import { PageContainer } from "@/components/shared/page-container";
import { SOCIAL_PROOF_METRICS } from "@/data/marketing";

export function SocialProof() {
  return (
    <section className="py-12 bg-white border-b border-slate-200/80">
      <PageContainer>
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Trusted by prompt engineers, product creators, and software developers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {SOCIAL_PROOF_METRICS.map((metric, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-3xl font-extrabold text-indigo-600 tracking-tight">
                {metric.value}
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-600">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
