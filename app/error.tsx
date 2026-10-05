'use client';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="shell empty-state">
      <h1>تعذّر تحميل الصفحة</h1>
      <p>حاول مرة أخرى بعد لحظة.</p>
      <button className="button" onClick={reset}>
        إعادة المحاولة
      </button>
    </div>
  );
}
