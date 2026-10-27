import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'بيان الناشر (Impressum)',
  description: 'بيان الناشر والمسؤول عن المحتوى وفقاً للقانون الألماني (DDG §5).',
};

// ⚠️ قبل الإطلاق: استبدل البيانات الوهمية ببيانات المشغّل الحقيقية.
//    عدم وجود Impressum صحيح يعرّض المشغّل لغرامات في ألمانيا.
export default function ImprintPage() {
  return (
    <div className="shell legal-page">
      <div className="page-heading">
        <span className="eyebrow">Impressum · بيان الناشر</span>
        <h1>
          بيان الناشر
          <span className="heading-dot">.</span>
        </h1>
        <p>معلومات المشغّل وفقاً للمادة 5 من قانون الخدمات الرقمية الألماني (DDG).</p>
      </div>

      <section className="legal-doc" dir="ltr" lang="de">
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          [Ammar Al-Azhar  / Betreiber]
          <br />
          [Venloer Straße, 409]
          <br />
          [50825 Köln]
          <br />
          Deutschland
        </p>

        <h2>Kontakt</h2>
        <p>
          E-Mail: [info@sudaneseingermany.de]
        </p>

        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          [Ahmed Suliman]
          <br />
          [Venloer Straße, 409]
          <br />
          [50825 Köln]
          <br />
          Deutschland
        </p>
      </section>

      <section className="legal-doc">
        <h2>ملاحظات مهمة</h2>
        <p>
          تُعرَّف «الأدلة» والمقالات المستوردة في هذا الموقع كمحتوى إرشادي عام، وليست
          استشارة قانونية أو رسمية. تحقّق دائماً من المتطلبات الحالية لدى الجهات
          المختصة (السفارات، مكاتب الأجانب، الجهات الصحية).
        </p>
        <p>
          المجتمع التفاعلي فيه مرحلة تجريبية محلية: المشاركات تُحفظ في متصفحك فقط
          ولا تُنشر لطرف ثالث ما لم يُفعَّل وضع المشاركة المعلن عنه.
        </p>
      </section>
    </div>
  );
}