import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'الجمعيات' };
export default function AssociationsPage() {
  return (
    <main className="shell page-heading">
      <span className="eyebrow">الجمعيات</span>
      <h1>انتقل إلى قسم الجمعيات</h1>
      <p>هذا الرابط ينقلك إلى قسم الجمعيات في الصفحة الرئيسية.</p>
      <Link className="button" href="/#associations">
        فتح قسم الجمعيات
      </Link>
    </main>
  );
}
