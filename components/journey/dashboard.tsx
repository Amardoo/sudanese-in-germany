'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, BookOpen, RotateCcw, PartyPopper } from 'lucide-react';
import { journeys } from '@/data/journeys';
import { guides } from '@/data/guides';
import { Icon } from '@/components/ui/icon';
import { GuideCard } from '@/components/guides/guide-card';
import { emptyProgress, toggleStep } from '@/lib/progress';
import { localProgressRepository } from '@/lib/local-progress';
export function Dashboard({ initialPath }: { initialPath?: string }) {
  const [state, setState] = useState(emptyProgress);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  useEffect(() => {
    let active = true;
    localProgressRepository
      .load()
      .then((saved) => {
        if (active) {
          setState({
            ...saved,
            selected: journeys.some((j) => j.id === initialPath) ? initialPath! : saved.selected,
          });
          setLoaded(true);
        }
      })
      .catch(() => {
        if (active) {
          setState({
            ...emptyProgress(),
            selected: journeys.some((j) => j.id === initialPath) ? initialPath! : journeys[0].id,
          });
          setStorageError(true);
          setLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, [initialPath]);
  const journey = journeys.find((j) => j.id === state.selected) ?? journeys[0];
  const completed = state.completed[journey.id] ?? [];
  const percent = Math.round((completed.length / journey.steps.length) * 100);
  const next = journey.steps.find((s) => !completed.includes(s.id));
  function update(value: typeof state) {
    setState(value);
    localProgressRepository
      .save(value)
      .then(() => setStorageError(false))
      .catch(() => setStorageError(true));
  }
  if (!loaded)
    return (
      <div className="shell section" role="status">
        نجهّز رحلتك…
      </div>
    );
  return (
    <div className="shell dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">مساحة لخطوتك القادمة</span>
        <h1>
          أهلاً بيك في رحلتك<span className="heading-dot">.</span>
        </h1>
        <p>لنبدأ خطوة بخطوة. اختر مسارك وتابع ما أنجزته.</p>
      </div>
      <div className="dashboard-layout">
        <aside className="journey-sidebar">
          <h2>مساري الحالي</h2>
          <div className="journey-options">
            {journeys.map((j) => (
              <button
                key={j.id}
                aria-pressed={state.selected === j.id}
                onClick={() => {
                  setConfirmReset(false);
                  update({ ...state, selected: j.id });
                  window.history.replaceState(window.history.state, '', `/dashboard?path=${j.id}`);
                }}
              >
                <Icon name={j.icon} />
                <span>{j.title}</span>
                {state.selected === j.id && <Check size={17} />}
              </button>
            ))}
          </div>
          <div className="local-note">
            <BookOpen size={23} />
            <h3>رحلتك، على راحتك</h3>
            <p>تقدّمك محفوظ في هذا المتصفح على هذا الجهاز. تقدر تغيّر المسار وترجع له في أي وقت.</p>
          </div>
        </aside>
        <div>
          <section className="journey-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">خطتك الشخصية</span>
                <h2>{journey.heading}</h2>
              </div>
              <span className={`icon-tile ${journey.color}`}>
                <Icon name={journey.icon} size={30} />
              </span>
            </div>
            <div className="progress-info">
              <span>
                أنجزت {completed.length} من {journey.steps.length} خطوات
              </span>
              <strong>{percent}٪</strong>
            </div>
            <progress
              value={completed.length}
              max={journey.steps.length}
              aria-label="تقدم الرحلة"
            />
            <div className="steps">
              {journey.steps.map((s, i) => (
                <div
                  className={`step ${completed.includes(s.id) ? 'complete' : ''} ${next?.id === s.id ? 'current' : ''}`}
                  key={s.id}
                >
                  <label className="step-check">
                    <input
                      type="checkbox"
                      aria-label={`إكمال: ${s.title}`}
                      checked={completed.includes(s.id)}
                      onChange={() => update(toggleStep(state, journey.id, s.id))}
                    />
                    <span aria-hidden="true">
                      {completed.includes(s.id) ? (
                        <Check size={19} />
                      ) : (
                        String(i + 1).padStart(2, '0')
                      )}
                    </span>
                  </label>
                  <div className="step-content">
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <Link href={`/guides/${s.guide}`}>
                      اقرأ الدليل <ArrowLeft size={16} />
                    </Link>
                  </div>
                  {next?.id === s.id && <span className="next-badge">خطوتك القادمة</span>}
                </div>
              ))}
            </div>
            {!next && (
              <div className="success" role="status">
                <PartyPopper />
                أكملت هذا المسار! يمكنك مراجعة الأدلة أو استكشاف مسار آخر.
              </div>
            )}
            <div className="reset-row">
              {confirmReset ? (
                <>
                  <span>تصفير التقدم في هذا المسار؟</span>
                  <button
                    onClick={() => {
                      update({ ...state, completed: { ...state.completed, [journey.id]: [] } });
                      setConfirmReset(false);
                    }}
                  >
                    نعم، ابدأ من جديد
                  </button>
                  <button onClick={() => setConfirmReset(false)}>إلغاء</button>
                </>
              ) : (
                <button onClick={() => setConfirmReset(true)}>
                  <RotateCcw size={15} /> إعادة بدء المسار
                </button>
              )}
            </div>
          </section>
          {storageError && (
            <p role="alert" className="notice">
              تعذر الحفظ في المتصفح. سيبقى التقدم في هذه الصفحة فقط إلى أن تسمح بتخزين البيانات.
            </p>
          )}
          <div className="section-heading compact">
            <h2>أدلة تساعدك في الطريق</h2>
            <Link href="/guides">
              كل الأدلة <ArrowLeft size={17} />
            </Link>
          </div>
          <div className="guide-grid two">
            {[...new Set(journey.steps.map((s) => s.guide))].slice(0, 2).map((slug) => {
              const guide = guides.find((g) => g.slug === slug);
              return guide ? <GuideCard key={slug} guide={guide} /> : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
