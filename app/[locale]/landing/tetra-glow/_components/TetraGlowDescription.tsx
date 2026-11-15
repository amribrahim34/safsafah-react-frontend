'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  Calendar,
  Layers,
  Heart,
  Droplets,
  Sun,
  ShieldCheck,
  RefreshCw,
  Leaf,
} from 'lucide-react';
import type { TetraGlowProductData } from '../_types';

interface TetraGlowDescriptionProps {
  product: TetraGlowProductData;
  lang: string;
}

export const TetraGlowDescription: React.FC<TetraGlowDescriptionProps> = ({ product, lang }) => {
  const [selectedAreaId, setSelectedAreaId] = useState(product.targetedAreas[0]?.id || 'bikini');
  const isAr = lang === 'ar';

  const iconMap: Record<string, React.ElementType> = {
    sparkles: Sparkles,
    'shield-check': ShieldCheck,
    'refresh-cw': RefreshCw,
    sun: Sun,
    leaf: Leaf,
    droplets: Droplets,
  };

  const selectedArea =
    product.targetedAreas.find((a) => a.id === selectedAreaId) || product.targetedAreas[0];

  return (
    <section className="py-14 bg-white" id="product-description-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'الدليل والتفاصيل الشاملة' : 'Complete Product Guide'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-neutral-900 leading-tight">
            {isAr
              ? 'وصف كريم تيترا جلو وطريقة عمله المتطورة'
              : 'Tetra Glow Detailed Description & Dermatological Action'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            {isAr
              ? 'صُمم كريم تيترا جلو 50 جم ليعالج الجذور الحقيقية للاسمرار في المناطق الحساسة ومناطق الاحتكاك، دون تقشير كيميائي قاسي أو التهاب.'
              : 'Formulated to target the underlying biological triggers of hyperpigmentation in friction-prone delicate areas without chemical stinging or irritation.'}
          </p>
          <div className="mt-4 mx-auto w-16 h-1 bg-teal-600 rounded-full" />
        </div>

        {/* Part 1: Comprehensive Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50/60 p-6 sm:p-10 rounded-3xl border border-neutral-100">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900">
              {isAr
                ? 'كيف يعالج تيترا جلو تصبغات المناطق الحساسة؟'
                : 'How Does Tetra Glow Resolve Sensitive Zone Pigmentation?'}
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {isAr
                ? 'تتعرض المناطق الحساسة (مثل منطقة البكيني، تحت الإبطين، وبين الفخذين) لاحتكاك حركي مستمر، رطوبة، تغيرات هرمونية، وتأثيرات إزالة الشعر المتكررة. يؤدي ذلك إلى إفراز مفرط لصبغة الميلانين وتراكم الخلايا الميتة السميكة.'
                : 'Delicate areas like the bikini line, underarms, and inner thighs constantly endure mechanical friction, sweat, moisture, hormonal variations, and shaving stress. This triggers melanocyte overactivation and creates stubborn darkened patches.'}
            </p>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              {isAr
                ? 'بينما تسبب كريمات التفتيح التقليدية تهيجاً والتهاباً يؤدي لاحقاً لزيادة التصبغ العكسي، يعتمد كريم تيترا جلو على تركيبة الرباعية الذكية (Quad-Action): تثبيط إنتاج الميلانين عبر اللوميسكين والترانيكساميك، تجديد سطحي لطيف بحمض الماندليك، تهدئة فورية بمستخلص عرق السوس، وترطيب عميق يحمي حاجز البشرة.'
                : 'While conventional bleaching creams cause post-inflammatory rebound hyperpigmentation, Tetra Glow utilizes a gentle Quad-Action approach: inhibits melanin synthesis via Lumiskin and Tranexamic Acid, gently micro-renews skin with Mandelic Acid, calms irritation with Licorice, and restores lipid barrier with Squalane.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {(isAr ? product.safetyBadgesAr : product.safetyBadgesEn).map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-teal-200 text-teal-800 shadow-2xs"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-4">
            <h4 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-600" />
              {isAr ? 'مواصفات المنتج الفنية' : 'Product Specifications'}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm divide-y divide-neutral-100">
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'اسم المنتج' : 'Product Name'}</span>
                <span className="font-semibold text-neutral-800">Tetra Glow</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الحجم والوزن' : 'Net Weight'}</span>
                <span className="font-semibold text-neutral-800">{product.size}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'نوع البشرة' : 'Skin Type'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'جميع أنواع البشرة (بما فيها الحساسة)' : 'All Skin Types (Sensitive Safe)'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'الملمس والقوام' : 'Texture'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'كريمي مخملي خفيف سريع الامتصاص' : 'Lightweight Velvety Cream'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">{isAr ? 'بلد المنشأ' : 'Origin / Formulation'}</span>
                <span className="font-semibold text-neutral-800">
                  {isAr ? 'معتمد ومسجل رسمياً' : 'Clinically Approved Formulation'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Active Ingredients Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
              {isAr ? 'قوة العلم والطبيعة' : 'Targeted Active Ingredients'}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900">
              {isAr
                ? 'أهم المكونات الفعالة لنتائج آمنة ومستدامة'
                : 'Key Bio-Actives Behind Tetra Glow’s Performance'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              {isAr ? 'مناطق الاستخدام المتعددة' : 'Targeted Application Areas'}
            </span>
            <h3 className="mt-1 text-2xl font-bold text-neutral-900">
              {isAr
                ? 'أين يمكنك استخدام كريم تيترا جلو؟'
                : 'Where Can You Apply Tetra Glow Safely?'}
            </h3>
          </div>

          {/* Area Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {product.targetedAreas.map((area) => {
              const isActive = area.id === selectedAreaId;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                >
                  {isAr ? area.titleAr : area.titleEn}
                </button>
              );
            })}
          </div>

          {/* Selected Area Content */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-teal-100/60 shadow-xs max-w-3xl mx-auto text-center space-y-3">
            <h4 className="text-lg sm:text-xl font-bold text-neutral-900">
              {isAr ? selectedArea.titleAr : selectedArea.titleEn}
            </h4>
            <p className="text-sm font-semibold text-teal-700">
              {isAr ? selectedArea.subtitleAr : selectedArea.subtitleEn}
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-2">
              {isAr ? selectedArea.tipsAr : selectedArea.tipsEn}
            </p>
          </div>
        </div>

        {/* Part 4: Step-by-Step Routine & Results Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* How to use */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-xs space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900">
                  {isAr ? 'طريقة الاستخدام المثالية' : 'How to Apply (Daily Routine)'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mb-6">
                {isAr
                  ? 'اتبعي هذه الخطوات البسيطة لتحقيق أعلى نتائج في أسرع وقت ممكن وبأمان تام:'
                  : 'Follow these straightforward steps to maximize brightening results safely:'}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">
                      {isAr ? 'التنظيف والتجفيف' : 'Cleanse & Dry'}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {isAr
                        ? 'اغسلي المنطقة بغسول لطيف وجففيها جيداً برفق وبدون فرك قوي.'
                        : 'Cleanse the area with a gentle cleanser and pat dry completely without harsh rubbing.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">
                      {isAr ? 'كمية مناسبة' : 'Apply Pea-Sized Amount'}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {isAr
                        ? 'ضعي كمية صغيرة بحجم حبة البازلاء على المنطقة التي ترغبين في تفتيحها.'
                        : 'Take a pea-sized drop for each targeted area; a little goes a long way.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">
                      {isAr ? 'تدليك خفيف حتى الامتصاص' : 'Gentle Circular Massage'}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {isAr
                        ? 'دلكي الكريم بحركات دائرية ناعمة حتى يتشربه الجلد في ثوانٍ معدودة.'
                        : 'Massage smoothly in circular motions until fully absorbed into the skin.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-800">
                      {isAr ? 'الانتظام مرتين يومياً' : 'Twice Daily Consistency'}
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      {isAr
                        ? 'استخدميه صباحاً ومساءً بانتظام للحصول على النتيجة المستمرة والتدريجية.'
                        : 'Use consistently morning and night for progressive and lasting radiance.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-800 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                {isAr
                  ? 'نصيحة ذهبية: يُفضل ارتداء ملابس داخلية قطنية فضفاضة لمنع الاحتكاك المستمر أثناء فترة العلاج.'
                  : 'Pro Tip: Wear breathable cotton loose clothing to minimize daily skin-on-skin friction.'}
              </span>
            </div>
          </div>

          {/* Results Timeline */}
          <div className="bg-gradient-to-br from-teal-900 to-teal-950 p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-teal-300" />
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {isAr ? 'الجدول الزمني للنتائج المتوقعة' : 'What To Expect Over Time'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-teal-200/80 mb-6">
                {isAr
                  ? 'رحلة تفتيح طبيعية متدرجة تحترم خلايا بشرتك:'
                  : 'A natural progressive brightening journey engineered to preserve skin health:'}
              </p>

              <div className="space-y-6 border-s border-teal-700/60 ms-3 ps-5">
                <div className="relative">
                  <div className="absolute -start-[27px] top-1 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-teal-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    {isAr ? 'الأسبوع الأول' : 'Week 1'}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    {isAr ? 'ترطيب فائق ونعومة حريرية' : 'Instant Hydration & Softness'}
                  </h4>
                  <p className="text-xs text-teal-100/70 mt-1 leading-relaxed">
                    {isAr
                      ? 'اختفاء الخشونة والجفاف، وتهدئة كاملة لأي تهيج أو احمرار ناتج عن الاحتكاك السابق.'
                      : 'Elimination of roughness and dry flaking; instant calming of friction redness.'}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -start-[27px] top-1 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-teal-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    {isAr ? 'الأسبوع 2 - 3' : 'Weeks 2 - 3'}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    {isAr ? 'تراجع التصبغات وتوحيد اللون' : 'Hyperpigmentation Fading'}
                  </h4>
                  <p className="text-xs text-teal-100/70 mt-1 leading-relaxed">
                    {isAr
                      ? 'يبدأ اللوميسكين وحمض الترانيكساميك في تفتيح البقع العميقة وتلاشي الحدود الداكنة.'
                      : 'Melanin output decreases; dark stubborn patches begin blending into natural skin tone.'}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -start-[27px] top-1 w-3.5 h-3.5 rounded-full bg-teal-300 border-2 border-teal-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                    {isAr ? 'الأسبوع 4 فما فوق' : 'Week 4 Onward'}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    {isAr ? 'لون موحد وإشراقة طبيعية ملموسة' : 'Unified Glow & Lasting Confidence'}
                  </h4>
                  <p className="text-xs text-teal-100/70 mt-1 leading-relaxed">
                    {isAr
                      ? 'مظهر بشرة متناسق، مشرق، ومفعم بالثقة بدون قلق من اسمرار عكسي عند التوقف.'
                      : 'Uniform, radiant skin tone with strong natural skin barrier and confidence.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-teal-800/60 rounded-xl text-xs text-teal-100 border border-teal-700/60 flex items-center gap-2">
              <Heart className="w-4 h-4 text-pink-300 flex-shrink-0" />
              <span>
                {isAr
                  ? 'نتائج آمنة ومدروسة بدون أي كورتيزون أو مواد مقشرة حارقة.'
                  : 'Zero cortisone, zero toxic bleaches—strictly safe dermatological actives.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TetraGlowDescription;
