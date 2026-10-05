import type { Metadata } from 'next';
import { EventsCalendar } from '@/components/events/events-calendar';
import { calendarConfig } from '@/config/events';
import { events } from '@/data/events';
export const metadata: Metadata = { title: 'تقويم الفعاليات' };
export default function EventsPage() {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: calendarConfig.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  return (
    <div className="shell events-page">
      <div className="page-heading">
        <span className="eyebrow">نتلاقى، نتعلم، ونشارك</span>
        <h1>
          تقويم الفعاليات<span className="heading-dot">.</span>
        </h1>
        <p>لقاءات المجتمع، الورش، والأمسيات الثقافية في مكان واحد.</p>
      </div>
      <EventsCalendar today={today} events={events} />
    </div>
  );
}
