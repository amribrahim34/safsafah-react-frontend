/**
 * SkinCareQuize Page
 * Beauty questionnaire with dynamic data fetching
 */
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BRAND } from '@/content/brand';
import { COPY } from '@/content/copy';
import { useDir } from '@/hooks/useDir';
import { useBeautyQuestionnaire, useBeautyProfileSubmit } from '@/hooks/useBeautyQuestionnaire';

// Layout components
import PromoBar from '@/components/header/PromoBar';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import BottomTabs from '@/components/appchrome/BottomTabs';
import FloatingCart from '@/components/appchrome/FloatingCart';

// Quiz components
import {
  QuizProgress,
  QuizNavigation,
  SkinTypeStep,
  SkinConcernsStep,
  IngredientsStep,
  QuizLoader,
  QuizError,
} from '@/components/beauty-quiz';

const TOTAL_STEPS = 3;

export default function SkinCareQuize() {
  const router = useRouter();
  const [lang, setLang] = useState('ar');
  const T = useMemo(() => COPY[lang], [lang]);
  useDir(lang);

  // Fetch questionnaire options
  const { data: questionnaireData, loading, error } = useBeautyQuestionnaire();
  const { submitProfile, loading: submitting, error: submitError } = useBeautyProfileSubmit();

  // Quiz state
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    skinTypeId: null,
    skinConcernIds: [],
    allergies: '',
    preferredIngredientIds: [],
    avoidedIngredientIds: [],
  });

  // Translations
  const translations = {
    pageTitle: {
      ar: 'اكتشف روتين العناية المثالي لبشرتك',
      en: 'Discover Your Perfect Skincare Routine',
    },
    pageDescription: {
      ar: 'أجب على بعض الأسئلة البسيطة وسنساعدك في اختيار المنتجات المناسبة لبشرتك واحتياجاتك',
      en: 'Answer a few simple questions and we\'ll help you choose the right products for your skin',
    },
    submitButton: {
      ar: 'احفظ ملفي الجمالي',
      en: 'Save My Beauty Profile',
    },
    successMessage: {
      ar: 'تم حفظ ملفك الجمالي بنجاح! سنوجهك الآن...',
      en: 'Your beauty profile has been saved successfully! Redirecting...',
    },
  };

  // Handlers
  const handleNext = useCallback(() => {
    if (step < TOTAL_STEPS - 1) {
      setStep((prev) => prev + 1);
    }
  }, [step]);

  const handleBack = useCallback(() => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  }, [step]);

  const handleSubmit = useCallback(async () => {
    try {
      // Validate required fields
      if (!formData.skinTypeId) {
        alert(lang === 'ar' ? 'يرجى اختيار نوع البشرة' : 'Please select a skin type');
        return;
      }

      if (formData.skinConcernIds.length === 0) {
        alert(
          lang === 'ar'
            ? 'يرجى اختيار مشكلة واحدة على الأقل'
            : 'Please select at least one concern'
        );
        return;
      }

      // Submit the profile
      await submitProfile(formData);

      // Show success message
      alert(translations.successMessage[lang]);

      // Redirect to profile or home page after 1 second
      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (err) {
      console.error('Failed to submit beauty profile:', err);
      alert(
        submitError ||
        (lang === 'ar'
          ? 'حدث خطأ أثناء حفظ الملف. يرجى المحاولة مرة أخرى'
          : 'An error occurred while saving. Please try again')
      );
    }
  }, [formData, submitProfile, router, lang, translations, submitError]);

  // Retry loading questionnaire
  const handleRetry = useCallback(() => {
    // window.location.reload();
  }, []);

  // Update handlers
  const handleSkinTypeSelect = useCallback((skinTypeId) => {
    setFormData((prev) => ({ ...prev, skinTypeId }));
  }, []);

  const handleConcernsChange = useCallback((skinConcernIds) => {
    setFormData((prev) => ({ ...prev, skinConcernIds }));
  }, []);

  const handlePreferredChange = useCallback((preferredIngredientIds) => {
    setFormData((prev) => ({ ...prev, preferredIngredientIds }));
  }, []);

  const handleAvoidedChange = useCallback((avoidedIngredientIds) => {
    setFormData((prev) => ({ ...prev, avoidedIngredientIds }));
  }, []);

  const handleAllergiesChange = useCallback((allergies) => {
    setFormData((prev) => ({ ...prev, allergies }));
  }, []);

  // Determine if current step is valid
  const isStepValid = useMemo(() => {
    switch (step) {
      case 0:
        return formData.skinTypeId !== null;
      case 1:
        return formData.skinConcernIds.length > 0;
      case 2:
        return true; // This step is optional
      default:
        return false;
    }
  }, [step, formData]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <PromoBar
        text={T.promo}
        lang={lang}
        onToggleLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
        brand={BRAND}
      />
      <Header brand={BRAND} searchPlaceholder={T.search} lang={lang} />

      {/* Page Header */}
      <section className="max-w-3xl mx-auto px-4 pt-8 pb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-2 text-neutral-900">
          {translations.pageTitle[lang]}
        </h1>
        <p className="text-neutral-600 leading-relaxed">{translations.pageDescription[lang]}</p>
      </section>

      {/* Quiz Content */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="rounded-2xl border-2 border-neutral-100 p-6 md:p-8 shadow-sm bg-white">
          {/* Loading State */}
          {loading && <QuizLoader lang={lang} />}

          {/* Error State */}
          {error && !loading && <QuizError lang={lang} error={error} onRetry={handleRetry} />}

          {/* Quiz Steps */}
          {!loading && !error && questionnaireData && (
            <>
              <QuizProgress
                currentStep={step}
                totalSteps={TOTAL_STEPS}
                primaryColor={BRAND.primary}
              />

              {/* Step 0: Skin Type */}
              {step === 0 && (
                <SkinTypeStep
                  lang={lang}
                  skinTypes={questionnaireData.skinTypes}
                  selectedSkinType={formData.skinTypeId}
                  onSelect={handleSkinTypeSelect}
                />
              )}

              {/* Step 1: Skin Concerns */}
              {step === 1 && (
                <SkinConcernsStep
                  lang={lang}
                  skinConcerns={questionnaireData.skinConcerns}
                  selectedConcerns={formData.skinConcernIds}
                  onToggle={handleConcernsChange}
                  primaryColor={BRAND.primary}
                />
              )}

              {/* Step 2: Ingredients & Allergies */}
              {step === 2 && (
                <IngredientsStep
                  lang={lang}
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

              {/* Navigation */}
              <QuizNavigation
                lang={lang}
                onBack={handleBack}
                onNext={step === TOTAL_STEPS - 1 ? handleSubmit : handleNext}
                showBack={step > 0}
                nextLabel={step === TOTAL_STEPS - 1 ? translations.submitButton[lang] : undefined}
                isLoading={submitting}
                primaryColor={BRAND.primary}
              />

              {/* Validation message */}
              {!isStepValid && step < TOTAL_STEPS - 1 && (
                <p className="text-sm text-amber-600 mt-4">
                  {lang === 'ar'
                    ? 'يرجى إكمال هذه الخطوة للمتابعة'
                    : 'Please complete this step to continue'}
                </p>
              )}
            </>
          )}
        </div>
      </section>

      <Footer brand={BRAND} lang={lang} copy={T} />
      <FloatingCart brand={BRAND} />
      <BottomTabs
        labels={{
          home: lang === 'ar' ? 'الرئيسية' : 'Home',
          cats: lang === 'ar' ? 'الفئات' : 'Categories',
          cart: lang === 'ar' ? 'السلة' : 'Bag',
          wish: lang === 'ar' ? 'المفضلة' : 'Wishlist',
          account: lang === 'ar' ? 'حسابي' : 'Account',
        }}
      />
    </div>
  );
}
