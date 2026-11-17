import type { VichyNormadermProductData } from '../_types';

/**
 * Vichy Normaderm Phytosolution Daily Purifying Gel Cleanser 200ml
 * Original Price: 850 EGP
 * Discount: 15% -> Price: 722 EGP (850 - 128 = 722.5 -> 722 EGP)
 * Exact info extracted from official dermatological sheet:
 * - Salicylic Acid: حمض تقشير مستخلص من اصل طبيعي للتخلص من الرؤوس البيضا والسودا
 * - Hyaluronic Acid: مرطيب مائي خفيف لمدة 24 ساعه يحافظ علي المحتوي المائي للبشرة
 * - ZN-Gluconate: تنظيم الافرازات الدهنيه مضاد للبكتريا المسببه لحب الشباب
 * - Pro Biotic: يمنع تكرار ظهور الحبوب مره اخري ينشط ويقوي جهاز المناعة
 * - Sulfate Free Cleanser: غسول خالٍ تماماً من السلفات والبارابين والصابون
 * - 200ml
 */
export const VICHY_NORMADERM_DATA: VichyNormadermProductData = {
  id: 920,
  slug: 'vichy-normaderm-phytosolution-daily-purifying-cleansing-gel-200ml',
  nameAr: 'فيشي نورماديرم فيتوسوليوشن غسول يومي للبشرة الدهنية المعرضة لحب الشباب 200ملليلتر',
  nameEn: 'Vichy Normaderm Phytosolution Daily Purifying Gel Cleanser 200ml',
  taglineAr: 'غسول يومي منقي مكثف وخالٍ من السلفات بحمض الساليسيليك والهيالورونيك والزنك والبروبيوتيك — تنقية عميقة وترطيب 24 ساعة بدون جفاف',
  taglineEn: 'Sulfate-Free Intensive Daily Purifying Cleansing Gel powered by Salicylic Acid, Hyaluronic Acid, Zinc & Probiotics for acne-prone oily skin',
  size: '200 مل / 200ml',
  price: 722,
  originalPrice: 850,
  discountPercentage: 15,
  rating: 4.9,
  ratingCount: 184,
  inStock: true,
  stockCount: 19,
  highlightsAr: [
    'حمض الساليسيليك الطبيعي (Salicylic Acid): حمض تقشير مستخلص من أصل طبيعي للتخلص من الرؤوس البيضاء والسوداء وتنظيف المسام بعمق',
    'حمض الهيالورونيك (Hyaluronic Acid): مرطب مائي خفيف لمدة 24 ساعة يحافظ على المحتوى المائي للبشرة ويحميها من الجفاف',
    'جلوكونات الزنك (ZN-Gluconate): تنظيم الإفرازات الدهنية وتقليل اللمعان ومضاد فعال للبكتيريا المسببة لحب الشباب',
    'البروبيوتيك (Pro Biotic): يمنع تكرار ظهور الحبوب مرة أخرى وينشط ويقوي جهاز مناعة البشرة وحاجزها الطبيعي',
    'تركيبة خالية تماماً من السلفات (Sulfate Free Cleanser) والصابون والكحول للحفاظ على توازن البشرة',
    'مختبر جلدياً من معامل فيشي العالمية ومناسب للبشرة الدهنية والمختلطة والمعرضة لحب الشباب'
  ],
  highlightsEn: [
    'Natural Salicylic Acid: Naturally derived exfoliating BHA to eliminate blackheads, whiteheads, and unclog pores',
    'Hyaluronic Acid: Lightweight 24-hour aquatic hydration preserving skin water content without greasiness',
    'ZN-Gluconate: Regulates sebum secretion, minimizes daytime shine, and neutralizes acne-causing bacteria',
    'Pro Biotic: Prevents recurrent breakouts and actively reinforces the skin natural immune barrier',
    '100% Sulfate Free Cleanser: Gentle formula free from harsh sulfates, soap, and drying alcohol',
    'Dermatologically tested by Vichy Laboratoires specifically for oily, combination, and acne-prone skin'
  ],
  safetyBadgesAr: [
    'خالٍ من السلفات (Sulfate Free)',
    'مفحوص جلدياً للبشرة الدهنية',
    'خالٍ من الصابون والكحول',
    'من فيشي لابوراتوار الأصلية'
  ],
  safetyBadgesEn: [
    'Sulfate Free Cleanser',
    'Dermatologically Tested',
    'Soap & Alcohol Free',
    '100% Original Vichy'
  ],
  images: [
    {
      id: 'main',
      src: '/products/vichy-normaderm/main.png',
      altAr: 'عبوة غسول فيشي نورماديرم فيتوسوليوشن 200مل للبشرة الدهنية وحب الشباب الأصلية',
      altEn: 'Vichy Normaderm Phytosolution Daily Purifying Cleansing Gel 200ml Original Bottle',
      captionAr: 'العبوة الأصلية بحجم 200 مل من فيشي لابوراتوار',
      captionEn: 'Original 200ml Packaging by Vichy Laboratoires',
      badgeAr: 'المنتج الأصلي',
      badgeEn: 'Original Product'
    },
    {
      id: 'infographic',
      src: '/products/vichy-normaderm/infographic.jpg',
      altAr: 'التركيبة العلمية لغسول فيشي نورماديرم: ساليسيليك، هيالورونيك، زنك، وبروبيوتيك',
      altEn: 'Scientific Formula of Vichy Normaderm: Salicylic Acid, Hyaluronic Acid, Zinc & Probiotics',
      captionAr: 'التركيبة الفعالة وخالٍ من السلفات (Sulfate Free Cleanser)',
      captionEn: 'Active ingredients breakdown & Sulfate-Free claim',
      badgeAr: 'التركيبة المعتمدة',
      badgeEn: 'Clinical Formula'
    },
    {
      id: 'texture',
      src: '/products/vichy-normaderm/texture.jpg',
      altAr: 'رغوة وقوام جل فيشي نورماديرم المنعش والمنظف للمسام',
      altEn: 'Vichy Normaderm Purifying Gel foam and texture',
      captionAr: 'قوام جل رغوي خفيف ينظف بلطف دون أن يسبب شد البشرة',
      captionEn: 'Refreshing purifying gel foam with zero tightness',
      badgeAr: 'رغوة منعشة',
      badgeEn: 'Gentle Foam'
    }
  ],
  ingredients: [
    {
      nameAr: 'حمض الساليسيليك (Salicylic Acid)',
      nameEn: 'Salicylic Acid',
      roleAr: 'حمض تقشير طبيعي لإزالة الرؤوس السوداء والبيضاء',
      roleEn: 'Natural Exfoliating BHA & Pore Purifier',
      descriptionAr: 'حمض تقشير مستخلص من أصل طبيعي يتغلغل داخل المسام العميقة لإذابة الدهون المتراكمة والخلايا الميتة، والتخلص الجذري من الرؤوس البيضاء والسوداء ومنع انسداد المسام.',
      descriptionEn: 'Naturally derived BHA that penetrates deep into pores to dissolve trapped sebum and dead cells, clearing blackheads and whiteheads at the root.',
      icon: 'sparkles'
    },
    {
      nameAr: 'حمض الهيالورونيك (Hyaluronic Acid)',
      nameEn: 'Hyaluronic Acid',
      roleAr: 'ترطيب مائي خفيف لمدة 24 ساعة',
      roleEn: '24-Hour Lightweight Hydration',
      descriptionAr: 'مرطب مائي فائق الخفة يحافظ على المحتوى المائي للبشرة لمدة 24 ساعة كاملة، ليمنحها مرونة وانتعاشاً دون أي إحساس دهني أو لمعان.',
      descriptionEn: 'Ultra-lightweight aquatic hydrator that locks in moisture for 24 hours, keeping skin supple and fresh without feeling heavy or oily.',
      icon: 'droplets'
    },
    {
      nameAr: 'جلوكونات الزنك (ZN-Gluconate)',
      nameEn: 'Zinc Gluconate (ZN-Gluconate)',
      roleAr: 'تنظيم الإفرازات الدهنية ومضاد للبكتيريا',
      roleEn: 'Sebum Regulation & Anti-Bacterial Action',
      descriptionAr: 'عنصر معدني أساسي ينظم نشاط الغدد الدهنية ليحد من الإفرازات الزائدة واللمعان، ويوفر حماية قوية ضد البكتيريا المسببة لظهور حب الشباب.',
      descriptionEn: 'Essential mineral complex that regulates sebaceous gland activity to minimize excess shine, while neutralizing acne-causing bacteria.',
      icon: 'shield'
    },
    {
      nameAr: 'البروبيوتيك (Pro Biotic)',
      nameEn: 'Pro Biotic Fractions',
      roleAr: 'تقوية جهاز المناعة ومنع تكرار الحبوب',
      roleEn: 'Barrier Immunity & Acne Recurrence Prevention',
      descriptionAr: 'مستخلصات البروبيوتيك الحيوية تنشط وتقوي جهاز مناعة البشرة وتعيد التوازن للميكروبيوم الطبيعي، مما يمنع تكرار ظهور الحبوب ويسرع تجدد خلايا البشرة.',
      descriptionEn: 'Bioactive probiotic fractions that stimulate and fortify the skin immune defense, rebalancing the microbiome to prevent acne relapse.',
      icon: 'leaf'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'مريم الشريف',
      cityAr: 'القاهرة (التجمع الخامس)',
      cityEn: 'Cairo',
      rating: 5,
      date: 'نوفمبر 2026',
      titleAr: 'أفضل غسول لحب الشباب بدون جفاف نهائياً',
      titleEn: 'Best acne cleanser with zero dryness',
      commentAr: 'كنت متعودة إن أي غسول فيه ساليسيليك بينشف وشي ويخليه مشدود، لكن نورماديرم فيتوسوليوشن مختلف تماماً! عشان فيه هيالورونيك وترطيب 24 ساعة، وشي بينضف جداً والرؤوس السودا اختفت تقريباً ومن غير أي قشور. منتج أصلي وممتاز من صفصافة.',
      commentEn: 'I was used to salicylic cleansers drying out my skin, but Normaderm Phytosolution is a game changer! With hyaluronic acid providing 24h moisture, my pores are deep cleaned and blackheads gone with zero flaking. 100% genuine product.',
      verified: true,
      highlightAr: 'تنظيف عميق بدون شد',
      highlightEn: 'Deep Clean Without Tightness'
    },
    {
      id: 'rev-2',
      author: 'د. ياسمين خالد',
      cityAr: 'الإسكندرية (سموحة)',
      cityEn: 'Alexandria',
      rating: 5,
      date: 'أكتوبر 2026',
      titleAr: 'تركيبة الزنك والبروبيوتيك فرقت جداً مع الحبوب',
      titleEn: 'Zinc and Probiotics made a massive difference',
      commentAr: 'أنا طبيبة صيدلانية وبشرتي مختلطة معرضة للحبوب في الصيف والشتاء. وجود الزنك مع البروبيوتيك بيمنع تكرار الحبوب تحت الجلد بشكل ملحوظ وبيتحكم في اللمعة في منطقة الـ T-Zone. والـ 200 مل بتقعد فترة طويلة جداً.',
      commentEn: 'As a pharmacist with combination acne-prone skin, the synergy of Zinc and Probiotics visibly prevents recurrent blemishes and controls T-zone shine all day. The 200ml bottle lasts for months.',
      verified: true,
      highlightAr: 'تنظيم دهون ومنع تكرار الحبوب',
      highlightEn: 'Sebum Control & Zero Relapse'
    },
    {
      id: 'rev-3',
      author: 'نورهان فوزي',
      cityAr: 'المنصورة',
      cityEn: 'Mansoura',
      rating: 5,
      date: 'نوفمبر 2026',
      titleAr: 'الرؤوس السوداء والمسام الواسعة اتحسنت في أسبوعين',
      titleEn: 'Blackheads and pores improved in 2 weeks',
      commentAr: 'أجمل حاجة إنه خالي من السلفات فمش بيهيج البشرة. طلبت العبوة الـ 200 مل بخصم الـ 15% من صفصافة والتوصيل كان سريع جداً في أقل من 48 ساعة والدفع عند الاستلام. تجربة تسوق راقية جداً.',
      commentEn: 'The fact that it is Sulfate-Free makes it so gentle on sensitive areas. Ordered the 200ml with 15% discount on Safsafah; delivery was super fast under 48 hours with cash on delivery. Highly recommended!',
      verified: true,
      highlightAr: 'خالٍ من السلفات وسريع التوصيل',
      highlightEn: 'Sulfate-Free & Fast Shipping'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      questionAr: 'ما الذي يميز فيشي نورماديرم فيتوسوليوشن عن باقي غسولات حب الشباب؟',
      questionEn: 'What makes Vichy Normaderm Phytosolution unique compared to ordinary cleansers?',
      answerAr: 'يتميز بتركيبته الرباعية المتقدمة: حمض الساليسيليك الطبيعي لإزالة الرؤوس السوداء، حمض الهيالورونيك لترطيب 24 ساعة دون جفاف، جلوكونات الزنك لتنظيم الدهون، والبروبيوتيك الذي ينشط مناعة الجلد ويمنع تكرار الحبوب. كما أنه خالٍ تماماً من السلفات (Sulfate Free Cleanser) والصابون والكحول.',
      answerEn: 'It combines four clinically proven bio-actives: Natural Salicylic Acid for pore unclogging, Hyaluronic Acid for 24h lightweight hydration, Zinc Gluconate for sebum regulation, and Probiotics to fortify skin immunity against acne relapse. Furthermore, it is 100% Sulfate-Free, soap-free, and alcohol-free.',
      category: 'results'
    },
    {
      id: 'faq-2',
      questionAr: 'هل يسبب الغسول أي جفاف أو تقشير أو شد في البشرة؟',
      questionEn: 'Does this cleansing gel cause peeling, tightness, or dry patches?',
      answerAr: 'لا، على عكس غسولات حب الشباب التقليدية التي تضر الحاجز الواقي، تم تدعيم فيشي نورماديرم بحمض الهيالورونيك لتأمين ترطيب مائي يدوم 24 ساعة مع كل غسلة، بالإضافة لكونه خالياً من السلفات القاسية، مما يترك البشرة ناعمة ومرنة ومنتعشة دون أي إحساس بالشد.',
      answerEn: 'No. Unlike harsh acne washes, Vichy Normaderm Phytosolution is infused with Hyaluronic Acid to provide continuous 24-hour hydration, and uses a Sulfate-Free cleansing base that respects the skin lipid barrier, leaving skin fresh and supple with zero tightness.',
      category: 'safety'
    },
    {
      id: 'faq-3',
      questionAr: 'ما هي الطريقة الصحيحة للاستخدام لتحقيق أفضل نتيجة؟',
      questionEn: 'What is the recommended application routine for optimal results?',
      answerAr: 'يُستخدم مرتين يومياً (صباحاً ومساءً). بللي وجهك بالماء الفاتر، ثم ضعي ضخة واحدة على راحة يدك ودلكي بها الوجه بحركات دائرية خفيفة لمدة دقيقة مع التركيز على الجبهة والأنف والذقن ومناطق الحبوب، ثم اشطفي جيداً وجففي برفق بمنشفة قطنية نظيفة.',
      answerEn: 'Use twice daily (morning and evening). Wet face with lukewarm water, apply one pump onto palms, and gently lather and massage in circular motions for 60 seconds focusing on the T-zone and blemishes. Rinse thoroughly and pat dry with a clean towel.',
      category: 'usage'
    },
    {
      id: 'faq-4',
      questionAr: 'كم تدوم عبوة الـ 200 ملليلتر؟',
      questionEn: 'How long does the 200ml bottle typically last?',
      answerAr: 'تركيبة الجل مركزة جداً وتتحول لرغوة وفيرة بكمية صغيرة فقط؛ لذلك تدوم عبوة الـ 200 ملليلتر ما بين شهرين إلى ثلاثة أشهر من الاستخدام اليومي المنتظم مرتين في اليوم.',
      answerEn: 'The concentrated gel formula produces rich foam from just a pea-sized pump. A 200ml bottle typically lasts between 2 to 3 months of consistent twice-daily use.',
      category: 'usage'
    },
    {
      id: 'faq-5',
      questionAr: 'كيف يتم التوصيل في مصر وما هي خيارات الدفع؟',
      questionEn: 'How does delivery work in Egypt and what payment methods are available?',
      answerAr: 'نوفر شحناً سريعاً لجميع محافظات مصر مع التوصيل خلال 48 إلى 72 ساعة، مع توفر خيار الدفع عند الاستلام (COD) ومعاينة الطلب عند الاستلام مع ضمان الأصالة بنسبة 100٪ من متجر صفصافة.',
      answerEn: 'We provide express delivery across all Egyptian governorates within 48 to 72 hours, with Cash on Delivery (COD) available and 100% genuine product guarantee from Safsafah.',
      category: 'shipping'
    }
  ]
};
