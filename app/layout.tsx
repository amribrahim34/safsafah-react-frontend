import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google'
import Script from "next/script";
import { Suspense } from "react";
import FacebookPixelPageView from "@/components/FacebookPixelPageView";


const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});
import "./globals.css";
import { Providers } from "./providers";
import { LocaleSync } from "./LocaleSync";

export const metadata: Metadata = {
  title: "Safsafah | صفصافه",
  description: "Discover Safsafah – your destination for premium cosmetics and skincare products. Shop trusted brands, expert-curated routines, and the latest beauty essentials. Enjoy fast delivery and exclusive deals every day.",
};

import { headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") || "ar";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
      <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"></link>
      <link rel="manifest" href="/favicons/site.webmanifest"></link>
      </head>

      <body
        className={`${cairo.variable} font-sans`}
      >
        <GoogleTagManager gtmId="G-XPJ4C7758M" />
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <Script
          id="google-ads-src"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18167280131"
        />
        <Script
          id="google-ads-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18167280131');
            `,
          }}
        />
        <LocaleSync />
        <Suspense fallback={null}>
          <FacebookPixelPageView />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
