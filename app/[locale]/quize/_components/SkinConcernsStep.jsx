/**
 * SkinConcernsStep Component
 * Second step - Select skin concerns (multiple selection)
 */

import PropTypes from 'prop-types';

export default function SkinConcernsStep({
  lang,
  skinConcerns,
  selectedConcerns,
  onToggle,
  primaryColor,
}) {
  const title = {
    ar: 'ما هي مشاكل بشرتك الأساسية؟',
    en: 'What are your main skin concerns?',
  };

  const description = {
    ar: 'يمكنك اختيار أكثر من مشكلة',
    en: 'You can select multiple concerns',
  };

  const handleToggle = (concernId) => {
    if (selectedConcerns.includes(concernId)) {
      onToggle(selectedConcerns.filter((id) => id !== concernId));
    } else {
      onToggle([...selectedConcerns, concernId]);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-1">{title[lang]}</h3>
        <p className="text-sm text-neutral-600">{description[lang]}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skinConcerns.map((concern) => {
          const isSelected = selectedConcerns.includes(concern.id);
          const name = lang === 'ar' ? concern.nameAr : concern.nameEn;

          return (
            <button
              key={concern.id}
              onClick={() => handleToggle(concern.id)}
              className={`
                px-4 py-2.5 rounded-full border-2 font-medium transition-all
                ${
                  isSelected
                    ? 'text-white shadow-md'
                    : 'text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                    }
                  : {}
              }
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

SkinConcernsStep.propTypes = {
  lang: PropTypes.string.isRequired,
  skinConcerns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nameAr: PropTypes.string.isRequired,
      nameEn: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedConcerns: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggle: PropTypes.func.isRequired,
  primaryColor: PropTypes.string,
};

SkinConcernsStep.defaultProps = {
  primaryColor: '#288880',
};
