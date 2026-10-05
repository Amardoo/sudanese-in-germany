export interface Association {
  id: string;
  name: string;
  originalName: string;
  region: string;
  focus: string;
  description: string;
  url: string;
   address: string;
  source: string;

}
// Links and descriptions checked against each organization's own site on 2026-09-22.
export const associations: Association[] = [

 {
  id: 'sdh-nrw',
  name: 'SDH NRW e.V. — الراكوبة السودانية الألمانية',
  originalName: 'SDH NRW e.V.',
  region: 'آخن، شمال الراين-وستفاليا',
  focus: 'مجتمعي، خيري، إغاثة',
  description:'',
  url: 'https://sdh-nrw.com/',
  address: 'Heinrichsallee 22, 52062 Aachen',
  source: 'https://sdh-nrw.com/contact/'
},
{
  id: 'dsv-rm',
  name: 'DSV Rhein Main — الجمعية السودانية الألمانية',
  originalName: 'Deutsch-Sudanesische Vereinigung Rhein-Main',
  region: 'فيسبادن، هيسن',
  focus: 'التنمية الثقافية والتعليمية والاندماج',
  description: 'منصة مستقلة غير ربحية مسجلة في فيسبادن (رقم 7575، يونيو 2023). تهدف لتعزيز الاندماج والتطوير الأكاديمي والمهني والتبادل الثقافي.',
  url: 'https://dsv-rm.org/',
  address: 'Dotzheimer Str. 24, 65185 Wiesbaden',
  source: 'https://dsv-rm.org/about/'
},
{
  id: 'sudanclub',
  name: 'Sudan Club — الجمعية الثقافية السودانية الألمانية',
  originalName: 'Sudanclub, Sudanesisch-Deutscher-Kulturverein e.V.',
  region: 'برلين',
  focus: 'ثقافي، إنساني، مناصرة',
  description: 'جمعية ثقافية مسجلة (e.V.) في برلين (سجل VR 19607). تضم منصة "United for Sudan" للمناصرة والمساعدات.',
  url: 'https://www.sudanclub.org/',
  address: 'Trautenaustr. 5, 10717 Berlin',
  source: 'https://www.sudanclub.org/impressum/'
},
{
  id: 'sdv-nrw',
  name: 'SDV NRW e.V. — الرابطة السودانية الألمانية',
  originalName: 'SDV NRW e.V.',
  region: 'إيسن، شمال الراين-وستفاليا',
  focus: 'مجتمعي، خيري، إغاثة',
  description: 'تأسست عام 1982، حوالي 300 عضو. تدعم المتضررين في السودان.',
  url: 'https://www.sdv-nrw.de/',
  address: 'Marienstr. 92, 45307 Essen',
  source: ''
},
{
  id: 'umbaja',
  name: 'UMBAYA e.V.',
  originalName: 'UMBAJA e.V.',
  region: 'هانوفر، سكسونيا السفلى',
  focus: 'إغاثة، تمكين، تعليم',
  description: 'تأسست 2015 من مخيم اعتصام اللاجئين في هانوفر. مساعدات طارئة للاجئين السودانيين في السودان وتشاد ومصر وأوغندا. تشمل مبادرات "أصوات السودان" و"المستقبل امرأة".',
  url: 'https://www.umbaja.org/',
  address: 'Lister Meile 4, 30161 Hannover',
  source: 'https://www.umbaja.org/'
},
{
  id: 'bana',
  name: 'Bana Group for Peace and Development',
  originalName: 'Bana Group for Peace and Development',
  region: 'برلين + السودان',
  focus: 'نسوي، سلام، مناصرة',
  description: 'شبكة نسوية تقاطعية تأسست 2017. فرع ألماني في برلين. مناصرة دولية لإنهاء الحرب في السودان وتمكين النساء. عضو في Berlin Biennale.',
  url: 'https://banagroup.org/',
  address: 'Lehrter Straße 35, 10557 Berlin',
  source: 'https://13.berlinbiennale.de/en/program/calendar/peoples-tribunal-bana-group'
},
{
  id: 'hilat-albir',
  name: 'Freunde von Hilat Al Bir e.V',
  originalName: 'Freunde von Hilat Al Bir e.V',
  region: 'فريزينغ، بافاريا',
  focus: 'تعليم، صحة، تنمية',
  description: 'جمعية أصدقاء قرية "هيلات البير" في السودان. تهدف لتحسين ظروف الحياة من خلال دعم التعليم والرعاية الصحية. توفر كفالات دراسية للأطفال.',
  url: 'https://hilat-albir.org/',
  address: 'Untere Domberggasse 2, 85354 Freising',
  source: 'https://hilat-albir.org/impressum/'
},
{
  id: 'handinhand',
  name: 'Hand in Hand — يدًا بيد',
  originalName: 'Hand in Hand, Verein zur Förderung der medizinischen Versorgung im Sudan',
  region: 'لونيبورغ، سكسونيا السفلى',
  focus: 'صحي، إغاثي',
  description: 'جمعية لدعم الرعاية الطبية في السودان. تدير مركزًا طبيًا في الخرطوم بالتعاون مع منظمة الإمام فخر الدين الخيرية. تقدم مساعدات عاجلة في ظل الحرب.',
  url: 'https://handinhand-sudan.org/',
  address: 'Erbstorfer Landstraße 20, 21337 Lüneburg',
  source: 'https://handinhand-sudan.org/Deutsch/Impressum/'
},
{
  id: 'sudangermany.org',
  name: 'Die Sudanesisch-Deutsche Freundschaftsgesellschaft e.V',
  originalName: 'Sudanesisch-Deutscher Freundschaftsverein e.V.',
  region: 'ألمانيا (غير محدد)',
  focus: 'اقتصادي، اجتماعي، ثقافي',
  description: 'جمعية لدعم الرعاية الطبية في السودان. تدير مركزًا طبيًا في الخرطوم بالتعاون مع منظمة الإمام فخر الدين الخيرية. تقدم مساعدات عاجلة في ظل الحرب.',
  url: 'https://sudangermany.org/de/',
  address: 'null',
  source: 'https://sudangermany.org/de/about/'
}, 
{
    id: 'sudan-united-e-v',
    name: 'Sudan United e.V.',
    originalName: 'Sudan United e.V.',
    region: 'هامبورغ',
    focus: 'ثقافي / اجتماعي / دعم لاجئين',
    description: 'تنظيم فعاليات ثقافية سودانية (قراءات، حفلات، أمسيات ألعاب)، إنشاء مطبوعة إرشادية للاجئين السودانيين، توفير نقطة التقاء للألمان والسودانيين، التعاون بين المدارس السودانية والألمانية، دعم رياض الأطفال في السودان بالخبرة الألمانية والتطوع. التأسيس: 10 أبريل 2021.',
    url: 'https://sudan-united-e-v.jimdosite.com',
    address: 'Grumbrechtstraße 25, 21075 Hamburg',
    source: ''
  },
  {
    id: 'sudanese-german-charitable-association-e-v',
    name: 'Sudanese German Charitable Association e.V.',
    originalName: 'Sudanese German Charitable Association e.V.',
    region: 'ألمانيا',
    focus: 'خيري / إغاثي',
    description: 'جمعية خيرية مستقلة وغير ربحية مسجلة في ألمانيا. الهدف: مساعدة المتضررين من الحرب والعنف في السودان.',
    url: 'https://sgcaorg.com',
    address: '',
    source: ''
  },
  {
    id: 'sdk-sudanesisch-deutsche-kulturgemeinschaft',
    name: 'SDK — Sudanesisch-Deutsche Kulturgemeinschaft',
    originalName: 'SDK — Sudanesisch-Deutsche Kulturgemeinschaft',
    region: 'فرانكفورت',
    focus: 'ثقافي',
    description: 'التأسيس: 2 أكتوبر 2011. رقم التسجيل: VR 14897 (محكمة فرانكفورت). الحالة: ⚠️ الجمعية منحلة حالياً (i.L. — in Liquidation).',
    url: '',
    address: 'Wilhelm-Flögel-Ring 15, 60437 Frankfurt am Main',
    source: ''
  },
  {
    id: 'sudanese-students-association-germany-e-v',
    name: 'Sudanese Students Association Germany e.V. (SSA)',
    originalName: 'Sudanese Students Association Germany e.V. (SSA)',
    region: 'آخن',
    focus: 'طلابي / اجتماعي',
    description: 'الموقع: جامعة RWTH آخن. مساحة للطلاب السودانيين في ألمانيا للازدهار والتواصل والشعور بالانتماء. ينظمون فعاليات مثل "Global Village" في آخن. التواصل الاجتماعي: Instagram @ssa.germany، TikTok @ssa_germany.',
    url: 'Instagram @ssa.germany، TikTok @ssa_germany',
    address: 'جامعة RWTH آخن',
    source: ''
  },
  {
    id: 'sudanese-professional-network',
    name: 'Sudanese Professional Network (SPN)',
    originalName: 'Sudanese Professional Network (SPN)',
    region: 'عالمي / ألمانيا',
    focus: 'مهني / تعليمي / فرص',
    description: 'منصة عالمية للسودانيين (طلاب، لاجئين، محترفين) تقدم منحاً، وظائف، منح دراسية، وموارد مجانية. ملاحظة: ليست مقتصرة على ألمانيا لكنها تخدم السودانيين هناك أيضاً.',
    url: 'https://sudaneseprofessionalnetwork.com',
    address: '',
    source: ''
  },
  {
    id: 'skz-sudanesisches-kulturzentrum-dresden',
    name: 'SKZ — Sudanesisches Kulturzentrum Dresden',
    originalName: 'SKZ — Sudanesisches Kulturzentrum Dresden',
    region: 'دريسدن',
    focus: 'ثقافي / تكامل / تعليم / مهني',
    description: 'المركز الثقافي السوداني — دريسدن. الشعار: "من السودان. في دريسدن. معاً." الأنشطة: التكامل (دوائر لغوية، فهم اللغة الرسمية والإدارية، ألمانية للعمل)؛ التعليم (إرشاد أكاديمي، مسارات تعليمية، توجيه للاعتراف بالشهادات)؛ العمل (مساعدة في السيرة الذاتية والتقديمات، توجيه ثقافة العمل، مرافقة من محترفين سودانيين)؛ الحياة اليومية (إرشاد للمدارس ورياض الأطفال والرعاية الصحية، دعم عملي للوافدين الجدد)؛ التواصل الثقافي (عرض صورة حديثة عن السودان، تبادل ثقافي، شراكات مع مدارس وأندية محلية). الإنجازات (آخر 12 شهراً): دعم 220+ شخص، 95 جلسة لغوية وتكامل، 68 حالة دعم مهني، 24 شراكة محلية.',
    url: 'https://sudan-dresden.de',
    address: '',
    source: ''
  }
];
