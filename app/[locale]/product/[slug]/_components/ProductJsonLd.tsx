import type { Product } from "@/types/models/product";
import { buildProductJsonLd } from "../_lib/buildProductJsonLd";

interface ProductJsonLdProps {
  product: Product;
  locale: string;
  slug: string;
}

/**
 * Server component — renders a <script type="application/ld+json"> tag
 * directly in the page body. Google indexes both head and body JSON-LD.
 *
 * This is the Next.js-recommended approach:
 * https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld
 */
const ProductJsonLd = ({ product, locale, slug }: ProductJsonLdProps) => {
  const jsonLd = buildProductJsonLd({ product, locale, slug });

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default ProductJsonLd;
