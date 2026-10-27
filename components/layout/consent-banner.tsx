// components/layout/consent-banner.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'sig:consent:v1';
type Consent = 'accepted' | 'declined';

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (saved !== 'accepted' && saved !== 'declined') setVisible(true);
    } catch {
      // التخزين محظور — نظهر البانر للإعلام فقط
      setVisible(true);
    }
  }, []);

  const choose = (value: Consent) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // لا شيء — وضع ذاكرة مؤقتة
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="consent-banner" role="region" aria-label="إشعار الخصوصية">
      <p>
        نحفظ تقدمك وتفضيلاتك في متصفحك فقط لتحسين تجربتك — لا نستخدم ملفات
        تعريف تسويقية أو أدوات تتبّع. التفاصيل في{' '}
        <Link href="/privacy">سياسة الخصوصية</Link>.
      </p>
      <div className="consent-actions">
        <button className="button" onClick={() => choose('accepted')}>
          موافق
        </button>
        <button className="button button-ghost" onClick={() => choose('declined')}>
          رفض
        </button>
      </div>
    </div>
  );
}