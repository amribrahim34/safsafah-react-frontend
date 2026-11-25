import React from 'react';
import { Check, X } from 'lucide-react';

interface DrAltheaComparisonProps {
  lang: string;
}

export const DrAltheaComparison: React.FC<DrAltheaComparisonProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const rows = [
    {
      featureAr: 'تركيبة 3-4-5 ثلاثية المفعول (آثار الحبوب + تغذية + تهدئة)',
      featureEn: 'Triple-Action 3-4-5 System (Blemish + Nourish + Soothe)',
      detailAr: 'يعالج الاحمرار وآثار ما بعد الحبوب ويرمم الحاجز في منتج واحد',
      detailEn: 'Targets post-acne marks while rebuilding the barrier in one step',
    },
    {
      featureAr: 'قوام جل-كريم خفيف لا يسد المسام (Non-Comedogenic)',
      featureEn: 'Breathable Non-Comedogenic Gel-Cream Texture',
      detailAr: 'لا يسبب لمعاناً دهنياً أو حبوباً جديدة على عكس الكريمات الثقيلة',
      detailEn: 'Zero heavy occlusive grease or clogged pores',
    },
    {
      featureAr: 'غني بالنياسيناميد والريسفيراترول والسنتيلا والسيراميد NP',
      featureEn: 'Infused with Niacinamide, Resveratrol, Centella & Ceramide NP',
      detailAr: 'تركيز متوازن يدعم البشرة المجهدة بعد الريتينول والمقشرات',
      detailEn: 'Balanced recovery actives ideal after retinoids and acids',
    },
    {
      featureAr: 'خالٍ تماماً من العطور الصناعية والبارابين والملونات',
      featureEn: '100% Free from Artificial Fragrance, Parabens & Dyes',
      detailAr: 'تركيبة نباتية نظيفة آمنة للبشرة الحساسة والمتهيجة',
      detailEn: 'Clean vegan formula gentle on reactive, sensitized skin',
    },
    {
      featureAr: 'مناسب للاستخدام صباحاً تحت واقي الشمس والمكياج ومساءً',
      featureEn: 'Versatile AM Under Sunscreen/Makeup & PM Recovery',
      detailAr: 'يمتص بسلاسة دون تكتل أو ثقل طوال اليوم',
      detailEn: 'Layers smoothly without pilling or midday heaviness',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'مقارنة الأداء والتركيبة' : 'Direct Formula Comparison'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'كريم دكتور ألثيا 345 ريليف مقابل الكريمات المرطبة التقليدية'
              : 'Dr. Althea 345 Relief Cream vs. Ordinary Heavy Creams'}
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
                    {isAr ? 'دكتور ألثيا 345 ريليف' : 'Dr. Althea 345'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-semibold text-neutral-400 text-center w-1/4">
                    {isAr ? 'الكريمات التقليدية' : 'Ordinary Creams'}
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

export default DrAltheaComparison;
