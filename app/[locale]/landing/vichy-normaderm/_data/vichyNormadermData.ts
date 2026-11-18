import type { VichyNormadermProductData } from '../_types';

/**
 * Vichy Normaderm Phytosolution Daily Purifying Gel Cleanser 200ml
 * Original Price: 850 EGP
 * Discount: 15% -> Price: 722 EGP (850 - 128 = 722.5 -> 722 EGP)
 * Product ID: 648
 *
 * Ingredients clinically included:
 * 1. SALICYLIC ACID: حمض تقشير مستخلص من أصل طبيعي للتخلص من الرؤوس البيضاء والسوداء وتنظيف المسام بعمق
 * 2. HYALURONIC ACID: مرطب مائي خفيف لمدة 24 ساعة يحافظ على المحتوى المائي للبشرة بدون جفاف
 * 3. ZN-GLUCONATE: تنظيم الإفرازات الدهنية ومضاد للبكتيريا المسببة لحب الشباب والتحكم في اللمعان
 * 4. PRO BIOTIC: يمنع تكرار ظهور الحبوب مرة أخرى وينشط ويقوي جهاز مناعة البشرة
 */
export const VICHY_NORMADERM_DATA: VichyNormadermProductData = {
  id: 648,
  slug: 'vichy-normaderm-phytosolution-daily-purifying-cleansing-gel-200ml',
  nameAr: 'فيشي نورماديرم فيتوسوليوشن غسول يومي للبشرة الدهنية المعرضة لحب الشباب 200ملليلتر',
  nameEn: 'Vichy Normaderm Phytosolution Daily Purifying Gel Cleanser 200ml',
  taglineAr: 'غسول يومي منقي مكثف بالساليسيليك، الهيالورونيك، الزنك، والبروبيوتيك — رغوة لطيفة تنظف بعمق بدون جفاف',
  taglineEn: 'Intensive daily purifying cleanser powered by Salicylic Acid, Hyaluronic Acid, Zinc & Probiotics — gentle foam that deeply cleanses without dryness',
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
    'جلوكونات الزنك (ZN-Gluconate): تنظيم الإفرازات الدهنية ومضاد فعال للبكتيريا المسببة لحب الشباب والحد من اللمعان',
    'البروبيوتيك (Pro Biotic): يمنع تكرار ظهور الحبوب مرة أخرى وينشط ويقوي جهاز المناعة والحاجز الطبيعي للبشرة',
    'رغوة ناعمة ولطيفة تنظف بعمق بدون جفاف: تزيل الشوائب والزيوت الزائدة بلطف فائق وتناسب البشرة الحساسة المعرضة للحبوب',
    'مختبر سريرياً وجلدياً من معامل فيشي العالمية للبشرة الدهنية والمختلطة والمعرضة لحب الشباب'
  ],
  highlightsEn: [
    'Naturally Derived Salicylic Acid (BHA): Deeply penetrates to unclog pores and eliminate blackheads and whiteheads',
    'Hyaluronic Acid: Lightweight 24-hour aquatic hydration preserving skin moisture with zero tightness',
    'Zinc Gluconate (ZN-Gluconate): Regulates excess sebum secretion, minimizes shine, and neutralizes acne bacteria',
    'Pro Biotic Fractions: Fortifies cutaneous immune defense and prevents recurrent blemish breakouts',
    'Gentle Comforting Foam: Purifies pores and washes away impurities and excess oils without drying sensitive skin',
    'Dermatologically & clinically tested by Vichy Laboratoires specifically for oily and acne-prone skin'
  ],
  safetyBadgesAr: [
    'رغوة لطيفة بدون جفاف',
    'مفحوص جلدياً وسريرياً',
    'تنظيم دهون ومنع الحبوب',
    'من فيشي لابوراتوار فرنسا'
  ],
  safetyBadgesEn: [
    'Gentle Foam Zero Dryness',
    'Dermatologically Tested',
    'Sebum Control & Anti-Acne',
    'Vichy Laboratoires France'
  ],
  images: [
    {
      id: 'main',
      src: '/products/vichy-normaderm/main.jpg',
      altAr: 'عبوة غسول فيشي نورماديرم فيتوسوليوشن 200مل الأصلية للبشرة الدهنية وحب الشباب',
      altEn: 'Vichy Normaderm Phytosolution Daily Purifying Cleansing Gel 200ml Original Tube',
      captionAr: 'العبوة الأصلية بحجم 200 مل من فيشي لابوراتوار',
      captionEn: 'Original 200ml Value Packaging by Vichy Laboratoires',
      badgeAr: 'المنتج الأصلي',
      badgeEn: 'Original Product'
    },
    {
      id: 'gentle-foam',
      src: '/products/vichy-normaderm/gentle-foam.jpg',
      altAr: 'رغوة فيشي نورماديرم الناعمة: تنظف بعمق بدون جفاف ولطيفة على البشرة الحساسة',
      altEn: 'Vichy Normaderm Gentle Foaming Cleanser: Deeply cleanses without drying sensitive skin',
      captionAr: 'رغوة ناعمة تحتضن بشرتك وتزيل الشوائب والزيوت الزائدة',
      captionEn: 'Comforting gentle foam removing excess oils without dryness',
      badgeAr: 'رغوة لطيفة بدون جفاف',
      badgeEn: 'Gentle Cleansing Foam'
    }
  ],
  ingredients: [
    {
      nameAr: 'حمض الساليسيليك (Salicylic Acid)',
      nameEn: 'Salicylic Acid (BHA)',
      roleAr: 'حمض تقشير طبيعي لتنظيف المسام بعمق وإزالة الرؤوس السوداء',
      roleEn: 'Natural Exfoliating BHA & Deep Pore Cleanser',
      descriptionAr: 'حمض تقشير مستخلص من أصل طبيعي يتغلغل داخل المسام العميقة لإذابة الدهون المتراكمة والخلايا الميتة، والتخلص الجذري من الرؤوس البيضاء والسوداء ومنع انسداد المسام.',
      descriptionEn: 'Naturally derived BHA that penetrates deep into pores to dissolve trapped sebum and dead cells, clearing blackheads and whiteheads at the root.',
      icon: 'sparkles'
    },
    {
      nameAr: 'حمض الهيالورونيك (Hyaluronic Acid)',
      nameEn: 'Hyaluronic Acid',
      roleAr: 'مرطب مائي خفيف لمدة 24 ساعة بدون جفاف',
      roleEn: '24-Hour Lightweight Aquatic Hydration',
      descriptionAr: 'مرطب مائي فائق الخفة يحافظ على المحتوى المائي للبشرة لمدة 24 ساعة كاملة، ليمنحها مرونة وانتعاشاً ونعومة دون أي إحساس دهني أو لمعان أو شد.',
      descriptionEn: 'Ultra-lightweight aquatic hydrator that locks in moisture for 24 hours, keeping skin supple and fresh without feeling heavy, greasy, or tight.',
      icon: 'droplets'
    },
    {
      nameAr: 'جلوكونات الزنك (ZN-Gluconate)',
      nameEn: 'Zinc Gluconate (ZN-Gluconate)',
      roleAr: 'تنظيم الإفرازات الدهنية ومضاد للبكتيريا المسببة للحبوب',
      roleEn: 'Sebum Regulation & Anti-Bacterial Action',
      descriptionAr: 'عنصر معدني حيوي ينظم نشاط الغدد الدهنية ليحد من الإفرازات الزائدة واللمعان، ويوفر حماية فعالة ضد البكتيريا المسببة لظهور حب الشباب.',
      descriptionEn: 'Essential mineral complex that regulates sebaceous gland activity to minimize excess shine, while neutralizing acne-causing bacteria.',
      icon: 'shield'
    },
    {
      nameAr: 'البروبيوتيك (Pro Biotic)',
      nameEn: 'Pro Biotic Fractions',
      roleAr: 'يمنع تكرار ظهور الحبوب وينشط ويقوي جهاز المناعة',
      roleEn: 'Immune Barrier Defense & Relapse Prevention',
      descriptionAr: 'مستخلصات حيوية نافعة تنشط وتقوي جهاز مناعة البشرة وتعيد التوازن للميكروبيوم الوقائي، مما يمنع تكرار ظهور الحبوب ويسرع التجديد الصحي لخلايا الجلد.',
      descriptionEn: 'Bioactive probiotic fractions that stimulate and fortify the skin immune defense, rebalancing the microbiome to prevent acne recurrence.',
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
      titleAr: 'رغوة ناعمة بتنضف المسام من غير أي جفاف',
      titleEn: 'Gentle foam that cleanses without any tightness',
      commentAr: 'كنت متعودة إن أي غسول فيه ساليسيليك بينشف وشي ويخليه مشدود، لكن فيشي نورماديرم مختلف تماماً! عشان فيه هيالورونيك وترطيب 24 ساعة، رغوته ناعمة جداً وبتنضف بعمق، والرؤوس السودا اختفت تقريباً ومن غير أي قشور. منتج أصلي وممتاز من صفصافة.',
      commentEn: 'I was used to salicylic cleansers drying out my skin, but Normaderm Phytosolution is completely different! The hyaluronic acid provides 24h moisture, so the foam is soft and comforting. Pores are deeply cleaned with zero flaking. 100% genuine product.',
      verified: true,
      highlightAr: 'تنظيف عميق وترطيب 24 ساعة',
      highlightEn: 'Deep Clean & 24h Moisture'
    },
    {
      id: 'rev-2',
      author: 'د. ياسمين خالد',
      cityAr: 'الإسكندرية (سموحة)',
      cityEn: 'Alexandria',
      rating: 5,
      date: 'أكتوبر 2026',
      titleAr: 'تركيبة الزنك والبروبيوتيك فرقت جداً في منع تكرار الحبوب',
      titleEn: 'Zinc and Probiotics visibly prevented acne relapse',
      commentAr: 'أنا طبيبة صيدلانية وبشرتي مختلطة معرضة للحبوب. وجود الزنك (ZN-Gluconate) مع البروبيوتيك بيمنع تكرار الحبوب تحت الجلد بشكل ملحوظ وبيتحكم في لمعان الـ T-Zone طول اليوم. والعبوة الـ 200 مل بتقعد شهور.',
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
      commentAr: 'الرغوة بتاعته ناعمة ولطيفة جداً على البشرة الحساسة ومش بتلسع. طلبت العبوة الـ 200 مل بخصم الـ 15% من صفصافة والتوصيل كان سريع في أقل من 48 ساعة والدفع عند الاستلام. تجربة تسوق راقية جداً.',
      commentEn: 'The foam is super gentle on sensitive skin with zero stinging. Ordered the 200ml with 15% discount on Safsafah; delivery was super fast under 48 hours with cash on delivery. Highly recommended!',
      verified: true,
      highlightAr: 'لطيف على البشرة وسريع التوصيل',
      highlightEn: 'Gentle on Skin & Fast Shipping'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      questionAr: 'ما هي المكونات الفعالة الرئيسية في فيشي نورماديرم فيتوسوليوشن؟',
      questionEn: 'What are the core active ingredients in Vichy Normaderm Phytosolution?',
      answerAr: 'يرتكز الغسول على 4 مكونات فعالة أساسية: حمض الساليسيليك (Salicylic Acid) لتنظيف المسام بعمق وإزالة الرؤوس السوداء والبيضاء، حمض الهيالورونيك (Hyaluronic Acid) لترطيب مائي خفيف يدوم 24 ساعة ويحافظ على رطوبة الجلد، جلوكونات الزنك (ZN-Gluconate) لتنظيم الإفرازات الدهنية والحد من اللمعان ومكافحة البكتيريا، والبروبيوتيك (Pro Biotic) الذي يقوي مناعة البشرة ويمنع تكرار ظهور الحبوب.',
      answerEn: 'The cleanser is powered by four targeted actives: Salicylic Acid for deep pore unclogging and blackhead clearance, Hyaluronic Acid for 24-hour lightweight aquatic hydration, Zinc Gluconate for sebum regulation and anti-bacterial defense, and Probiotics to fortify skin barrier immunity and prevent breakout relapse.',
      category: 'results'
    },
    {
      id: 'faq-2',
      questionAr: 'هل يسبب الغسول أي جفاف أو تقشير أو شد في البشرة؟',
      questionEn: 'Does this cleansing gel cause peeling, tightness, or dry patches?',
      answerAr: 'لا نهائياً! تم تدعيم تركيبته بحمض الهيالورونيك لضمان ترطيب مائي يدوم 24 ساعة مع كل غسلة، بالإضافة إلى رغوة ناعمة ولطيفة تزيل الشوائب والزيوت الزائدة دون الإخلال بالمحتوى المائي الطبيعي للبشرة، مما يترك البشرة مرنة ومنتعشة بدون أي إحساس بالشد.',
      answerEn: 'No! Infused with Hyaluronic Acid for 24-hour hydration, it produces a gentle comforting foam that effectively lifts away impurities and excess sebum without stripping the skin natural water content, ensuring fresh skin with zero tightness.',
      category: 'safety'
    },
    {
      id: 'faq-3',
      questionAr: 'ما هي الطريقة الصحيحة للاستخدام لتحقيق أفضل نتيجة؟',
      questionEn: 'What is the recommended application routine for optimal results?',
      answerAr: 'يُستخدم مرتين يومياً (صباحاً ومساءً). بللي وجهك بالماء الفاتر، ثم ضعي كمية مناسبة على راحة يدك ودلكي بها الوجه حتى تتكون رغوة ناعمة تحتضن بشرتك لمدة 60 ثانية مع التركيز على الجبهة والأنف والذقن ومناطق الحبوب، ثم اشطفي جيداً وجففي برفق.',
      answerEn: 'Use twice daily (morning and evening). Wet face with lukewarm water, lather in palms to create a comforting foam, massage gently in circular motions for 60 seconds focusing on the T-zone and blemishes. Rinse thoroughly and pat dry.',
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
