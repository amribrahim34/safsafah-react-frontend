'use client';

interface ShowReviewsButtonProps {
  lang: string;
  reviewCount: number;
}

export default function ShowReviewsButton({ lang, reviewCount }: ShowReviewsButtonProps) {
  if (reviewCount <= 0) return null;
  return (
    <button
      className="text-sm underline"
      onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
    >
      {lang === 'ar' ? 'قراءة المراجعات' : 'Read reviews'}
    </button>
  );
}
