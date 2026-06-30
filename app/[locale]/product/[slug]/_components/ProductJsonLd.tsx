import type { Product } from "@/types/models/product";
import type { LocalReview } from "../types";
import { buildProductJsonLd } from "../_lib/buildProductJsonLd";

interface ProductJsonLdProps {
  product: Product;
  locale: string;
  slug: string;
  reviews?: LocalReview[];
}

/**
 * Server component — renders a <script type="application/ld+json"> tag
 * directly in the page body. Google indexes both head and body JSON-LD.
 *
 * This is the Next.js-recommended approach:
 * https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
 */
const ProductJsonLd = ({ product, locale, slug, reviews }: ProductJsonLdProps) => {
  const jsonLd = buildProductJsonLd({ product, locale, slug, reviews });

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ProductJsonLd;
