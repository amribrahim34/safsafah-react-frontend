'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBeautyProfile } from '@/store/slices/beautyProfileSlice';

export default function BeautyProfileCard({ brand, lang = 'ar' }) {
  const isRTL = lang === 'ar';
  const dispatch = useAppDispatch();

  const { profile, isLoading, error } = useAppSelector((state) => state.beautyProfile);

  useEffect(() => {
    dispatch(fetchBeautyProfile());
  }, [dispatch]);

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
        <div className="text-lg font-extrabold mb-4">
          {isRTL ? 'ملف الجمال' : 'Beauty profile'}
        </div>
        <div className="flex items-center justify-center py-8">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2"
            style={{ borderColor: brand.primary }}
          />
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
        <div className="text-lg font-extrabold mb-2">
          {isRTL ? 'ملف الجمال' : 'Beauty profile'}
        </div>
        <p className="text-sm text-neutral-500">
          {isRTL ? 'لا يوجد ملف جمال بعد.' : 'No beauty profile found.'}
        </p>
      </section>
    );
  }

  const skinTypeLabel = isRTL ? profile.skinType?.nameAr : profile.skinType?.nameEn;

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">
        {isRTL ? 'ملف الجمال' : 'Beauty profile'}
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {/* Skin Type */}
        <div>
          <div className="text-sm font-semibold mb-1">
            {isRTL ? 'نوع البشرة' : 'Skin type'}
          </div>
          <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1.5 rounded-xl border text-sm text-white"
              style={{ background: brand.primary }}
            >
              {skinTypeLabel}
            </span>
          </div>
        </div>

        {/* Skin Concerns */}
        {profile.skinConcerns?.length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-1">
              {isRTL ? 'الاهتمامات' : 'Concerns'}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.skinConcerns.map((concern) => (
                <span
                  key={concern.id}
                  className="px-3 py-1.5 rounded-xl border text-sm text-white"
                  style={{ background: brand.primary }}
                >
                  {isRTL ? concern.nameAr : concern.nameEn}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Preferred Ingredients */}
        {profile.preferredIngredients?.length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-1">
              {isRTL ? 'المكونات المفضلة' : 'Preferred ingredients'}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.preferredIngredients.map((ingredient) => (
                <span
                  key={ingredient.id}
                  className="px-3 py-1.5 rounded-xl border text-sm"
                >
                  {isRTL ? ingredient.nameAr : ingredient.nameEn}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Avoided Ingredients */}
        {profile.avoidedIngredients?.length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-1">
              {isRTL ? 'المكونات المتجنبة' : 'Avoided ingredients'}
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.avoidedIngredients.map((ingredient) => (
                <span
                  key={ingredient.id}
                  className="px-3 py-1.5 rounded-xl border text-sm text-red-500 border-red-200"
                >
                  {isRTL ? ingredient.nameAr : ingredient.nameEn}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Allergies */}
        {profile.allergies && (
          <div>
            <div className="text-sm font-semibold mb-1">
              {isRTL ? 'الحساسية' : 'Allergies'}
            </div>
            <p className="text-sm text-neutral-600">{profile.allergies}</p>
          </div>
        )}
      </div>

      <a
        href="/catalog?personalized=1"
        className="inline-block mt-3 px-4 py-2 rounded-2xl text-white font-semibold"
        style={{ background: brand.primary }}
      >
        {isRTL ? 'مشاهدة الروتين المقترح' : 'See my routine'}
      </a>
    </section>
  );
}
