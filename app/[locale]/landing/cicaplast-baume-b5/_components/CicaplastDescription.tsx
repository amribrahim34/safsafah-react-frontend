'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Leaf, Droplets, CheckCircle } from 'lucide-react';
import type { CicaplastProductData } from '../_types';

interface CicaplastDescriptionProps {
  product: CicaplastProductData;
  lang: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  leaf: Leaf,
  droplets: Droplets,
};

export const CicaplastDescription: React.FC<CicaplastDescriptionProps> = ({ product, lang }) => {
  const isAr = lang === 'ar';
  const [selectedAreaId, setSelectedAreaId] = useState(product.applicationAreas[0]?.id || 'face');

  const activeArea = product.applicationAreas.find((a) => a.id === selectedAreaId) || product.applicationAreas[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Product Overview & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'العلاج المرمم الشامل' : 'Dermatological Recovery Science'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-snug">
              {isAr
                ? 'بلسم فائق الترميم والتسكين لإصلاح حاجز البشرة المتضرر'
                : 'Intensive Skin Barrier Restoration & Instant Soothing Balm'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {isAr
                ? 'يُعد لاروش بوزيه سيكابلاست بوم +B5 البلسم المرمم الأول الموصى به من قبل أطباء الجلدية لعلاج مختلف حالات تهيج وجفاف وتلف الجلد. بفضل الجيل الجديد المعزز بمركب تريبيوما (Tribioma) والبانثينول 5% مع ماديكاسوسايد النقي، يوفر درعاً واقياً غير دهني ومضاداً للبكتيريا يحفز التئام الأنسجة السطحية ويمنع تكون الندبات ويمنح راحة فورية من الحرقان والوخز.'
                : 'La Roche-Posay Cicaplast Baume B5+ is the gold standard multi-purpose barrier repair balm. Engineered with next-generation Tribioma prebiotic science, 5% Panthenol and pure Madecassoside, it forms an invisible, breathable anti-bacterial shield that instantly calms discomfort, accelerates tissue regeneration, and restores the skin natural defense against environmental aggressors.'}
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
                <span>{isAr ? 'آمن للرضع من عمر 3 أشهر' : 'Safe for Babies (3+ Months)'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>{isAr ? 'مياه ينابيع لاروش بوزيه الحرارية' : 'Enriched with Thermal Spring Water'}</span>
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
                <span className="font-semibold text-neutral-800">La Roche-Posay</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الحجم والوزن' : 'Size / Net Volume'}</span>
                <span className="font-semibold text-neutral-800">{product.size}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'نوع البشرة' : 'Skin Type'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'جميع أنواع البشرة حتى شديدة الحساسية والتهيج' : 'All Skin Types (Ultra-Sensitive)'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الملمس والقوام' : 'Texture'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'بلسم غني ومريح غير لزج' : 'Comforting Non-Greasy Rich Balm'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الملاءمة العمرية' : 'Age Suitability'}</span>
                <span className="font-bold text-emerald-700">
                  {isAr ? 'من الرضع (3 شهور) حتى البالغين' : 'Infants (3+ Mo), Kids & Adults'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'بلد المنشأ' : 'Origin'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'فرنسا — لاروش بوزيه' : 'France — La Roche-Posay'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Active Ingredients Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'قوة العلم والابتكار الطبي' : 'Clinical Bio-Active Innovation'}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900">
              {isAr
                ? 'أربعة مكونات طبية خارقة تجعل سيكابلاست +B5 متفرداً'
                : 'Four Key Dermatological Actives Behind Cicaplast B5+'}
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

        {/* Part 3: Interactive Targeted Application Areas */}
        <div className="bg-gradient-to-br from-stone-50 via-teal-50/20 to-white p-6 sm:p-10 rounded-3xl border border-neutral-100">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'استخدامات متعددة 14 في 1' : '14-in-1 Versatile Clinical Uses'}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900">
              {isAr
                ? 'أين وكيف يمكنك استخدام سيكابلاست بوم +B5؟'
                : 'Targeted Application Areas for Everyday Skin Recovery'}
            </h3>
          </div>

          {/* Area Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {product.applicationAreas.map((area) => {
              const isSelected = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 scale-105'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-teal-300'
                  }`}
                >
                  {isAr ? area.titleAr : area.titleEn}
                </button>
              );
            })}
          </div>

          {/* Active Area Card */}
          {activeArea && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 border border-teal-100 shadow-xs text-center space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                {isAr ? activeArea.badgeAr : activeArea.badgeEn}
              </span>
              <h4 className="text-lg font-bold text-neutral-900">
                {isAr ? activeArea.titleAr : activeArea.titleEn}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl mx-auto">
                {isAr ? activeArea.descAr : activeArea.descEn}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CicaplastDescription;
