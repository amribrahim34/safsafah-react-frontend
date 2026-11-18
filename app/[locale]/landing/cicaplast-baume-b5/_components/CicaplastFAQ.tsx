'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import type { FAQItem } from '../_types';

interface CicaplastFAQProps {
  faqs: FAQItem[];
  lang: string;
}

export const CicaplastFAQ: React.FC<CicaplastFAQProps> = ({ faqs, lang }) => {
  const isAr = lang === 'ar';
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="py-12 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'الأسئلة الشائعة والمعلومات الطبية' : 'Frequently Asked Questions'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr ? 'كل ما تودين معرفته عن سيكابلاست بوم +B5' : 'Everything You Need to Know'}
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

export default CicaplastFAQ;
