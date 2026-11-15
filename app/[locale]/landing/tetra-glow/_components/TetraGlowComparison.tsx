import React from 'react';
import { Check, X } from 'lucide-react';

interface TetraGlowComparisonProps {
  lang: string;
}

export const TetraGlowComparison: React.FC<TetraGlowComparisonProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const rows = [
    {
      featureAr: 'أمان خاص بالمناطق الحساسة والبكيني',
      featureEn: 'Formulated Specifically for Sensitive Zones',
      tetra: true,
      others: false,
      detailAr: 'مضبوط على درجة الحموضة الفسيولوجية الطبيعية',
      detailEn: 'pH-balanced for intimate delicate skin',
    },
    {
      featureAr: 'خالٍ تماماً من الهيدروكينون والكورتيزون',
      featureEn: 'Free of Hydroquinone & Cortisone',
      tetra: true,
      others: false,
      detailAr: 'لا يسبب اسمراراً عكسياً أو ترققاً في الجلد',
      detailEn: 'Prevents rebound darkening and tissue thinning',
    },
    {
      featureAr: 'تقشير لطيف بدون تسلخ أو التهاب أو لسع',
      featureEn: 'Gentle Renewal without Peeling or Stinging',
      tetra: true,
      others: false,
      detailAr: 'بحمض الماندليك الطبيعي ذو الجزيئات الآمنة',
      detailEn: 'Large molecular Mandelic Acid prevents burns',
    },
    {
      featureAr: 'قوام مخملي سريع الامتصاص غير لزج',
      featureEn: 'Fast-Absorbing Non-Greasy Velvety Texture',
      tetra: true,
      others: false,
      detailAr: 'لا يترك أثراً دهنياً ولا يلطخ الملابس',
      detailEn: 'Zero sticky residue, will not stain clothing',
    },
    {
      featureAr: 'ترميم حاجز البشرة وترطيب عميق مستمر',
      featureEn: 'Skin Barrier Lipid Restoration & Hydration',
      tetra: true,
      others: false,
      detailAr: 'بالسكوالين والبانثينول وزيوت اللوز الطبيعية',
      detailEn: 'With Squalane, Panthenol, and Sweet Almond oils',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'مقارنة الشفافية' : 'Direct Comparison'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'تيترا جلو مقابل كريمات التفتيح التقليدية'
              : 'Tetra Glow vs. Ordinary Whitening Creams'}
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
                    {isAr ? 'كريم تيترا جلو 50 جم' : 'Tetra Glow Cream 50g'}
                  </th>
                  <th className="py-4 px-3 sm:px-6 font-semibold text-neutral-400 text-center w-1/4">
                    {isAr ? 'كريمات التفتيح التجارية' : 'Ordinary Bleaches'}
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
                      <div className="w-7 h-7 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                        <X className="w-4 h-4 stroke-[2.5]" />
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

export default TetraGlowComparison;
