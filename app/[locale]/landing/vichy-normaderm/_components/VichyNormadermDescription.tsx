import React from 'react';
import { Sparkles, Droplets, ShieldCheck, Leaf, CheckCircle } from 'lucide-react';
import type { VichyNormadermProductData } from '../_types';

interface VichyNormadermDescriptionProps {
  product: VichyNormadermProductData;
  lang: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  droplets: Droplets,
  shield: ShieldCheck,
  leaf: Leaf,
};

export const VichyNormadermDescription: React.FC<VichyNormadermDescriptionProps> = ({
  product,
  lang,
}) => {
  const isAr = lang === 'ar';

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Product Overview & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'عناية جلدية فائقة' : 'Advanced Dermatological Care'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug">
              {isAr
                ? 'تنقية مكثفة للمسام وترطيب مائي عميق بدون التسبب في جفاف'
                : 'Intensive Pore Purification & 24h Hydration Without Dryness'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {isAr
                ? 'صُمم غسول فيشي نورماديرم فيتوسوليوشن اليومي خصيصاً للبشرة الدهنية والمختلطة والمعرضة لحب الشباب. يتميز بقاعدة تنظيف نباتية لطيفة خالية من السلفات (Sulfate Free Cleanser) تحترم توازن الميكروبيوم الجلدي الطبيعي، ومدعمة بمركبات طبية متقدمة لتنظيف عميق يزيل الرؤوس السوداء ويمنع عودة الحبوب مع الحفاظ على مرونة الجلد ونعومته.'
                : 'Vichy Normaderm Phytosolution Daily Cleanser is clinically formulated for oily, blemish-prone and combination skin. Built on a gentle plant-based, Sulfate-Free cleansing base that respects the natural microbiome, enriched with dermatological actives that eliminate blackheads and prevent acne recurrence while maintaining supple hydration.'}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'خالٍ من السلفات والبارابين' : 'Sulfate & Paraben Free'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'خالٍ من الصابون والكحول' : 'Soap & Alcohol Free'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'غير مسبب لانسداد المسام' : 'Non-Comedogenic'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'مضبوط لدرجة حموضة 5.5' : 'Physiological pH 5.5'}</span>
              </div>
            </div>
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
                  {isAr ? 'دهنية، مختلطة، ومعرضة للحبوب' : 'Oily, Combination & Acne-Prone'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'القوام والرغوة' : 'Texture'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'جل رغوي منقي ومنعش' : 'Purifying Foaming Gel'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'تركيبة السلفات' : 'Sulfate Status'}</span>
                <span className="font-bold text-emerald-700">
                  {isAr ? 'خالٍ من السلفات (Sulfate Free)' : '100% Sulfate-Free'}
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

        {/* Part 2: Active Ingredients Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'قوة العلم والطبيعة' : 'Targeted Active Bio-Science'}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900">
              {isAr
                ? 'أربعة مكونات حيوية تعمل بتناغم لحماية وتصفية بشرتك'
                : 'Four Key Bio-Actives Behind Vichy Normaderm’s Power'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.ingredients.map((ing, idx) => {
              const Icon = iconMap[ing.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-neutral-50/50 border border-neutral-100 hover:border-teal-200 transition-all duration-200 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100/60 text-teal-700 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                        {isAr ? ing.nameAr : ing.nameEn}
                      </h4>
                      <span className="text-xs font-medium text-teal-700">
                        {isAr ? ing.roleAr : ing.roleEn}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-2">
                    {isAr ? ing.descriptionAr : ing.descriptionEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 3: Recommended Daily Routine */}
        <div className="bg-gradient-to-br from-stone-50 via-teal-50/20 to-white p-6 sm:p-10 rounded-3xl border border-neutral-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'طريقة الاستخدام الصحيحة' : 'Daily Cleansing Ritual'}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900">
              {isAr ? 'كيفية الاستخدام لتحقيق أفضل نتائج ممكنة' : 'Simple Steps for Clear, Balanced Skin'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                titleAr: 'ترطيب الوجه',
                titleEn: 'Dampen Skin',
                descAr: 'بللي بشرة وجهك ورقبتك بالماء الفاتر لتفتيح المسام برفق وتهيئة الجلد للتنظيف العميق.',
                descEn: 'Splash face and neck with lukewarm water to soften pores and prime skin for purification.',
              },
              {
                step: '02',
                titleAr: 'تدليك رغوي خفيف',
                titleEn: 'Foam & Massage',
                descAr: 'ضعي ضخة واحدة على يديك وافركيها حتى تتكون رغوة غنية، ثم دلكي بها الوجه لمدة 60 ثانية مع التركيز على الجبهة والأنف والذقن.',
                descEn: 'Lather one pump in palms to activate the foaming gel, massage gently for 60 seconds focusing on the T-zone and blemishes.',
              },
              {
                step: '03',
                titleAr: 'شطف وتجفيف ناعم',
                titleEn: 'Rinse & Pat Dry',
                descAr: 'اشطفي الوجه تماماً بالماء البارد لغلق المسام، ثم جففي بلطف بطريقة التربيت بمنشفة قطنية نظيفة. كرري صباحاً ومساءً.',
                descEn: 'Rinse thoroughly with cool water to tighten pores, then pat dry with a clean cotton towel. Use morning & evening.',
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
