/**
 * QuizNavigation Component
 * Navigation buttons for quiz (Back, Next, Submit)
 */

import { useParams } from "next/navigation";

interface QuizNavigationProps {
  lang: 'en' | 'ar';
  onBack: () => void;
  onNext: () => void;
  showBack: boolean;
  nextLabel?: string;
  isLoading: boolean;
  primaryColor: string;
}

export default function QuizNavigation({
  onBack,
  onNext,
  showBack,
  nextLabel,
  isLoading,
  primaryColor,
}: QuizNavigationProps) {
  const translations = {
    back: { ar: 'رجوع', en: 'Back' },
    next: { ar: 'التالي', en: 'Next' },
  };

  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang =  (locale === 'en' || locale === 'ar') ? locale : 'ar';


  return (
    <div className="flex gap-3 mt-6">
      {showBack && (
        <button
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-2.5 rounded-xl font-semibold border transition-colors disabled:opacity-50"
          style={{
            borderColor: primaryColor,
            color: primaryColor,
          }}
        >
          {translations.back[lang]}
        </button>
      )}
      <button
        onClick={onNext}
        disabled={isLoading}
        className="px-6 py-2.5 rounded-xl font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: primaryColor }}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {lang === 'ar' ? 'جاري الحفظ...' : 'Saving...'}
          </span>
        ) : (
          nextLabel || translations.next[lang]
        )}
      </button>
    </div>
  );
}
