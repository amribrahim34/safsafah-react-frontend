import React from 'react';
import { Sparkles, Clock } from 'lucide-react';

interface VichyNormadermHighlightsProps {
  lang: string;
}

interface ClinicalStat {
  percent: number;
  timingAr: string;
  timingEn: string;
  labelAr: string;
  labelEn: string;
  ringColor: string;
}

/**
 * Displays official Vichy Normaderm Phytosolution Intensive Purifying Gel
 * clinical & self-assessment percentages (50 women, oily/acne-prone/sensitive skin, 4 weeks, 2x daily)
 * using SVG circular gauges for instant visual comprehension.
 */
export const VichyNormadermHighlights: React.FC<VichyNormadermHighlightsProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const clinicalStats: ClinicalStat[] = [
    {
      percent: 91,
      timingAr: 'من الغسلة الأولى',
      timingEn: 'From 1st Wash',
      labelAr: 'إزالة الأتربة وجزيئات التلوث',
      labelEn: 'Dirt & Pollution Particles Removed',
      ringColor: '#0f766e',
    },
    {
      percent: 94,
      timingAr: 'من الغسلة الأولى',
      timingEn: 'From 1st Wash',
      labelAr: 'تقليل الإفرازات الدهنية الزائدة',
      labelEn: 'Excess Sebum Appears Reduced',
      ringColor: '#0d9488',
    },
    {
      percent: 83,
      timingAr: 'بعد 4 أسابيع',
      timingEn: 'After 4 Weeks',
      labelAr: 'تحسن ونعومة ملمس البشرة',
      labelEn: 'Skin Texture Appears Refined',
      ringColor: '#059669',
    },
    {
      percent: 98,
      timingAr: 'بعد 4 أسابيع',
      timingEn: 'After 4 Weeks',
      labelAr: 'تخفيف مظهر آثار الشوائب والحبوب',
      labelEn: 'Imperfection Marks Look Reduced',
      ringColor: '#047857',
    },
  ];

  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="py-12 bg-neutral-50/70 border-y border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-teal-700 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            {isAr ? 'النتائج السريرية المعتمدة من فيشي' : 'Official Vichy Clinical Efficacy'}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-neutral-900">
            {isAr
              ? 'نتائج ملموسة من الغسلة الأولى وحتى 4 أسابيع'
              : 'Proven Results from 1st Wash to 4 Weeks'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500">
            {isAr
              ? 'اختبار سريري وتقييم ذاتي على 50 امرأة ببشرة دهنية وحساسة معرضة لحب الشباب (مرتين يومياً)'
              : 'Clinical & self-assessment study on 50 women with oily, acne-prone & sensitive skin (twice daily)'}
          </p>
          <div className="mt-3 mx-auto w-12 h-1 bg-teal-600 rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {clinicalStats.map((stat, idx) => {
            const dashOffset = circumference * (1 - stat.percent / 100);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-100 shadow-xs hover:shadow-md hover:border-teal-100 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* SVG Circular Percentage Gauge */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center mb-3">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96" aria-hidden="true">
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="7"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r={radius}
                      fill="none"
                      stroke={stat.ringColor}
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={dashOffset}
                    />
                  </svg>
                  <span
                    className="absolute text-xl sm:text-2xl font-black text-neutral-900 tabular-nums"
                    dir="ltr"
                  >
                    {stat.percent}%
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-teal-50 text-teal-800 mb-2">
                  <Clock className="w-3 h-3" />
                  {isAr ? stat.timingAr : stat.timingEn}
                </span>

                <h3 className="text-xs sm:text-sm font-bold text-neutral-800 leading-snug">
                  {isAr ? stat.labelAr : stat.labelEn}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Bottom Immediate Action Banner */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-teal-900 to-teal-800 text-white shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-white/10 rtl:sm:divide-x-reverse">
          <div className="pt-1 sm:pt-0">
            <div className="text-base sm:text-lg font-black text-teal-200">
              {isAr ? 'تأثير مطفي فوري' : 'Instant Mattifying Effect'}
            </div>
            <div className="text-xs text-teal-100/80 mt-0.5">
              {isAr ? 'لمعان ودهون أقل طوال اليوم' : 'Skin regreases less throughout the day'}
            </div>
          </div>
          <div className="pt-3 sm:pt-0">
            <div className="text-base sm:text-lg font-black text-teal-200">
              {isAr ? 'تقليص مظهر المسام والرؤوس' : 'Less Visible Pores & Blackheads'}
            </div>
            <div className="text-xs text-teal-100/80 mt-0.5">
              {isAr ? 'تنقية عميقة مع الاستمرار اليومي' : 'Visible blackhead & pore reduction over time'}
            </div>
          </div>
          <div className="pt-3 sm:pt-0">
            <div className="text-base sm:text-lg font-black text-teal-200">
              {isAr ? 'احترام حاجز البشرة' : 'Respects Skin Moisture Barrier'}
            </div>
            <div className="text-xs text-teal-100/80 mt-0.5">
              {isAr ? 'تنقية مكثفة بدون شد أو جفاف' : 'Purifies intensively without stripping sensitive skin'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VichyNormadermHighlights;
