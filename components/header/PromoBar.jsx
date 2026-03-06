'use client';

export default function PromoBar({ text, brand }) {
  return (
    <div className="w-full text-white text-sm" style={{ background: brand.dark }}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
        <span className="opacity-95">{text}</span>
      </div>
    </div>
  );
}
