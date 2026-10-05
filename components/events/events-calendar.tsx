'use client';
import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { calendarConfig, eventCategories } from '@/config/events';
import type { CommunityEvent } from '@/data/events';
function keyFor(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
function arabicDate(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('ar', { ...options, timeZone: 'UTC' }).format(
    new Date(`${date}T12:00:00Z`),
  );
}
export function EventsCalendar({ today, events }: { today: string; events: CommunityEvent[] }) {
  const [month, setMonth] = useState(today.slice(0, 7));
  const [day, setDay] = useState<string | null>(null);
  const [category, setCategory] = useState('all');
  const [year, monthNumber] = month.split('-').map(Number);
  const monthIndex = monthNumber - 1;
  const start = (new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const cells = Array.from({ length: Math.ceil((start + days) / 7) * 7 }, (_, i) =>
    i >= start && i < start + days ? keyFor(year, monthIndex, i - start + 1) : null,
  );
  const monthTitle = arabicDate(`${month}-01`, { month: 'long', year: 'numeric' });
  const monthEvents = events
    .filter(
      (e) => e.date.startsWith(`${month}-`) && (category === 'all' || e.category === category),
    )
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime));
  const visible = monthEvents.filter((e) => !day || e.date === day);
  function moveMonth(offset: number) {
    const next = new Date(Date.UTC(year, monthIndex + offset, 1));
    setMonth(keyFor(next.getUTCFullYear(), next.getUTCMonth(), 1).slice(0, 7));
    setDay(null);
  }
  return (
    <>
      {events.some((e) => e.sample) && (
        <p className="preview-notice">
          الفعاليات الموسومة «مثال توضيحي» لتجربة التقويم فقط، وليست مواعيد معلنة أو متاحة للحجز.
        </p>
      )}
      <div className="event-filter-row">
        <div className="filter-list" aria-label="نوع الفعالية">
          {[{ id: 'all', label: 'كل الفعاليات' }, ...eventCategories].map((c) => (
            <button key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
              {c.label}
            </button>
          ))}
        </div>
        <span>
          <Clock3 size={16} />
          جميع الأوقات بتوقيت ألمانيا
        </span>
      </div>
      <div className="events-layout">
        <section className="calendar-panel" aria-label="التقويم الشهري">
          <div className="calendar-toolbar">
            <div>
              <span className="eyebrow">خطط للّقاء القادم</span>
              <h2 aria-live="polite">{monthTitle}</h2>
            </div>
            <div className="calendar-navigation">
              <button aria-label="الشهر السابق" onClick={() => moveMonth(-1)}>
                <ChevronRight size={21} />
              </button>
              <button
                className="calendar-today"
                onClick={() => {
                  setMonth(today.slice(0, 7));
                  setDay(today);
                }}
              >
                اليوم
              </button>
              <button aria-label="الشهر التالي" onClick={() => moveMonth(1)}>
                <ChevronLeft size={21} />
              </button>
            </div>
          </div>
          <table className="calendar-table">
            <caption className="sr-only">تقويم {monthTitle}. اختر يوماً لعرض فعالياته.</caption>
            <thead>
              <tr>
                {calendarConfig.weekDays.map((name, i) => (
                  <th scope="col" key={name}>
                    <abbr title={name}>{calendarConfig.shortWeekDays[i]}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: cells.length / 7 }, (_, row) => (
                <tr key={row}>
                  {cells.slice(row * 7, row * 7 + 7).map((date, i) => {
                    const matches = date ? monthEvents.filter((e) => e.date === date) : [];
                    return (
                      <td key={date ?? `empty-${i}`}>
                        {date ? (
                          <button
                            className={`calendar-day ${day === date ? 'selected' : ''} ${date === today ? 'is-today' : ''}`}
                            aria-label={`${arabicDate(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}، ${matches.length} فعاليات`}
                            aria-pressed={day === date}
                            aria-current={date === today ? 'date' : undefined}
                            onClick={() => setDay(date)}
                            data-date={date}
                          >
                            <span>
                              {new Intl.NumberFormat('ar').format(Number(date.slice(-2)))}
                            </span>
                            <span className="calendar-dots" aria-hidden="true">
                              {matches.slice(0, 3).map((e) => (
                                <i key={e.id} className={`event-dot ${e.category}`} />
                              ))}
                            </span>
                          </button>
                        ) : (
                          <span className="calendar-blank" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="calendar-legend">
            <span>
              <i className="today-key" />
              اليوم
            </span>
            <span>
              <i className="event-dot community" />
              يوم به فعالية
            </span>
            <button onClick={() => setDay(null)}>عرض فعاليات الشهر</button>
          </div>
        </section>
        <section className="event-agenda" aria-label="قائمة الفعاليات">
          <div className="agenda-heading">
            <CalendarDays size={24} />
            <div>
              <h2>
                {day
                  ? arabicDate(day, { weekday: 'long', day: 'numeric', month: 'long' })
                  : 'فعاليات الشهر'}
              </h2>
              <p aria-live="polite">
                {visible.length} فعاليات {day ? 'في اليوم المحدد' : 'في هذا الشهر'}
              </p>
            </div>
          </div>
          {visible.length ? (
            visible.map((event) => (
              <article className="event-card" key={event.id}>
                <div className="event-card-top">
                  <span className="event-date">
                    <strong>{arabicDate(event.date, { day: 'numeric' })}</strong>
                    <small>{arabicDate(event.date, { month: 'short' })}</small>
                  </span>
                  <div>
                    <span className="event-kind">
                      {eventCategories.find((c) => c.id === event.category)?.label}
                    </span>
                    <h3>{event.title}</h3>
                  </div>
                </div>
                {event.sample && <span className="tag event-sample">مثال توضيحي</span>}
                <p className="event-time">
                  <Clock3 size={16} />
                  <span dir="ltr">
                    {event.startTime} – {event.endTime}
                  </span>
                  <small>بتوقيت ألمانيا</small>
                </p>
                <p className="event-location">
                  <MapPin size={16} />
                  {event.location}
                </p>
                <details className="event-details">
                  <summary>تفاصيل الفعالية</summary>
                  <p>{event.description}</p>
                </details>
              </article>
            ))
          ) : (
            <div className="calendar-empty">
              <CalendarDays size={34} />
              <h3>{day ? 'لا توجد فعاليات في هذا اليوم' : 'لا توجد فعاليات لهذا الشهر'}</h3>
              <p>اختر يوماً آخر أو تصفّح الشهور القادمة.</p>
              {day && (
                <button className="text-button" onClick={() => setDay(null)}>
                  عرض الشهر كاملاً
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
