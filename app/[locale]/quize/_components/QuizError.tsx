/**
 * QuizError Component
 * Error state for the quiz
 */

import { useParams } from "next/navigation";

interface QuizErrorProps {
  error: string;
  onRetry?: () => void;
}
export default function QuizError({ error, onRetry }: QuizErrorProps) {
  const translations = {
    title: { ar: 'حدث خطأ', en: 'Something went wrong' },
    retry: { ar: 'إعادة المحاولة', en: 'Try Again' },
  };
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang =  (locale === 'en' || locale === 'ar') ? locale : 'ar';

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-bold mb-2 text-neutral-900">{translations.title[lang]}</h3>
      <p className="text-neutral-600 text-center mb-6 max-w-md">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-[#288880] text-white rounded-xl font-semibold hover:bg-[#237870] transition-colors"
        >
          {translations.retry[lang]}
        </button>
      )}
    </div>
  );
}

