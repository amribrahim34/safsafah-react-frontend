import React from 'react';
import { Sparkles, Droplets, ShieldCheck, Leaf } from 'lucide-react';

interface DrAltheaHighlightsProps {
  lang: string;
}

export const DrAltheaHighlights: React.FC<DrAltheaHighlightsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const pillars = [
    {
      icon: Sparkles,
      titleAr: '3 مكونات لعلاج آثار الحبوب',
      titleEn: '3 Blemish Care Actives',
      descAr:
        'النياسيناميد وزهرة الكركديه والريسفيراترول لتفتيح آثار ما بعد الحبوب وتوحيد لون البشرة وتنقية المسام.',
      descEn:
        'Niacinamide, Hibiscus Flower & Resveratrol work together to fade post-acne marks and refine uneven tone.',
    },
    {
      icon: Droplets,
      titleAr: '4 مكونات للتغذية والترطيب',
      titleEn: '4 Deep Nourishing Actives',
      descAr:
        'بيتا جلوكان وحمض الهيالورونيك المتحلل وزهرة الربيع المسائية وكورالينا لترطيب عميق ومرونة فائقة.',
      descEn:
        'Beta-Glucan, Hydrolyzed Hyaluronic Acid, Evening Primrose & Corallina plump and hydrate without heaviness.',
    },
    {
      icon: ShieldCheck,
      titleAr: '5 مكونات للتهدئة والترميم',
      titleEn: '5 Soothing & Barrier Actives',
      descAr:
        'سنتيلا أسياتيكا وهوتوينيا وجاردينيا ولافندر وسيراميد NP لتهدئة الاحمرار وتقوية حاجز البشرة.',
      descEn:
        'Centella Asiatica, Heartleaf, Gardenia, Lavender & Ceramide NP calm redness and rebuild a damaged barrier.',
    },
    {
      icon: Leaf,
      titleAr: 'قوام جل-كريم نباتي وخالٍ من العطور',
      titleEn: 'Vegan, Fragrance-Free Gel-Cream',
      descAr:
        'يمتص بسرعة فائقة دون أن يسد المسام أو يترك طبقة دهنية — مثالي للبشرة الحساسة والمعرضة للحبوب.',
      descEn:
        'Breathable non-comedogenic texture absorbs cleanly with zero artificial fragrance, parabens, or pore congestion.',
    },
  ];

  return (
    <section className="py-12 bg-neutral-50/70 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-teal-700 uppercase">
            {isAr ? 'سر تركيبة 3-4-5 الكورية' : 'The Science Behind 3-4-5'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'لماذا يحقق كريم دكتور ألثيا 345 ريليف أعلى مبيعات العناية بالبشرة؟'
              : 'Why Dr. Althea 345 Relief Cream Is a K-Beauty Cult Favorite'}
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
            <div className="text-2xl sm:text-3xl font-black text-teal-200">3-4-5</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'تركيبة متكاملة لعلاج الحبوب والترميم' : 'Targeted Blemish, Nourish & Soothe'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">0%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'عطور صناعية أو بارابين' : 'Artificial Fragrance or Parabens'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-teal-200">100%</div>
            <div className="text-xs text-teal-100/80 mt-1">
              {isAr ? 'تركيبة نباتية آمنة للمسام' : 'Vegan & Non-Comedogenic'}
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

export default DrAltheaHighlights;
