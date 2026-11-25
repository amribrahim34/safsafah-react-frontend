import { permanentRedirect } from 'next/navigation';

export default function RootPage() {
  // Permanently redirect to default locale
  permanentRedirect('/ar');
}
