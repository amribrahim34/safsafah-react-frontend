'use client';

import { useState, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { BRAND } from '@/content/brand';
import { COPY } from '@/content/copy';
import enQuize from '@/locales/en/quize.json';
import arQuize from '@/locales/ar/quize.json';
import { useDir } from '@/hooks/useDir';
import { useBeautyQuestionnaire, useBeautyProfileSubmit } from './_hooks/useBeautyQuestionnaire';

import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import FloatingCart from '@/components/appchrome/FloatingCart';

import {
  QuizProgress,
  QuizNavigation,
  SkinTypeStep,
  SkinConcernsStep,
  IngredientsStep,
  QuizLoader,
  QuizError,
} from './_components';

const TOTAL_STEPS = 3;

type Lang = 'ar' | 'en';

interface FormData {
  skinTypeId: number | null;
  skinConcernIds: number[];
  allergies: string;
  preferredIngredientIds: number[];
  avoidedIngredientIds: number[];
}

export default function SkinCareQuize() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang: Lang = locale === 'en' || locale === 'ar' ? locale : 'ar';

  const T = useMemo(() => COPY[lang], [lang]);
  const t = lang === 'en' ? enQuize : arQuize;
  useDir();

  const { data: questionnaireData, loading, error } = useBeautyQuestionnaire();
  const { submitProfile, loading: submitting, error: submitError } = useBeautyProfileSubmit();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    skinTypeId: null,
    skinConcernIds: [],
    allergies: '',
    preferredIngredientIds: [],
    avoidedIngredientIds: [],
  });

  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) setStep((prev) => prev + 1);
  }, [step]);

  const handleBack = useCallback(() => {
    if (step > 0) setStep((prev) => prev - 1);
  }, [step]);

  const handleSubmit = useCallback(async () => {
    try {
      if (!formData.skinTypeId) {
        alert(t.alerts.noSkinType);
        return;
      }
      if (formData.skinConcernIds.length === 0) {
        alert(t.alerts.noConcerns);
        return;
      }
      await submitProfile({ ...formData, skinTypeId: formData.skinTypeId as number });
      alert(t.successMessage);
      setTimeout(() => router.push('/account'), 1000);
    } catch (err) {
      console.error('Failed to submit beauty profile:', err);
      alert(submitError || t.alerts.saveError);
    }
  }, [formData, submitProfile, router, submitError, t]);

  const handleRetry = useCallback(() => {}, []);

  const handleSkinTypeSelect = useCallback((skinTypeId: number) => {
    setFormData((prev) => ({ ...prev, skinTypeId }));
  }, []);

  const handleConcernsChange = useCallback((skinConcernIds: number[]) => {
    setFormData((prev) => ({ ...prev, skinConcernIds }));
  }, []);

  const handlePreferredChange = useCallback((preferredIngredientIds: number[]) => {
    setFormData((prev) => ({ ...prev, preferredIngredientIds }));
  }, []);

  const handleAvoidedChange = useCallback((avoidedIngredientIds: number[]) => {
    setFormData((prev) => ({ ...prev, avoidedIngredientIds }));
  }, []);

  const handleAllergiesChange = useCallback((allergies: string) => {
    setFormData((prev) => ({ ...prev, allergies }));
  }, []);

  const isStepValid = useMemo(() => {
    switch (step) {
      case 0:
        return formData.skinTypeId !== null;
      case 1:
        return formData.skinConcernIds.length > 0;
      case 2:
        return true;
      default:
        return false;
    }
  }, [step, formData]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar text={T.promo} brand={BRAND} />
      <Header brand={BRAND} searchPlaceholder={T.search} />

      <section className="max-w-5xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-neutral-900">
          {t.pageTitle}
        </h1>
        <p className="text-neutral-600 leading-relaxed">{t.pageDescription}</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="rounded-2xl border-2 border-neutral-100 p-6 md:p-8 shadow-sm bg-white">
          {loading && <QuizLoader />}

          {error && !loading && <QuizError error={error} onRetry={handleRetry} />}

          {!loading && !error && questionnaireData && (
            <>
              <QuizProgress
                currentStep={step}
                totalSteps={TOTAL_STEPS}
                primaryColor={BRAND.primary}
              />

              {step === 0 && (
                <SkinTypeStep
                  skinTypes={questionnaireData.skinTypes}
                  selectedSkinType={formData.skinTypeId}
                  onSelect={handleSkinTypeSelect}
                />
              )}

              {step === 1 && (
                <SkinConcernsStep
                  skinConcerns={questionnaireData.skinConcerns}
                  selectedConcerns={formData.skinConcernIds}
                  onToggle={handleConcernsChange}
                  primaryColor={BRAND.primary}
                />
              )}

              {step === 2 && (
                <IngredientsStep
                  ingredients={questionnaireData.activeIngredients}
                  selectedPreferred={formData.preferredIngredientIds}
                  selectedAvoided={formData.avoidedIngredientIds}
                  allergies={formData.allergies}
                  onPreferredChange={handlePreferredChange}
                  onAvoidedChange={handleAvoidedChange}
                  onAllergiesChange={handleAllergiesChange}
                  primaryColor={BRAND.primary}
                />
              )}

              <QuizNavigation
                lang={lang}
                onBack={handleBack}
                onNext={step === TOTAL_STEPS - 1 ? handleSubmit : handleNext}
                showBack={step > 0}
                nextLabel={step === TOTAL_STEPS - 1 ? t.submitButton : undefined}
                isLoading={submitting}
                primaryColor={BRAND.primary}
              />

              {!isStepValid && step < TOTAL_STEPS - 1 && (
                <p className="text-sm text-amber-600 mt-4">{t.stepHint}</p>
              )}
            </>
          )}
        </div>
      </section>

      <Footer brand={BRAND} />
      <FloatingCart brand={BRAND} />
    </div>
  );
}
