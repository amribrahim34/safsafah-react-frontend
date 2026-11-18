import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake, Baby } from 'lucide-react';

interface CicaplastHighlightsProps {
  lang: string;
}

export const CicaplastHighlights: React.FC<CicaplastHighlightsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: Sparkles,
      titleAr: 'مركب تريبيوما (Tribioma™) المبتكر',
      titleEn: 'Patented Tribioma™ Microbiome Science',
      descAr: 'مركب بريبيوتيك فريد يعيد توازن الميكروبيوم الطبيعي على سطح البشرة، مما يسرع عملية التئام وترميم الحاجز الواقي.',
      descEn: 'Exclusive prebiotic complex rebalancing cutaneous microflora, drastically speeding up barrier reconstruction.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'تركيز 5٪ من البانثينول الطبي (Vitamin B5)',
      titleEn: 'High-Concentration 5% Panthenol',
      descAr: 'تسكين وتلطيف فوري للإحساس بالحرقان والوخز والاحمرار الناتج عن الجفاف الشديد، الليزر، أو التقشير الكيميائي.',
      descEn: 'Instant intense relief from burning, itching and extreme redness induced by winter dryness or clinical procedures.',
    },
    {
      icon: HeartHandshake,
      titleAr: 'ماديكاسوسايد النقي (Madecassoside)',
      titleEn: 'Pure Madecassoside Centella Extract',
      descAr: 'مستخلص بيولوجي يحفز تجدد الأنسجة ويقضي على التشققات الدقيقة في الوجه والجسم والشفاه بفعالية وسرعة فائقة.',
      descEn: 'Potent botanical active stimulating cellular renewal to heal micro-cracks and epidermal damage cleanly.',
    },
    {
      icon: Baby,
      titleAr: 'عناية شاملة لجميع أفراد الأسرة',
      titleEn: 'Safe for the Entire Family & Infants',
      descAr: 'مختبر سريرياً وآمن للاستخدام اليومي على الرضع من عمر 3 أشهر والأطفال والبالغين على الوجه والجسم والشفاه.',
      descEn: 'Pediatrically tested and proven safe for delicate infant skin from 3 months, toddlers, adults and seniors.',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'لماذا يوصي به أطباء الجلدية حول العالم؟' : 'Why Dermatologists Globally Recommend Cicaplast B5+'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'البلسم العلاجي الأكثر شمولاً وترميماً لحاجز البشرة'
              : 'The Ultimate Dermatological Multi-Repairing Barrier Balm'}
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
            <div className="text-2xl sm:text-3xl font-black text-teal-200">100%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'راحة فورية للبشرة المتهيجة' : 'Instant Soothing Comfort'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">5%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'تركيز البانثينول الطبي المسكن' : 'Concentrated Medical Panthenol'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">14-in-1</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'استخدام علاجي متعدد للجسم والوجه' : 'Multi-Purpose Clinical Indications'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">100ml</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'العبوة العائلية الكبرى الأكثر توفيراً' : 'Large Family Value Size'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CicaplastHighlights;
