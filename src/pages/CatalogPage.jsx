// src/pages/catalog/CatalogPage.jsx
import React, { useMemo, useState, useMemo as useMemo2 } from "react";
import { BRAND } from "../content/brand";
import { COPY } from "../content/copy";
import { IMG } from "../content/images";
import { useDir } from "../hooks/useDir";

// Reuse existing components
import PromoBar from "../components/header/PromoBar";
import Header from "../components/header/Header";
import ProductGrid from "../components/products/ProductGrid";
import BottomTabs from "../components/appchrome/BottomTabs";
import FloatingCart from "../components/appchrome/FloatingCart";
import Footer from "../components/footer/Footer";
import USPGrid from "../components/usp/USPGrid";

// Local catalog components
import Filters from "../components/catalog/filters/Filters";
import SortBar from "../components/catalog/sortbar/SortBar";
import ResultsMeta from "../components/catalog/resultmeta/ResultsMeta";
import FilterPillBar from "../components/catalog/filters/FilterPillBar";

// --- Demo dataset (extend/replace with API later) ---
const CATALOG = [
  { id: 1, name: { en: "Niacinamide 10% Serum", ar: "سيروم نيايسيناميد 10%" }, price: 590, rating: 4.7, img: IMG.serum, brand: "LUMI LABS", category: "Serums", sub: "Pores", onSale: true, tags:["fragrance-free","vegan"], skin:["oily","combo"] },
  { id: 2, name: { en: "Hydrating Gel Cleanser", ar: "منظف جل مرطب" }, price: 420, rating: 4.6, img: IMG.cleanser, brand: "PURETONE", category: "Cleansers", sub: "Gel", onSale: false, tags:["sulfate-free"], skin:["oily","normal"] },
  { id: 3, name: { en: "Ceramide Barrier Cream", ar: "كريم حاجز السيراميد" }, price: 760, rating: 4.8, img: IMG.cream, brand: "DERMA+", category: "Moisturizers", sub: "Barrier", onSale: false, tags:["fragrance-free"], skin:["dry","sensitive"] },
  { id: 4, name: { en: "Glow Facial Oil", ar: "زيت توهّج للوجه" }, price: 650, rating: 4.5, img: IMG.oils, brand: "GLIM", category: "Oils", sub: "Glow", onSale: true, tags:["vegan"], skin:["dry","combo"] },
  { id: 5, name: { en: "SPF 50 PA++++ Fluid", ar: "واقي شمس سائل 50" }, price: 880, rating: 4.4, img: IMG.hero1, brand: "SUNVEIL", category: "SPF", sub: "Fluid", onSale: false, tags:["water-resistant"], skin:["all"] },
  { id: 6, name: { en: "Vitamin C 15%", ar: "فيتامين سي 15%" }, price: 830, rating: 4.9, img: IMG.bannerTall, brand: "LUMI LABS", category: "Serums", sub: "Brightening", onSale: false, tags:["antioxidant"], skin:["dull","all"] },
];

function buildFacets(items){
  const brands = Array.from(new Set(items.map(i=>i.brand))).sort();
  const categories = Array.from(new Set(items.map(i=>i.category))).sort();
  const subsByCat = categories.reduce((acc,cat)=>{acc[cat]=Array.from(new Set(items.filter(i=>i.category===cat).map(i=>i.sub))).sort();return acc;},{});
  const priceMin = Math.min(...items.map(i=>i.price));
  const priceMax = Math.max(...items.map(i=>i.price));
  const tags = Array.from(new Set(items.flatMap(i=>i.tags||[]))).sort();
  const skins = Array.from(new Set(items.flatMap(i=>i.skin||[]))).sort();
  return { brands, categories, subsByCat, priceMin, priceMax, tags, skins };
}

export default function CatalogPage(){
  const [lang, setLang] = useState("ar");
  const T = useMemo(()=> COPY[lang], [lang]);
  useDir(lang);

  // filters state
  const [q,setQ] = useState("");
  const [brand,setBrand] = useState([]); // multi
  const [category,setCategory] = useState("");
  const [sub,setSub] = useState("");
  const [onSale,setOnSale] = useState(false);
  const [price,setPrice] = useState([0, 0]);
  const [tags,setTags] = useState([]);
  const [skins,setSkins] = useState([]);
  const [sort,setSort] = useState("relevance");

  const facets = useMemo(()=> buildFacets(CATALOG), []);
  // init price
  React.useEffect(()=>{ setPrice([facets.priceMin, facets.priceMax]); }, [facets.priceMin, facets.priceMax]);

  // filtering
  const filtered = useMemo(()=>{
    let out = CATALOG.slice();
    if(q.trim()){
      const s = q.toLowerCase();
      out = out.filter(p=> (lang==="ar"?p.name.ar:p.name.en).toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
    }
    if(brand.length) out = out.filter(p=> brand.includes(p.brand));
    if(category) out = out.filter(p=> p.category===category);
    if(sub) out = out.filter(p=> p.sub===sub);
    if(onSale) out = out.filter(p=> p.onSale);
    out = out.filter(p=> p.price>=price[0] && p.price<=price[1]);
    if(tags.length) out = out.filter(p=> (p.tags||[]).some(t=> tags.includes(t)));
    if(skins.length) out = out.filter(p=> (p.skin||[]).some(s=> skins.includes(s)));
    // sort
    if(sort==="priceAsc") out.sort((a,b)=>a.price-b.price);
    if(sort==="priceDesc") out.sort((a,b)=>b.price-a.price);
    if(sort==="rating") out.sort((a,b)=>b.rating-a.rating);
    return out;
  },[q,brand,category,sub,onSale,price,tags,skins,sort,lang]);

  // selected pills for quick removal
  const pills = useMemo(()=>{
    const p=[];
    if(q) p.push({k:"q",label:`${lang==="ar"?"بحث":"Search"}: ${q}`});
    brand.forEach(b=>p.push({k:"brand",v:b,label:b}));
    if(category) p.push({k:"category",v:category,label:category});
    if(sub) p.push({k:"sub",v:sub,label:sub});
    if(onSale) p.push({k:"onSale",v:true,label: lang==="ar"?"خصومات":"On sale"});
    if(tags.length) tags.forEach(t=>p.push({k:"tag",v:t,label:t}));
    if(skins.length) skins.forEach(s=>p.push({k:"skin",v:s,label:s}));
    if(price[0]>facets.priceMin || price[1]<facets.priceMax) p.push({k:"price",v:price,label: `${price[0]}–${price[1]} EGP`});
    return p;
  },[q,brand,category,sub,onSale,tags,skins,price,facets.priceMin,facets.priceMax,lang]);

  const clearPill = (pill)=>{
    if(pill.k==="q") setQ("");
    if(pill.k==="brand") setBrand(prev=>prev.filter(v=>v!==pill.v));
    if(pill.k==="category") { setCategory(""); setSub(""); }
    if(pill.k==="sub") setSub("");
    if(pill.k==="onSale") setOnSale(false);
    if(pill.k==="tag") setTags(prev=>prev.filter(v=>v!==pill.v));
    if(pill.k==="skin") setSkins(prev=>prev.filter(v=>v!==pill.v));
    if(pill.k==="price") setPrice([facets.priceMin, facets.priceMax]);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} lang={lang} onToggleLang={()=>setLang(lang==="ar"?"en":"ar")} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      {/* Page title + sort */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-extrabold">{lang==="ar"?"المنتجات":"Products"}</h1>
          <SortBar lang={lang} sort={sort} onChange={setSort} brand={BRAND} />
        </div>
      </section>

      {/* Filters + Results */}
      <section className="max-w-7xl mx-auto px-4 py-4 grid md:grid-cols-[280px,1fr] gap-6">
        <aside>
          <Filters
            lang={lang}
            brandTokens={BRAND}
            facets={facets}
            state={{ q, setQ, brand, setBrand, category, setCategory, sub, setSub, onSale, setOnSale, price, setPrice, tags, setTags, skins, setSkins }}
          />
        </aside>
        <main>
          <ResultsMeta lang={lang} count={filtered.length} total={CATALOG.length} />
          <FilterPillBar pills={pills} onClear={clearPill} onClearAll={()=>{ setQ(""); setBrand([]); setCategory(""); setSub(""); setOnSale(false); setPrice([facets.priceMin, facets.priceMax]); setTags([]); setSkins([]); }} brand={BRAND} lang={lang} />
          <ProductGrid products={filtered} lang={lang} brand={BRAND} />
        </main>
      </section>

      {/* Trust + Footer */}
      <section className="max-w-7xl mx-auto px-4 pb-10"><USPGrid brand={BRAND} lang={lang} copy={T} /></section>
      <Footer brand={BRAND} lang={lang} copy={T} />

      <FloatingCart brand={BRAND} />
      <BottomTabs labels={{ home: lang==="ar"?"الرئيسية":"Home", cats: lang==="ar"?"الفئات":"Categories", cart: lang==="ar"?"السلة":"Bag", wish: lang==="ar"?"المفضلة":"Wishlist", account: lang==="ar"?"حسابي":"Account" }} />
    </div>
  );
}

