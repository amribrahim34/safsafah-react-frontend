'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Sun, Droplets, CheckCircle } from 'lucide-react';
import type { BojAquaFreshProductData } from '../_types';

interface BojDescriptionProps {
  product: BojAquaFreshProductData;
  lang: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  sun: Sun,
  droplets: Droplets,
};

export const BojDescription: React.FC<BojDescriptionProps> = ({ product, lang }) => {
  const isAr = lang === 'ar';
  const [selectedUseCaseId, setSelectedUseCaseId] = useState(product.useCases[0]?.id || 'oily');

  const activeUseCase =
    product.useCases.find((u) => u.id === selectedUseCaseId) || product.useCases[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Product Overview & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'عناية كورية متطورة ضد الشمس' : 'Korean Dermatological Sun Care'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug">
              {isAr
                ? 'حماية شمسية يومية بقوام مائي منعش يناسب البشرة الدهنية والمختلطة'
                : 'Daily Broad-Spectrum UV Protection That Feels Like Refreshing Water'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {isAr
                ? 'طوّرت علامة بيوتي أوف جوسون الكورية إصدار Relief Sun Aqua-fresh: Rice + B5 استجابةً لملايين الطلبات للحصول على نفس الحماية الفائقة للإصدار الأصلي لكن بقوام أخف وأكثر انتعاشاً. بفضل 30٪ من ماء بذور الأرز وفيتامين B5 (البانثينول)، يرطب البشرة ويهدئ احمرار الشمس دون أن يترك أي لمعان أو يسبب انسداد المسام، ليكون واقي الشمس اليومي المثالي في مناخ مصر.'
                : 'Beauty of Joseon engineered Relief Sun Aqua-fresh: Rice + B5 to deliver the same trusted SPF50+ PA++++ protection as the iconic original, reimagined in an ultra-lightweight watery lotion. Powered by 30% Rice Seed Water and Panthenol (Vitamin B5), it hydrates, cools, and calms sun-exposed skin with zero greasiness, zero white cast, and zero pore congestion.'}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'خالٍ من العطور والبارابين' : 'Fragrance & Paraben Free'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'لا يسد المسام (Non-Comedogenic)' : 'Non-Comedogenic & Clean'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'بدون أثر أبيض نهائياً' : 'Zero White Cast Finish'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'مثالي تحت المكياج' : 'Zero-Pilling Makeup Base'}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-stone-50/80 rounded-3xl border border-neutral-200/80 p-6 sm:p-7 shadow-xs">
            <h3 className="text-base font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
              {isAr ? 'المواصفات الفنية للمنتج' : 'Product Specifications'}
            </h3>
            <div className="space-y-3 text-xs sm:text-sm divide-y divide-neutral-100">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الماركة' : 'Brand'}</span>
                <span className="font-semibold text-neutral-800">Beauty of Joseon</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الحجم الصافي' : 'Net Volume'}</span>
                <span className="font-semibold text-neutral-800">{product.size}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'معامل الحماية' : 'UV Protection'}</span>
                <span className="font-bold text-teal-800">SPF50+ PA++++</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'نوع البشرة' : 'Skin Type'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'الدهنية، المختلطة، الحساسة، المعرضة للحبوب' : 'Oily, Combination, Sensitive & Acne-Prone'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الملمس والقوام' : 'Texture'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'لوشن مائي خفيف سريع الامتصاص' : 'Featherlight Watery Lotion'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'بلد المنشأ' : 'Origin'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'كوريا الجنوبية (أصلي 100٪)' : 'South Korea (100% Authentic)'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Active Ingredients Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'تركيبة الأرز وفيتامين B5 الكورية' : 'Rice + B5 Bio-Active Synergy'}
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
              {isAr
                ? 'المكونات النشطة التي تحمي وتغذي بشرتك في خطوة واحدة'
                : 'Four Key Actives Behind Relief Sun Aqua-fresh'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.ingredients.map((ing, idx) => {
              const Icon = iconMap[ing.icon] || Sparkles;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-stone-50/70 border border-neutral-200/70 flex gap-4 items-start"
                >
                  <div className="w-11 h-11 rounded-xl bg-teal-100/80 text-teal-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wide">
                      {isAr ? ing.roleAr : ing.roleEn}
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mt-0.5">
                      {isAr ? ing.nameAr : ing.nameEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed">
                      {isAr ? ing.descriptionAr : ing.descriptionEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 3: Interactive Skin Type & Use-Case Selector */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50/60 via-white to-stone-50 border border-teal-100">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'هل يناسب بشرتي؟' : 'Is It Right For My Skin?'}
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-neutral-900">
              {isAr
                ? 'اختاري نوع بشرتك أو استخدامك لمعرفة النتيجة'
                : 'Select Your Skin Profile or Use Case'}
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {product.useCases.map((item) => {
              const isSelected = item.id === activeUseCase.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedUseCaseId(item.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-teal-300'
                  }`}
                >
                  {isAr ? item.badgeAr : item.badgeEn}
                </button>
              );
            })}
          </div>

          {activeUseCase && (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-teal-100 shadow-xs text-center">
              <h3 className="text-lg font-extrabold text-neutral-900">
                {isAr ? activeUseCase.titleAr : activeUseCase.titleEn}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {isAr ? activeUseCase.descAr : activeUseCase.descEn}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BojDescription;
