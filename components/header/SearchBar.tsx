'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  brandPrimary: string;
  placeholder: string;
  isRTL: boolean;
  isMobile?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  brandPrimary,
  placeholder,
  isRTL,
  isMobile = false,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  if (isMobile) {
    return (
      <div className="md:hidden px-4 pb-3">
        <div
          className={`flex overflow-hidden rounded-2xl border border-neutral-200 bg-white focus-within:ring-2 ${isRTL ? 'flex-row-reverse' : ''}`}
          style={{ '--tw-ring-color': brandPrimary } as React.CSSProperties}
        >
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-sm"
            placeholder={placeholder}
          />
          <button
            onClick={onSearch}
            aria-label={isRTL ? 'بحث' : 'Search'}
            className="flex items-center justify-center w-12 shrink-0 text-white transition-opacity hover:opacity-90"
            style={{ background: brandPrimary }}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-[760px] min-w-[260px] hidden md:block order-3">
      <div
        className="flex overflow-hidden rounded-2xl border border-neutral-200 bg-white/80 focus-within:ring-2"
        style={{ '--tw-ring-color': brandPrimary } as React.CSSProperties}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-sm"
          placeholder={placeholder}
        />
        <button
          onClick={onSearch}
          aria-label={isRTL ? 'بحث' : 'Search'}
          className="flex items-center justify-center w-10 shrink-0 text-white transition-opacity hover:opacity-90"
          style={{ background: brandPrimary }}
        >
          <Search className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
