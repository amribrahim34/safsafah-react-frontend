import type { Product } from '@/types/models/product';

interface ProductBadgesProps {
  product: Product;
  lang: string;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

interface SectionProps {
  label: string;
  children: React.ReactNode;
}

function BadgeSection({ label, children }: SectionProps) {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-neutral-500 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

/**
 * ProductBadges
 * Renders two optional badge groups beneath the product meta:
 *   1. Active Ingredients — pill badges with a flask icon
 *   2. Skin Types        — simpler tag pills
 *
 * Both sections are hidden when the product has no data for that field.
 */
export default function ProductBadges({ product, lang }: ProductBadgesProps) {
  const { activeIngredients, skinTypes } = product;

  const hasActiveIngredients = activeIngredients && activeIngredients.length > 0;
  const hasSkinTypes = skinTypes && skinTypes.length > 0;

  if (!hasActiveIngredients && !hasSkinTypes) return null;

  return (
    <div>
      {/* Active Ingredients */}
      {hasActiveIngredients && (
        <BadgeSection
          label={lang === 'ar' ? 'المكونات النشطة' : 'Active Ingredients'}
        >
          {activeIngredients!.map((ingredient) => (
            <span
              key={ingredient.id}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
            >
              <span aria-hidden="true">🧪</span>
              {lang === 'ar' ? ingredient.nameAr : ingredient.nameEn}
            </span>
          ))}
        </BadgeSection>
      )}

      {/* Skin Types */}
      {hasSkinTypes && (
        <BadgeSection
          label={lang === 'ar' ? 'مثالي لـ' : 'Ideal For'}
        >
          {skinTypes!.map((skinType) => (
            <span
              key={skinType.id}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700 border border-neutral-200"
            >
              {lang === 'ar' ? skinType.nameAr : skinType.nameEn}
            </span>
          ))}
        </BadgeSection>
      )}
    </div>
  );
}
