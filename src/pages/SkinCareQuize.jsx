// src/pages/quiz/QuizPage.jsx
import  { useMemo, useState } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { IMG } from "../content/images";
import { useDir } from "../hooks/useDir";

// Reuse site chrome
import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";
import ProductGrid from "../components/products/ProductGrid";

// Local components
import QuizSteps from "../components/quiz/QuizSteps";
import ResultRoutine from "../components/quiz/ResultRoutine";

// --- Demo product library (extend with your real catalog or API) ---
const DB = [
  // CLEANSERS
  { id: 101, name: { en: "Gentle Gel Cleanser", ar: "منظف جل لطيف" }, price: 380, rating: 4.5, img: IMG.cleanser, brand: "PURETONE", category: "Cleansers", sub: "Gel", tags:["sulfate-free","fragrance-free"], skin:["oily","combo","normal","sensitive"] },
  { id: 102, name: { en: "Cream Cleanser", ar: "منظف كريمي" }, price: 420, rating: 4.6, img: IMG.cream, brand: "DERMA+", category: "Cleansers", sub: "Cream", tags:["hydrating"], skin:["dry","sensitive","normal"] },
  // TREATMENTS / SERUMS
  { id: 201, name: { en: "Niacinamide 10% Serum", ar: "سيروم نيايسيناميد 10%" }, price: 590, rating: 4.7, img: IMG.serum, brand: "LUMI LABS", category: "Serums", sub: "Pores", tags:["niacinamide","oil-control","fragrance-free"], skin:["oily","combo","all"] },
  { id: 202, name: { en: "Vitamin C 15%", ar: "فيتامين سي 15%" }, price: 830, rating: 4.8, img: IMG.bannerTall, brand: "LUMI LABS", category: "Serums", sub: "Brightening", tags:["vitamin-c","antioxidant"], skin:["dull","hyperpigmentation","all"] },
  { id: 203, name: { en: "Azelaic Acid 10%", ar: "حمض الأزيليك 10%" }, price: 720, rating: 4.6, img: IMG.serum, brand: "DERMA+", category: "Serums", sub: "Calming", tags:["azelaic","redness","pregnancy-safe"], skin:["sensitive","acne","all"] },
  { id: 204, name: { en: "BHA 2% Exfoliant", ar: "مقشّر BHA 2%" }, price: 640, rating: 4.5, img: IMG.serum, brand: "PURETONE", category: "Treatments", sub: "BHA", tags:["salicylic","acne"], skin:["oily","acne"] },
  { id: 205, name: { en: "AHA 8% Resurfacing", ar: "AHA 8% تجديد" }, price: 660, rating: 4.4, img: IMG.serum, brand: "PURETONE", category: "Treatments", sub: "AHA", tags:["glycolic","texture"], skin:["dull","texture"] },
  // MOISTURIZERS
  { id: 301, name: { en: "Ceramide Barrier Cream", ar: "كريم حاجز السيراميد" }, price: 760, rating: 4.8, img: IMG.cream, brand: "DERMA+", category: "Moisturizers", sub: "Barrier", tags:["ceramides","barrier","fragrance-free"], skin:["dry","sensitive","all"] },
  { id: 302, name: { en: "Oil-Free Gel Moisturizer", ar: "جل مرطب خالٍ من الزيوت" }, price: 520, rating: 4.6, img: IMG.serum, brand: "LUMI LABS", category: "Moisturizers", sub: "Gel", tags:["lightweight","oil-control"], skin:["oily","combo"] },
  // SPF
  { id: 401, name: { en: "SPF 50 PA++++ Fluid", ar: "واقي شمس سائل 50" }, price: 880, rating: 4.4, img: IMG.hero1, brand: "SUNVEIL", category: "SPF", sub: "Fluid", tags:["broad-spectrum","no-white-cast"], skin:["all"] },
  { id: 402, name: { en: "Mineral SPF 50", ar: "واقي شمس معدني 50" }, price: 920, rating: 4.3, img: IMG.hero2, brand: "SUNVEIL", category: "SPF", sub: "Mineral", tags:["mineral","sensitive"], skin:["sensitive","all"] },
  // OPTIONAL
  { id: 501, name: { en: "Glow Facial Oil", ar: "زيت توهّج للوجه" }, price: 650, rating: 4.5, img: IMG.oils, brand: "GLIM", category: "Oils", sub: "Glow", tags:["occlusive","radiance"], skin:["dry","combo"] },
];

// --- Rule Engine
const RULES = {
  // forbidden / caution by state
  pregnancy: {
    avoidTags: ["retinoid"], // we don't include retinoids in DB demo
    preferTags: ["azelaic","niacinamide","vitamin-c","pregnancy-safe"],
  },
  concernsMap: {
    acne: ["salicylic","azelaic","niacinamide"],
    hyperpigmentation: ["vitamin-c","azelaic"],
    redness: ["azelaic","barrier","ceramides"],
    dehydration: ["hydrating","ceramides","lightweight"],
    texture: ["glycolic","AHA","BHA"],
  },
  skinMoisturizer: {
    oily: ["Oil-Free Gel Moisturizer"],
    combo: ["Oil-Free Gel Moisturizer","Ceramide Barrier Cream"],
    dry: ["Ceramide Barrier Cream","Glow Facial Oil"],
    sensitive: ["Ceramide Barrier Cream"],
    normal: ["Ceramide Barrier Cream","Oil-Free Gel Moisturizer"],
  },
  cleanserBySkin: {
    oily: "Gentle Gel Cleanser",
    combo: "Gentle Gel Cleanser",
    dry: "Cream Cleanser",
    sensitive: "Cream Cleanser",
    normal: "Gentle Gel Cleanser",
  }
};

// Helpers
const byName = (n)=> DB.find(p => p.name.en === n || p.name.ar === n);
const filterByTags = (arr, required=[]) => arr.filter(p => required.every(t => (p.tags||[]).includes(t)));
const preferAnyTag = (arr, prefs=[]) => arr.filter(p => (p.tags||[]).some(t => prefs.includes(t)));

function buildRoutine({ skinType, concerns=[], fragranceFree=false, isPregnant=false, budget="mid" }){
  // Base picks
  const cleanserName = RULES.cleanserBySkin[skinType] || "Gentle Gel Cleanser";
  const cleanser = byName(cleanserName);

  // Treatments prefer by concerns
  let pool = DB.filter(p => ["Serums","Treatments"].includes(p.category));
  if (fragranceFree) pool = pool.filter(p => (p.tags||[]).includes("fragrance-free"));
  // pregnancy-safe preferences
  if (isPregnant) {
    pool = pool.filter(p => !(p.tags||[]).some(t=> RULES.pregnancy.avoidTags.includes(t)));
  }
  const mustTags = [...new Set(concerns.flatMap(c => RULES.concernsMap[c] || []))];
  let treatments = preferAnyTag(pool, mustTags).slice(0,2);
  if (!treatments.length) treatments = pool.slice(0,2);

  // Moisturizer
  const moistNames = RULES.skinMoisturizer[skinType] || ["Ceramide Barrier Cream"];
  let moisturizers = moistNames.map(n => byName(n)).filter(Boolean);
  if (fragranceFree) moisturizers = moisturizers.filter(p => (p.tags||[]).includes("fragrance-free"));

  // SPF — always
  let spfPool = DB.filter(p => p.category === "SPF");
  if (skinType === "sensitive") spfPool = preferAnyTag(spfPool, ["mineral","sensitive"]) || spfPool;
  const spf = spfPool[0];

  // Optional oil for dry/combo at night
  const optional = (skinType === "dry" || skinType === "combo") ? byName("Glow Facial Oil") : null;

  // Budget adjustment (simple): if "low", prefer cheapest options in each slot
  const pickCheapest = (arr)=> arr.slice().sort((a,b)=>a.price-b.price)[0];
  const pickMid = (arr)=> arr.slice().sort((a,b)=>a.price-b.price)[Math.floor(arr.length/2)] || arr[0];
  const pick = budget === 'low' ? pickCheapest : budget === 'high' ? (arr)=>arr.slice().sort((a,b)=>b.price-a.price)[0] : pickMid;

  return {
    AM: [cleanser, treatments[0] || null, moisturizers[0] || null, spf].filter(Boolean),
    PM: [cleanser, treatments[1] || treatments[0] || null, moisturizers[0] || null, optional].filter(Boolean),
    notes: buildNotes({ skinType, concerns, isPregnant }),
  };
}

function buildNotes({ skinType, concerns, isPregnant }){
  const tips = [];
  if (skinType === 'oily' || skinType === 'combo') tips.push({ en:"Use light gel textures in summer to reduce congestion.", ar:"استخدم قوام الجل الخفيف في الصيف لتقليل الانسداد."});
  if (skinType === 'dry') tips.push({ en:"Layer a hydrating serum under your cream.", ar:"استخدم سيروم ترطيب تحت الكريم."});
  if (concerns.includes('hyperpigmentation')) tips.push({ en:"Daily SPF is non‑negotiable for fading dark spots.", ar:"واقي الشمس يوميًا أساسي لتفتيح التصبغات."});
  if (concerns.includes('acne')) tips.push({ en:"Introduce BHA 2‑3x/week at night.", ar:"أدخل BHA مرتين–3 أسبوعيًا ليلًا."});
  if (isPregnant) tips.push({ en:"Avoid retinoids during pregnancy. Prefer azelaic/niacinamide.", ar:"تجنّبي الرتينويد أثناء الحمل. فضّلي الأزيليك/النيايسيناميد."});
  tips.push({ en:"Patch test new actives and consult a dermatologist if unsure.", ar:"اختبر المنتج على جزء صغير واستشر طبيب جلدية عند الشك."});
  return tips;
}

export default function QuizPage(){
  const [lang, setLang] = useState("ar");
  const T = useMemo(()=> COPY[lang], [lang]);
  useDir(lang);

  // quiz state
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    skinType: "oily", // oily, dry, combo, normal, sensitive
    concerns: [], // acne, hyperpigmentation, redness, dehydration, texture
    fragranceFree: false,
    isPregnant: false,
    budget: "mid", // low, mid, high
  });

  const done = step > 2;
  const routine = done ? buildRoutine(answers) : null;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={()=>setLang(lang==="ar"?"en":"ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />

      <section className="max-w-3xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">{lang==="ar"?"اعرف روتينك في دقيقة":"Find your routine in 1 minute"}</h1>
        <p className="text-neutral-600">{lang==="ar"?"أجب على أسئلة بسيطة لنقترح روتين صباحي ومسائي مناسب لبشرتك واحتياجاتك.":"Answer a few quick questions and we’ll suggest a morning & night routine tuned to your skin."}</p>
      </section>

      {!done && (
        <section className="max-w-3xl mx-auto px-4 pb-10">
          <QuizSteps lang={lang} brand={BRAND} step={step} setStep={setStep} answers={answers} setAnswers={setAnswers} />
        </section>
      )}

      {done && routine && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <ResultRoutine lang={lang} brand={BRAND} routine={routine} />
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-2">{lang==="ar"?"روتين الصباح (AM)":"Morning (AM)"}</h3>
              <ProductGrid products={routine.AM} lang={lang} brand={BRAND} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{lang==="ar"?"روتين المساء (PM)":"Evening (PM)"}</h3>
              <ProductGrid products={routine.PM} lang={lang} brand={BRAND} />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-neutral-200 p-4 bg-neutral-50">
            <div className="font-semibold mb-2">{lang==="ar"?"ملاحظات خبير":"Expert notes"}</div>
            <ul className="list-disc ps-6 text-sm text-neutral-700 space-y-1">
              {routine.notes.map((n,idx)=> <li key={idx}>{lang==="ar"?n.ar:n.en}</li>)}
            </ul>
            <div className="text-xs text-neutral-500 mt-3">{lang==="ar"?"هذه توصيات للعناية بالبشرة، وليست نصيحة طبية. لو عندك حالة جلدية، استشر طبيبك.":"These are skincare recommendations, not medical advice. If you have a skin condition, consult your doctor."}</div>
          </div>
        </section>
      )}

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang==="ar"?"الرئيسية":"Home", cats: lang==="ar"?"الفئات":"Categories", cart: lang==="ar"?"السلة":"Bag", wish: lang==="ar"?"المفضلة":"Wishlist", account: lang==="ar"?"حسابي":"Account" }} />
    </div>
  );
}
