'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchBeautyProfile } from '@/store/slices/beautyProfileSlice';
import type { BrandConfig, BeautyProfileTranslations } from './_types';

interface BeautyProfileCardProps {
  brand: BrandConfig;
  lang: 'ar' | 'en';
  t: BeautyProfileTranslations;
}

export default function BeautyProfileCard({ brand, lang, t }: BeautyProfileCardProps) {
  const isRTL = lang === 'ar';
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.beautyProfile);

  useEffect(() => {
    dispatch(fetchBeautyProfile());
  }, [dispatch]);

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
        <div className="text-lg font-extrabold mb-4">{t.title}</div>
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
        <div className="text-lg font-extrabold mb-2">{t.title}</div>
        <p className="text-sm text-neutral-500">{t.empty}</p>
      </section>
    );
  }

  const skinTypeLabel = isRTL ? profile.skinType?.nameAr : profile.skinType?.nameEn;

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{t.title}</div>

      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="text-sm font-semibold mb-1">{t.skinType}</div>
          <div className="flex flex-wrap gap-2">
            <span
              className="px-3 py-1.5 rounded-xl border text-sm text-white"
              style={{ background: brand.primary }}
            >
              {skinTypeLabel}
            </span>
          </div>
        </div>

        {profile.skinConcerns?.length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-1">{t.concerns}</div>
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

        {profile.preferredIngredients?.length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-1">{t.preferred}</div>
            <div className="flex flex-wrap gap-2">
              {profile.preferredIngredients.map((ingredient) => (
                <span key={ingredient.id} className="px-3 py-1.5 rounded-xl border text-sm">
                  {isRTL ? ingredient.nameAr : ingredient.nameEn}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.avoidedIngredients?.length > 0 && (
          <div>
            <div className="text-sm font-semibold mb-1">{t.avoided}</div>
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

        {profile.allergies && (
          <div>
            <div className="text-sm font-semibold mb-1">{t.allergies}</div>
            <p className="text-sm text-neutral-600">{profile.allergies}</p>
          </div>
        )}
      </div>

      <a
        href="/catalog?personalized=1"
        className="inline-block mt-3 px-4 py-2 rounded-2xl text-white font-semibold"
        style={{ background: brand.primary }}
      >
        {t.cta}
      </a>
    </section>
  );
}
