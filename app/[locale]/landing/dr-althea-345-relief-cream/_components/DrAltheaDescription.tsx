'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Leaf, Droplets, CheckCircle } from 'lucide-react';
import type { DrAlthea345ProductData } from '../_types';

interface DrAltheaDescriptionProps {
  product: DrAlthea345ProductData;
  lang: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  leaf: Leaf,
  droplets: Droplets,
};

export const DrAltheaDescription: React.FC<DrAltheaDescriptionProps> = ({ product, lang }) => {
  const isAr = lang === 'ar';
  const [selectedUseCaseId, setSelectedUseCaseId] = useState(product.useCases[0]?.id || 'post-acne');

  const activeUseCase =
    product.useCases.find((u) => u.id === selectedUseCaseId) || product.useCases[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Product Overview & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'عناية طبية كورية متطورة' : 'Korean Pro Lab Barrier Care'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug">
              {isAr
                ? 'مرمم حاجز البشرة وعلاج آثار الحبوب بقوام جل-كريم خفيف'
                : 'Post-Blemish & Skin Barrier Recovery in a Weightless Gel-Cream'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {isAr
                ? 'يجمع كريم دكتور ألثيا 345 ريليف بين قوة العلاجات المهدئة والترطيب الخفيف الذي لا يثقل البشرة. صُمم بتركيبة 3-4-5 الفريدة ليمنح البشرة المعرضة للحبوب والحساسة كل ما تحتاجه للتعافي السريع: تقليل الاحمرار، تفتيح آثار الحبوب بالنياسيناميد والريسفيراترول، وإعادة بناء الحاجز الواقي بالسيراميد NP والبانثينول والسنتيلا.'
                : 'Dr. Althea 345 Relief Cream bridges targeted blemish recovery with gentle daily hydration. Engineered with the signature 3-4-5 system, it delivers Niacinamide and Resveratrol to fade post-acne marks alongside Ceramide NP, Panthenol, and Centella Asiatica to rapidly calm redness and rebuild a compromised moisture barrier without clogging pores.'}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'خالٍ من العطور الصناعية' : 'Artificial Fragrance-Free'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'لا يسد المسام (Non-Comedogenic)' : 'Non-Comedogenic & Clean'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'نباتي 100٪ (Vegan)' : '100% Vegan Certified'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'مثالي بعد الريتينول والأحماض' : 'Post-Retinol & Acid Safe'}</span>
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
                <span className="font-semibold text-neutral-800">Dr. Althea (-PRO LAB-)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الحجم الصافي' : 'Net Volume'}</span>
                <span className="font-semibold text-neutral-800">{product.size}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'نوع البشرة' : 'Skin Type'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'جميع أنواع البشرة (الحساسة والمعرضة للحبوب)' : 'All Skin Types (Sensitive & Acne-Prone)'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الملمس والقوام' : 'Texture'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'جل-كريم حريري خفيف سريع الامتصاص' : 'Silky Lightweight Gel-Cream'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'التركيبة' : 'Formula'}</span>
                <span className="font-bold text-teal-800">
                  {isAr ? '3-4-5 نباتي وخالٍ من العطور' : '3-4-5 Vegan & Fragrance-Free'}
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
              {isAr ? 'تفاصيل تركيبة 3-4-5 الذكية' : '3-4-5 Bio-Active Breakdown'}
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
              {isAr
                ? 'مكونات نشطة تعالج الحبوب وتغذي وتهدئ في خطوة واحدة'
                : 'Clinically Balanced Actives for Calm, Clear Skin'}
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

        {/* Part 3: Interactive Skin Profile Selector */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50/60 via-white to-stone-50 border border-teal-100">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'هل يناسب بشرتي؟' : 'Is It Right For My Skin?'}
            </span>
            <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-neutral-900">
              {isAr
                ? 'اختاري احتياج بشرتك لمعرفة النتيجة'
                : 'Select Your Skin Concern or Profile'}
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

export default DrAltheaDescription;
