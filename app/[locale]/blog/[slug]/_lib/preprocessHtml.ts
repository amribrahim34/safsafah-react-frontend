export const PRODUCT_SENTINEL = 'data-product-block="auto"';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[؀-ۿ\s]+/g, (match) => match.replace(/\s+/g, '-'))
    .replace(/[^\w؀-ۿ-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * 1. Injects `id` attributes into h2/h3 tags that lack them (for TOC anchors).
 * 2. Inserts a product-block sentinel after the 3rd </p> when no CMS markers exist.
 */
export function preprocessHtml(html: string): string {
  let processed = injectHeadingIds(html);
  processed = injectProductSentinel(processed);
  return processed;
}

function injectHeadingIds(html: string): string {
  const seen = new Map<string, number>();
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (match, level, attrs, inner) => {
    if (/\sid=/.test(attrs)) return match;
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const base = slugify(text) || `heading`;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

function injectProductSentinel(html: string): string {
  // Tier 1: CMS explicit markers
  if (/<!--\s*PRODUCT_BLOCK/.test(html)) {
    return html.replace(/<!--\s*PRODUCT_BLOCK(?::[^-]*)?\s*-->/gi, `<div ${PRODUCT_SENTINEL}></div>`);
  }

  // Tier 2: Auto — insert after 3rd </p> if ≥ 5 paragraphs exist
  const paragraphCount = (html.match(/<\/p>/gi) ?? []).length;
  if (paragraphCount < 5) return html;

  let count = 0;
  return html.replace(/<\/p>/gi, (match) => {
    count++;
    if (count === 3) {
      return `</p><div ${PRODUCT_SENTINEL}></div>`;
    }
    return match;
  });
}
