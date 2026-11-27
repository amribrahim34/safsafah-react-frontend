import React from 'react';
import type { VichyNormadermProductData } from '../_types';
import VichyNormadermVisualScience from './VichyNormadermVisualScience';

interface VichyNormadermDescriptionProps {
  product: VichyNormadermProductData;
  lang: string;
}

export const VichyNormadermDescription: React.FC<VichyNormadermDescriptionProps> = ({
  product,
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Product Overview & Technical Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'عناية جلدية فرنسية معتمدة' : 'Official Vichy Dermatological Care'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug">
              {isAr
                ? 'جل منقي مكثف للبشرة الدهنية والمعرضة لحب الشباب'
                : 'Intensive Purifying Gel for Oily & Acne-Prone Skin'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {isAr
                ? 'صُمم جل فيشي نورماديرم فيتوسوليوشن المنقي المكثف بقاعدة تنظيف نباتية لطيفة بدرجة حموضة فسيولوجية 5.5 لتحترم توازن البشرة الحساسة. يعمل على إزالة الأوساخ وجزيئات التلوث والدهون الزائدة من الغسلة الأولى، ليمنح البشرة مظهراً مطفياً متوازناً ويقلل مظهر المسام والرؤوس السوداء دون التسبب في جفاف.'
                : 'Formulated on a gentle vegetal-origin cleansing base at physiological pH 5.5, Vichy Normaderm Phytosolution Intensive Purifying Gel removes dirt, excess sebum, and pollution particles from the very first wash. Enriched with minerals and probiotic extract, it leaves oily and sensitive acne-prone skin purified, instantly mattified, and comfortable without tightness.'}
            </p>
          </div>

          <div className="lg:col-span-5 bg-stone-50/80 rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs">
            <h4 className="text-base font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
              {isAr ? 'المواصفات الفنية للمنتج' : 'Product Specifications'}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm divide-y divide-neutral-100">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الماركة' : 'Brand'}</span>
                <span className="font-semibold text-neutral-800">Vichy Laboratoires</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الحجم والوزن' : 'Size / Net Volume'}</span>
                <span className="font-semibold text-neutral-800">{product.size}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'نوع البشرة' : 'Skin Type'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'دهنية، مختلطة، حساسة ومعرضة للحبوب' : 'Oily, Sensitive & Acne-Prone'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'القوام' : 'Texture'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'جل رغوي منقي منعش' : 'Fresh Purifying Gel-to-Foam'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'درجة الحموضة' : 'Physiological pH'}</span>
                <span className="font-bold text-emerald-700" dir="ltr">
                  pH 5.5
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'بلد المنشأ' : 'Origin'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'فرنسا — مختبرات فيشي' : 'France — Vichy Laboratoires'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Visual Skin-Action Map Illustration (replaces text-heavy 4-ingredient grid) */}
        <VichyNormadermVisualScience lang={lang} />

        {/* Part 3: Official Daily Application Routine */}
        <div className="bg-gradient-to-br from-stone-50 via-teal-50/20 to-white p-6 sm:p-10 rounded-3xl border border-neutral-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'طريقة الاستخدام المعتمدة' : 'Official Daily Ritual'}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900">
              {isAr ? 'كيفية الاستخدام صباحاً ومساءً' : 'How to Apply Morning & Evening'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                titleAr: 'ضعي الجل على بشرة مبللة',
                titleEn: 'Apply onto Wet Skin',
                descAr:
                  'بللي الوجه بالماء الفاتر، ثم ضعي كمية مناسبة من الجل على اليدين مع تجنب محيط العينين.',
                descEn:
                  'Wet skin with lukewarm water and dispense a small amount into palms, avoiding the eye area.',
              },
              {
                step: '02',
                titleAr: 'دلكي برفق حتى تتكون رغوة',
                titleEn: 'Lather & Massage Gently',
                descAr:
                  'دلكي بحركات دائرية لطيفة على الجبهة والأنف والذقن ومناطق الحبوب حتى تتكون رغوة منقية.',
                descEn:
                  'Massage in gentle circular motions across the T-zone and blemish-prone areas until it lathers.',
              },
              {
                step: '03',
                titleAr: 'اشطفي واتبعيه بالترطيب',
                titleEn: 'Rinse & Follow Care',
                descAr:
                  'اشطفي الوجه جيداً بالماء وجففي بالتربيت، ثم استخدمي مرطب فيتوسوليوشن اليومي لنتائج متكاملة.',
                descEn:
                  'Rinse thoroughly with water, pat dry gently, and follow with your daily Normaderm care.',
              },
            ].map((step) => (
              <div key={step.step} className="text-center flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-700 text-white text-xl font-black flex items-center justify-center shadow-md">
                  {step.step}
                </div>
                <h4 className="font-bold text-neutral-900 text-sm sm:text-base">
                  {isAr ? step.titleAr : step.titleEn}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                  {isAr ? step.descAr : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VichyNormadermDescription;
