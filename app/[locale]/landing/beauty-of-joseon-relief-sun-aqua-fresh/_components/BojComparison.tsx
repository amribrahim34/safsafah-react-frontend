import React from 'react';
import { Check, X } from 'lucide-react';

interface BojComparisonProps {
  lang: string;
}

export const BojComparison: React.FC<BojComparisonProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const rows = [
    {
      featureAr: 'قوام مائي فائق الخفة بدون لمعان أو ملمس دهني',
      featureEn: 'Featherlight Watery Texture with Zero Greasy Shine',
      detailAr: 'يمتص فوراً في أجواء مصر الحارة والرطبة دون ثقل على البشرة',
      detailEn: 'Absorbs immediately in hot humid weather with zero heavy film',
    },
    {
      featureAr: 'خالٍ تماماً من الأثر الأبيض (Zero White Cast)',
      featureEn: '100% Zero White Cast on All Skin Tones',
      detailAr: 'يندمج بشفافية تامة حتى مع وضع كمية الإصبعين الكاملة',
      detailEn: 'Dries completely invisible even with the full two-finger dose',
    },
    {
      featureAr: 'غني بـ 30٪ ماء بذور الأرز وفيتامين B5 المهدئ',
      featureEn: 'Infused with 30% Rice Seed Water & Panthenol (B5)',
      detailAr: 'يرطب ويهدئ الاحمرار ويقوي حاجز البشرة طوال اليوم',
      detailEn: 'Hydrates, calms UV redness, and reinforces the skin barrier',
    },
    {
      featureAr: 'لا يسد المسام ومناسب للبشرة الدهنية والمعرضة للحبوب',
      featureEn: 'Non-Comedogenic & Safe for Oily / Acne-Prone Skin',
      detailAr: 'خالٍ من الزيوت الثقيلة والعطور والبارابين المهيجة للمسام',
      detailEn: 'Free from heavy oils, synthetic fragrance, and parabens',
    },
    {
      featureAr: 'ثبات مثالي تحت المكياج بدون تكتل أو حرقان للعين',
      featureEn: 'Seamless Under Makeup & Zero Eye Stinging',
      detailAr: 'يعمل كمرطب تمهيدي ناعم لا يتقشر أو يسبب دموعاً للعين',
      detailEn: 'Layers smoothly under foundation without pilling or eye irritation',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'مقارنة الشفافية والأداء' : 'Direct Performance Comparison'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'بيوتي أوف جوسون أكوا فريش مقابل واقيات الشمس التقليدية'
              : 'BOJ Relief Sun Aqua-fresh vs. Ordinary Sunscreens'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-stone-50/50">
                  <th className="py-4 px-4 sm:px-6 font-bold text-neutral-700 text-start w-1/2">
                    {isAr ? 'الميزة / معيار الاختيار' : 'Feature / Criterion'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-extrabold text-teal-800 bg-teal-50/80 text-center w-1/4">
                    {isAr ? 'أكوا فريش Rice + B5' : 'BOJ Aqua-fresh'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-semibold text-neutral-400 text-center w-1/4">
                    {isAr ? 'واقيات الشمس التقليدية' : 'Ordinary Sunscreens'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="py-4 px-4 sm:px-6 text-neutral-800">
                      <div className="font-bold">{isAr ? row.featureAr : row.featureEn}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        {isAr ? row.detailAr : row.detailEn}
                      </div>
                    </td>
                    <td className="py-4 px-3 sm:px-6 text-center bg-teal-50/30">
                      <div className="w-7 h-7 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </td>
                    <td className="py-4 px-3 sm:px-6 text-center">
                      <div className="w-7 h-7 mx-auto rounded-full bg-red-50 text-red-400 flex items-center justify-center">
                        <X className="w-4 h-4 stroke-[3]" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BojComparison;
