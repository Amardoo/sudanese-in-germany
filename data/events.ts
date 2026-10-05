export interface CommunityEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD: local calendar date in Germany, not a UTC instant.
  startTime: string; // HH:mm, Europe/Berlin; automatically follows local DST.
  endTime: string;
  category: string;
  location: string;
  description: string;
  sample?: boolean;
}

// Illustrative data only. Replace with confirmed events before publishing.
// Keep sample:true on any illustrative event; the UI labels it explicitly.
export const events: CommunityEvent[] = [
  {
    id: 'sample-welcome',
    title: 'لقاء تعارف للمجتمع',
    date: '2026-09-26',
    startTime: '16:00',
    endTime: '18:00',
    category: 'community',
    location: 'مكان اللقاء يُحدّد عند الإعلان',
    description:
      'مثال لفعالية تجمع الأعضاء للتعارف وتبادل تجارب البداية في ألمانيا. هذا موعد توضيحي لتجربة التقويم، وليس لقاءً معلناً.',
    sample: true,
  },
  {
    id: 'sample-language',
    title: 'ورشة محادثة ألمانية',
    date: '2026-09-29',
    startTime: '18:30',
    endTime: '19:30',
    category: 'learning',
    location: 'عبر الإنترنت — رابط اللقاء غير متاح',
    description:
      'مثال لورشة ممارسة اللغة في مواقف الحياة اليومية. تظهر هنا تفاصيل الفعالية وطريقة حضورها بعد اعتماد الموعد.',
    sample: true,
  },
  {
    id: 'sample-culture',
    title: 'أمسية ثقافية سودانية',
    date: '2026-10-03',
    startTime: '17:00',
    endTime: '20:00',
    category: 'culture',
    location: 'مكان اللقاء يُحدّد عند الإعلان',
    description:
      'مثال لأمسية ثقافية ومشاركة الحكايات والتجارب. لا توجد حجوزات أو مشاركة فعلية لهذا المثال.',
    sample: true,
  },
];
