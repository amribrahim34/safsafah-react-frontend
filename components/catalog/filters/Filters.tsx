'use client';

import React, { useState } from "react";
import FilterGroup from "./FilterGroup";
import PriceRangeSlider from "./PriceRangeSlider";

interface CatalogBrand {
  id: number;
  nameAr: string;
  nameEn: string;
}

interface CatalogCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  children: CatalogCategory[];
}

export interface FilterState {
  q: string;
  setQ: (query: string) => void;
  brandIds: number[];
  setBrandIds: (brandIds: number[]) => void;
  categoryIds: number[];
  setCategoryIds: (categoryIds: number[]) => void;
  onSale: boolean;
  setOnSale: (onSale: boolean) => void;
  price: [number, number];
  setPrice: (price: [number, number]) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  skins: string[];
  setSkins: (skins: string[]) => void;
}

interface CatalogFilters {
  categories: CatalogCategory[];
  brands: CatalogBrand[];
}

interface BrandTokens {
  primary: string;
  dark: string;
  light: string;
}

interface FiltersProps {
  lang: string;
  brandTokens: BrandTokens;
  priceMin: number;
  priceMax: number;
  catalogFilters: CatalogFilters;
  state: FilterState;
}

export default function Filters({ lang, brandTokens, priceMin, priceMax, catalogFilters, state }: FiltersProps) {
  const {
    q, setQ,
    brandIds, setBrandIds,
    categoryIds, setCategoryIds,
    onSale, setOnSale,
    price, setPrice,
    tags, setTags,
    skins, setSkins,
  } = state;

  const [open, setOpen] = useState({
    brand: true, category: true, price: true, sale: true, tags: false, skin: false
  });
  const toggle = (k: keyof typeof open) => setOpen(o => ({ ...o, [k]: !o[k] }));

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
  };

  const addOrRemove = (arr: number[], v: number, setter: (arr: number[]) => void) =>
    setter(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  const addOrRemoveString = (arr: string[], v: string, setter: (arr: string[]) => void) =>
    setter(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);

  // Flatten categories for display (parent + children)
  const getAllCategories = (categories: CatalogCategory[]): { cat: CatalogCategory; isChild: boolean; parentName?: string }[] => {
    const result: { cat: CatalogCategory; isChild: boolean; parentName?: string }[] = [];
    categories.forEach(cat => {
      result.push({ cat, isChild: false });
      if (cat.children && cat.children.length > 0) {
        cat.children.forEach(child => {
          result.push({ cat: child, isChild: true, parentName: lang === "ar" ? cat.nameAr : cat.nameEn });
        });
      }
    });
    return result;
  };

  const allCategories = getAllCategories(catalogFilters.categories);



  return (
    <div className="rounded-2xl border border-neutral-200 p-3 bg-white">
      <div className="font-bold text-lg mb-3">{t.title}</div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-offset-0"
          placeholder={t.search}
        />
      </div>

      {/* Brand */}
      {catalogFilters.brands.length > 0 && (
        <FilterGroup title={t.brand} open={open.brand} onToggle={() => toggle("brand")}>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {catalogFilters.brands.map(brand => (
              <label key={brand.id} className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-1 rounded transition-colors">
                <input
                  type="checkbox"
                  checked={brandIds.includes(brand.id)}
                  onChange={() => addOrRemove(brandIds, brand.id, setBrandIds)}
                  className="rounded border-neutral-300 w-4 h-4 cursor-pointer"
                  style={{ accentColor: brandTokens.primary }}
                />
                <span className="text-sm">{lang === "ar" ? brand.nameAr : brand.nameEn}</span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Categories - Checkboxes with multiselect */}
      {allCategories.length > 0 && (
        <FilterGroup title={t.category} open={open.category} onToggle={() => toggle("category")}>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allCategories.map(({ cat, isChild, parentName }) => (
              <label 
                key={cat.id} 
                className={`flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-1 rounded transition-colors ${isChild ? 'ms-4' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={categoryIds.includes(cat.id)}
                  onChange={() => addOrRemove(categoryIds, cat.id, setCategoryIds)}
                  className="rounded border-neutral-300 w-4 h-4 cursor-pointer"
                  style={{ accentColor: brandTokens.primary }}
                />
                <span className="text-sm">
                  {lang === "ar" ? cat.nameAr : cat.nameEn}
                  {isChild && <span className="text-neutral-400 text-xs ms-1">({parentName})</span>}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>
      )}

      {/* Price Range Slider */}
      <FilterGroup title={t.price} open={open.price} onToggle={() => toggle("price")}>
        <PriceRangeSlider
          value={price}
          min={priceMin}
          max={priceMax}
          brandTokens={brandTokens}
          lang={lang}
          onChange={setPrice}
        />
      </FilterGroup>

      {/* On sale */}
      <FilterGroup title={t.sale} open={open.sale} onToggle={() => toggle("sale")}>
        <label className="flex items-center gap-2 cursor-pointer hover:bg-neutral-50 p-2 rounded transition-colors">
          <input
            type="checkbox"
            checked={onSale}
            onChange={e => setOnSale(e.target.checked)}
            className="rounded border-neutral-300 w-4 h-4 cursor-pointer"
            style={{ accentColor: brandTokens.primary }}
          />
          <span className="text-sm">{lang === "ar" ? "خصومات فقط" : "Only discounted"}</span>
        </label>
      </FilterGroup>
    </div>
  );
}
