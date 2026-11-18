import React from 'react';
import { Sparkles, Droplets, ShieldCheck, Leaf } from 'lucide-react';

interface VichyNormadermHighlightsProps {
  lang: string;
}

export const VichyNormadermHighlights: React.FC<VichyNormadermHighlightsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: Sparkles,
      titleAr: 'حمض الساليسيليك (Salicylic Acid)',
      titleEn: 'Natural Salicylic Acid (BHA)',
      descAr: 'حمض تقشير مستخلص من أصل طبيعي للتخلص من الرؤوس البيضاء والسوداء وتنظيف وتطهير المسام بعمق.',
      descEn: 'Naturally derived BHA exfoliating acid that unclogs pores and eliminates blackheads and whiteheads at the root.',
    },
    {
      icon: Droplets,
      titleAr: 'حمض الهيالورونيك (Hyaluronic Acid)',
      titleEn: 'Hyaluronic Acid 24h Hydration',
      descAr: 'مرطب مائي خفيف لمدة 24 ساعة يحافظ على المحتوى المائي للبشرة ويحميها من الجفاف والشد.',
      descEn: 'Lightweight aquatic 24-hour hydration that locks in moisture without heaviness, leaving skin supple and soft.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'جلوكونات الزنك (ZN-Gluconate)',
      titleEn: 'Zinc Gluconate (ZN-Gluconate)',
      descAr: 'تنظيم الإفرازات الدهنية ومضاد فعال للبكتيريا المسببة لحب الشباب والحد من اللمعان طوال اليوم.',
      descEn: 'Regulates sebaceous sebum output, minimizes mid-day shine, and delivers targeted anti-bacterial defense.',
    },
    {
      icon: Leaf,
      titleAr: 'البروبيوتيك (Pro Biotic)',
      titleEn: 'Pro Biotic Skin Immunity',
      descAr: 'يمنع تكرار ظهور الحبوب مرة أخرى وينشط ويقوي جهاز المناعة والحاجز الطبيعي للبشرة.',
      descEn: 'Reinforces the cutaneous barrier defense, preventing recurrent acne breakouts and strengthening skin immunity.',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'المكونات الفعالة الأساسية' : 'Core Dermatological Actives'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'أربعة مكونات طبية فعالة لبشرة أنقى وأكثر توازناً'
              : 'Four Targeted Bio-Actives for Clear, Balanced Skin'}
          </h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-xs hover:shadow-md hover:border-teal-100 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-2">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mt-auto">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Clinical Proof & Gentle Foam Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-teal-900 to-teal-800 text-white shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 rtl:sm:divide-x-reverse">
          <div className="pt-2 sm:pt-0">
            <div className="text-xl sm:text-2xl font-black text-teal-200">
              {isAr ? 'تنظيف عميق ومنع الحبوب' : 'Deep Cleansing & Breakout Defense'}
            </div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'يتغلغل بالمسام ويقضي على الرؤوس السوداء' : 'Penetrates pores and clears comedones'}
            </div>
          </div>
          <div className="pt-4 sm:pt-0">
            <div className="text-xl sm:text-2xl font-black text-teal-200">
              {isAr ? 'لطيفة على البشرة الحساسة' : 'Gentle on Sensitive Skin'}
            </div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'رغوة ناعمة تحتضن بشرتك بدون شد' : 'Soft comforting foam without tightness'}
            </div>
          </div>
          <div className="pt-4 sm:pt-0">
            <div className="text-xl sm:text-2xl font-black text-teal-200">
              {isAr ? 'تزيل الشوائب والزيوت الزائدة' : 'Removes Impurities & Excess Sebum'}
            </div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'تحكم فوري في اللمعان طوال اليوم' : 'Instant, long-lasting oil and shine control'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VichyNormadermHighlights;
