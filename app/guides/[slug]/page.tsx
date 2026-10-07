import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpLeft, Check, Clock3, ExternalLink } from 'lucide-react';
import { contentRepository } from '@/lib/content';
import { categories } from '@/config/categories';
import { SaveButton } from '@/components/guides/save-button';
import { LinkifiedText } from '@/components/guides/linkified-text';
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await contentRepository.listGuides()).map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const g = await contentRepository.getGuide((await params).slug);
  return { title: g?.title ?? 'الدليل غير موجود', description: g?.description };
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = await contentRepository.getGuide((await params).slug);
  if (!guide) notFound();
  const category = categories.find((c) => c.id === guide.category);
  const guideCategories = categories.filter((c) =>
    [guide.category, ...(guide.categories ?? [])].includes(c.id),
  );
  const isOwnSiteSource = guide.source.url.includes('sudaneseingermany.de');
  return (
    <div className="shell article-page">
      <nav className="breadcrumb" aria-label="مسار الصفحة">
        <Link href="/">الرئيسية</Link>
        <span>/</span>
        <Link href="/guides">الأدلة</Link>
        <span>/</span>
        <span>{category?.title}</span>
      </nav>
      <header className="article-heading">
        <div className="guide-tags">
          {guideCategories.map((c) => (
            <span className="tag" key={c.id}>
              {c.title}
            </span>
          ))}
        </div>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
        <div className="article-meta">
          <span>
            <Clock3 size={17} />
            {guide.minutes} دقائق قراءة
          </span>
          <span>
            {guide.origin === 'wordpress-archive'
              ? 'مقال من أرشيف الموقع · راجع حداثة المعلومات'
              : 'دليل تمهيدي · محتوى أولي'}
          </span>
        </div>
      </header>
      <SaveButton slug={guide.slug} title={guide.title} />
      <div className="article-layout">
        <aside className="article-toc">
          <h2>في هذا الدليل</h2>
          {guide.sections.map((s, i) => (
            <a href={`#section-${i + 1}`} key={`${i}-${s.title}`}>
              <span>0{i + 1}</span>
              {s.title}
            </a>
          ))}
          <Link className="button" href="/dashboard">
            ارجع لرحلتك <ArrowUpLeft size={18} />
          </Link>
        </aside>
        <article className="article-body">
          {guide.sections.map((s, i) => (
            <section id={`section-${i + 1}`} key={`${i}-${s.title}`}>
              <span className="article-number">0{i + 1}</span>
              <h2>{s.title}</h2>
              <LinkifiedText
                text={s.body}
                internalLinks={s.internalLinks}
                externalLinks={s.externalLinks}
              />
              {s.table && (
                <div className="article-table-wrap">
                  <table className="article-table">
                    <thead>
                      <tr>
                        {s.table.headers.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                        {s.table.rows.map((row, rowIndex) => (
                      <tr key={`${rowIndex}-${row[0]}`}>
                        {row.map((cell, cellIndex) => {
                          const link = s.externalLinks?.find(
                            (item) => item.term === cell
                          );

                          return (
                            <td key={`${cellIndex}-${cell}`}>
                              {link ? (
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="table-link"
                                >
                                  {cell}
                                </a>

                              ) : (
                                cell
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}

                    </tbody>
                  </table>
                </div>
              )}
              {s.checklist && (
                <ul className="checklist">
                  {s.checklist.map((item, itemIndex) => (
                    <li key={`${itemIndex}-${item}`}>
                      <Check size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

                    
          {guide.attachments && guide.attachments.length > 0 && (
            <div className="article-attachments">
              <h2>ملفات مرفقة</h2>

                           <div className="attachment-list">
                {guide.attachments.map((attachment) => (
                  <a
                    key={attachment.file}
                    href={attachment.file}
                    download
                    className="attachment-item"
                  >
                    <span className="attachment-icon">
                      {attachment.type === 'word' ? '📝' : '📄'}
                    </span>

                    <span className="attachment-info">
                      <strong>{attachment.label}</strong>
                      <small>
                        {attachment.type === 'word' ? ' Word file' : ' PDF file'}
                      </small>
                    </span>

                    <span className="attachment-download">
                      
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        
        <section>
         </section>

          <div className="source-box">
            <h2>{isOwnSiteSource ? 'عن هذا المقال' : 'المصدر'}</h2>
            <p>
              {isOwnSiteSource
                ? 'هذا المحتوى منشور ضمن موقع سودانيين في ألمانيا.'
                : 'يمكنك مراجعة المصدر للتأكد من التفاصيل الحالية.'}
            </p>
            {!isOwnSiteSource && (
              <a href={guide.source.url} target="_blank" rel="noopener noreferrer">
                {guide.source.label}
                <ExternalLink size={17} />
              </a>
            )}
          </div>
          <Link href="/guides" className="back-link">
            استكشف بقية الأدلة <ArrowUpLeft size={18} />
          </Link>
        </article>
      </div>
    </div>
  );
}
