import React, { useState } from "react";
import FilterGroup from "./FilterGroup";

export default function Filters({ lang, brandTokens, facets, state }) {
  const {
    q, setQ,
    brand, setBrand,
    category, setCategory,
    sub, setSub,
    onSale, setOnSale,
    price, setPrice,
    tags, setTags,
    skins, setSkins,
  } = state;

  const [open, setOpen] = useState({
    brand: true, category: true, price: true, sale: true, tags: false, skin: false
  });
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));

  const t = {
    title: lang === "ar" ? "التصفية" : "Filters",
    search: lang === "ar" ? "ابحث في المنتجات" : "Search products",
    brand: lang === "ar" ? "الماركة" : "Brand",
    category: lang === "ar" ? "الفئة" : "Category",
    sub: lang === "ar" ? "فرعي" : "Subcategory",
    price: lang === "ar" ? "السعر" : "Price",
    sale: lang === "ar" ? "عروض" : "On sale",
    tags: lang === "ar" ? "خصائص" : "Attributes",
    skin: lang === "ar" ? "نوع البشرة" : "Skin type",
    min: lang === "ar" ? "الحد الأدنى" : "Min",
    max: lang === "ar" ? "الحد الأقصى" : "Max",
    any: lang === "ar" ? "أي" : "Any",
  };

  const addOrRemove = (arr, v, setter) =>
    setter(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  return (
    <div className="sticky top-20 rounded-2xl border border-neutral-200 p-3 bg-white">
      <div className="font-bold text-lg mb-3">{t.title}</div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2"
          placeholder={t.search}
        />
      </div>

      {/* Brand */}
      <FilterGroup title={t.brand} open={open.brand} onToggle={() => toggle("brand")}>
        <div className="space-y-2">
          {facets.brands.map(b => (
            <label key={b} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={brand.includes(b)}
                onChange={() => addOrRemove(brand, b, setBrand)}
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Category + Sub */}
      <FilterGroup title={t.category} open={open.category} onToggle={() => toggle("category")}>
        <select
          value={category}
          onChange={e => { setCategory(e.target.value); setSub(""); }}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2 mb-2"
        >
          <option value="">{t.any}</option>
          {facets.categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {category && (
          <div className="mt-2">
            <div className="text-sm text-neutral-600 mb-1">{t.sub}</div>
            <select
              value={sub}
              onChange={e => setSub(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2"
            >
              <option value="">{t.any}</option>
              {(facets.subsByCat[category] || []).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}
      </FilterGroup>

      {/* Price */}
      <FilterGroup title={t.price} open={open.price} onToggle={() => toggle("price")}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-xs text-neutral-600 mb-1">{t.min}</div>
            <input
              type="number"
              className="w-full rounded-xl border border-neutral-300 px-3 py-2"
              value={price[0]}
              min={facets.priceMin}
              max={price[1]}
              onChange={e => setPrice([Number(e.target.value), price[1]])}
            />
          </div>
          <div>
            <div className="text-xs text-neutral-600 mb-1">{t.max}</div>
            <input
              type="number"
              className="w-full rounded-xl border border-neutral-300 px-3 py-2"
              value={price[1]}
              min={price[0]}
              max={facets.priceMax}
              onChange={e => setPrice([price[0], Number(e.target.value)])}
            />
          </div>
        </div>

        {/* Visual range bar (read-only) */}
        <div className="mt-3 h-2 rounded bg-neutral-100 relative overflow-hidden">
          <div
            className="absolute inset-y-0"
            style={{
              left: `${((price[0] - facets.priceMin) / (facets.priceMax - facets.priceMin)) * 100}%`,
              width: `${((price[1] - price[0]) / (facets.priceMax - facets.priceMin)) * 100}%`,
              background: brandTokens.primary
            }}
          />
        </div>
      </FilterGroup>

      {/* On sale */}
      <FilterGroup title={t.sale} open={open.sale} onToggle={() => toggle("sale")}>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={onSale}
            onChange={e => setOnSale(e.target.checked)}
          />
          <span>{lang === "ar" ? "خصومات فقط" : "Only discounted"}</span>
        </label>
      </FilterGroup>

      {/* Attributes */}
      <FilterGroup title={t.tags} open={open.tags} onToggle={() => toggle("tags")}>
        <div className="flex flex-wrap gap-2">
          {facets.tags.map(tag => (
            <button
              key={tag}
              onClick={() => addOrRemove(tags, tag, setTags)}
              className={`px-3 py-1 rounded-full border ${tags.includes(tag) ? "text-white" : "text-neutral-700"}`}
              style={{
                background: tags.includes(tag) ? brandTokens.primary : "white",
                borderColor: tags.includes(tag) ? brandTokens.primary : "#e5e7eb"
              }}
              type="button"
            >
              {tag}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Skin types */}
      <FilterGroup title={t.skin} open={open.skin} onToggle={() => toggle("skin")}>
        <div className="flex flex-wrap gap-2">
          {facets.skins.map(sk => (
            <button
              key={sk}
              onClick={() => addOrRemove(skins, sk, setSkins)}
              className={`px-3 py-1 rounded-full border ${skins.includes(sk) ? "text-white" : "text-neutral-700"}`}
              style={{
                background: skins.includes(sk) ? brandTokens.primary : "white",
                borderColor: skins.includes(sk) ? brandTokens.primary : "#e5e7eb"
              }}
              type="button"
            >
              {sk}
            </button>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
