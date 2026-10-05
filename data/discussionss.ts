import type { Discussion } from '@/lib/community/types';
// Illustrative prompts, not real users, advice, or activity counts.
export const sampleDiscussions: Discussion[] = [
  // ═══════════════════════════════════════════════════════════
  // travel — السفر والرحلات
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-saudi-evisa-permanent-residence',
    community: 'travel',
   kind: 'question',
   title: 'كيف تقدمت للحصول على  تأشيرة الكترونية سعودية  e-visa باقامة طالب',
   body: 'كيف سارت الإجراءات. اذكر نوع الوثيقة وتاريخ التجربة فقط،.',
   createdAt: '2026-10-05T09:00:00Z',
   sample: true,
   replies: [],
   liked: false,
},
  {
    id: 'curated-saudi-visa-on-arrival',
    community: 'travel',
    kind: 'experience',
    title: 'تجربتك مع التأشيرة السعودية عند الوصول؟',
    body: 'وردت تجارب دخول ناجحة وأخرى واجهت تدقيقاً أو منعاً من الصعود. إن شاركت، اذكر تاريخ الرحلة وشركة الطيران وبلد المغادرة ونوع وثيقة الاقامة.',
    createdAt: '2026-10-05T08:55:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-saudi-airline-check',
    community: 'travel',
    kind: 'question',
    title: 'كيف تحققت من قبول شركة الطيران لوثائقك قبل الحجز للسعودية',
    body: 'هل تواصلت مع الشركة المشغّلة للرحلة؟ ما المعلومات التي قدمتها لهم، وهل حصلت على رد مكتوب؟ الهدف هو تبادل طريقة التحقق، لا تقديم ضمان بالصعود أو الدخول.',
    createdAt: '2026-10-05T08:50:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-saudi-tasheer-experience',
    community: 'travel',
    kind: 'experience',
    title: 'تجربة التقديم لفيزا السعودية عبر مركز تأشير في برلين أو فرانكفورت',
    body: 'شارك ما طُلب منك في موعدك الفعلي، وهل اختلفت القائمة عن المنشور في الموقع. لا تنشر إيصالات أو أرقام طلبات أو وثائق شخصية، واربط أي معلومة متغيرة بصفحة المركز الرسمية.',
    createdAt: '2026-10-05T08:45:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-travel-schengen-entry-non-issuing',
    community: 'travel',
    kind: 'experience',
    title: 'الدخول لألمانيا بفيزا شنغن صادرة من دولة ثانية',
    body: 'لو دخلت ألمانيا بفيزا صادرة من اليونان أو فرنسا أو دولة تانية: شنو الأسئلة اللي سألوك في المطار؟ هل طلبوا حجز إقامة أو كشف بنكي أو تذكرة عودة؟ اذكر الجنسية وتاريخ التجربة فقط.',
    createdAt: '2026-10-05T08:40:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-travel-istanbul-transit',
    community: 'travel',
    kind: 'question',
    title: 'السعودية عبر ترانزيت إسطنبول: نفس الخطوط ولا تغيير؟',
    body: 'هل احتجت فيزا ترانزيت تركية؟ فرّق بين الحالتين: تذكرة واحدة بنفس الشركة، وتذكرة Self-transfer مع استلام شنط. الهدف جمع قائمة واضحة قبل الحجز، من دون تطمينات غير مؤكدة.',
    createdAt: '2026-10-05T08:30:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-travel-egypt-security-approval',
    community: 'travel',
    kind: 'experience',
    title: 'تجربة الموافقة الأمنية لمصر: الجهة والسعر والطيران',
    body: 'شارك الجهة التي تعاملت معها، السعر التقريبي، المدة، وخطوط الطيران التي قبلت الموافقة. اذكر هل سافرت بخطوط غير المصرية (تركية/نيل إير) وكيف كانت الإجراءات. من دون أسماء أو أرقام جهات التواصل.',
    createdAt: '2026-10-05T08:20:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
// ═══════════════════════════════════════════════════════════
  // doctors — الاطباء والمعادلة
  // ═══════════════════════════════════════════════════════════
  {
    id: 'sample-doctors',
    community: 'doctors',
    kind: 'discussion',
    title:' كيفية الحصول على وعد عمل' ,
    body: 'دعوة لمشاركة التجارب: كيف حصلت على وعد عمل من مستشفى أو عيادة؟ هل استخدمت مواقع التوظيف， معارض الوظائف， أو تواصلت مباشرة مع الشركات؟ ما النصائح اللي ساعدتك في الحصول على الوعد؟',
    createdAt: '2026-09-22T09:00:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  // ═══════════════════════════════════════════════════════════
  // career — السعي والوظائف
  // ═══════════════════════════════════════════════════════════

  {
    id: 'sample-career',
    community: 'careers',
    kind: 'tip',
    title: 'فكرة للنقاش: كيف حصلت على عقد عمل في المانيا',
    body: 'شارك تجربتك: هل استخدمت مواقع التوظيف، معارض الوظائف， أو تواصلت مباشرة مع الشركات？ ما النصائح اللي ساعدتك في الحصول على العقد？',
    createdAt: '2026-09-22T08:00:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  // ═══════════════════════════════════════════════════════════
  // daily life — الحياة اليومية
  // ═══════════════════════════════════════════════════════════

  {
    id: 'sample-life',
    community: 'daily-life',
    kind: 'experience',
    title: 'أول أسبوع في مدينة جديدة: شنو ساعدك؟',
    body: 'دعوة لمشاركة التجارب: كيف تعرّفت على الحي والمواصلات وفرص ممارسة اللغة؟ احكي عن الأشياء البسيطة التي سهّلت البداية.',
    createdAt: '2026-09-22T07:00:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  

  // ═══════════════════════════════════════════════════════════
  // money — التحويلات والصرافة
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-money-thunes-card-type',
    community: 'money',
    kind: 'experience',
    title:' كيف بتحول قروش للسودان او مصر',
    body:'  شارك تجربتك: هل استخدمت بطاقة مصرفية، حوالة بنكية، أو تطبيق تحويل؟ ما النصائح اللي ساعدتك في الحصول على أفضل سعر صرف وأقل رسوم؟ اذكر نوع التحويل وتاريخ التجربة فقط.',
    createdAt: '2026-10-05T08:00:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-money-compare-apps-gulf',
    community: 'money',
    kind: 'discussion',
    title: ' ما هو افضل تطبيق او تجربة للتحويل للسعودية وباقي دول الخليج',
    body:'دعوة لمشاركة التجارب: كيف كانت تجربتك مع تطبيقات التحويل مثل Wise， Revolut， ',
    createdAt: '2026-10-05T07:50:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-money-personal-exchange-safety',
    community: 'money',
    kind: 'tip',
    title: 'تبادل شخصي (بنكك مقابل يورو): كيف كانت التجربة   ',
    body:'شارك تجربتك: هل استخدمت تطبيقات تحويل، أو تواصلت مباشرة مع شخص؟ ما النصائح اللي ساعدتك في ضمان الأمان والحصول على أفضل سعر صرف؟ اذكر نوع التحويل وتاريخ التجربة فقط.',
    createdAt: '2026-10-05T07:30:00Z',
    sample: true,
    replies: [],
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════
  // students — الدراسة والمنح
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-students-visa-interview',
    community: 'students',
    kind: 'experience',
    title: 'مقابلة التأشيرة الدراسية: الأسئلة والمدة والنتيجة',
    body: 'شارك بلد المقابلة، الأسئلة الفعلية التي سُئلت عنها (لماذا ألمانيا؟ لماذا هذا التخصص؟)، المستندات الإضافية التي طُلبت، والمدة بين المقابلة والقرار. من دون أسماء أو أرقام ملفات.',
    createdAt: '2026-10-05T07:20:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-students-blocked-account-compare',
    community: 'students',
    kind: 'discussion',
    title: 'الحساب المغلق: Fintiba وExpatrio وغيرهما',
    body: 'سرعة فتح الحساب، قبول السفارة له، وهل واجهت استفسارًا عن مصدر الأموال. كم استغرق وقت بعد الوصول الى المانيا لاسترجاع المبلغ اذكر المنصة وسنة التجربة فقط.',
    createdAt: '2026-10-05T07:10:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-students-university-transfer',
    community: 'students',
    kind: 'question',
    title: 'تغيير الجامعة بين الولايات: وين تغيّر ورقة الإقامة؟',
    body: 'لو نقلت تسجيلك لجامعة في ولاية ثانية: هل غيّرت الـ Zusatzblatt في مكتب الأجانب القديم ولا الجديد؟ وهل دراستك بتخلص قبل نهاية الإقامة؟ اذكر الخطوات الفعلية وسنة التجربة فقط.',
    createdAt: '2026-10-05T06:50:00Z',
    sample: true,
    replies: [],
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════
  // family — لمّ الشمل والزواج
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-family-marriage-doc-war',
    community: 'family',
    kind: 'experience',
    title: 'رفض توثيق عقد الزواج السوداني بسبب الحرب: الحلول البديلة',
    body: 'لو السفارة قالت إنها ما قادرة تتحقق من الأختام السودانية: شنو الحل البديل اللي جربته؟ (قسيمة زواج من دولة تانية، تأكيد Familienstand في Bürgeramt، Vertrauensanwaltliche Prüfung). اذكر الدولة وسنة التجربة فقط، من دون أسماء الأطراف.',
    createdAt: '2026-10-05T06:40:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-family-embassy-compare',
    community: 'family',
    kind: 'discussion',
    title: 'أي سفارة ألمانية أسرع خارج السودان؟',
    body: 'قارن بين القاهرة والرياض وأديس وأنقرة من حيث المدة حتى الموعد، شروط الإقامة المحلية، ومتطلبات تصنيف الفيزا. المعلومات بتتغير باستمرار، اربط أي خبر بصفحة السفارة الرسمية وتاريخه.',
    createdAt: '2026-10-05T06:30:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-family-sponsor-outside-germany',
    community: 'family',
    kind: 'question',
    title: 'Verpflichtungserklärung: هل الضامن لازم مقيم في ألمانيا؟',
    body: 'لو الضامن ألماني ومتجنس بس شغال برّة ألمانيا: هل قُبلت وثيقته؟ شنو الشروط الفعلية (سجل في ألمانيا، إقامة فيها، دخل)؟ اذكر الحالة بشكل عام وسنة التجربة فقط.',
    createdAt: '2026-10-05T06:20:00Z',
    sample: true,
    replies: [],
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════
  // housing — السكن والإيجار
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-housing-prove-financing',
    community: 'housing',
    kind: 'question',
    title: 'بدون عقد عمل: كيف أقنعت صاحب السكن؟',
    body: 'شارك البدائل اللي نجحت معاك (بلوك أكونت، Arbeitslosengeld، Wohnberechtigungsschein، ضامن).   وسنة التجربة فقط، ولا تنشر عنوانًا دقيقًا أو اسم شركة عقارات.',
    createdAt: '2026-10-05T06:10:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-housing-kaution-return',
    community: 'housing',
    kind: 'experience',
    title: 'استرداد الـ Kaution: المدة والخطوات',
    body: 'شارك المدة الفعلية لاسترداد التأمين، وهل احتفظ المالك بجزء بحجة فواتير المياه والتدفئة، والخطوة اللي حركت الملف (Mahnung، Mieterverein، كشف حساب).   وسنة التجربة فقط.',
    createdAt: '2026-10-05T06:00:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-housing-no-written-contract',
    community: 'housing',
    kind: 'tip',
    title: 'درس مستفاد: الإيجار من دون عقد مكتوب',
    body: 'اتفاق شفهي صعب تثبته قانونيًا. أقل حماية: حوّل الإيجار بحوالات بنكية مكتوب سببها، وخلي كل الاتفاقات برسائل نصية. لو خسرت تأمينًا في تجربة زي دي، احكي الدرس من دون أسماء.',
    createdAt: '2026-10-05T05:50:00Z',
    sample: true,
    replies: [],
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════
  // documents — الوثائق والتصديق
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-documents-german-degree-apostille',
    community: 'documents',
    kind: 'tip',
    title: 'توثيق الشهادة الألمانية للاستخدام الدولي: المسار الكامل',
    body: 'الخطوات: نسخة طبق الأصل من الجامعة أو الـ Rathaus، ثم التوثيق النهائي من الجهة الاتحادية (صفحة bfaa.diplo.de)، ثم سفارة البلد المستهدف. التوثيق يكون لبلد محدد وليس "عالميًا". اذكر نوع الوثيقة وسنة التجربة فقط.',
    createdAt: '2026-10-05T05:40:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-documents-birth-cert-after-citizenship',
    community: 'documents',
    kind: 'experience',
    title: 'تصديق شهادة الميلاد بعد الجنسية الألمانية',
    body: 'لو طلبت منك السلطة تصديق Legalisation لشهادة ميلادك الأصلية: شنو اللي قُبل فعليًا؟ (أصل مطابق للنسخة، موافقة الـ Standesamt، تصديق سفارة بلدك). اذكر الولاية وسنة التجربة فقط.',
    createdAt: '2026-10-05T05:30:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-documents-newborn-passport-trip',
    community: 'documents',
    kind: 'experience',
    title: 'استخراج جواز لمولود في بلجيكا أو هولندا: كيف سافرت؟',
    body: 'شارك المسار اللي نجح معاك: السفر بشهادة الميلاد داخل شنغن، وثيقة سفر طارئة من مكتب الأجانب، أو خطاب من السفارة يثبت إنها لا تُصدر جوازًا. اذكر المسار والمدينة وسنة التجربة فقط.',
    createdAt: '2026-10-05T05:20:00Z',
    sample: true,
    replies: [],
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════
  // careers — العمل والتأمين والإقامة
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-careers-bildungsgutschein',
    community: 'careers',
    kind: 'experience',
    title: 'Bildungsgutschein: نوع التأهيل وأثره على الإقامة',
    body: 'شارك نوع التأهيل اللي عُرض عليك (Weiterbildung ولا Career Coaching)، مدته، وهل أثرت مدته على تجديد إقامتك. اذكر المجال وسنة التجربة فقط، وأحل أي سؤال قانوني لمستشار التوظيف أو مكتب الهجرة.',
    createdAt: '2026-10-05T05:10:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-careers-fiktion-full-time',
    community: 'careers',
    kind: 'question',
    title: 'البدء بالعمل قبل صدور الإقامة الجديدة: Fiktionsbescheinigung',
    body: 'لو محتاج تبدأ شغل قبل ما تكتمل إجراءات تحويل الإقامة: هل طلبت فيكسيون مكتوب فيها إن العمل الكامل مسموح؟ وكيف تعامل قسم الموارد البشرية مع الموضوع؟ اذكر نوع الإقامتين وسنة التجربة فقط.',
    createdAt: '2026-10-05T05:00:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-careers-cancel-private-insurance',
    community: 'careers',
    kind: 'experience',
    title: 'إلغاء تأمين Mawista بعد التحول للتأمين الحكومي',
    body: 'شارك تاريخ آخر يوم مغطى، وهل خُصم الشهر الأخير مباشرة ولا بأثر رجعي في الشهر التالي، وكيف تابعت الأمر بالإيميل. اذكر الشركة وسنة التجربة فقط.',
    createdAt: '2026-10-05T04:50:00Z',
    sample: true,
    replies: [],
    liked: false,
  },

  // ═══════════════════════════════════════════════════════════
  // daily-life — المجتمع والخدمات
  // ═══════════════════════════════════════════════════════════
  {
    id: 'curated-life-traveler-weight',
    community: 'daily-life',
    kind: 'question',
    title: 'إرسال مستندات مع مسافر عبر وزن الأمتعة: كيف ضمنت التسليم؟',
    body: 'شارك الطريقة اللي نجحت معاك: تسليم في المطار، صور قبل التسليم، اتفاق على البديل لو تعطل المسافر. من دون أرقام هواتف أو أسماء، والمدينة والتاريخ التقريبي يكفيان.',
    createdAt: '2026-10-05T04:30:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-life-translator-services',
    community: 'daily-life',
    kind: 'experience',
    title: 'مترجمون معتمدون وخدمات محلية في مدينتك',
    body: 'شارك تجربة عامة مع مترجم محلف، قنصلية، أو خدمة مدينة (Standesamt، مكتب الأجانب): المدة والتكلفة التقريبية وجودة التعامل. اذكر المدينة ونوع الخدمة فقط، من دون أرقام هواتف.',
    createdAt: '2026-10-05T04:20:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-life-community-events',
    community: 'daily-life',
    kind: 'discussion',
    title: 'اللمة والفعاليات: كيف بنت المجموعة لقاءً وجهيًا؟',
    body: 'دعوة للمشاركة: كيف نظمت أو حضرت فعالية مجتمعية أو أكاديمية (مؤتمر، رصد فلكي، إطلاق مبادرة)؟ شنو طريقة الإعلان اللي وصلت، وكم الحضور؟ اذكر نوع الفعالية والمدينة والسنة فقط.',
    createdAt: '2026-10-05T04:10:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
  {
    id: 'curated-life-first-week-new-city',
    community: 'daily-life',
    kind: 'experience',
    title: 'أول أسبوع في مدينة جديدة: شنو ساعدك؟',
    body: 'احكي عن الأشياء البسيطة اللي سهّلت البداية: التعرف على الحي، المواصلات، فرص ممارسة اللغة، والخدمات القريبة. لا تنشر عنوان سكنك.',
    createdAt: '2026-10-05T04:00:00Z',
    sample: true,
    replies: [],
    liked: false,
  },
];
