import type { Journey } from '@/lib/types';
export const journeys: Journey[] = [
  {
    id: 'student',
    title: 'أنا طالب',
    heading: 'رحلتك للدراسة في ألمانيا',
    description: 'من اختيار الجامعة إلى أول يوم دراسة',
    icon: 'student',
    color: 'blue',
    steps: [
      {
        id: 'choose',
        title: 'اختيار التخصص والجامعة',
        description: 'قارن البرامج ولغة الدراسة وشروط القبول.',
        guide: 'article-2009',
      },
      {
        id: 'language',
        title: 'تحديد هدف اللغة',
        description: 'دوّن متطلبات اللغة في البرامج التي اخترتها.',
        guide: 'german',
      },
      {
        id: 'documents',
        title: 'تجهيز ملف التقديم',
        description: 'رتّب الشهادات والترجمات حسب متطلبات الجامعة.',
        guide: 'university',
      },
      {
        id: 'apply',
        title: 'إرسال طلب القبول',
        description: 'راجع جهة التقديم والموعد النهائي لكل برنامج.',
        guide: 'university',
      },
      {
        id: 'arrival',
        title: 'الاستعداد للوصول',
        description: 'جهّز قائمة السكن والمواعيد والخطوات الأولى.',
        guide: 'arrival',
      },
    ],
  },
  {
    id: 'doctor',
    title: 'أنا طبيب',
    heading: 'رحلتك للعمل كطبيب',
    description: 'المعادلة، اللغة الطبية، الترخيص، وبداية العمل',
    icon: 'doctor',
    color: 'rose',
    steps: [
      {
        id: 'overview',
        title: 'افهم المسار الكامل أولاً',
        description: 'ابدأ بخريطة مختصرة توضّح خطوات الطبيب من اللغة إلى الترخيص والعمل.',
        guide: 'doctors-pathway-germany',
      },
      {
        id: 'state',
        title: 'اختر الولاية وجهة الاعتراف',
        description: 'قارن بين الولايات حسب الجهة المختصة، المواعيد، فرص العمل، وتكلفة المعيشة.',
        guide: 'article-1736',
      },
      {
        id: 'visa',
        title: 'اختر التأشيرة المناسبة',
        description:
          'راجع تأشيرة الاعتراف إذا كنت ستدخل ألمانيا لاستكمال إجراءات المعادلة أو اللغة المهنية.',
        guide: 'recognition-visa',
      },

      {
        id: 'fsp',
        title: 'استعد لامتحان اللغة الطبية FSP',
        description: 'درّب نفسك على محادثة المريض، كتابة التقرير، وعرض الحالة على الطبيب.',
        guide: 'doctors-fsp',
      },
      {
        id: 'kp',
        title: 'استعد لامتحان المعرفة الطبية KP',
        description: 'افهم طبيعة الامتحان وما يجب التركيز عليه في التحضير.',
        guide: 'article-1725',
      },
      {
        id: 'license',
        title: 'افهم الترخيص والعمل المؤقت',
        description: 'اعرف الفرق بين Approbation وBerufserlaubnis ومتى تحتاج كل واحد منهما.',
        guide: 'approbation-berufserlaubnis-doctors',
      },
      {
        id: 'system',
        title: 'افهم بيئة العمل الطبية',
        description: 'تعرّف على النظام الصحي الألماني والمصطلحات اليومية قبل بداية العمل.',
        guide: 'article-1745',
      },
    ],
  },
  {
    id: 'worker',
    title: 'أبحث عن عمل',
    heading: 'رحلتك إلى فرصة جديدة',
    description: 'ملف أقوى، بحث أوضح، وفرصة أنسب',
    icon: 'worker',
    color: 'amber',
    steps: [
      {
        id: 'goal',
        title: 'تحديد المجال المستهدف',
        description: 'اختر المسميات الوظيفية التي تناسب خبرتك.',
        guide: 'job-search',
      },
      {
        id: 'recognition',
        title: 'التحقق من وضع المؤهل',
        description: 'تحقّق من متطلبات الاعتراف لمهنتك.',
        guide: 'recognition',
      },
      {
        id: 'cv',
        title: 'تجهيز السيرة الذاتية',
        description: 'أبرز الخبرة والمهارات المرتبطة بكل وظيفة.',
        guide: 'job-search',
      },
      {
        id: 'apply',
        title: 'تنظيم طلبات التوظيف',
        description: 'تابع الشركات والطلبات والمواعيد في قائمة واحدة.',
        guide: 'job-search',
      },
    ],
  },
  {
    id: 'newcomer',
    title: 'مقيم في ألمانيا',
    heading: 'خطواتك الأولى في ألمانيا',
    description: 'السكن، المواعيد، والاستقرار اليومي',
    icon: 'newcomer',
    color: 'green',
    steps: [
      {
        id: 'housing',
        title: 'تنظيم البحث عن السكن',
        description: 'حدّد ميزانيتك والمناطق المناسبة وجهّز الأسئلة.',
        guide: 'housing',
      },
      {
        id: 'arrival',
        title: 'ترتيب مواعيد البداية',
        description: 'راجع تعليمات مدينتك وأنشئ قائمة مواعيدك.',
        guide: 'arrival',
      },
      {
        id: 'language',
        title: 'بدء روتين للغة',
        description: 'اختر خطة تعلم تناسب وقتك ومستواك.',
        guide: 'german',
      },
      {
        id: 'settle',
        title: 'تنظيم الحياة اليومية',
        description: 'احتفظ بملفات السكن والمراسلات والمواعيد.',
        guide: 'arrival',
      },
    ],
  },
];
