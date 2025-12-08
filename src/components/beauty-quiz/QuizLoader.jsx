/**
 * QuizLoader Component
 * Loading state for the quiz
 */

import PropTypes from 'prop-types';

export default function QuizLoader({ lang }) {
  const message = {
    ar: 'جاري تحميل الاستبيان...',
    en: 'Loading questionnaire...',
  };

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-neutral-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#288880] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-neutral-600 font-medium">{message[lang]}</p>
    </div>
  );
}

QuizLoader.propTypes = {
  lang: PropTypes.string.isRequired,
};
