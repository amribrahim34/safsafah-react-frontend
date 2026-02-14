'use client';

import { useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError } from '@/store/slices/authSlice';
import { useLocale, useLocaleRouter, getOppositeLocale } from '@/lib/locale-navigation';
import { useDir } from '@/hooks/useDir';
import { BRAND } from '@/content/brand';
import { IMG } from '@/content/images';

import AuthHeroPanel from '@/components/auth/AuthHeroPanel';
import LoginModePills from './_components/LoginModePills';
import PasswordInput from './_components/PasswordInput';
import { useLoginForm } from './_hooks/useLoginForm';

const IDENTIFIER_CONFIG = {
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

export default function LoginPage() {
  const locale = useLocale();
  const router = useLocaleRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useDir();

  const isRTL = locale === 'ar';

  const {
    mode,
    identifier,
    password,
    showPassword,
    isLoading,
    displayError,
    handleModeChange,
    handleIdentifierChange,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useLoginForm(locale);

  useEffect(() => {
    if (isAuthenticated) router.push('/');
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const config = IDENTIFIER_CONFIG[mode];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="grid min-h-screen md:grid-cols-2">
        <AuthHeroPanel
          imageSrc={IMG.login}
          subtitle={isRTL ? 'دخول سريع لإدارة طلباتك وتتبع الشحن.' : 'Sign in to manage orders and track delivery.'}
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
                {isRTL ? 'تسجيل الدخول' : 'Sign in'}
              </h1>
              <p className="text-neutral-600 mt-1 mb-6">
                {isRTL
                  ? 'استخدم البريد الإلكتروني أو الموبايل. بدون رمز تحقق.'
                  : 'Use email or mobile. No OTP needed.'}
              </p>

              <LoginModePills
                mode={mode}
                isRTL={isRTL}
                disabled={isLoading}
                onModeChange={handleModeChange}
              />

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-neutral-200 p-4 md:p-6 bg-white"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Identifier input */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? config.labelAr : config.labelEn}
                    </div>
                    <input
                      value={identifier}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleIdentifierChange(e.target.value)}
                      inputMode={config.inputMode}
                      placeholder={isRTL ? config.placeholderAr : config.placeholder}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${
                        isRTL ? 'text-right' : ''
                      } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  <PasswordInput
                    value={password}
                    isRTL={isRTL}
                    disabled={isLoading}
                    showPassword={showPassword}
                    onChange={handlePasswordChange}
                    onToggleVisibility={togglePasswordVisibility}
                  />
                </div>

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
                    ? isRTL ? 'جاري تسجيل الدخول...' : 'Signing in...'
                    : isRTL ? 'تسجيل الدخول' : 'Sign in'}
                </button>

                <div className="text-xs text-neutral-600 mt-2">
                  {isRTL
                    ? 'بالمتابعة أنت توافق على الشروط وسياسة الخصوصية.'
                    : 'By continuing you agree to the Terms & Privacy Policy.'}
                </div>
              </form>

              <div className="text-sm text-neutral-700 mt-4">
                {isRTL ? 'لا تملك حسابًا؟' : "Don't have an account?"}{' '}
                <a href="/signup" className="font-semibold" style={{ color: BRAND.primary }}>
                  {isRTL ? 'إنشاء حساب' : 'Create one'}
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile hero strip */}
        <div className="md:hidden relative h-48">
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
