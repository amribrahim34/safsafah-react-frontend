'use client';

import { useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError } from '@/store/slices/authSlice';
import { useLocale, useLocaleRouter, getOppositeLocale } from '@/lib/locale-navigation';
import { useDir } from '@/hooks/useDir';
import { BRAND } from '@/content/brand';
import { IMG } from '@/content/images';

import AuthHeroPanel from '@/components/auth/AuthHeroPanel';
import PasswordInput from './_components/PasswordInput';
import TermsCheckbox from './_components/TermsCheckbox';
import { useSignupForm } from './_hooks/useSignupForm';

const FIELD_CONFIG = {
  name: {
    inputMode: 'text' as const,
    labelAr: 'الاسم بالكامل',
    labelEn: 'Full name',
    placeholder: 'First & last name',
    placeholderAr: 'الاسم الأول واسم العائلة',
  },
  email: {
    inputMode: 'email' as const,
    labelAr: 'البريد الإلكتروني',
    labelEn: 'Email',
    placeholder: 'name@example.com',
    placeholderAr: 'name@example.com',
  },
  mobile: {
    inputMode: 'tel' as const,
    labelAr: 'رقم الموبايل',
    labelEn: 'Mobile number',
    placeholder: '01xxxxxxxxx or +201xxxxxxxxx',
    placeholderAr: '01xxxxxxxxx أو +201xxxxxxxxx',
  },
};

export default function SignupPage() {
  const locale = useLocale();
  const router = useLocaleRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useDir();

  const isRTL = locale === 'ar';

  const {
    name,
    email,
    mobile,
    password,
    showPassword,
    agree,
    isLoading,
    displayError,
    handleNameChange,
    handleEmailChange,
    handleMobileChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleAgreeChange,
    handleSubmit,
  } = useSignupForm(locale);

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="grid min-h-screen md:grid-cols-2">
        <AuthHeroPanel
          imageSrc={IMG.signup}
          subtitle={isRTL ? 'انضمي إلى مجتمع الجمال في مصر.' : "Join Egypt's beauty community."}
        />

        <main className="flex flex-col">
          {/* Language switch */}
          <div className="flex items-center justify-end px-5 py-4">
            <button
              onClick={() => router.switchLocale(getOppositeLocale(locale))}
              className="text-sm px-3 py-1.5 rounded-xl border"
              style={{ borderColor: BRAND.primary, color: BRAND.primary }}
            >
              {isRTL ? 'English' : 'العربية'}
            </button>
          </div>

          <div className="flex-1 flex items-center">
            <div className="w-full max-w-xl md:max-w-[42rem] mx-auto px-5">
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {isRTL ? 'إنشاء حساب' : 'Create account'}
              </h1>
              <p className="text-neutral-600 mt-1 mb-6">
                {isRTL
                  ? 'سجّل باسمك وبريدك أو رقم موبايلك.'
                  : 'Sign up with your name, email and mobile.'}
              </p>

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-neutral-200 p-4 md:p-6 bg-white"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Full name (spans 2) */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? FIELD_CONFIG.name.labelAr : FIELD_CONFIG.name.labelEn}
                    </div>
                    <input
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
                      inputMode={FIELD_CONFIG.name.inputMode}
                      placeholder={isRTL ? FIELD_CONFIG.name.placeholderAr : FIELD_CONFIG.name.placeholder}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${
                        isRTL ? 'text-right' : ''
                      } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Email */}
                  <label>
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? FIELD_CONFIG.email.labelAr : FIELD_CONFIG.email.labelEn}
                    </div>
                    <input
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailChange(e.target.value)}
                      inputMode={FIELD_CONFIG.email.inputMode}
                      placeholder={isRTL ? FIELD_CONFIG.email.placeholderAr : FIELD_CONFIG.email.placeholder}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${
                        isRTL ? 'text-right' : ''
                      } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Mobile */}
                  <label>
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? FIELD_CONFIG.mobile.labelAr : FIELD_CONFIG.mobile.labelEn}
                    </div>
                    <input
                      value={mobile}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleMobileChange(e.target.value)}
                      inputMode={FIELD_CONFIG.mobile.inputMode}
                      placeholder={isRTL ? FIELD_CONFIG.mobile.placeholderAr : FIELD_CONFIG.mobile.placeholder}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${
                        isRTL ? 'text-right' : ''
                      } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Password (spans 2) */}
                  <PasswordInput
                    value={password}
                    isRTL={isRTL}
                    disabled={isLoading}
                    showPassword={showPassword}
                    onChange={handlePasswordChange}
                    onToggleVisibility={togglePasswordVisibility}
                  />
                </div>

                <TermsCheckbox
                  checked={agree}
                  isRTL={isRTL}
                  disabled={isLoading}
                  onChange={handleAgreeChange}
                />

                {displayError && (
                  <div
                    className="text-sm text-red-600 mt-2 p-3 rounded-xl bg-red-50 border border-red-200"
                    role="alert"
                  >
                    {displayError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-4 md:mt-6 px-5 py-3 rounded-2xl text-white font-semibold transition-opacity ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                  style={{ background: BRAND.primary }}
                >
                  {isLoading
                    ? isRTL ? 'جاري إنشاء الحساب...' : 'Creating account...'
                    : isRTL ? 'إنشاء حساب' : 'Create account'}
                </button>

                <div className="text-sm text-neutral-700 mt-3">
                  {isRTL ? 'لديك حساب؟' : 'Already have an account?'}{' '}
                  <a href="/login" className="font-semibold" style={{ color: BRAND.primary }}>
                    {isRTL ? 'تسجيل الدخول' : 'Sign in'}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </main>

        {/* Mobile hero strip */}
        <div className="md:hidden relative h-40">
          <img
            src={IMG.bannerTall}
            alt="Skincare"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>
    </div>
  );
}
