/**
 * SkinTypeStep Component
 * First step - Select skin type
 */

import PropTypes from 'prop-types';

export default function SkinTypeStep({ lang, skinTypes, selectedSkinType, onSelect }) {
  const title = {
    ar: 'ما نوع بشرتك؟',
    en: "What's your skin type?",
  };

  const description = {
    ar: 'اختر نوع بشرتك للحصول على توصيات مخصصة',
    en: 'Select your skin type to get personalized recommendations',
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-1">{title[lang]}</h3>
        <p className="text-sm text-neutral-600">{description[lang]}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skinTypes.map((skinType) => {
          const isSelected = selectedSkinType === skinType.id;
          const name = lang === 'ar' ? skinType.nameAr : skinType.nameEn;
          const desc = lang === 'ar' ? skinType.descriptionAr : skinType.descriptionEn;

          return (
            <button
              key={skinType.id}
              onClick={() => onSelect(skinType.id)}
              className={`
                p-4 rounded-xl border-2 text-start transition-all
                ${
                  isSelected
                    ? 'border-[#288880] bg-[#288880]/5 shadow-md'
                    : 'border-neutral-200 hover:border-neutral-300'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-base mb-1">{name}</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">{desc}</p>
                </div>
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ms-3 mt-1
                    ${isSelected ? 'border-[#288880] bg-[#288880]' : 'border-neutral-300'}
                  `}
                >
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

SkinTypeStep.propTypes = {
  lang: PropTypes.string.isRequired,
  skinTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nameAr: PropTypes.string.isRequired,
      nameEn: PropTypes.string.isRequired,
      descriptionAr: PropTypes.string.isRequired,
      descriptionEn: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedSkinType: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};
