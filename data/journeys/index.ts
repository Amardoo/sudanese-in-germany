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
        title: 'من أين تبدأ الدراسة في ألمانيا؟',
        description: ' التعرف على النظام التعليمي في المانيا، أنواع الجامعات، والبرامج الدراسية المتاحة.',
        guide: 'university',
      },
      {
        id: 'language',
        title: 'تحديد هدف اللغة',
        description: 'دوّن متطلبات اللغة في البرامج التي اخترتها.',
        guide: 'german',
      },
      {
        id: 'documents',
        title: 'كيفية الحصول على قبول جامعي',
        description: ' ابدء بتحديد الدرجة التي تريد دراستها،    ثم ابحث عن البرامج التي تناسب مؤهلاتك ولغة الدراسة.',
        guide: 'article-2009',
      },
      {
        id: 'apply',
        title: 'متطلبات التقديم للحصول على التأشيرة الدراسية',
        description: 'راجع سفارة البلد الذي تقيم فيه وتأكد من المواعيد والمتطلبات قد تختلف قليلاً من دولة إلى دولة   .',
        guide: 'study-visa',
      },
      {
        id: 'arrival',
        title: 'أول أيامك في ألمانيا',
        description: 'جهّز قائمة السكن والمواعيد والخطوات الأولى.',
        guide: 'arrival',
      },
      {
        id: 'work',
        title: 'ألبحث عن عمل جزئي أو تدريب',
        description: 'بعد الانتهاء من تسجيل السكن واستلام الرقم الضريبي وفتح حساب البنك وشهادة التسجيل الجامعي يمكنك البدء بالبحث عن عمل     .',
        guide: 'article-1217',
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
        id: 'language',
        title: 'تحديد هدف اللغة',
        description: 'دوّن متطلبات اللغة في البرامج التي اخترتها.',
        guide: 'german',
      },
      {
        id: 'visa',
        title: 'اختر التأشيرة المناسبة',
        description:
          'راجع تأشيرة الاعتراف إذا كنت ستدخل ألمانيا لاستكمال إجراءات المعادلة أو اللغة المهنية.',
        guide: 'recognition-visa',
      },
      {
        id: 'arrival',
        title: 'أول أيامك في ألمانيا',
        description: 'جهّز قائمة السكن والمواعيد والخطوات الأولى.',
        guide: 'arrival',
      },
       {
        id: 'system',
        title: 'البحث عن عمل في ألمانيا قبل المعادلة',
        description: 'دليل عملي للطبيب القادم من الخارج الذي ينتظر المعادلة: كيف يمكنه دخول سوق العمل .',
        guide: 'article-1745',
      },
      {
        id: 'recognition',
        title: ' الاعتراف بشهادة الطب في ألمانيا والترخيص المهني   ',
        description: ' دليل شامل للاعتراف بشهادة الطب في ألمانيا للأطباء خريجي الجامعات الأجنبية، من تحديد الجهة المختصة وتجهيز الوثائق والترجمة، إلى إثبات اللغة وFachsprachprüfung وKenntnisprüfung والحصول على Approbation أو Berufserlaubnis..',
        guide: 'article-1733',
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
        title: 'قبل ان تبحث  ماذا يجب أن تعرف؟',
        description: 'فهم العوامل التي تؤثر في فرصك يساعدك على الاستعداد والبحث بطريقة أفضل.    ',
        guide: 'job-search',
      },
      {
        id: 'guides',
        title: ' كيف تبحث عن عمل في ألمانيا؟ ',
        description: 'دليل عملي للبحث عن عمل في ألمانيا، من اختيار الوظيفة وقراءة إعلانات التوظيف    ',
        guide: 'article-178',
      },
      {
        id: 'worker',
        title: ' اين تبحث عن عمل في المانيا؟ ',
        description: 'تعرف على أهم المواقع والمنصات التي يمكنك استخدامها للبحث عن عمل في ألمانيا',
        guide: 'article-1200',
      },
     
      {
        id: 'cv',
        title: 'تجهيز السيرة الذاتية',
        description: 'أبرز الخبرة والمهارات المرتبطة بكل وظيفة.',
        guide: 'article-1481',
      },
      {
        id: 'cover-letter',
        title: 'تجهيز خطاب الدافع',
        description: 'أبرز الخبرة والمهارات المرتبطة بكل وظيفة.',
        guide: 'article-1477',
      },
      {

        id: 'interview',
        title: 'التحضير للمقابلة',
        description: 'تعرف على أسئلة المقابلة الشائعة وكيفية التحضير لها.',
        guide: 'article-1219',
      }

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
        id: 'arrival',
        title: 'أول أيامك في ألمانيا',
        description: 'جهّز قائمة السكن والمواعيد والخطوات الأولى.',
        guide: 'arrival',
      },
      {
        id: 'housing',
        title: ' البحث عن السكن',
        description: 'حدّد ميزانيتك والمناطق المناسبة وجهّز الأسئلة.',
        guide: 'housing',
      },
      {
        id: 'language',
        title: 'بدء روتين للغة',
        description: 'اختر خطة تعلم تناسب وقتك ومستواك.',
        guide: 'german',
      },
      {
        id: 'monthly-expenses-germany',
        title: 'تنظيم الحياة اليومية',
        description: ' المصاريف الشهرية وتكلفة المعيشة في ألمانيا .',
        guide: 'monthly-expenses-germany',
      },
      {
        id: 'healthcare',
        title: 'التأمين الصحي في ألمانيا',
        description: 'أنواع التأمين الصحي، التغطية، والتسجيل.',
        guide: 'health-insurance-germany-students',
      },
    ],
  },
];
