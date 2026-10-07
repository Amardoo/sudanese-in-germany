import type { Metadata } from 'next';
import { GuideBrowser } from '@/components/guides/guide-browser';
import { contentRepository } from '@/lib/content';


export const metadata: Metadata = { title: 'المقالات' };

export default async function GuidesPage() {
  const guides = await contentRepository.listGuides();
  return (
    <div className="shell listing-page">
      <div className="page-heading">
        <span className="eyebrow">مكتبة خطوتك القادمة</span>
        <h1>
          معلومة واضحة.
          <br />
          بداية أسهل<span className="heading-dot">.</span>
        </h1>
        <p>استكشف مقالات الدراسة والعمل والحياة في ألمانيا.</p>
      </div>
      <GuideBrowser guides={guides} />
    </div>
  );
}
