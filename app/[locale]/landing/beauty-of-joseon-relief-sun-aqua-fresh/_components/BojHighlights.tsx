import React from 'react';
import { Droplets, ShieldCheck, Sun, Sparkles } from 'lucide-react';

interface BojHighlightsProps {
  lang: string;
}

export const BojHighlights: React.FC<BojHighlightsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: Droplets,
      titleAr: 'قوام أكوا مائي فائق الخفة',
      titleEn: 'Featherlight Aqua-Lotion Texture',
      descAr:
        'يمتص خلال ثوانٍ معدودة ليمنح بشرتك ترطيباً منعشاً بدون أي لمعان دهني أو ثقل حتى في ذروة حر الصيف.',
      descEn:
        'Absorbs in seconds with a cooling watery burst—zero grease, zero stickiness, and zero heavy film even in humid heat.',
    },
    {
      icon: Sun,
      titleAr: 'حماية قصوى SPF50+ PA++++',
      titleEn: 'Clinical SPF50+ PA++++ Shield',
      descAr:
        'فلاتر كورية متطورة تحجب أشعة UVA المسببة للتجاعيد والتصبغات وأشعة UVB المسببة لحروق الشمس والاسمرار.',
      descEn:
        'Photostable Korean UV filters deliver broad-spectrum defense against UVA dark spots and UVB sunburn.',
    },
    {
      icon: Sparkles,
      titleAr: '30٪ ماء بذور الأرز + فيتامين B5',
      titleEn: '30% Rice Seed Water + Vitamin B5',
      descAr:
        'مزيج مغذٍ يجمع بين إشراقة الأرز الكوري وتهدئة البانثينول لتقوية حاجز البشرة ومنع تهيجها من الشمس.',
      descEn:
        'Nourishing synergy of Korean Rice Seed Water and Panthenol to brighten skin tone, lock in hydration, and calm redness.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'بدون أثر أبيض أو انسداد للمسام',
      titleEn: 'Zero White Cast & Non-Comedogenic',
      descAr:
        'شفاف تماماً على جميع درجات البشرة ومثالي للبشرة الدهنية والمختلطة والمعرضة للحبوب وتحت المكياج.',
      descEn:
        'Dries 100% invisible on all skin tones without pilling under makeup or clogging pores on acne-prone skin.',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'الجيل الجديد من واقي الشمس الكوري' : 'Next-Generation K-Beauty Sun Care'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'لماذا يعشق الجميع ريليف صن أكوا فريش في مصر؟'
              : 'Why Everyone in Egypt Is Switching to Relief Sun Aqua-fresh'}
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
            <div className="text-2xl sm:text-3xl font-black text-teal-200">SPF50+</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'أعلى حماية كورية PA++++' : 'Maximum PA++++ UVA Defense'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">30%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'ماء بذور الأرز النقي' : 'Pure Rice Seed Water'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">0%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'أثر أبيض أو ملمس دهني' : 'White Cast or Greasy Shine'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">50ml</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'صنع في كوريا الجنوبية' : 'Made in South Korea'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BojHighlights;
