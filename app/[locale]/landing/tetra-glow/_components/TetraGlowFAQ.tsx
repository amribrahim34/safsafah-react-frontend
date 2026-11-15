'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQItem } from '../_types';

interface TetraGlowFAQProps {
  faqs: FAQItem[];
  lang: string;
}

export const TetraGlowFAQ: React.FC<TetraGlowFAQProps> = ({ faqs, lang }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const isAr = lang === 'ar';

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-14 bg-stone-50/60 border-t border-neutral-100" id="faqs-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr ? 'إجابات واضحة لكل ما يشغلك' : 'Clear Answers to Your Common Inquiries'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full py-4 px-5 text-start flex items-center justify-between gap-4 font-bold text-neutral-900 text-sm sm:text-base hover:text-teal-700 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>{isAr ? faq.questionAr : faq.questionEn}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {isAr ? faq.answerAr : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TetraGlowFAQ;
