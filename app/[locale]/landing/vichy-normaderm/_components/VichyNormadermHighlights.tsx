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
      titleAr: 'حمض الساليسيليك الطبيعي (Salicylic Acid)',
      titleEn: 'Natural Salicylic Acid (BHA)',
      descAr: 'حمض تقشير مستخلص من أصل طبيعي للتخلص الجذري من الرؤوس البيضاء والسوداء وتنظيف وتصغير مظهر المسام الواسعة بعمق.',
      descEn: 'Naturally derived BHA exfoliating acid that clears blackheads and whiteheads at the root and deeply purifies congested pores.',
    },
    {
      icon: Droplets,
      titleAr: 'حمض الهيالورونيك (Hyaluronic Acid)',
      titleEn: 'Hyaluronic Acid Hydration',
      descAr: 'مرطب مائي خفيف لمدة 24 ساعة يحافظ على المحتوى المائي للبشرة ويحمي حاجزها الطبيعي من الجفاف والشد.',
      descEn: 'Lightweight aquatic 24-hour hydration that preserves the skin water balance without clogging pores or adding oily sheen.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'جلوكونات الزنك (ZN-Gluconate)',
      titleEn: 'Zinc Gluconate (ZN-Gluconate)',
      descAr: 'تنظيم الإفرازات الدهنية ومضاد فعال للبكتيريا المسببة لحب الشباب لتقليل اللمعان والدهون على مدار اليوم.',
      descEn: 'Regulates sebaceous sebum output, minimizes mid-day shine, and delivers targeted anti-bacterial action against acne triggers.',
    },
    {
      icon: Leaf,
      titleAr: 'البروبيوتيك (Pro Biotic)',
      titleEn: 'Pro Biotic Immunity',
      descAr: 'يمنع تكرار ظهور الحبوب مرة أخرى وينشط ويقوي جهاز المناعة الطبيعي للبشرة لضمان صفاء يدوم طويلاً.',
      descEn: 'Reinforces the cutaneous barrier defense, preventing recurrent acne breakouts and enhancing the skin natural self-healing capacity.',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'العلم وراء فيشي نورماديرم' : 'The Science Behind Vichy Normaderm'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'أربعة مكونات طبية فعالة في غسول يومي خالٍ من السلفات'
              : 'Four Dermatological Bio-Actives in One Sulfate-Free Cleanser'}
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

        {/* Clinical Proof Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-teal-900 to-teal-800 text-white shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-white/10 rtl:divide-x-reverse">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">-40%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'تقليل الرؤوس السوداء والشوائب' : 'Reduced Blackheads & Impurities'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">24h</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'ترطيب مائي مستمر بالهيالورونيك' : '24h Continuous Hydration'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">100%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'خالٍ من السلفات والصابون' : 'Sulfate & Soap Free'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">200ml</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'حجم اقتصادي يكفي حتى 3 أشهر' : 'Economy Size Lasts up to 3 Months'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VichyNormadermHighlights;
