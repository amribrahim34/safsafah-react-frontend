import React from 'react';
import { Check, X } from 'lucide-react';

interface VichyNormadermComparisonProps {
  lang: string;
}

export const VichyNormadermComparison: React.FC<VichyNormadermComparisonProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const rows = [
    {
      featureAr: 'قاعدة تنظيف نباتية خالية من السلفات والصابون والكحول',
      featureEn: 'Vegetal Cleansing Base (Sulfate-, Soap- & Alcohol-Free)',
      vichy: true,
      others: false,
      detailAr: 'ينقي بعمق دون تجريد البشرة الحساسة من حاجزها الواقي',
      detailEn: 'Deeply purifies without stripping or irritating sensitive skin',
    },
    {
      featureAr: 'درجة حموضة فسيولوجية مضبوطة (pH 5.5)',
      featureEn: 'Skin-Friendly Physiological pH 5.5',
      vichy: true,
      others: false,
      detailAr: 'يحترم التوازن الحمضي للبشرة ويمنع الإحساس بالشد بعد الغسل',
      detailEn: 'Respects natural skin pH to prevent post-wash tightness',
    },
    {
      featureAr: 'معادن الزنك والنحاس (Zinc & Copper Gluconate)',
      featureEn: 'Dual Mineral Complex (Zinc & Copper)',
      vichy: true,
      others: false,
      detailAr: 'ينظم إفراز الزهم ويمنح تأثيراً مطفياً يقلل اللمعان طوال اليوم',
      detailEn: 'Regulates sebum, mattifies immediately, and reduces shine all day',
    },
    {
      featureAr: 'مستخلص البروبيوتيك (Bifidus Probiotic)',
      featureEn: 'Bifidus Probiotic Barrier Defense',
      vichy: true,
      others: false,
      detailAr: 'يقوي حاجز البشرة ويدعم الميكروبيوم ضد العوامل الخارجية',
      detailEn: 'Reinforces the skin barrier against daily external stressors',
    },
    {
      featureAr: 'نتائج موثقة سريرياً (91٪ إزالة تلوث · 94٪ تقليل دهون)',
      featureEn: 'Clinically Tested (91% Pollution Removal · 94% Less Sebum)',
      vichy: true,
      others: false,
      detailAr: 'تم اختباره تحت إشراف أطباء الجلدية على 50 امرأة لمدة 4 أسابيع',
      detailEn: 'Dermatologist-tested efficacy from 1st wash through 4 weeks',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'مقارنة الشفافية والنتائج' : 'Direct Comparison'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'فيشي نورماديرم فيتوسوليوشن مقابل الغسولات التجارية العادية'
              : 'Vichy Normaderm vs. Ordinary Facial Cleansers'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-stone-50/50">
                  <th className="py-4 px-4 sm:px-6 font-bold text-neutral-700 text-start w-1/2">
                    {isAr ? 'الميزة / المعيار' : 'Feature / Criterion'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-extrabold text-teal-800 bg-teal-50/80 text-center w-1/4">
                    {isAr ? 'فيشي نورماديرم 200مل' : 'Vichy Normaderm 200ml'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-semibold text-neutral-400 text-center w-1/4">
                    {isAr ? 'الغسولات التجارية العادية' : 'Ordinary Cleansers'}
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

export default VichyNormadermComparison;
