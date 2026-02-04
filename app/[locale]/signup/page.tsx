'use client';

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BRAND } from '@/content/brand';
import { useDir } from '@/hooks/useDir';
import { IMG } from '@/content/images';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register, clearError } from '@/store/slices/authSlice';
import type { Language } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const { isLoading, error: authError, isAuthenticated } = useAppSelector((state) => state.auth);

  const [lang, setLang] = useState<Language>('ar');
  useDir();
  const isRTL = lang === 'ar';

  // Form state
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPw, setShowPw] = useState<boolean>(false);
  const [agree, setAgree] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string>('');

  // Combine validation error and auth error
  const displayError = validationError || authError;

  /**
   * Redirect if already authenticated
   */
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  /**
   * Clear errors on unmount
   */
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  /**
   * Validates form inputs
   * @returns Error message if validation fails, empty string otherwise
   */
  const validate = (): string => {
    if (name.trim().split(' ').length < 2) {
      return isRTL ? 'اكتب الاسم بالكامل' : 'Enter full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return isRTL ? 'بريد إلكتروني غير صالح' : 'Invalid email';
    }

    const mobileRegex = /^(01|\+201)[0-9]{8,10}$/;
    if (!mobileRegex.test(mobile.trim())) {
      return isRTL ? 'رقم موبايل غير صالح' : 'Invalid mobile number';
    }

    if (password.length < 6) {
      return isRTL ? 'كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters';
    }

    if (!agree) {
      return isRTL ? 'يجب الموافقة على الشروط' : 'You must agree to the terms';
    }

    return '';
  };

  /**
   * Handles form submission and registration
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    const error = validate();
    if (error) {
      setValidationError(error);
      return;
    }

    // Clear validation error
    setValidationError('');
    dispatch(clearError());

    // Dispatch register action
    const result = await dispatch(
      register({
        name: name.trim(),
        email: email.trim(),
        password: password,
        passwordConfirmation: password,
        phone: mobile.trim(),
      })
    );

    // Check if registration was successful
    if (register.fulfilled.match(result)) {
      // Show success message
      const successMessage = isRTL
        ? `مرحبًا ${result.payload.name}!`
        : `Welcome, ${result.payload.name}!`;

      alert(successMessage);

      // Navigate to home page
      router.push('/');
    }
  };

  /**
   * Clear errors when user types
   */
  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (validationError) setValidationError('');
    if (authError) dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Split layout: image (desktop) + form; no header/footer */}
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Visual side (desktop) */}
        <aside className="relative hidden md:block">
          <img
            src={IMG.signup}
            alt="Skincare visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="text-3xl font-black tracking-tight">SAFSAFAH</div>
            <p className="mt-1 text-sm opacity-90">
              {isRTL ? 'انضمي إلى مجتمع الجمال في مصر.' : "Join Egypt's beauty community."}
            </p>
          </div>
        </aside>

        {/* Form side */}
        <main className="flex flex-col">
          {/* Top bar: language switch */}
          <div className="flex items-center justify-end px-5 py-4">
            <button
              onClick={() => setLang(isRTL ? 'en' : 'ar')}
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
                  {/* Name (full) */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? 'الاسم بالكامل' : 'Full name'}
                    </div>
                    <input
                      value={name}
                      onChange={handleInputChange(setName)}
                      placeholder={isRTL ? 'الاسم الأول واسم العائلة' : 'First & last name'}
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isRTL ? 'text-right' : ''
                        } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Email */}
                  <label>
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'}
                    </div>
                    <input
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      inputMode="email"
                      placeholder="name@example.com"
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isRTL ? 'text-right' : ''
                        } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Mobile */}
                  <label>
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? 'رقم الموبايل' : 'Mobile number'}
                    </div>
                    <input
                      value={mobile}
                      onChange={handleInputChange(setMobile)}
                      inputMode="tel"
                      placeholder={
                        isRTL ? '01xxxxxxxxx أو +201xxxxxxxxx' : '01xxxxxxxxx or +201xxxxxxxxx'
                      }
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isRTL ? 'text-right' : ''
                        } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Password (spans 2) */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">
                      {isRTL ? 'كلمة المرور' : 'Password'}
                    </div>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        placeholder={isRTL ? '••••••••' : '••••••••'}
                        disabled={isLoading}
                        className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''
                          }`}
                        style={{ outlineColor: BRAND.primary }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((prev) => !prev)}
                        disabled={isLoading}
                        className={`absolute top-1/2 -translate-y-1/2 text-sm text-neutral-700 ${isRTL ? 'left-3' : 'right-3'
                          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {showPw ? (isRTL ? 'إخفاء' : 'Hide') : isRTL ? 'إظهار' : 'Show'}
                      </button>
                    </div>
                    <div className="text-xs text-neutral-600 mt-1">
                      {isRTL ? 'على الأقل 6 أحرف.' : 'At least 6 characters.'}
                    </div>
                  </label>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-center gap-2 mt-4 text-sm">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    disabled={isLoading}
                    className={isLoading ? 'cursor-not-allowed' : ''}
                  />
                  <span>
                    {isRTL
                      ? 'أوافق على الشروط وسياسة الخصوصية'
                      : 'I agree to the Terms & Privacy Policy'}
                  </span>
                </label>

                {/* Error message */}
                {displayError && (
                  <div
                    className="text-sm text-red-600 mt-2 p-3 rounded-xl bg-red-50 border border-red-200"
                    role="alert"
                  >
                    {displayError}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full mt-4 md:mt-6 px-5 py-3 rounded-2xl text-white font-semibold transition-opacity ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                  style={{ background: BRAND.primary }}
                >
                  {isLoading
                    ? isRTL
                      ? 'جاري إنشاء الحساب...'
                      : 'Creating account...'
                    : isRTL
                      ? 'إنشاء حساب'
                      : 'Create account'}
                </button>

                {/* Sign in link */}
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

        {/* Mobile hero (top strip) */}
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
