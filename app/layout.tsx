import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LocaleSync } from "./LocaleSync";

export const metadata: Metadata = {
  title: "Safsafah | صفصافه",
  description: "ecommerce platform for selling cosmatic and skincare products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
      <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"></link>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"></link>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"></link>
      <link rel="manifest" href="/favicons/site.webmanifest"></link>
      </head>
      <body
        className={``}
      >
        <LocaleSync />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
