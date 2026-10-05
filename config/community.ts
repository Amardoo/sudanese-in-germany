export const communities = [
  {
    id: 'students',
    title: 'الدراسة والطلاب',
    description: 'الجامعة، اللغة، وتجارب الدراسة',
    icon: 'student' as const,
  },
  {
    id: 'doctors',
    title: 'الأطباء والمهن الطبية',
    description: 'تبادل التجارب وتنظيم رحلة المعادلة',
    icon: 'doctor' as const,
  },
  {
    id: 'careers',
    title: 'العمل والفرص',
    description: 'التقديم، المقابلات، والحياة المهنية',
    icon: 'worker' as const,
  },
  {
    id: 'daily-life',
    title: 'الحياة في ألمانيا',
    description: 'السكن، المدن، والبدايات الجديدة',
    icon: 'newcomer' as const,
  },
  {
    id: 'travel',
    title: 'السفر والتأشيرات',
    description: 'الرحلات، الترانزيت، وتجارب إجراءات السفر',
    icon: 'travel' as const,
  },
  {
    id: 'money',
    title: 'التحويلات والصرافة',
    description: 'تطبيقات التحويل، سعر الصرف، والمعاملات المالية',
    icon: 'money' as const,
  },
  {
    id: 'family',
    title: 'العائلة والأطفال',
    description: 'التربية، المدارس، والأنشطة العائلية',
    icon: 'family' as const,
  },
  {
    id: 'housing',
    title: 'السكن والإيجار',
    description: 'البحث عن سكن، العقود، وتجارب السكن المشترك',
    icon: 'housing' as const,
  },
  {
    id: 'documents',
    title: 'المستندات والإجراءات الرسمية',
    description: 'التأشيرات، الإقامات، والتعامل مع السلطات',
    icon: 'documents' as const,
  },
];
export const postKinds = [
  { id: 'question', label: 'سؤال', plural: 'أسئلة' },
  { id: 'experience', label: 'تجربة', plural: 'تجارب' },
  { id: 'tip', label: 'نصيحة', plural: 'نصائح' },
  { id: 'discussion', label: 'موضوع للنقاش', plural: 'موضوعات' },
];
export const communityCopy = {
  title: 'مجتمعين نقف.',
  description: 'اسأل، شارك تجربتك، وخلّي الطريق أوضح لغيرك.',
  localNotice:
    'مساحة تجريبية: المشاركات والردود والإعجابات تحفظ في هذا المتصفح فقط، ولا تُنشر للآخرين بعد.',
  guidelines: [
    'احترم اختلاف التجارب والآراء.',
    'لا تشارك وثائقك أو بياناتك الشخصية.',
    'أرفق المصدر عند مشاركة معلومة؛ التجارب ليست بديلاً عن الجهة المختصة.',
  ],
};
