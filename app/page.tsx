import Link from 'next/link';
import { ArrowLeft, Route, BookOpen, Check, Compass } from 'lucide-react';
import { site } from '@/config/site';
import { categories } from '@/config/categories';
import { Icon } from '@/components/ui/icon';
import { SearchForm } from '@/components/home/search-form';
import { PathCards } from '@/components/journey/path-cards';
import { GuideCard } from '@/components/guides/guide-card';
import { contentRepository } from '@/lib/content';
import { CommunityPreview } from '@/components/home/community-preview';
import { AssociationBrowser } from '@/components/associations/association-browser';
export default async function Home() {
  const guides = await contentRepository.listGuides();
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-line" />
              {site.eyebrow}
            </span>
            <h1 className="hero-title-desktop">
              {site.heroTitle}
              <br />
              <span>{site.heroAccent}</span>
            </h1>
            <h1 className="hero-title-mobile">{site.mobileHeroTitle}</h1>
            <p>{site.heroDescription}</p>
            <SearchForm />
            <div className="quick-search">
              <span>الأكثر بحثاً:</span>
              {[
                { label: 'الدراسة', q: 'الجامعة' },
                { label: 'اللغة الألمانية', q: 'اللغة' },
                { label: 'السكن', q: 'السكن' },
              ].map((x) => (
                <Link href={`/guides?q=${encodeURIComponent(x.q)}`} key={x.label}>
                  {x.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hero-companion">
            <div className="companion-head">
              <span className="light-icon">
                <Route size={25} />
              </span>
              <span>
                كل بداية تستاهل خطة<small>MY NEXT CHAPTER</small>
              </span>
              <Compass className="compass" size={32} />
            </div>
            <h2>
              اعرف خطوتك الجاية.
            </h2>
            <div className="mini-route">
              <div>
                <span className="mini-check">
                  <Check size={16} />
                </span>
                <span>اختر المسار المناسب ليك</span>
              </div>
              <div>
                <span>02</span>
                <span>اكتشف أدلة مرتبطة بخطواتك</span>
              </div>
              <div>
                <span>03</span>
                <span>أنجز خطوة، وكمّل الرحلة</span>
              </div>
            </div>
            <Link href="/dashboard" className="companion-link">
              خلّينا نبدأ <ArrowLeft size={20} />
            </Link>
            <div className="companion-footer">
              <span>أربع بدايات</span>
              <span>وجهتك أنت.</span>
            </div>
          </div>
        </div>
      </section>
      <div className="category-strip">
        <div className="shell category-inner">
          {categories.map((c) => (
            <Link key={c.id} href={`/guides?category=${c.id}`}>
              <Icon name={c.icon} size={20} />
              {c.title}
            </Link>
          ))}
        </div>
      </div>
      <section className="shell section" id="paths">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ابدأ من مكانك</span>
            <h2>مسارات مختلفة</h2>
            <p>مسارات مختلفة، وخطوات تناسب بدايتك.</p>
          </div>
          <span className="section-note">اختر مسارك. والباقي خطوة خطوة.</span>
        </div>
        <PathCards />
      </section>
      <section className="shell guides-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">معلومة تقرّبك</span>
            <h2>أدلة لبداية أوضح</h2>
          </div>
          <Link href="/guides">
            استكشف كل الأدلة <ArrowLeft size={19} />
          </Link>
        </div>
        <div className="guide-grid">
          {guides.slice(0, 3).map((g) => (
            <GuideCard key={g.slug} guide={g} />
          ))}
        </div>
      </section>
      <CommunityPreview />
      <section className="shell">
        <div className="journey-banner">
          <span className="banner-icon">
            <BookOpen size={35} />
          </span>
          <div>
            <h2>المعلومة بداية. الخطوة بتعمل الفرق.</h2>
            <p>اجمع خطواتك في «رحلتي»، وارجع لها كل ما تحتاج.</p>
          </div>
          <Link className="button" href="/dashboard">
            افتح رحلتي <ArrowLeft size={19} />
          </Link>
        </div>
      </section>
      <section
        id="associations"
        className="shell home-associations"
        aria-labelledby="associations-title"
      >
        <div className="section-heading">
          <div>
               <span className="eyebrow"> مجتمعين نقف</span>
            <h2> الجمعيات السودانية في المانيا </h2>
            <p id="associations-title">
              تعرّف على الجمعيات السودانية الألمانية، وابحث حسب المنطقة.
            </p>
          </div>
        </div>
        <AssociationBrowser />
      </section>
    </>
  );
}
