import type { Metadata } from 'next';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import './globals.css';
import './community.css';
import './events.css';
import './content-lists.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { site } from '@/config/site';
export const metadata: Metadata = {
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <a href="#main" className="skip-link">
          انتقل إلى المحتوى
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
