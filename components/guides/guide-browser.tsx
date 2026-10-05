'use client';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, BookOpen } from 'lucide-react';
import { categories } from '@/config/categories';
import { searchGuides } from '@/lib/search';
import type { Guide } from '@/lib/types';
import { GuideCard } from './guide-card';
import { useBookmarks } from '@/lib/bookmarks';

export function GuideBrowser({ guides }: { guides: Guide[] }) {
  return (
    <Suspense
      fallback={<GuideBrowserInner guides={guides} initialQuery="" initialCategory="all" />}
    >
      <GuideBrowserWithParams guides={guides} />
    </Suspense>
  );
}

function GuideBrowserWithParams({ guides }: { guides: Guide[] }) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') ?? '';
  const initialCategory = searchParams.get('category') ?? 'all';
  return (
    <GuideBrowserInner
      guides={guides}
      initialQuery={initialQuery}
      initialCategory={initialCategory}
    />
  );
}

function GuideBrowserInner({
  guides,
  initialQuery,
  initialCategory,
}: {
  guides: Guide[];
  initialQuery: string;
  initialCategory: string;
}) {
  const validInitialCategory = categories.some((c) => c.id === initialCategory)
    ? initialCategory
    : 'all';
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(validInitialCategory);
  const { ids } = useBookmarks();
  const [savedOnly, setSavedOnly] = useState(false);
  const results = useMemo(
    () => searchGuides(guides, query, category).filter((g) => !savedOnly || ids.includes(g.slug)),
    [guides, query, category, savedOnly, ids],
  );
  return (
    <>
      <div className="filter-search">
        <Search aria-hidden="true" />
        <input
          aria-label="ابحث في الأدلة"
          placeholder="ابحث عن موضوع أو خطوة…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <button onClick={() => setQuery('')}>مسح</button>}
      </div>
      <div className="filter-list" aria-label="تصفية حسب الموضوع">
        <button aria-pressed={savedOnly} onClick={() => setSavedOnly(!savedOnly)}>
          المحفوظات ({ids.length})
        </button>
        {[{ id: 'all', title: 'كل الأدلة' }, ...categories].map((c) => (
          <button key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
            {c.title}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        {results.length} أدلة متاحة
      </p>
      {results.length ? (
        <div className="guide-grid">
          {results.map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <BookOpen size={36} />
          <h2>لم نجد دليلاً بهذا البحث</h2>
          <p>جرّب كلمات أقل أو اختر موضوعاً آخر.</p>
          <button
            className="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
              setSavedOnly(false);
            }}
          >
            عرض كل الأدلة
          </button>
        </div>
      )}
    </>
  );
}
