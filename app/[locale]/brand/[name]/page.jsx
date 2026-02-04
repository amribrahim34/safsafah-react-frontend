// src/pages/BrandLanding.jsx
'use client';

import React, { useMemo, useState } from "react";
import { usePathname, useParams } from "next/navigation";

import { BRAND } from "@/content/brand";
import { COPY } from "@/content/copy";
import { PRODUCTS } from "@/content/products";
import { IMG } from "@/content/images";
import { useDir } from "@/hooks/useDir";

import PromoBar from "@/components/header/PromoBar";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import BottomTabs from "@/components/appchrome/BottomTabs";

// Reuse your existing catalog UI for consistency
import Filters from "@/components/catalog/filters/Filters";            // uses FilterGroup inside
import FilterPillBar from "@/components/catalog/filters/FilterPillBar";
import ProductGrid from "@/components/products/ProductGrid";

export default function BrandLanding() {
    const params = useParams();
    const slug = params.name;
    const pathname = usePathname();
    const isBrandRoute = pathname.startsWith("/brand/");

    // Bilingual + RTL
    const [lang, setLang] = useState("en");
    const t = useMemo(() => COPY[lang] || {}, [lang]);
    const isRTL = lang === "ar";
    useDir();

    // ---------- Normalize your PRODUCTS so nothing is undefined ----------
    const normalized = useMemo(() => {
        return (PRODUCTS || []).map((p) => {
            const brand = (p.brand || "").toString().toLowerCase();
            const tags = Array.isArray(p.tags) ? p.tags.map(String) : [];
            const skins = p.skinTypes || p.skin_type || [];
            const category = p.category || "";
            const subcategory = p.subcategory || "";
            const onSale = Boolean(p.onSale);

            // Title for cards/grid in either language
            const title = p.title || (p.name?.[lang] ?? p.name?.en ?? p.name?.ar ?? "");
            const image = p.image || p.img;

            return {
                ...p,
                title,
                image,
                brand,
                tags,
                skins: Array.from(new Set(skins.map(String))),
                category: String(category || ""),
                subcategory: String(subcategory || ""),
                onSale,
                // Useful for searching both languages
                _name_en: p.name?.en || "",
                _name_ar: p.name?.ar || "",
            };
        });
    }, [lang]);

    // ---------- Route-scoped base list (brand / collection), with safe fallbacks ----------
    const baseList = useMemo(() => {
        let list = [...normalized];

        if (isBrandRoute) {
            // Match brand exactly (e.g., /brands/some-by-mi)
            const target = (slug || "").toLowerCase();
            const matches = list.filter((p) => p.brand && p.brand === target);
            if (matches.length) return matches;
            // If your data has no brand yet, show all so the page isn’t empty
            return list;
        } else {
            // Collections: match "collection:slug" or "slug" in tags
            const target = (slug || "").toLowerCase();
            const hasTags = list.some((p) => p.tags?.length);
            if (hasTags) {
                const matches = list.filter((p) => {
                    const t = p.tags.map((x) => x.toLowerCase());
                    return t.includes(`collection:${target}`) || t.includes(target);
                });
                if (matches.length) return matches;
            }
            // Fallback: show all
            return list;
        }
    }, [normalized, isBrandRoute, slug]);

    // ---------- Facets derived from baseList (robust to missing fields) ----------
    const facets = useMemo(() => {
        const brands = new Set();
        const categories = new Set();
        const subsByCat = {};
        const tags = new Set();
        const skins = new Set();

        let priceMin = Number.POSITIVE_INFINITY;
        let priceMax = 0;

        baseList.forEach((p) => {
            if (p.brand) brands.add(p.brand);
            if (p.category) categories.add(p.category);
            if (p.subcategory) {
                const key = p.category || "_";
                subsByCat[key] = subsByCat[key] || new Set();
                subsByCat[key].add(p.subcategory);
            }
            (p.tags || []).forEach((tg) => tags.add(String(tg)));
            (p.skins || []).forEach((sk) => skins.add(String(sk)));
            if (typeof p.price === "number") {
                priceMin = Math.min(priceMin, p.price);
                priceMax = Math.max(priceMax, p.price);
            }
        });

        if (!isFinite(priceMin)) priceMin = 0;
        if (!isFinite(priceMax)) priceMax = 0;

        // convert sets to arrays
        const subsByCatArr = {};
        Object.keys(subsByCat).forEach((k) => (subsByCatArr[k] = Array.from(subsByCat[k])));

        return {
            brands: Array.from(brands),          // e.g., ["some-by-mi"]
            categories: Array.from(categories),  // e.g., ["serums"]
            subsByCat: subsByCatArr,             // e.g., { serums: ["retinol"] }
            tags: Array.from(tags),              // e.g., ["retinol","collection:winter-hydration"]
            skins: Array.from(skins),            // e.g., ["dry","combo"]
            priceMin,
            priceMax,
        };
    }, [baseList]);

    // ---------- Filters state (shape expected by your Filters component) ----------
    const [q, setQ] = useState("");
    const [brand, setBrand] = useState([]);       // array
    const [category, setCategory] = useState(""); // string
    const [sub, setSub] = useState("");           // string
    const [onSale, setOnSale] = useState(false);  // boolean
    const [price, setPrice] = useState([facets.priceMin, facets.priceMax]); // [min, max]
    const [tags, setTags] = useState([]);         // array
    const [skins, setSkins] = useState([]);       // array

    // Keep price range in sync if facets change
    React.useEffect(() => {
        setPrice([facets.priceMin, facets.priceMax]);
    }, [facets.priceMin, facets.priceMax]);

    // ---------- Apply filters/search ----------
    const filtered = useMemo(() => {
        let list = [...baseList];

        // Search across English + Arabic names
        if (q.trim()) {
            const needle = q.trim().toLowerCase();
            list = list.filter(
                (p) =>
                    p.title?.toLowerCase().includes(needle) ||
                    p._name_en.toLowerCase().includes(needle) ||
                    p._name_ar.toLowerCase().includes(needle)
            );
        }

        // Brand (OR)
        if (brand.length) list = list.filter((p) => brand.includes(p.brand));

        // Category
        if (category) list = list.filter((p) => p.category === category);

        // Subcategory
        if (sub) list = list.filter((p) => p.subcategory === sub);

        // On sale
        if (onSale) list = list.filter((p) => p.onSale === true);

        // Tags (every selected must exist on product)
        if (tags.length) list = list.filter((p) => tags.every((t) => (p.tags || []).includes(t)));

        // Skin types (every selected must exist)
        if (skins.length) list = list.filter((p) => skins.every((s) => (p.skins || []).includes(s)));

        // Price range
        list = list.filter((p) => typeof p.price !== "number" || (p.price >= price[0] && p.price <= price[1]));

        return list;
    }, [baseList, q, brand, category, sub, onSale, tags, skins, price]);

    // ---------- Active pills for FilterPillBar ----------
    const pills = useMemo(() => {
        const out = [];
        if (q.trim()) out.push({ key: "q", value: q, label: q });
        brand.forEach((b) => out.push({ key: "brand", value: b, label: b }));
        if (category) out.push({ key: "category", value: category, label: category });
        if (sub) out.push({ key: "sub", value: sub, label: sub });
        if (onSale) out.push({ key: "onSale", value: true, label: lang === "ar" ? "خصومات" : "On sale" });
        tags.forEach((t) => out.push({ key: "tags", value: t, label: t }));
        skins.forEach((s) => out.push({ key: "skins", value: s, label: s }));
        if (price[0] !== facets.priceMin || price[1] !== facets.priceMax) {
            out.push({
                key: "price",
                value: `${price[0]}-${price[1]}`,
                label: `${lang === "ar" ? "السعر" : "Price"}: ${price[0]}–${price[1]}`,
            });
        }
        return out;
    }, [q, brand, category, sub, onSale, tags, skins, price, facets.priceMin, facets.priceMax, lang]);

    const clearPill = (p) => {
        switch (p.key) {
            case "q": setQ(""); break;
            case "brand": setBrand((arr) => arr.filter((x) => x !== p.value)); break;
            case "category": setCategory(""); setSub(""); break;
            case "sub": setSub(""); break;
            case "onSale": setOnSale(false); break;
            case "tags": setTags((arr) => arr.filter((x) => x !== p.value)); break;
            case "skins": setSkins((arr) => arr.filter((x) => x !== p.value)); break;
            case "price": setPrice([facets.priceMin, facets.priceMax]); break;
            default: break;
        }
    };

    const clearAll = () => {
        setQ("");
        setBrand([]);
        setCategory("");
        setSub("");
        setOnSale(false);
        setTags([]);
        setSkins([]);
        setPrice([facets.priceMin, facets.priceMax]);
    };

    // ---------- Hero (strong visual) ----------
    //   const prettySlug = (slug || "").split("-").map((s) => s[0]?.toUpperCase() + s.slice(1)).join(" ");

    const prettySlug = useMemo(() => {
        if (!slug) return isRTL ? "الكل" : "All";

        // Handle hyphenated names (e.g., "some-by-mi" → "Some By Mi")
        return slug
            .split("-")
            .map(word => {
                // Skip capitalization for words like "by", "of", "the"
                const lowercaseWords = ["by", "of", "the", "and", "in"];
                if (lowercaseWords.includes(word)) return word;
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            })
            .join(" ");
    }, [slug, isRTL]);



    const heroKey = `${isBrandRoute ? "brand" : "collection"}:${slug}`;
    const hero = IMG?.[heroKey] || IMG?.[slug] || IMG?.hero1 || null;

    const labels = {
        results: isRTL ? "نتائج" : "Results",
        filters: isRTL ? "الفلاتر" : "Filters",
        clear: isRTL ? "مسح" : "Clear",
    };

    return (
        <div className="min-h-screen bg-white text-neutral-900">
            <PromoBar text={t.promo} lang={lang} onToggleLang={() => setLang(isRTL ? "en" : "ar")} brand={BRAND} />
            <Header brand={BRAND} searchPlaceholder={t.search} lang={lang} />

            {/* HERO */}
            <section className="relative isolate">
                <div className="h-[36vh] md:h-[48vh] w-full overflow-hidden rounded-b-[2rem] bg-neutral-100">
                    {hero ? (
                        <img src={hero} alt={prettySlug} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full grid place-items-center">{prettySlug}</div>
                    )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-b-[2rem]" />
                <div className="absolute bottom-4 left-4 right-4 md:left-8 md:bottom-8 text-white">
                    <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow">
                        {isBrandRoute ? (isRTL ? "علامة" : "Brand") : (isRTL ? "مجموعة" : "Collection")} • {prettySlug}
                    </h1>
                    <p className="max-w-2xl mt-1 text-sm md:text-base opacity-90">
                        {isRTL
                            ? "تسوقي اختياراتنا مع فلاتر متقدمة تناسب احتياج بشرتك."
                            : "Shop our curated picks with advanced filters to match your skin needs."}
                    </p>
                </div>
            </section>

            {/* FILTERS + GRID */}
            <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Sidebar filters (consistent with catalog) */}
                <aside className="md:col-span-3">
                    <Filters
                        lang={lang}
                        brandTokens={BRAND}           // uses brandTokens.primary for accents
                        facets={facets}               // {brands,categories,subsByCat,tags,skins,priceMin,priceMax}
                        state={{
                            q, setQ,
                            brand, setBrand,
                            category, setCategory,
                            sub, setSub,
                            onSale, setOnSale,
                            price, setPrice,
                            tags, setTags,
                            skins, setSkins,
                        }}
                    />
                </aside>

                {/* Results */}
                <section className="md:col-span-9">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-neutral-600">
                            {labels.results}: <span className="font-semibold text-neutral-900">{filtered.length}</span>
                        </div>
                    </div>

                    {/* Active filter pills, matching your component */}
                    <FilterPillBar
                        pills={pills}
                        onClear={clearPill}
                        onClearAll={clearAll}
                        brand={BRAND}
                        lang={lang}
                    />

                    {/* Product grid — pass normalized + original fields so cards never break */}
                    <ProductGrid
                        products={filtered.map((p) => ({
                            ...p,
                            // ensure common names for cards
                            title: p.title,
                            image: p.image,
                            // keep original fields too (some cards might read name/img)
                            name: p.name,
                            img: p.img,
                        }))}
                        brand={BRAND}
                        lang={lang}

                    />

                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-neutral-600">
                            {isRTL ? "لا توجد منتجات مطابقة للفلاتر." : "No products match your filters."}
                        </div>
                    )}
                </section>
            </main>

            <Footer brand={BRAND} lang={lang} copy={t} />
            <BottomTabs
                labels={{
                    home: isRTL ? "الرئيسية" : "Home",
                    cats: isRTL ? "الفئات" : "Categories",
                    cart: isRTL ? "السلة" : "Bag",
                    wish: isRTL ? "المفضلة" : "Wishlist",
                    account: isRTL ? "حسابي" : "Account",
                }}
            />
        </div>
    );
}
