'use client';
import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/lib/bookmarks';
export function SaveButton({ slug, title }: { slug: string; title: string }) {
  const { ids, toggle } = useBookmarks();
  const [error, setError] = useState(false);
  const saved = ids.includes(slug);
  return (
    <span className="bookmark-control">
      <button
        type="button"
        aria-label={`${saved ? 'إزالة من المحفوظات' : 'حفظ المقال'}: ${title}`}
        aria-pressed={saved}
        onClick={() => {
          try {
            toggle(slug);
            setError(false);
          } catch {
            setError(true);
          }
        }}
      >
        <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        <span>{saved ? 'محفوظ' : 'حفظ'}</span>
      </button>
      {error && <small role="alert">تعذّر الحفظ في هذا المتصفح.</small>}
    </span>
  );
}
