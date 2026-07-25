"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { MARKETING_FAQS, FAQItem } from "@/data/marketing";

export function FAQAccordion() {
  const [openId, setOpenId] = React.useState<string | null>(MARKETING_FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
      {MARKETING_FAQS.map((faq: FAQItem) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="py-4">
            <button
              type="button"
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-indigo-600 rounded-lg p-1"
            >
              <span className="text-base font-bold text-slate-900">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                  isOpen ? "rotate-180 text-indigo-600" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-2.5 px-1 pr-6 text-sm text-slate-600 leading-relaxed animate-in fade-in-50">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
