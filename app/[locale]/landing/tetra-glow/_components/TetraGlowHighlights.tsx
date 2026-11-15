import React from 'react';
import { Sparkles, ShieldCheck, Feather, HeartHandshake } from 'lucide-react';

interface TetraGlowHighlightsProps {
  lang: string;
}

export const TetraGlowHighlights: React.FC<TetraGlowHighlightsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: Sparkles,
      titleAr: 'تفتيح رباعي الفعالية (Quad-Action)',
      titleEn: 'Quad-Action Brightening Science',
      descAr: 'تكامل علمي مدروس بين اللوميسكين وحمض الترانيكساميك ومستخلص عرق السوس وفيتامين سي النانوي لتفتيح تدريجي دائم وآمن.',
      descEn: 'Synergistic fusion of Lumiskin, Tranexamic Acid, Licorice Extract, and Nano-C for long-lasting, safe tone correction.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'أمان فائق للمناطق الحساسة',
      titleEn: 'Safe for Delicate & Intimate Skin',
      descAr: 'مصمم خصيصاً ليناسب طبيعة الجلد الرقيق المعرض للاحتكاك، وخالٍ تماماً من الهيدروكينون والبارابين والكحول والمواد المسببة للتحسس.',
      descEn: 'Specifically formulated for thin friction-prone skin; 100% free of hydroquinone, parabens, alcohol, and harsh exfoliants.',
    },
    {
      icon: Feather,
      titleAr: 'قوام مخملي غير لزج سريع الامتصاص',
      titleEn: 'Ultra-Light Velvety Non-Greasy Finish',
      descAr: 'يمتصه الجلد في ثوانٍ معدودة دون ترك أي أثر دهني أو لزوجة، مما يمنحك راحة تامة طوال اليوم وانتعاشاً مستمراً.',
      descEn: 'Absorbs instantly in seconds without tackiness or residue, allowing effortless comfort beneath clothing all day long.',
    },
    {
      icon: HeartHandshake,
      titleAr: 'ترميم وتنعيم حاجز البشرة',
      titleEn: 'Barrier Repair & Intense Moisture',
      descAr: 'غني بالسكوالين وزيوت اللوز والجوجوبا والبانثينول لمنع الجفاف والخشونة التي تعد السبب الأول في اسمرار الاحتكاك.',
      descEn: 'Fortified with Squalane, Sweet Almond, Jojoba, and Panthenol to protect moisture and prevent friction irritation.',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'لماذا تختارين تيترا جلو؟' : 'Why Choose Tetra Glow?'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'العناية المتكاملة بالمناطق الحساسة بأسلوب علمي فاخر'
              : 'Dermatological Care Crafted For Delicate Intimate Areas'}
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
            <div className="text-2xl sm:text-3xl font-black text-teal-200">98%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'رضا العميلات عن النعومة الفورية' : 'Instant Silkiness Satisfaction'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">2-4</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'أسابيع لتوحيد لون البشرة' : 'Weeks to Noticeable Brightening'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">0%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'هيدروكينون أو كحول مسبب للجفاف' : 'Hydroquinone or Harsh Alcohol'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">100%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'آمن ومناسب للاستخدام اليومي' : 'Safe for Daily Gentle Care'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TetraGlowHighlights;
