import React from 'react';
import { Sparkles, Shield, Droplets, Scale } from 'lucide-react';

interface VichyNormadermVisualScienceProps {
  lang: string;
}

/**
 * Purely visual skin cross-section infographic illustrating how the 4 official
 * Vichy Normaderm Phytosolution Gel elements act on pores, oil glands, and the barrier
 * with minimal reading required.
 */
export const VichyNormadermVisualScience: React.FC<VichyNormadermVisualScienceProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const visualNodes = [
    {
      num: '1',
      icon: Droplets,
      code: 'pH 5.5',
      titleAr: 'قاعدة نباتية',
      titleEn: 'Vegetal Base',
      tagAr: 'رغوة لطيفة · بدون جفاف',
      tagEn: 'Gentle Foam · Zero Strip',
      zoneAr: 'سطح البشرة',
      zoneEn: 'Skin Surface',
      meterWidth: 'w-full',
      accent: 'bg-sky-50 text-sky-700 border-sky-200',
      badgeBg: 'bg-sky-600',
    },
    {
      num: '2',
      icon: Shield,
      code: 'BIFIDUS',
      titleAr: 'مستخلص البروبيوتيك',
      titleEn: 'Bifidus Probiotic',
      tagAr: 'تقوية حاجز البشرة',
      tagEn: 'Barrier Defense',
      zoneAr: 'الحاجز الواقي',
      zoneEn: 'Skin Barrier',
      meterWidth: 'w-11/12',
      accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badgeBg: 'bg-emerald-600',
    },
    {
      num: '3',
      icon: Sparkles,
      code: 'BHA',
      titleAr: 'حمض الساليسيليك',
      titleEn: 'Salicylic Acid',
      tagAr: 'تنقية المسام والرؤوس',
      tagEn: 'Unclogs Pores',
      zoneAr: 'عمق المسام',
      zoneEn: 'Deep Pore',
      meterWidth: 'w-11/12',
      accent: 'bg-teal-50 text-teal-800 border-teal-200',
      badgeBg: 'bg-teal-700',
    },
    {
      num: '4',
      icon: Scale,
      code: 'Zn²⁺ · Cu²⁺',
      titleAr: 'معادن الزنك والنحاس',
      titleEn: 'Zinc & Copper',
      tagAr: 'توازن وإطفاء اللمعان',
      tagEn: 'Sebum Control',
      zoneAr: 'الغدد الدهنية',
      zoneEn: 'Oil Glands',
      meterWidth: 'w-10/12',
      accent: 'bg-teal-50/80 text-teal-900 border-teal-200',
      badgeBg: 'bg-teal-800',
    },
  ];

  return (
    <div className="rounded-3xl bg-gradient-to-br from-teal-50/60 via-white to-stone-50 border border-teal-100/90 p-5 sm:p-8 shadow-xs">
      {/* Compact Visual Header */}
      <div className="text-center max-w-xl mx-auto mb-7">
        <span className="text-[11px] font-bold tracking-widest text-teal-700 uppercase">
          {isAr ? 'آلية العمل البصرية' : 'Visual Skin-Action Map'}
        </span>
        <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-neutral-900">
          {isAr ? 'أين يعمل كل عنصر داخل بشرتك؟' : 'Where Every Active Works'}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left/Center: Custom SVG Skin & Pore Cross-Section Illustration */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl bg-white border border-teal-100/80 p-3 sm:p-4 shadow-xs overflow-hidden">
            {/* Pure SVG diagram — wrapped in dir="ltr" so coordinates and chemical tags stay crisp */}
            <div dir="ltr">
              <svg
                viewBox="0 0 440 310"
                className="w-full h-auto select-none"
              role="img"
              aria-label={
                isAr
                  ? 'رسم توضيحي لطبقات البشرة والمسام يوضح عمل الغسول'
                  : 'Skin cross-section illustration showing pore cleansing, barrier defense, and oil control'
              }
            >
              <defs>
                <linearGradient id="vichySurfaceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ecfeff" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <linearGradient id="vichyEpidermisGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#ccfbf1" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="vichyDermisGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f5f5f4" />
                  <stop offset="100%" stopColor="#e7e5e4" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="vichyPoreCanalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0f766e" stopOpacity="0.32" />
                </linearGradient>
                <radialGradient id="vichyFoamBubble" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="65%" stopColor="#cffafe" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.25" />
                </radialGradient>
              </defs>

              {/* Background Layers */}
              <rect x="0" y="0" width="440" height="82" rx="14" fill="url(#vichySurfaceGrad)" />
              <rect x="0" y="82" width="440" height="72" fill="url(#vichyEpidermisGrad)" />
              <rect x="0" y="154" width="440" height="156" rx="14" fill="url(#vichyDermisGrad)" />

              {/* Soft Foam Bubbles on Skin Surface (Zone 1: Vegetal Base pH 5.5) */}
              <g>
                <circle cx="58" cy="56" r="18" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
                <circle cx="90" cy="46" r="24" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
                <circle cx="128" cy="58" r="15" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
                <circle cx="164" cy="48" r="19" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
                <circle cx="278" cy="50" r="20" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
                <circle cx="316" cy="44" r="25" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
                <circle cx="354" cy="58" r="17" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
                <circle cx="386" cy="48" r="13" fill="url(#vichyFoamBubble)" stroke="#99f6e4" strokeWidth="1.2" />
              </g>

              {/* Skin Surface Curve Splitting for the Pore */}
              <path
                d="M 0 82 L 172 82 Q 192 82 198 106 L 204 252 Q 220 272 236 252 L 242 106 Q 248 82 268 82 L 440 82"
                fill="none"
                stroke="#0f766e"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Pore Funnel Fill */}
              <path
                d="M 172 82 Q 192 82 198 106 L 204 252 Q 220 272 236 252 L 242 106 Q 248 82 268 82 Z"
                fill="url(#vichyPoreCanalGrad)"
              />

              {/* Epidermis Barrier Cells (Zone 2: Bifidus Probiotic Shield) */}
              <g fill="#ffffff" fillOpacity="0.85" stroke="#10b981" strokeWidth="1.3">
                {/* Left barrier bricks */}
                <rect x="20" y="92" width="44" height="22" rx="7" />
                <rect x="70" y="92" width="44" height="22" rx="7" />
                <rect x="120" y="92" width="44" height="22" rx="7" />
                <rect x="38" y="120" width="44" height="22" rx="7" />
                <rect x="88" y="120" width="44" height="22" rx="7" />
                <rect x="138" y="120" width="44" height="22" rx="7" />
                {/* Right barrier bricks */}
                <rect x="276" y="92" width="44" height="22" rx="7" />
                <rect x="326" y="92" width="44" height="22" rx="7" />
                <rect x="376" y="92" width="44" height="22" rx="7" />
                <rect x="260" y="120" width="44" height="22" rx="7" />
                <rect x="310" y="120" width="44" height="22" rx="7" />
                <rect x="360" y="120" width="44" height="22" rx="7" />
              </g>

              {/* Bifidus Barrier Shield Icon Badge (Left Barrier) */}
              <g transform="translate(88, 102)">
                <path
                  d="M 0 -14 L 13 -8 L 13 3 C 13 11 7 16 0 19 C -7 16 -13 11 -13 3 L -13 -8 Z"
                  fill="#059669"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <path
                  d="M -5 2 L -1 6 L 6 -2"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* Sebaceous Glands (Zone 4: Zinc & Copper Oil Regulation) */}
              {/* Left gland */}
              <g>
                <path
                  d="M 201 196 C 174 190 156 172 130 180 C 102 188 94 220 112 242 C 130 264 166 258 182 234 C 190 222 195 212 202 212 Z"
                  fill="#fef3c7"
                  stroke="#d97706"
                  strokeWidth="1.8"
                  strokeOpacity="0.65"
                />
                {/* Calming Zinc & Copper ions */}
                <circle cx="134" cy="212" r="13" fill="#0f766e" />
                <text x="134" y="216" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="800">
                  Zn²⁺
                </text>
                <circle cx="164" cy="226" r="12" fill="#0d9488" />
                <text x="164" y="230" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="800">
                  Cu²⁺
                </text>
              </g>
              {/* Right gland */}
              <g>
                <path
                  d="M 239 196 C 266 190 284 172 310 180 C 338 188 346 220 328 242 C 310 264 274 258 258 234 C 250 222 245 212 238 212 Z"
                  fill="#fef3c7"
                  stroke="#d97706"
                  strokeWidth="1.8"
                  strokeOpacity="0.65"
                />
                <circle cx="294" cy="216" r="6" fill="#f59e0b" fillOpacity="0.45" />
                <circle cx="312" cy="204" r="4.5" fill="#f59e0b" fillOpacity="0.4" />
                <circle cx="278" cy="226" r="4" fill="#f59e0b" fillOpacity="0.4" />
              </g>

              {/* Salicylic Acid Purification Inside Pore (Zone 3: BHA lifting impurities up) */}
              <g>
                {/* Upward cleaning flow arrows */}
                <path
                  d="M 220 228 L 220 112"
                  stroke="#0f766e"
                  strokeWidth="2.5"
                  strokeDasharray="5 4"
                  strokeLinecap="round"
                />
                <path
                  d="M 212 122 L 220 108 L 228 122"
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Impurity particles being lifted out */}
                <circle cx="214" cy="184" r="4.5" fill="#78716c" fillOpacity="0.55" />
                <circle cx="228" cy="158" r="4" fill="#78716c" fillOpacity="0.45" />
                <circle cx="215" cy="134" r="3.5" fill="#78716c" fillOpacity="0.35" />
                <circle cx="225" cy="70" r="4" fill="#14b8a6" fillOpacity="0.55" />
                {/* BHA pill inside pore */}
                <rect x="196" y="196" width="48" height="20" rx="10" fill="#0f766e" />
                <text x="220" y="209.5" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="800">
                  BHA
                </text>
              </g>

              {/* pH 5.5 Pill at Surface */}
              <g transform="translate(296, 16)">
                <rect x="0" y="0" width="70" height="24" rx="12" fill="#0284c7" />
                <text x="35" y="15.5" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">
                  pH 5.5
                </text>
              </g>

              {/* Numbered Callout Pins (1-4) matching the Visual Action Cards */}
              {/* Pin 1: Surface Foam */}
              <g transform="translate(40, 26)">
                <circle cx="0" cy="0" r="13" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
                <text x="0" y="4.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                  1
                </text>
              </g>
              {/* Pin 2: Skin Barrier */}
              <g transform="translate(38, 128)">
                <circle cx="0" cy="0" r="13" fill="#059669" stroke="#ffffff" strokeWidth="2.5" />
                <text x="0" y="4.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                  2
                </text>
              </g>
              {/* Pin 3: Pore Canal */}
              <g transform="translate(254, 152)">
                <circle cx="0" cy="0" r="13" fill="#0f766e" stroke="#ffffff" strokeWidth="2.5" />
                <text x="0" y="4.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                  3
                </text>
              </g>
              {/* Pin 4: Sebaceous Gland */}
              <g transform="translate(108, 258)">
                <circle cx="0" cy="0" r="13" fill="#115e59" stroke="#ffffff" strokeWidth="2.5" />
                <text x="0" y="4.5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="800">
                  4
                </text>
              </g>
            </svg>
            </div>

            {/* Minimal Visual Legend Strip under SVG */}
            <div className="mt-2 pt-2.5 border-t border-neutral-100 flex items-center justify-around gap-2 text-[10px] sm:text-[11px] font-bold text-neutral-600">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                {isAr ? 'السطح' : 'Surface'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                {isAr ? 'الحاجز' : 'Barrier'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-700" />
                {isAr ? 'المسام' : 'Pores'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-900" />
                {isAr ? 'الدهون' : 'Sebum'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: 2x2 Minimal Visual Outcome Tiles (No Paragraphs) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-4">
          {visualNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.num}
                className="rounded-2xl bg-white border border-neutral-200/80 p-3.5 sm:p-5 shadow-2xs hover:border-teal-300 hover:shadow-sm transition-all flex flex-col justify-between gap-2.5 sm:gap-3 min-w-0"
              >
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    className={`w-7 h-7 rounded-full ${node.badgeBg} text-white text-xs font-black flex items-center justify-center shadow-2xs shrink-0`}
                  >
                    {node.num}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border tracking-wide ${node.accent}`}
                    dir="ltr"
                  >
                    {node.code}
                  </span>
                </div>

                <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 w-full">
                    <div className="text-xs sm:text-sm font-extrabold text-neutral-900 leading-tight break-words">
                      {isAr ? node.titleAr : node.titleEn}
                    </div>
                    <div className="text-[11px] font-semibold text-teal-700 mt-0.5 leading-snug">
                      {isAr ? node.tagAr : node.tagEn}
                    </div>
                  </div>
                </div>

                {/* Visual target zone bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-400">
                    <span>{isAr ? node.zoneAr : node.zoneEn}</span>
                    <span className="text-teal-700">✓</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-neutral-100 overflow-hidden">
                    <div className={`h-full rounded-full ${node.badgeBg} ${node.meterWidth}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VichyNormadermVisualScience;
