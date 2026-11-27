import type { VichyNormadermProductData } from '../_types';

/**
 * Vichy Normaderm Phytosolution Intensive Purifying Gel Cleanser 200ml
 * Official Vichy specs (vichy-me.com & vichy.eg p27189):
 * - Salicylic Acid (BHA): Unclogs pores, eliminates blackheads and blemishes
 * - Minerals (Zinc Gluconate & Copper Gluconate): Sebum regulation, antibacterial & purifying
 * - Probiotic Extract (Bifida Ferment Lysate / Bifidus): Strengthens skin barrier & microbiome
 * - Vegetal-origin cleansing base at physiological pH 5.5: Sulfate-free, soap-free, alcohol-free
 * - Clinical & self-assessment tests (50 women, oily/acne-prone/sensitive skin, 4 weeks, 2x/day):
 *   1st wash: 91% pollution/dirt removed, 94% excess sebum reduced
 *   4 weeks: 83% skin texture refined, 98% imperfection marks reduced
 */
export const VICHY_NORMADERM_DATA: VichyNormadermProductData = {
  id: 648,
  slug: 'vichy-normaderm-phytosolution-daily-purifying-cleansing-gel-200ml',
  nameAr: 'فيشي نورماديرم فيتوسوليوشن جل غسول منقي مكثف للبشرة الدهنية المعرضة لحب الشباب 200مل',
  nameEn: 'Vichy Normaderm Phytosolution Intensive Purifying Gel Cleanser 200ml',
  taglineAr:
    'جل منقي يومي بقاعدة نباتية خالٍ من السلفات والصابون والكحول — مدعم بحمض الساليسيليك، معادن الزنك والنحاس، ومستخلص البروبيوتيك (Bifidus) بدرجة حموضة 5.5',
  taglineEn:
    'Sulfate-, soap- & alcohol-free purifying gel on a vegetal cleansing base — powered by Salicylic Acid, Zinc & Copper Minerals, and Bifidus Probiotic at physiological pH 5.5',
  size: '200 مل / 200ml',
  price: 722,
  originalPrice: 850,
  discountPercentage: 15,
  rating: 4.6,
  ratingCount: 6259,
  inStock: true,
  stockCount: 19,
  highlightsAr: [
    'حمض الساليسيليك (Salicylic Acid): يتغلغل بعمق لتنظيف المسام المسدودة وإزالة الرؤوس السوداء والشوائب',
    'معادن الزنك والنحاس (Zinc & Copper Gluconate): تنظيم الإفرازات الدهنية وتنقية البشرة ومقاومة البكتيريا المسببة للحبوب',
    'مستخلص البروبيوتيك (Bifidus): يقوي حاجز البشرة الطبيعي ويدعم توازن الميكروبيوم الوقائي',
    'قاعدة تنظيف نباتية بدرجة حموضة 5.5: خالٍ من السلفات والصابون والكحول لتنظيف عميق بدون جفاف أو شد',
    'نتائج مثبتة سريرياً: إزالة 91٪ من الأتربة والتلوث وتقليل 94٪ من الدهون الزائدة من الغسلة الأولى',
    'مختبر تحت إشراف أطباء الجلدية على البشرة الدهنية والحساسة المعرضة لحب الشباب',
  ],
  highlightsEn: [
    'Salicylic Acid (BHA): Penetrates deep into pores to clear congestion, excess sebum, and blackheads',
    'Zinc & Copper Minerals: Regulate sebum output, minimize shine, and deliver purifying anti-bacterial care',
    'Bifidus Probiotic Extract (Bifida Ferment Lysate): Reinforces the skin barrier and protects against external aggressors',
    'Vegetal Cleansing Base at Physiological pH 5.5: Soap-free, sulfate-free, and alcohol-free purification without stripping',
    'Clinically tested efficacy: 91% pollution particles removed & 94% excess sebum reduced from the 1st wash',
    'Dermatologically & allergy tested specifically for oily, acne-prone, and sensitive skin',
  ],
  safetyBadgesAr: [
    'خالٍ من السلفات والصابون والكحول',
    'درجة حموضة فسيولوجية pH 5.5',
    'مختبر على البشرة الحساسة',
    'من فيشي لابوراتوار فرنسا',
  ],
  safetyBadgesEn: [
    'Sulfate, Soap & Alcohol-Free',
    'Physiological pH 5.5',
    'Sensitive Skin Tested',
    'Vichy Laboratoires France',
  ],
  images: [
    {
      id: 'main',
      src: '/products/vichy-normaderm/main.jpeg',
      altAr: 'عبوة غسول فيشي نورماديرم فيتوسوليوشن 200مل الأصلية للبشرة الدهنية وحب الشباب',
      altEn: 'Vichy Normaderm Phytosolution Intensive Purifying Gel 200ml Original Bottle',
      captionAr: 'العبوة الأصلية بحجم 200 مل من فيشي لابوراتوار',
      captionEn: 'Original 200ml Bottle by Vichy Laboratoires',
      badgeAr: 'المنتج الأصلي',
      badgeEn: 'Original Product',
    },
    {
      id: 'gentle-foam',
      src: '/products/vichy-normaderm/gentle-foam.jpg',
      altAr: 'رغوة فيشي نورماديرم الناعمة: تنظف بعمق بدون جفاف ولطيفة على البشرة الحساسة',
      altEn: 'Vichy Normaderm Gentle Foaming Cleanser: Deeply cleanses without drying sensitive skin',
      captionAr: 'رغوة ناعمة من أصل نباتي تزيل الشوائب والزيوت الزائدة بدون جفاف',
      captionEn: 'Vegetal-origin gentle foam removing impurities & excess sebum without dryness',
      badgeAr: 'رغوة لطيفة بدون جفاف',
      badgeEn: 'Gentle Cleansing Foam',
    },
    {
      id: 'green-formula',
      src: '/products/vichy-normaderm/Vichy Normaderm Clinical Green Formula.png',
      altAr: 'فيشي نورماديرم فيتوسوليوشن — تركيبة خضراء إكلينيكية بمعادن الزنك والنحاس والساليسيليك والبروبيوتيك',
      altEn: 'Vichy Normaderm Phytosolution — Clinical Formula with Zinc, Copper, Salicylic Acid & Bifidus',
      captionAr: 'تركيبة إكلينيكية بدرجة حموضة 5.5 لتحترم حاجز البشرة',
      captionEn: 'Clinical pH 5.5 formula respecting the skin barrier',
      badgeAr: 'تركيبة طبيعية إكلينيكية',
      badgeEn: 'Clinical Green Formula',
    },
  ],
  ingredients: [
    {
      nameAr: 'حمض الساليسيليك (Salicylic Acid)',
      nameEn: 'Salicylic Acid (BHA)',
      roleAr: 'تنقية المسام وإزالة الرؤوس السوداء',
      roleEn: 'Pore Purification & Blackhead Action',
      descriptionAr:
        'مقشر لطيف يتغلغل داخل المسام لإذابة الدهون المتراكمة والخلايا الميتة وتنقية الرؤوس السوداء والشوائب.',
      descriptionEn:
        'Exfoliating BHA that penetrates deep into pores to dissolve trapped sebum, clear blackheads, and reduce blemishes.',
      icon: 'sparkles',
    },
    {
      nameAr: 'معادن الزنك والنحاس (Zinc & Copper)',
      nameEn: 'Zinc & Copper Gluconate',
      roleAr: 'تنظيم الدهون وتنقية البشرة',
      roleEn: 'Sebum Control & Purifying Minerals',
      descriptionAr:
        'ثنائي معدني ينظم إفراز الزهم ويقلل اللمعان ومظاهر الالتهاب والبكتيريا المسببة للحبوب دون إجهاد الجلد.',
      descriptionEn:
        'Synergistic minerals with sebum-regulating, antibacterial, and soothing properties that leave skin visibly mattified.',
      icon: 'shield',
    },
    {
      nameAr: 'خلاصة البروبيوتيك (Bifidus)',
      nameEn: 'Bifidus Probiotic (Bifida Ferment Lysate)',
      roleAr: 'تقوية حاجز البشرة الطبيعي',
      roleEn: 'Skin Barrier Reinforcement',
      descriptionAr:
        'مستخلص مشتق من البروبيوتيك يدعم توازن الميكروبيوم ويقوي حاجز حماية البشرة ضد العوامل الخارجية.',
      descriptionEn:
        'Probiotic-derived extract that reinforces the skin moisture barrier and defends against daily environmental stressors.',
      icon: 'leaf',
    },
    {
      nameAr: 'قاعدة تنظيف نباتية (pH 5.5)',
      nameEn: 'Vegetal Cleansing Base (pH 5.5)',
      roleAr: 'رغوة لطيفة بدون سلفات أو صابون',
      roleEn: 'Gentle Non-Stripping Foam',
      descriptionAr:
        'عوامل تنظيف من أصل نباتي بدرجة حموضة فسيولوجية 5.5 تزيل الأتربة والتلوث دون التسبب في شد أو جفاف.',
      descriptionEn:
        'Plant-derived foaming agents balanced at physiological pH 5.5 to purify deeply while respecting sensitive skin.',
      icon: 'droplets',
    },
  ],
  reviews: [
    {
      id: 'noon-1',
      author: 'Yara A.',
      cityAr: 'مصر · 200 مل',
      cityEn: 'Egypt · 200 ml',
      rating: 5,
      date: 'مارس 2026',
      dateEn: 'Mar 2026',
      titleAr: 'منتج ممتاز وأصلي',
      titleEn: 'Great original product',
      commentAr:
        'المنتج اوريجينال، ريحته شبه النعناع والغطا بيكون متبرشم.. مش اول مرة استعمله بينضف المسام وبيفتح البشرة وبيقلل ظهور الحبوب جدًا.',
      commentEn:
        'Original product with a fresh mint-like scent and sealed cap. Not my first time using it—deeply cleanses pores, brightens skin appearance, and noticeably reduces breakouts.',
      verified: true,
      highlightAr: 'تنظيف المسام وتقليل الحبوب',
      highlightEn: 'Pore Care & Fewer Breakouts',
      sourceAr: 'نون مصر',
      sourceEn: 'Noon Egypt',
    },
    {
      id: 'noon-2',
      author: 'Reham F.',
      cityAr: 'مصر · 200 مل',
      cityEn: 'Egypt · 200 ml',
      rating: 5,
      date: 'يوليو 2026',
      dateEn: 'Jul 2026',
      titleAr: 'أفضل غسول للبشرة الدهنية والمختلطة والمعرضة للحبوب',
      titleEn: 'Best Cleanser for Oily, Combination & Acne-Prone Skin',
      commentAr:
        'من أفضل الغسولات التي استخدمتها للبشرة الدهنية والمختلطة والمعرضة للحبوب. يزيل الزيوت الزائدة وبقايا واقي الشمس والشوائب دون شد أو جفاف. بعد أسابيع من الاستخدام لاحظت حبوباً أقل ولمعاناً أقل ومسام أنظف مع الحفاظ على حاجز البشرة.',
      commentEn:
        'One of the best facial cleansers I’ve used for oily, combination, and acne-prone skin. It removes excess oil, sunscreen, and daily impurities without leaving my skin feeling tight or over-dried. After a few weeks of use, I noticed fewer breakouts, less shine, and my pores looked cleaner.',
      verified: true,
      highlightAr: 'بدون جفاف أو شد',
      highlightEn: 'Zero Tightness & Balanced',
      sourceAr: 'نون مصر',
      sourceEn: 'Noon Egypt',
    },
    {
      id: 'noon-3',
      author: 'Nada H.',
      cityAr: 'مصر · 200 مل',
      cityEn: 'Egypt · 200 ml',
      rating: 5,
      date: 'نوفمبر 2026',
      dateEn: 'Nov 2026',
      titleAr: 'أصلي 100٪ بالباركود ورائحته منعشة',
      titleEn: 'Verified authentic and smells fresh',
      commentAr:
        'وصل المنتج بحالة ممتازة، وبالتحقق من الباركود والباتش كود تأكدت أنه أصلي 100٪. قوام الجل الشفاف ورائحته المنعشة الشبيهة بالنعناع تعطي انطباعاً رائعاً من أول استخدام.',
      commentEn:
        'The product arrived in perfect condition, and checking the barcode and batch code confirms it is 100% authentic. The clear gel texture and refreshing mint-like scent make a positive first impression.',
      verified: true,
      highlightAr: 'أصلي وموثق بالباركود',
      highlightEn: 'Batch-Code Verified',
      sourceAr: 'نون مصر',
      sourceEn: 'Noon Egypt',
    },
    {
      id: 'noon-4',
      author: 'Ahmed H.',
      cityAr: 'مصر · شراء مؤكد',
      cityEn: 'Egypt · Verified',
      rating: 5,
      date: 'أكتوبر 2026',
      dateEn: 'Oct 2026',
      titleAr: 'غسول يومي فعال للبشرة الدهنية',
      titleEn: 'Effective daily cleanser for oily skin',
      commentAr:
        'ينظف المسام بعمق ويتحكم في الدهون الزائدة مع بقائه لطيفاً على البشرة. التركيبة منعشة وسهلة الشطف وتمنح ملمساً ناعماً دون أي جفاف.',
      commentEn:
        'This cleanser deep cleans pores and controls excess oil while remaining gentle on the skin. The formula feels refreshing, rinses off easily, and provides a smooth texture without causing any dryness.',
      verified: true,
      highlightAr: 'ملمس ناعم وسهل الشطف',
      highlightEn: 'Smooth & Gentle Cleanse',
      sourceAr: 'نون مصر',
      sourceEn: 'Noon Egypt',
    },
    {
      id: 'noon-5',
      author: 'Aya G.',
      cityAr: 'مصر · 200 مل',
      cityEn: 'Egypt · 200 ml',
      rating: 5,
      date: 'يونيو 2025',
      dateEn: 'Jun 2025',
      titleAr: 'تحكم ممتاز في الإفرازات الدهنية',
      titleEn: 'Outstanding Sebum Control',
      commentAr:
        'أستخدمه منذ أسبوعين ويفعل تماماً ما يعد به؛ تحكم رائع في الزيوت الزائدة والدهون، كما يحد من ظهور الحبوب في المناطق المعرضة لها مثل الذقن ومنطقة الـ T-Zone.',
      commentEn:
        'Have been using this for the past two weeks, and it really does what it says. Great control over excessive oils and sebum. It also prevents some problematic areas of my skin from developing potential acne, like my chin and T zone.',
      verified: true,
      highlightAr: 'تحكم في الـ T-Zone',
      highlightEn: 'T-Zone & Chin Oil Control',
      sourceAr: 'نون مصر',
      sourceEn: 'Noon Egypt',
    },
    {
      id: 'noon-6',
      author: 'Mariam A.',
      cityAr: 'مصر · شراء مؤكد',
      cityEn: 'Egypt · Verified',
      rating: 4,
      date: 'سبتمبر 2025',
      dateEn: 'Sep 2025',
      titleAr: 'حلو جداً بس دخلوه تدريجياً للبشرة الحساسة',
      titleEn: 'Great formula — introduce gradually for sensitive skin',
      commentAr:
        'حلو جدا بس اي حد بشرته حساسه يدخله تدريجي عشان فيه مواد فعاله كتير الاحسن تستعمله مرتين او ٣ ف الاسبوع بس و ياريت تحطوا منه كميه صغيره.',
      commentEn:
        'Very effective, though anyone with sensitive skin should introduce it gradually because it contains active ingredients—start 2–3 times a week and only use a small amount.',
      verified: true,
      highlightAr: 'نصيحة للبشرة الحساسة',
      highlightEn: 'Sensitive Skin Tip',
      sourceAr: 'نون مصر',
      sourceEn: 'Noon Egypt',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      questionAr: 'ما هي المكونات الفعالة الرئيسية في فيشي نورماديرم فيتوسوليوشن؟',
      questionEn: 'What are the core active ingredients in Vichy Normaderm Phytosolution Gel?',
      answerAr:
        'يرتكز الغسول على حمض الساليسيليك (Salicylic Acid) لتنقية المسام وإزالة الرؤوس السوداء، ومعادن الزنك والنحاس (Zinc & Copper Gluconate) لتنظيم الإفرازات الدهنية وتنقية البشرة، وخلاصة البروبيوتيك (Bifida Ferment Lysate) لتقوية حاجز البشرة، داخل قاعدة تنظيف نباتية خالية من السلفات والصابون والكحول بدرجة حموضة 5.5.',
      answerEn:
        'The gel combines Salicylic Acid to unclog pores and clear blackheads, Zinc & Copper Gluconate minerals to regulate sebum and purify skin, and Bifidus probiotic extract (Bifida Ferment Lysate) to reinforce the skin barrier—formulated in a sulfate-, soap-, and alcohol-free vegetal base at pH 5.5.',
      category: 'results',
    },
    {
      id: 'faq-2',
      questionAr: 'هل يسبب الغسول جفافاً أو شدّاً للبشرة الحساسة المعرضة للحبوب؟',
      questionEn: 'Does this purifying gel dry out or irritate sensitive acne-prone skin?',
      answerAr:
        'لا، على عكس الغسولات القاسية؛ فقد تم تصنيعه بقاعدة تنظيف من أصل نباتي خالية تماماً من الصابون والسلفات والكحول، ومضبوطة عند درجة حموضة فسيولوجية 5.5 لتحترم حاجز البشرة الطبيعي وتنظف بعمق دون تجريدها من رطوبتها.',
      answerEn:
        'No. Unlike harsh acne washes, it uses a vegetal-origin cleansing base that is completely soap-free, sulfate-free, and alcohol-free at a skin-friendly physiological pH of 5.5, purifying deeply while respecting sensitive skin.',
      category: 'safety',
    },
    {
      id: 'faq-3',
      questionAr: 'متى تظهر النتائج السريرية للغسول؟',
      questionEn: 'How soon are clinical results visible?',
      answerAr:
        'من الغسلة الأولى تظهر اختبارات فيشي إزالة 91٪ من جزيئات التلوث والأتربة وتقليل 94٪ من الدهون الزائدة مع مظهر مطفي فوري. وبعد 4 أسابيع من الاستخدام مرتين يومياً لاحظت 83٪ من المشاركات تحسن ملمس البشرة و98٪ تراجع مظهر آثار الشوائب.',
      answerEn:
        'From the very first wash, Vichy clinical tests show 91% of dirt and pollution particles removed and 94% excess sebum reduced with instant mattification. After 4 weeks of twice-daily use, 83% reported refined skin texture and 98% noted reduced imperfection marks.',
      category: 'results',
    },
    {
      id: 'faq-4',
      questionAr: 'ما هي الطريقة الصحيحة للاستخدام وهل يناسب مناطق أخرى غير الوجه؟',
      questionEn: 'How do I apply it, and can it be used on areas besides the face?',
      answerAr:
        'يُستخدم مرتين يومياً (صباحاً ومساءً) على بشرة مبللة؛ دلكي بلطف حتى تتكون رغوة ثم اشطفي جيداً بالماء مع تجنب محيط العينين. كما يمكن استخدامه على الرقبة أو الصدر أو الظهر المعرضة للحبوب، ثم اتبعيه بروتين الترطيب المناسب.',
      answerEn:
        'Apply morning and evening onto wet skin, massage gently into a lather avoiding the eye contour, rinse thoroughly, and pat dry. It can also be used on acne-prone neck, chest, or back areas. Follow with your daily moisturizer.',
      category: 'usage',
    },
    {
      id: 'faq-5',
      questionAr: 'كيف يتم التوصيل في مصر وما هي خيارات الدفع؟',
      questionEn: 'How does delivery work in Egypt and what payment methods are available?',
      answerAr:
        'نوفر شحناً سريعاً لجميع محافظات مصر مع التوصيل خلال 48 إلى 72 ساعة، مع توفر خيار الدفع عند الاستلام (COD) ومعاينة الطلب عند الاستلام مع ضمان الأصالة بنسبة 100٪ من متجر صفصافة.',
      answerEn:
        'We provide express delivery across all Egyptian governorates within 48 to 72 hours, with Cash on Delivery (COD) available and 100% genuine product guarantee from Safsafah.',
      category: 'shipping',
    },
  ],
};
