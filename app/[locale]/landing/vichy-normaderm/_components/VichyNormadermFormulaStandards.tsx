import React from 'react';
import { Ban, ShieldCheck, FlaskConical, EyeOff, MapPin, ChevronDown } from 'lucide-react';

interface VichyNormadermFormulaStandardsProps {
  lang: string;
}

const OFFICIAL_INCI_LIST = [
  'Aqua / Water',
  'Coco-Betaine',
  'Propanediol',
  'PEG-120 Methyl Glucose Dioleate',
  'Sodium Chloride',
  'Sodium Cocoyl Glycinate',
  'Dipropylene Glycol',
  'Zinc Gluconate',
  'Salicylic Acid',
  'Bifida Ferment Lysate',
  'Sodium Hydroxide',
  'Sodium Benzoate',
  'Phenoxyethanol',
  'Copper Gluconate',
  'Caprylyl Glycol',
  'Tetrasodium Glutamate Diacetate',
  'Parfum / Fragrance',
];

/**
 * Official Vichy formula purity ("0% Harsh Agents"), multi-zone body/face guidance,
 * and expandable full INCI ingredient transparency sourced from vichy-me.com & vichy.eg.
 */
export const VichyNormadermFormulaStandards: React.FC<VichyNormadermFormulaStandardsProps> = ({
  lang,
}) => {
  const isAr = lang === 'ar';

  const freeFromItems = [
    { labelAr: '0% سلفات', labelEn: '0% Sulfates' },
    { labelAr: '0% صابون', labelEn: '0% Soap' },
    { labelAr: '0% كحول', labelEn: '0% Alcohol' },
    { labelAr: 'مختبر للحساسية', labelEn: 'Allergy-Tested' },
  ];

  const applicationZones = [
    {
      titleAr: 'الوجه ومنطقة الـ T-Zone',
      titleEn: 'Face & T-Zone',
      subAr: 'الجبهة، الأنف، والذقن',
      subEn: 'Forehead, nose & chin',
    },
    {
      titleAr: 'الرقبة',
      titleEn: 'Neck',
      subAr: 'للوقاية من البثور',
      subEn: 'For blemish-prone skin',
    },
    {
      titleAr: 'الصدر والظهر',
      titleEn: 'Chest & Back',
      subAr: 'مناسب لحبوب الجسم',
      subEn: 'Safe for body breakouts',
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: 0% Harsh Agents & Dermatological Tolerance */}
          <div className="lg:col-span-6 rounded-3xl bg-stone-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100/80 text-emerald-800 mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAr ? 'معايير نقاء فيشي الرسمية' : 'Official Vichy Purity Standards'}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                {isAr
                  ? 'أمان فائق حتى للبشرة الحساسة المعرضة للحبوب'
                  : 'High-Tolerance Formula for Sensitive Acne-Prone Skin'}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {freeFromItems.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-neutral-200/70 p-3.5 flex items-center gap-2.5 shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    {idx < 3 ? <Ban className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-neutral-800">
                    {isAr ? item.labelAr : item.labelEn}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Multi-Zone Application (Face, Neck, Chest & Back + Eye Safety) */}
          <div className="lg:col-span-6 rounded-3xl bg-gradient-to-br from-teal-50/60 via-white to-stone-50 border border-teal-100 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-teal-100/80 text-teal-800 mb-3">
                <MapPin className="w-3.5 h-3.5" />
                {isAr ? 'مناطق الاستخدام المعتمدة' : 'Approved Application Zones'}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900">
                {isAr
                  ? 'لا يقتصر على الوجه فقط — متعدد الاستخدامات'
                  : 'Face & Targeted Body Blemish Zones'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {applicationZones.map((zone, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-teal-100 p-3.5 text-center shadow-2xs"
                >
                  <div className="text-xs sm:text-sm font-extrabold text-teal-900">
                    {isAr ? zone.titleAr : zone.titleEn}
                  </div>
                  <div className="text-[11px] text-neutral-500 mt-1">
                    {isAr ? zone.subAr : zone.subEn}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-teal-100/80 flex items-center gap-2 text-xs font-semibold text-amber-800">
              <EyeOff className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {isAr
                  ? 'تنبيه فيشي الرسمي: يُتجنب محيط العينين عند التدليك.'
                  : 'Official Vichy guidance: Avoid the delicate eye contour area.'}
              </span>
            </div>
          </div>
        </div>

        {/* Collapsible Full Official INCI Ingredient List */}
        <details className="group rounded-2xl bg-neutral-50/80 border border-neutral-200/80 px-5 py-4">
          <summary className="list-none cursor-pointer flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-neutral-800 select-none">
            <span className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                {isAr
                  ? 'قائمة المكونات الكاملة المعتمدة من فيشي (INCI Formula)'
                  : 'Full Official Vichy Ingredient List (INCI)'}
              </span>
            </span>
            <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform duration-200 group-open:rotate-180 shrink-0" />
          </summary>
          <div className="mt-3 pt-3 border-t border-neutral-200/70 flex flex-wrap gap-1.5" dir="ltr">
            {OFFICIAL_INCI_LIST.map((ing) => (
              <span
                key={ing}
                className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200/80 text-[11px] font-medium text-neutral-700"
              >
                {ing}
              </span>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
};

export default VichyNormadermFormulaStandards;
