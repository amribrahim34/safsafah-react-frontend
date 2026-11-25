import type { BojAquaFreshProductData } from '../_types';

/**
 * Beauty of Joseon Relief Sun Aqua-fresh: Rice + B5 SPF50+ PA++++ – 50ml
 * Backend Product ID: 649
 * Original Price: 1020 EGP
 * Discount: 10% (102 EGP) -> Final Price: 918 EGP
 * Size: 50ml / 50 مل
 */
export const BOJ_AQUA_FRESH_DATA: BojAquaFreshProductData = {
  id: 649,
  slug: 'beauty-of-joseon-relief-sun-aqua-fresh-rice-b5-spf50-pa-50ml',
  nameAr: 'بيوتي أوف جوسون ريليف صن أكوا فريش واقي شمس بالأرز وفيتامين B5 – SPF50+ PA++++ – 50 مل',
  nameEn: 'Beauty of Joseon Relief Sun Aqua-fresh: Rice + B5 SPF50+ PA++++ – 50ml',
  taglineAr:
    'واقي الشمس الكوري الأخف على الإطلاق بتركيبة مائية منعشة 30٪ ماء بذور الأرز وفيتامين B5 — حماية قصوى SPF50+ PA++++ بدون أي طبقة بيضاء أو ملمس دهني في حر مصر.',
  taglineEn:
    'The ultra-lightweight Korean watery sunscreen infused with 30% Rice Seed Water & Panthenol (Vitamin B5) — maximum SPF50+ PA++++ protection with zero white cast and zero grease.',
  size: '50 مل / 50ml',
  price: 918,
  originalPrice: 1020,
  discountPercentage: 10,
  rating: 4.9,
  ratingCount: 284,
  inStock: true,
  stockCount: 14,
  highlightsAr: [
    'حماية فائقة واسعة النطاق SPF50+ PA++++ ضد أشعة UVA وUVB المسببة للتصبغات والشيخوخة المبكرة',
    'قوام أكوا مائي فائق الخفة يمتص خلال ثوانٍ دون أي ملمس دهني أو لمعان أو سد للمسام (مثالي للبشرة الدهنية والمختلطة)',
    'خالٍ تماماً من الأثر الأبيض (Zero White Cast) — يندمج بسلاسة مع جميع ألوان البشرة وتحت المكياج بدون تكتل',
    'غني بنسبة 30٪ من ماء بذور الأرز (Rice Seed Water) وفيتامين B5 (البانثينول) لتهدئة الاحمرار وترطيب البشرة وتقوية الحاجز الواقي',
    'مناسب لأجواء مصر الحارة والرطوبة العالية — لا يسبب تعرقاً أو ثقلًا على الوجه طوال اليوم',
    'أصلي 100٪ ومختبر سريرياً في كوريا الجنوبية — خالٍ من العطور والبارابين والزيوت الثقيلة',
  ],
  highlightsEn: [
    'Clinical broad-spectrum SPF50+ PA++++ defense shielding against UVA aging rays and UVB burning rays',
    'Featherlight aqua-gel lotion texture absorbs in seconds with zero greasiness, zero stickiness, and zero clogged pores',
    '100% Zero White Cast — dries completely invisible on all skin tones and layers effortlessly under makeup without pilling',
    'Infused with 30% Rice Seed Water & Panthenol (Vitamin B5) to hydrate, calm sun-induced redness, and fortify the skin barrier',
    'Engineered for hot, humid climates — breathable, sweat-friendly finish ideal for oily, combination, and acne-prone skin',
    '100% Authentic Korean K-Beauty formula, fragrance-free, paraben-free, and dermatologically tested for sensitive skin',
  ],
  safetyBadgesAr: [
    'أصلي 100٪ من كوريا الجنوبية',
    'بدون أثر أبيض نهائياً',
    'مناسب للبشرة الدهنية والمختلطة',
    'خالٍ من العطور والبارابين',
  ],
  safetyBadgesEn: [
    '100% Authentic K-Beauty',
    'Zero White Cast',
    'Oily & Acne-Prone Friendly',
    'Fragrance-Free & Vegan',
  ],
  images: [
    {
      id: 'main',
      src: '/products/boj-aqua-fresh/main.jpg',
      altAr: 'واقي شمس بيوتي أوف جوسون ريليف صن أكوا فريش بالأرز وفيتامين B5 الأصلي 50 مل',
      altEn: 'Beauty of Joseon Relief Sun Aqua-fresh Rice + B5 SPF50+ PA++++ 50ml',
      captionAr: 'العبوة الأصلية 50 مل بقوام مائي خفيف وامتصاص فوري',
      captionEn: 'Original 50ml Tube — Ultra-Light Watery Lotion Texture',
      badgeAr: 'الأكثر طلباً في مصر',
      badgeEn: 'Egypt Bestseller',
    },
    {
      id: 'formula',
      src: '/products/boj-aqua-fresh/formula.jpg',
      altAr: 'تركيبة بيوتي أوف جوسون أكوا فريش بـ 30٪ ماء بذور الأرز وفيتامين B5',
      altEn: 'Beauty of Joseon Aqua-fresh Formula with 30% Rice Seed Water & Vitamin B5',
      captionAr: 'غني بـ 30٪ ماء بذور الأرز وفيتامين B5 المهدئ للبشرة',
      captionEn: 'Infused with 30% Rice Seed Water & Soothing Panthenol B5',
      badgeAr: 'أرز + فيتامين B5',
      badgeEn: 'Rice + B5 Formula',
    },
    {
      id: 'texture',
      src: '/products/boj-aqua-fresh/texture.jpg',
      altAr: 'قوام أكوا مائي خفيف لواقي شمس بيوتي أوف جوسون بدون أي أثر أبيض',
      altEn: 'Featherlight Watery Aqua-Lotion Texture with Zero White Cast',
      captionAr: 'قوام مائي شفاف يمتص في ثوانٍ بدون أثر أبيض أو لمعان دهني',
      captionEn: 'Sheer Watery Lotion — Absorbs in Seconds with Zero White Cast',
      badgeAr: 'بدون أثر أبيض',
      badgeEn: 'Zero White Cast',
    },
  ],
  ingredients: [
    {
      nameAr: 'ماء بذور الأرز بنسبة 30٪ (Rice Seed Water)',
      nameEn: '30% Rice Seed Water (Oryza Sativa)',
      roleAr: 'ترطيب وإشراقة نقية وتوحيد اللون',
      roleEn: 'Hydration, Radiance & Tone Clarity',
      descriptionAr:
        'مكون تراثي كوري غني بالأحماض الأمينية والمعادن وفيتامين E؛ يمد البشرة بترطيب مائي عميق ويمنحها نضارة صافية وإشراقة صحية دون أي ثقل أو دهون.',
      descriptionEn:
        'Traditional Korean skincare staple packed with amino acids, minerals, and antioxidants that deeply hydrate and brighten dull, sun-exposed skin.',
      icon: 'droplets',
    },
    {
      nameAr: 'بانثينول — فيتامين B5 (Panthenol)',
      nameEn: 'Panthenol (Pro-Vitamin B5)',
      roleAr: 'تهدئة فورية ودعم حاجز البشرة',
      roleEn: 'Instant Soothing & Barrier Defense',
      descriptionAr:
        'يجذب الرطوبة ويحبسها داخل الجلد، ويهدئ الاحمرار والتهيج الناتج عن الحرارة وأشعة الشمس، مع تقوية الحاجز الواقي للبشرة الحساسة والمعرضة للحبوب.',
      descriptionEn:
        'Powerful humectant and calming agent that locks in moisture, soothes heat-induced redness, and strengthens the skin barrier.',
      icon: 'shield',
    },
    {
      nameAr: 'فلاتر حماية كيميائية متطورة (SPF50+ PA++++ )',
      nameEn: 'Next-Gen Korean UV Filters (SPF50+ PA++++)',
      roleAr: 'حماية قصوى ضد UVA وUVB',
      roleEn: 'Broad-Spectrum Photoaging Protection',
      descriptionAr:
        'فلاتر شمسية حديثة توفر أعلى تصنيف حماية كوري ضد التصبغات والبقع الداكنة وحروق الشمس دون ترك أي لون أبيض أو ملمس ثقيل.',
      descriptionEn:
        'Modern photostable UV filters delivering maximum PA++++ UVA and SPF50+ UVB protection without chalkiness or eye stinging.',
      icon: 'sun',
    },
    {
      nameAr: 'مستخلص الشوفان والحبوب المخمرة',
      nameEn: 'Oat & Fermented Grain Extracts',
      roleAr: 'توازن الدهون وتهدئة البشرة الحساسة',
      roleEn: 'Sebum Balance & Sensitive Skin Calm',
      descriptionAr:
        'مستخلصات نباتية لطيفة تساعد على تهدئة البشرة الملتهبة وتقليل اللمعان الزائد في منطقة T-Zone، لتبقى البشرة منتعشة ومطفية بنعومة طوال اليوم.',
      descriptionEn:
        'Gentle botanical extracts that calm sensitivity and balance excess sebum, leaving a fresh, breathable natural-satin finish.',
      icon: 'sparkles',
    },
  ],
  useCases: [
    {
      id: 'oily',
      titleAr: 'البشرة الدهنية والمعرضة للحبوب',
      titleEn: 'Oily & Acne-Prone Skin',
      descAr:
        'قوام مائي خالٍ من الزيوت الثقيلة لا يسد المسام ولا يسبب ظهور الحبوب أو اللمعان المزعج، على عكس واقيات الشمس التقليدية.',
      descEn:
        'Watery, non-comedogenic formula absorbs cleanly without triggering breakouts, congestion, or midday grease.',
      badgeAr: 'الأكثر ملاءمة',
      badgeEn: 'Top Pick',
    },
    {
      id: 'humid',
      titleAr: 'الحر والرطوبة العالية والخروج اليومي',
      titleEn: 'Hot & Humid Egyptian Weather',
      descAr:
        'مصمم خصيصاً ليعطي إحساساً بالانتعاش والبرودة عند التطبيق، ولا يسيح أو يترك خطوطاً بيضاء مع التعرق في الصيف.',
      descEn:
        'Delivers an instant cooling aqua burst that stays breathable and sweat-friendly throughout hot sunny days.',
      badgeAr: 'مناسب للصيف',
      badgeEn: 'Summer Ready',
    },
    {
      id: 'makeup',
      titleAr: 'تحت المكياج والفاونديشن',
      titleEn: 'Seamless Primer Under Makeup',
      descAr:
        'يعمل كمرطب تمهيدي سريع الامتصاص يمنع تكتل الكونسيلر والفاونديشن ويحافظ على ثبات المكياج لساعات طويلة.',
      descEn:
        'Doubles as a hydrating primer that prevents foundation pilling or caking for a smooth, long-wearing finish.',
      badgeAr: 'بدون تكتل',
      badgeEn: 'Zero Pilling',
    },
    {
      id: 'sensitive',
      titleAr: 'البشرة الحساسة والمختلطة',
      titleEn: 'Sensitive & Combination Skin',
      descAr:
        'خالٍ من العطور والكحول القاسي، وغني بفيتامين B5 والأرز لتهدئة الاحمرار والحفاظ على توازن المناطق الجافة والدهنية معاً.',
      descEn:
        'Fragrance-free and enriched with Panthenol B5 to calm redness while balancing both dry cheeks and oily T-zones.',
      badgeAr: 'لطيف وآمن',
      badgeEn: 'Gentle Care',
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'ندى محمود',
      cityAr: 'القاهرة — مدينة نصر',
      cityEn: 'Cairo — Nasr City',
      rating: 5,
      date: '2026-09-18',
      titleAr: 'أخف صن بلوك جربته لبشرتي الدهنية!',
      titleEn: 'Lightest sunscreen I have ever tried for oily skin!',
      commentAr:
        'كنت بعاني مع النسخة القديمة إنه بيدي لمعة بسيطة في الصيف، لكن أكوا فريش ده وهمي! بيمتص في ثانية، مفيش أي أثر أبيض ولا حبوب، والمنتج وصلني من صفصافة أصلي بالباركود في يومين.',
      commentEn:
        'The Aqua-fresh version is a game changer for my oily skin! Absorbs in seconds with zero white cast and zero breakouts. Arrived authentic from Safsafah in 2 days.',
      verified: true,
      highlightAr: 'بشرة دهنية · امتصاص فوري',
      highlightEn: 'Oily Skin · Instant Absorption',
    },
    {
      id: 'rev-2',
      author: 'مريم طارق',
      cityAr: 'الإسكندرية — سموحة',
      cityEn: 'Alexandria — Smouha',
      rating: 5,
      date: '2026-10-04',
      titleAr: 'ممتاز تحت الميك اب ومش بيحرق العين',
      titleEn: 'Amazing under makeup and zero eye stinging',
      commentAr:
        'أحلى حاجة فيه إنه خفيف جداً ومش بيكلكع تحت الفاونديشن خالص، وكمان مش بيحرق العين مع الحر والرطوبة في إسكندرية. التغليف كان ممتاز والدفع عند الاستلام مريح جداً.',
      commentEn:
        'Layers so smoothly under foundation with zero pilling and never stings my eyes even in humid Alexandria weather. Fast COD delivery!',
      verified: true,
      highlightAr: 'تحت المكياج · بدون حرقان',
      highlightEn: 'Under Makeup · No Eye Sting',
    },
    {
      id: 'rev-3',
      author: 'سلمى عادل',
      cityAr: 'الجيزة — الشيخ زايد',
      cityEn: 'Giza — Sheikh Zayed',
      rating: 5,
      date: '2026-11-02',
      titleAr: 'ترطيب وانتعاش وحماية حقيقية',
      titleEn: 'Refreshing hydration & real sun protection',
      commentAr:
        'بشرتي مختلطة وحساسة وده الوحيد اللي ريحني. فيتامين B5 بيهدي الاحمرار ومش محتاجة أحط مرطب قبله الصبح. طلبت عبوتين عشان العرض.',
      commentEn:
        'My combination sensitive skin loves this. Vitamin B5 calms redness and I can skip morning moisturizer. Ordered the 2-pack bundle!',
      verified: true,
      highlightAr: 'بشرة مختلطة وحساسة',
      highlightEn: 'Combination & Sensitive',
    },
  ],
  faqs: [
    {
      id: 'faq-diff',
      questionAr: 'ما الفرق بين بيوتي أوف جوسون أكوا فريش (الأزرق) والنسخة الأصلية (البيج)؟',
      questionEn: 'What is the difference between BOJ Relief Sun Aqua-fresh (Blue) and the original (Cream)?',
      answerAr:
        'النسخة الأصلية (البيج) غنية بالبروبيوتيك وقوامها كريمي مرطب يناسب أكثر البشرة الجافة والعادية. أما نسخة أكوا فريش (الأزرق) فتحتوي على 30٪ ماء بذور الأرز وفيتامين B5 بقوام مائي فائق الخفة بدون لمعة، لذا هي الخيار المثالي للبشرة الدهنية والمختلطة والمعرضة للحبوب وفي الأجواء الحارة.',
      answerEn:
        'The original Relief Sun (cream tube) has a richer, dewy cream texture best for dry to normal skin. Relief Sun Aqua-fresh (blue-gradient tube) replaces heavy emollients with 30% Rice Seed Water & Panthenol B5 in a featherlight watery lotion with a fresh, non-greasy finish—ideal for oily, combination, acne-prone skin and hot weather.',
      category: 'results',
    },
    {
      id: 'faq-whitecast',
      questionAr: 'هل يترك واقي شمس أكوا فريش أثراً أبيض أو لمعاناً دهنياً على الوجه؟',
      questionEn: 'Does Relief Sun Aqua-fresh leave a white cast or greasy shine?',
      answerAr:
        'لا نهائياً. بفضل فلاتر الحماية الكيميائية الحديثة وقوامه المائي، يمتص تماماً خلال ثوانٍ ليترك البشرة شفافة وطبيعية بدون أي طبقة بيضاء أو ملمس لزج، حتى مع البشرة السمراء أو عند وضع كمية الإصبعين الكاملة.',
      answerEn:
        'No! Its modern chemical UV filters and watery emulsion absorb completely in seconds with zero white cast and zero sticky residue, even when applying the full two-finger amount on deeper skin tones.',
      category: 'results',
    },
    {
      id: 'faq-acne',
      questionAr: 'هل يناسب البشرة الدهنية والمعرضة للحبوب أو البشرة الحساسة؟',
      questionEn: 'Is it safe for oily, acne-prone, and sensitive skin?',
      answerAr:
        'نعم، تم تطويره خصيصاً للبشرة الدهنية والمختلطة والحساسة؛ فهو خالٍ من العطور والبارابين والزيوت الثقيلة السادة للمسام (Non-Comedogenic)، كما يحتوي على فيتامين B5 المهدئ للالتهابات والاحمرار.',
      answerEn:
        'Yes! It is fragrance-free, non-comedogenic, and formulated with soothing Panthenol (Vitamin B5) and Rice Seed Water to calm irritation without clogging pores or triggering breakouts.',
      category: 'safety',
    },
    {
      id: 'faq-usage',
      questionAr: 'ما هي الطريقة الصحيحة لاستخدامه وتجديده؟',
      questionEn: 'How should I apply and reapply it for maximum SPF50+ protection?',
      answerAr:
        'ضعي كمية كافية (مقدار إصبعين) على الوجه والرقبة كآخر خطوة في روتين العناية الصباحي قبل التعرض للشمس بـ 15 دقيقة. يُنصح بتجديده كل ساعتين إلى 3 ساعات عند التعرض المباشر للشمس أو بعد السباحة أو التعرق.',
      answerEn:
        'Apply a generous two-finger amount evenly over face and neck as the final step of your morning skincare routine, 15 minutes before sun exposure. Reapply every 2–3 hours during direct sun exposure.',
      category: 'usage',
    },
    {
      id: 'faq-authentic',
      questionAr: 'هل المنتج أصلي 100٪ في صفصافة؟ وكيف يتم الشحن والدفع؟',
      questionEn: 'Is the product 100% authentic at Safsafah? How do shipping & COD work?',
      answerAr:
        'نعم، جميع منتجات بيوتي أوف جوسون في صفصافة أصلية 100٪ ومستوردة من مصادرها المعتمدة مع ضمان المعاينة عند الاستلام. التوصيل متاح لجميع محافظات مصر خلال 72 ساعة مع إمكانية الدفع كاش عند الاستلام.',
      answerEn:
        'Yes, Safsafah guarantees 100% authentic Korean products with inspect-before-paying assurance. We deliver across all Egyptian governorates within 72 hours with Cash on Delivery.',
      category: 'shipping',
    },
  ],
};
