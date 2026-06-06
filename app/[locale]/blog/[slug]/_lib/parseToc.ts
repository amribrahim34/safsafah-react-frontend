export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[؀-ۿ\s]+/g, (match) => match.replace(/\s+/g, '-'))
    .replace(/[^\w؀-ۿ-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '');
}

export function parseToc(html: string): TocItem[] {
  const items: TocItem[] = [];

  // Match headings with existing id attributes
  const withIdRegex = /<h([23])[^>]*\sid="([^"]*)"[^>]*>([\s\S]*?)<\/h[23]>/gi;
  let match: RegExpExecArray | null;

  while ((match = withIdRegex.exec(html)) !== null) {
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    if (text) {
      items.push({ level: parseInt(match[1]) as 2 | 3, id: match[2], text });
    }
  }

  // Fallback: headings without ids
  if (items.length === 0) {
    const noIdRegex = /<h([23])[^>]*>([\s\S]*?)<\/h[23]>/gi;
    while ((match = noIdRegex.exec(html)) !== null) {
      const text = match[2].replace(/<[^>]+>/g, '').trim();
      if (text) {
        items.push({ level: parseInt(match[1]) as 2 | 3, id: slugify(text) || `heading-${items.length}`, text });
      }
    }
  }

  return items;
}
