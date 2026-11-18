import React from 'react';
import { Check, X } from 'lucide-react';

interface CicaplastComparisonProps {
  lang: string;
}

export const CicaplastComparison: React.FC<CicaplastComparisonProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const rows = [
    {
      featureAr: 'ترميم ميكروبيوم البشرة بمركب تريبيوما (Tribioma™)',
      featureEn: 'Patented Tribioma™ Microbiome Prebiotic Science',
      cica: true,
      others: false,
      detailAr: 'يسرع التعافي الطبيعي ويقضي على البكتيريا الضارة',
      detailEn: 'Accelerates biological barrier repair and inhibits bad bacteria',
    },
    {
      featureAr: 'تركيز طبي عالٍ 5٪ من البانثينول (Vitamin B5)',
      featureEn: 'High Medical 5% Panthenol Concentration',
      cica: true,
      others: false,
      detailAr: 'تسكين فوري للحرقان والالتهاب والاحمرار الشديد',
      detailEn: 'Immediate cooling and anti-inflammatory relief from burning',
    },
    {
      featureAr: 'ماديكاسوسايد النقي لتحفيز التئام الأنسجة ومنع الندبات',
      featureEn: 'Pure Madecassoside Centella for Scar & Tissue Repair',
      cica: true,
      others: false,
      detailAr: 'يعالج التشققات الدقيقة وآثار الليزر والتقشير الكيميائي',
      detailEn: 'Repairs micro-fissures and post-peel/laser sensitivity',
    },
    {
      featureAr: 'درع معدني واقٍ ومطهر (نحاس + زنك + منجنيز)',
      featureEn: 'Anti-Bacterial Mineral Shield (Copper, Zinc, Manganese)',
      cica: true,
      others: false,
      detailAr: 'بيئة معقمة تمنع تلوث الجروح السطحية والتشققات',
      detailEn: 'Creates a clean, purified healing ecosystem for compromised skin',
    },
    {
      featureAr: 'خالٍ تماماً من العطور ومناسب للرضع من عمر 3 أشهر',
      featureEn: '100% Fragrance-Free, Pediatric Safe from 3 Months',
      cica: true,
      others: false,
      detailAr: 'لا يسد المسام (Non-Comedogenic) ومضاد تام للحساسية',
      detailEn: 'Non-comedogenic, hypoallergenic, and safe for delicate infant skin',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'مقارنة الشفافية والنتائج' : 'Direct Clinical Comparison'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'سيكابلاست بوم +B5 مقابل كريمات الترطيب التجارية العادية'
              : 'Cicaplast Baume B5+ vs. Ordinary Moisturizers'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-100 bg-stone-50/50">
                  <th className="py-4 px-4 sm:px-6 font-bold text-neutral-700 text-start w-1/2">
                    {isAr ? 'الميزة / المعيار العلاجي' : 'Clinical Feature / Criterion'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-extrabold text-teal-800 bg-teal-50/80 text-center w-1/4">
                    {isAr ? 'سيكابلاست بوم +B5' : 'Cicaplast Baume B5+'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-semibold text-neutral-400 text-center w-1/4">
                    {isAr ? 'الكريمات التجارية العادية' : 'Ordinary Creams'}
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

export default CicaplastComparison;
