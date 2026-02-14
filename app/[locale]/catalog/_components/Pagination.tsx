interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  lang: string;
  brand: { primary: string };
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, total, limit, lang, brand, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  if (total <= limit) return null;

  const isRTL = lang === 'ar';

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ borderColor: brand.primary, color: brand.primary }}
      >
        {isRTL ? 'السابق' : 'Previous'}
      </button>
      <span className="px-4 py-2">
        {isRTL
          ? `صفحة ${page} من ${totalPages}`
          : `Page ${page} of ${totalPages}`}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ borderColor: brand.primary, color: brand.primary }}
      >
        {isRTL ? 'التالي' : 'Next'}
      </button>
    </div>
  );
}
