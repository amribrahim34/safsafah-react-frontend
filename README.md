This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Internationalisation (i18n)

Supported locales: **`ar`** (default, RTL) and **`en`** (LTR). All routes are prefixed with the locale segment: `/ar/about`, `/en/about`. The middleware in `middleware.ts` redirects un-prefixed requests to the default locale.

Translation files live in `locales/<locale>/<namespace>.json` (namespaces: `home`, `about`).

### Pattern A — Server Components

Import the JSON files directly and select by locale from `params`.

```jsx
import enAbout from '@/locales/en/about.json';
import arAbout from '@/locales/ar/about.json';

export default async function Page({ params }) {
  const { locale } = await params;
  const t = locale === 'en' ? enAbout : arAbout;
  return <h1>{t.whoWeAre}</h1>;
}
```

### Pattern B — Client Components (preferred for interactive pages)

Import `@/lib/i18n` once to initialise i18next, use the `useTranslation` hook, and sync the active language with the URL locale via `useLocale()`.

```jsx
'use client';

import '@/lib/i18n';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/lib/locale-navigation';
import { useDir } from '@/hooks/useDir';

export default function Page() {
  const lang = useLocale();                   // reads locale from URL pathname
  const { t, i18n } = useTranslation('about');
  const { t: tHome } = useTranslation('home');

  useDir(); // syncs document.dir with URL locale (RTL/LTR)

  // Keep i18next in sync with the URL locale — must run before render
  if (i18n.language !== lang) i18n.changeLanguage(lang);

  return (
    <>
      <h1>{t('whoWeAre')}</h1>
      {/* Nested objects: */}
      <VisionMission t={t('visionMission', { returnObjects: true })} />
    </>
  );
}
```

**Rules of thumb:**
- Always import `@/lib/i18n` in the component that bootstraps the client tree for a page.
- Use `{ returnObjects: true }` when passing a nested translation object as a prop to a child component.
- Never call `useTranslation` in server components — use Pattern A there.
- `useDir()` sets `document.documentElement.dir`; also set `dir` on the page root `<div>` for correct layout before hydration.
