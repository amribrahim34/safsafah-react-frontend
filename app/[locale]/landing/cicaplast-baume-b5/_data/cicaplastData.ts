import type { CicaplastProductData } from '../_types';

/**
 * La Roche-Posay Cicaplast Baume B5+ Ultra-Repairing Soothing Balm
 * Original Price: 1400 EGP
 * Discount: 15% -> Price: 1190 EGP (1400 - 210 = 1190 EGP)
 * Size: 100ml / 100 مل
 */
export const CICAPLAST_DATA: CicaplastProductData = {
  id: 935,
  slug: 'la-roche-posay-cicaplast-baume-b5-plus-ultra-repairing-soothing-balm-100ml',
  nameAr: 'لاروش بوزيه سيكابلاست بوم +B5 بلسم ملطف ومرطب فائق الترميم، كريم متعدد الاستخدامات لإصلاح البشرة الجافة والمتهيجة، عناية للوجه والجسم والشفاه',
  nameEn: 'La Roche-Posay Cicaplast Baume B5+ Ultra-Repairing Soothing Multi-Purpose Balm for Face, Body & Lips',
  taglineAr: 'البلسم العلاجي الأول عالمياً لإصلاح وترميم حاجز البشرة المتضرر، ملطف فوري للتهيج والجفاف والتشققات ومناسب لجميع أفراد الأسرة من الرضع حتى البالغين',
  taglineEn: 'The #1 dermatological multi-purpose repairing balm with Madecassoside, 5% Panthenol & Tribioma to restore and soothe compromised, irritated skin',
  size: '100 مل / 100ml',
  price: 1190,
  originalPrice: 1400,
  discountPercentage: 15,
  rating: 4.9,
  ratingCount: 342,
  inStock: true,
  stockCount: 16,
  highlightsAr: [
    'ترميم وتسريع التئام حاجز البشرة خلال ساعات بفضل مركب تريبيوما (Tribioma) وماديكاسوسايد النقي',
    'تركيز 5٪ من البانثينول (فيتامين B5) لتسكين وتلطيف فوري ومكثف للتهيج والحرقان والجفاف الشديد',
    'بلسم متعدد الاستخدامات 14 في 1 للوجه والجسم والشفاه، والتشققات ولدغات الحشرات وحروق الليزر والشمس',
    'مزيج معدني منقى من الزنك والمنجنيز والنحاس لتوفير بيئة مضادة للبكتيريا وحماية الجروح السطحية',
    'مناسب لجميع أفراد الأسرة بدءاً من الرضع (3 أشهر فما فوق) والأطفال حتى البالغين وكبار السن',
    'خالٍ تماماً من العطور والبارابين ومضاد للحساسية ولا يسد المسام (Non-Comedogenic)'
  ],
  highlightsEn: [
    'Accelerated skin barrier repair powered by Madecassoside and exclusive patented Tribioma prebiotic complex',
    'High-potency 5% Panthenol (Vitamin B5) for immediate, intensive soothing of irritation, burning and severe dryness',
    'Versatile 14-in-1 multi-purpose balm for face, body, lips, rough patches, sunburns, insect bites & post-procedure care',
    'Purifying mineral complex of Zinc, Manganese and Copper provides an anti-bacterial environment for optimal recovery',
    'Tested and safe for the entire family: infants from 3 months, toddlers, children, adults and sensitive seniors',
    '100% Fragrance-free, paraben-free, hypoallergenic, and non-comedogenic for supreme dermatological safety'
  ],
  safetyBadgesAr: [
    'مفحوص من أطباء الجلدية والعيون',
    'آمن للرضع والأطفال والبالغين',
    'خالٍ من العطور والبارابين',
    'أصلي 100٪ من لاروش بوزيه فرنسا'
  ],
  safetyBadgesEn: [
    'Dermatologist & Pediatric Tested',
    'Safe for Babies, Kids & Adults',
    'Fragrance-Free & Hypoallergenic',
    '100% Genuine La Roche-Posay France'
  ],
  images: [
    {
      id: 'main',
      src: '/products/cicaplast-b5/main.jpg',
      altAr: 'عبوة بلسم لاروش بوزيه سيكابلاست بوم +B5 بحجم 100 مل الأصلية',
      altEn: 'La Roche-Posay Cicaplast Baume B5+ 100ml Original Tube',
      captionAr: 'العبوة الأصلية الفاخرة بحجم 100 مل الأكثر توفيراً',
      captionEn: 'Original 100ml Value Size Packaging',
      badgeAr: 'المنتج الأصلي',
      badgeEn: 'Original Product'
    },
    {
      id: 'formula',
      src: '/products/cicaplast-b5/formula.jpg',
      altAr: 'تركيبة سيكابلاست بوم +B5: تريبيوما، 5% بانثينول، ماديكاسوسايد',
      altEn: 'Cicaplast Baume B5+ Active Formula: Tribioma, 5% Panthenol, Madecassoside',
      captionAr: 'تركيبة متطورة بالبريبيوتيك والبانثينول 5% لترميم فائق',
      captionEn: 'Advanced Tribioma & 5% Panthenol Barrier Restoring Formula',
      badgeAr: 'تركيبة ترميم فائقة',
      badgeEn: 'Ultra-Repairing'
    },
    {
      id: 'texture',
      src: '/products/cicaplast-b5/texture.jpg',
      altAr: 'قوام بلسم سيكابلاست بوم +B5 الغني والمغذي غير اللزج',
      altEn: 'Rich, non-greasy nourishing balm texture of Cicaplast B5+',
      captionAr: 'قوام بلسمي غني يحمي البشرة كدرع وقائي دون لزوجة',
      captionEn: 'Comforting balm creating an invisible protective shield',
      badgeAr: 'ملمس بلسمي غني',
      badgeEn: 'Comforting Balm'
    }
  ],
  ingredients: [
    {
      nameAr: 'ماديكاسوسايد (Madecassoside)',
      nameEn: 'Madecassoside (Centella Asiatica)',
      roleAr: 'تسريع التئام وترميم الأنسجة',
      roleEn: 'Cellular Tissue Repair & Healing',
      descriptionAr: 'مستخلص نقي ونادر من عشبة السنتيللا أسياتيكا (عشبة النمر) يعمل كمحفز بيولوجي لتسريع تجدد خلايا البشرة والتئام التشققات والجروح السطحية والآثار الناتجة عن الجفاف أو التقشير.',
      descriptionEn: 'Pure therapeutic extract from Centella Asiatica that accelerates epidermal regeneration, restoring micro-cracks and post-procedure sensitivity.',
      icon: 'sparkles'
    },
    {
      nameAr: 'بانثينول 5٪ - فيتامين B5 (Panthenol)',
      nameEn: '5% Panthenol (Pro-Vitamin B5)',
      roleAr: 'تسكين وتلطيف فوري ومكثف',
      roleEn: 'Instant Calming & Anti-Inflammatory',
      descriptionAr: 'تركيز طبي عالٍ يبلغ 5٪ معروف بخصائصه المهدئة الفورية، يقضي على الإحساس بالحرقان والوخز والاحمرار ويغذي البشرة بالترطيب العميق لحمايتها من التلف.',
      descriptionEn: 'Dermatological 5% concentration renowned for instant soothing, eliminating burning, stinging, itching, and dryness discomfort.',
      icon: 'shield'
    },
    {
      nameAr: 'مركب تريبيوما الحصري (Tribioma™)',
      nameEn: 'Tribioma™ Prebiotic Complex',
      roleAr: 'إعادة توازن ميكروبيوم البشرة',
      roleEn: 'Microbiome Balance & Defense',
      descriptionAr: 'مركب بريبيوتيك مبتكر وحاصل على براءة اختراع من معامل لاروش بوزيه، يغذي البكتيريا النافعة على سطح الجلد لتعزيز سرعة وجودة ترميم الحاجز المناعي الواقي.',
      descriptionEn: 'Patented prebiotic innovation that feeds beneficial skin microbiota, creating the optimal biological ecosystem for superior barrier repair.',
      icon: 'leaf'
    },
    {
      nameAr: 'مركب المعادن المنقية (الزنك + النحاس + المنجنيز)',
      nameEn: 'Purifying Zinc, Copper & Manganese Complex',
      roleAr: 'حماية مضادة للبكتيريا ومطهرة',
      roleEn: 'Anti-Bacterial & Environmental Shield',
      descriptionAr: 'ثلاثي معدني نشط بيولوجياً يوفر درعاً واقياً ينقي سطح الجلد ويمنع تكاثر البكتيريا الضارة في المناطق المتهيجة والمتشققة لضمان تعافٍ صحي وسريع.',
      descriptionEn: 'Synergistic mineral trio that cleanses compromised skin, inhibiting microbial colonization to support clean, safe healing.',
      icon: 'droplets'
    }
  ],
  applicationAreas: [
    {
      id: 'face',
      titleAr: 'عناية الوجه والرقبة',
      titleEn: 'Face & Neck Care',
      descAr: 'ترميم حاجز البشرة المتضرر، تهدئة جفاف الشتاء القاسي، بعد جلسات التقشير الكيميائي أو الليزر، وتسكين احمرار حب الشباب.',
      descEn: 'Compromised skin barrier restoration, post-retinol or peel recovery, winter dryness, and acute facial redness.',
      badgeAr: 'للوجه',
      badgeEn: 'Face'
    },
    {
      id: 'lips',
      titleAr: 'علاج تشقق الشفاه وزوايا الفم',
      titleEn: 'Chapped Lips & Lip Contours',
      descAr: 'بلسم مركز لترطيب وتنعيم الشفاه شديدة الجفاف والمتقشرة، وعلاج التشققات المؤلمة في محيط الفم وزواياه.',
      descEn: 'Deep soothing and sealing for severely chapped, peeling lips and painful cracking at the corners of the mouth.',
      badgeAr: 'للشفاه',
      badgeEn: 'Lips'
    },
    {
      id: 'body',
      titleAr: 'الجسم واليدين والأكواع والركب',
      titleEn: 'Body, Hands, Elbows & Knees',
      descAr: 'ترطيب التشققات الجافة في الكعبين واليدين والأكواع، تسكين حروق الشمس السطحية، وتهدئة آثار لدغات الحشرات وإزالة الشعر.',
      descEn: 'Healing cracked heels, rough elbows, hand irritation from frequent washing, sunburns, and waxing redness.',
      badgeAr: 'للجسم',
      badgeEn: 'Body'
    },
    {
      id: 'babies',
      titleAr: 'عناية الرضع والأطفال (من عمر 3 أشهر)',
      titleEn: 'Infants & Toddlers (From 3 Months)',
      descAr: 'علاج فعال وسريع لالتهابات منطقة الحفاض، تهدئة الجفاف والاحمرار حول الفم الناتج عن التسنين وسيلان اللعاب.',
      descEn: 'Proven relief for diaper rash, teething irritation around the mouth, and rough baby skin patches.',
      badgeAr: 'للرضع',
      badgeEn: 'Pediatric'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'ميادة سامي',
      cityAr: 'القاهرة (الشيخ زايد)',
      cityEn: 'Cairo',
      rating: 5,
      date: 'نوفمبر 2026',
      titleAr: 'المنقذ الأول لحاجز بشرتي بعد الريتينول والليزر',
      titleEn: 'Lifesaver for my skin barrier after retinol and laser',
      commentAr: 'كنت بستخدم ريتينول وبشرتي اتحرقت واتقشرت وكانت بتلسع من مجرد المية. سيكابلاست +B5 كان الحل السحري! من أول دهان حسيت بارتياح فوري، وخلال 48 ساعة احمرار وشي قل جداً وحاجز البشرة رجع أحسن من الأول. حجم الـ 100 مل ممتاز وبيقعد شهور. شكراً صفصافة على المنتج الأصلي والتوصيل السريع.',
      commentEn: 'My skin barrier was completely damaged and burning after introducing a strong retinol. Cicaplast B5+ was pure magic. Immediate relief from the first swipe, and within 48 hours redness was gone and my skin felt calm and resilient. The 100ml size is super economical. Thank you Safsafah!',
      verified: true,
      highlightAr: 'ترميم فوري خلال 48 ساعة',
      highlightEn: 'Instant Relief within 48h'
    },
    {
      id: 'rev-2',
      author: 'د. آية ممدوح',
      cityAr: 'الإسكندرية (لوران)',
      cityEn: 'Alexandria',
      rating: 5,
      date: 'أكتوبر 2026',
      titleAr: 'كريم أساسي في بيتي لكل العائلة ولابني الرضيع',
      titleEn: 'Essential staple for my whole family and baby',
      commentAr: 'أنا طبيبة صيدلانية وبنصح بيه كل مريض بيعاني من جفاف أو إكزيما أو تشققات. استخدمته لابني في التهاب الحفاض واختفى في يومين بس! وكمان بستخدمه على شفايفي وجلدي الجاف في الشتاء. وجود التريبيوما مع البانثينول 5% مخليه متفوق على أي كريم مرطب تاني.',
      commentEn: 'As a clinical pharmacist, I recommend this to everyone dealing with eczema, rough patches or post-procedure redness. Used it for my baby diaper rash and it cleared in two days! The combination of Tribioma and 5% Panthenol makes it unmatched.',
      verified: true,
      highlightAr: 'آمن للرضع والبالغين',
      highlightEn: 'Safe for Babies & Adults'
    },
    {
      id: 'rev-3',
      author: 'ريهام الجمال',
      cityAr: 'المنصورة',
      cityEn: 'Mansoura',
      rating: 5,
      date: 'نوفمبر 2026',
      titleAr: 'سعر رائع وخصم 15% حقيقي على عبوة الـ 100 مل',
      titleEn: 'Great price & genuine 15% discount on the 100ml',
      commentAr: 'كنت بدور على عبوة الـ 100 مل لأنها أوفر بكتير من الحجم الصغير، ولقيتها في صفصافة بسعر 1190 جنيه بعد الخصم. المنتج فرنسي أصلي بالكود والباركود وتاريخ صلاحية حديث، والتغليف كان ممتاز والدفع عند الاستلام. تجربة ممتازة.',
      commentEn: 'I was specifically looking for the 100ml tube as it is much more economical than the 40ml. Found it on Safsafah for 1190 EGP with the 15% discount. 100% original French product with fresh batch code and fast COD delivery.',
      verified: true,
      highlightAr: 'حجم توفيري وضمان الأصالة',
      highlightEn: '100ml Value & Authenticity'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      questionAr: 'ما الفرق بين سيكابلاست بوم B5 العادي ونسخة +B5 المطورة؟',
      questionEn: 'What is the difference between Cicaplast B5 and the upgraded B5+ version?',
      answerAr: 'تحتوي النسخة المطورة (+B5) على مركب تريبيوما (Tribioma) الحصري الحاصل على براءة اختراع، والذي يعمل على إعادة التوازن البيولوجي للبكتيريا النافعة (الميكروبيوم) على سطح الجلد، مما يسرع عملية الترميم بنسبة أكبر ويمنع تكاثر البكتيريا الضارة ويوفر حماية أقوى وأكثر استدامة من النسخة السابقة.',
      answerEn: 'Cicaplast Baume B5+ introduces the patented prebiotic Tribioma complex which rebalances the cutaneous microbiome. This significantly accelerates healing, enhances skin defense against opportunistic bacteria, and speeds up barrier restoration compared to the original formula.',
      category: 'results'
    },
    {
      id: 'faq-2',
      questionAr: 'هل سيكابلاست بوم +B5 مناسب للبشرة المعرضة لحب الشباب أو البشرة الدهنية؟',
      questionEn: 'Is Cicaplast Baume B5+ suitable for oily or acne-prone skin?',
      answerAr: 'نعم، تركيبته خالية تماماً من العطور ومختبرة لتكون غير مسببة لانسداد المسام (Non-Comedogenic). للبشرة الدهنية، يُفضل استخدامه كعلاج موضعي أو كطبقة رقيقة ليلاً على المناطق المتهيجة والجافة المتضررة من علاجات الحبوب، أو بعد جلسات التقشير والليزر.',
      answerEn: 'Yes, it is non-comedogenic and fragrance-free. For oily and acne-prone skin, it works best applied as a targeted spot treatment on compromised areas, over post-acne flaking, or as a soothing thin layer during the night to repair irritation from harsh acne treatments.',
      category: 'safety'
    },
    {
      id: 'faq-3',
      questionAr: 'ما هي الطريقة الصحيحة لاستخدام البلسم؟',
      questionEn: 'What is the recommended application routine?',
      answerAr: 'يُوضع مرتين يومياً على بشرة نظيفة وجافة (الوجه، الجسم، الشفاه، أو أي منطقة متهيجة). يمكن وضعه بطبقة سخية على المناطق شديدة التضرر لتشكيل درع واقٍ، أو تدليكه برفق حتى يتشرب تماماً. تجنبي ملامسة محيط العينين مباشرة.',
      answerEn: 'Apply twice daily to clean, dry skin (face, body, lips, or compromised areas). You can apply a generous layer over severely irritated patches to create a protective soothing seal, or gently massage a smaller amount until absorbed. Avoid direct contact with eyes.',
      category: 'usage'
    },
    {
      id: 'faq-4',
      questionAr: 'هل هو آمن للأطفال والرضع؟',
      questionEn: 'Is it completely safe for babies and infants?',
      answerAr: 'نعم! تم اختباره سريرياً تحت إشراف أطباء الأطفال وهو آمن تماماً للاستخدام اليومي على بشرة الرضع بدءاً من عمر 3 أشهر، وهو مثالي لعلاج التهابات منطقة الحفاض، واحمرار ثنايا الجلد، وجفاف الخدود الناتج عن التسنين والبرد.',
      answerEn: 'Yes! It is clinically tested under pediatric supervision and safe for babies from 3 months old. It is widely acclaimed for treating diaper rash, skin folds irritation, and teething cheek redness.',
      category: 'safety'
    },
    {
      id: 'faq-5',
      questionAr: 'كيف يتم الشحن والتوصيل وهل الدفع عند الاستلام متاح؟',
      questionEn: 'How does shipping work and is Cash on Delivery available?',
      answerAr: 'نوفر خدمة التوصيل السريع لجميع محافظات مصر خلال 48 إلى 72 ساعة، مع توفر خيار الدفع عند الاستلام (COD) وحق معاينة المنتج للتأكد من أصالته الفرنسية قبل الدفع.',
      answerEn: 'We provide express shipping across all Egyptian governorates within 48 to 72 hours, with Cash on Delivery (COD) and right to inspect the product upon delivery with 100% authenticity guarantee.',
      category: 'shipping'
    }
  ]
};
