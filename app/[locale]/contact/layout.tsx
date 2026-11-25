import type { Metadata } from 'next';
import { buildAlternates } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  return {
    title: isAr ? 'تواصلي معنا' : 'Contact Us',
    description: isAr
      ? 'تواصلي مع فريق صفصافه. نحن هنا لمساعدتك في أي استفسار.'
      : "Get in touch with the Safsafah team. We're here to help with any questions.",
    alternates: buildAlternates(locale, '/contact'),
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
