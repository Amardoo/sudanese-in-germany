import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="shell empty-state">
      <span className="eyebrow">404</span>
      <h1>الصفحة دي ما لقيناها</h1>
      <p>تقدر ترجع للأدلة وتلقى خطوتك القادمة.</p>
      <Link className="button" href="/guides">
        استكشف الأدلة
      </Link>
    </div>
  );
}
