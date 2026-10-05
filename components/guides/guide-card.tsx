import Link from 'next/link';
import { Clock3, ArrowUpLeft } from 'lucide-react';
import { categories } from '@/config/categories';
import { Icon } from '@/components/ui/icon';
import type { Guide } from '@/lib/types';
import { SaveButton } from './save-button';
export function GuideCard({ guide }: { guide: Guide }) {
  const category = categories.find((c) => c.id === guide.category);
  const guideCategories = categories.filter((c) =>
    [guide.category, ...(guide.categories ?? [])].includes(c.id),
  );
  return (
    <article className="guide-card">
      <span className={`guide-symbol ${guide.category}`}>
        <Icon name={category?.icon ?? 'residence'} size={30} />
      </span>
      <div className="guide-content">
        <div className="guide-tags">
          {guideCategories.map((c) => (
            <span className="tag" key={c.id}>
              #{c.title}
            </span>
          ))}
        </div>
        <h3>
          <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
        </h3>
        <p>{guide.description}</p>
        <div className="guide-bottom">
          <span>
            <Clock3 size={15} /> {guide.minutes} دقائق قراءة
          </span>
          <span>
            <ArrowUpLeft size={15} aria-hidden="true" /> قراءة سهلة
          </span>
        </div>
      </div>
      <SaveButton slug={guide.slug} title={guide.title} />
    </article>
  );
}
