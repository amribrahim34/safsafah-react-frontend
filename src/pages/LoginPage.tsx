import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BRAND } from '../content/brand';
import { useDir } from '../hooks/useDir';
import { IMG } from '../content/images';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, clearError } from '@/store/slices/authSlice';
import { fetchCart } from '@/store/slices/cartsSlice';
import type { Language } from '@/types';

type LoginMode = 'email' | 'mobile';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux state
  const { isLoading, error: authError, isAuthenticated } = useAppSelector((state) => state.auth);

  const [lang, setLang] = useState<Language>('ar');
  useDir(lang);
  const isRTL = lang === 'ar';

  // Form state
  const [mode, setMode] = useState<LoginMode>('email');
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPw, setShowPw] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  // Combine validation error and auth error
  const displayError = validationError || authError;

  /**
   * Redirect if already authenticated
   */
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Clear errors on unmount
   */
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  /**
   * Validates form inputs based on current mode
   * @returns Error message if validation fails, empty string otherwise
   */
  const validate = (): string => {
    if (mode === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier.trim())) {
        return isRTL ? 'أدخل بريدًا إلكترونيًا صحيحًا' : 'Enter a valid email address';
      }
    } else {
      // Egypt mobile number validation
      const mobileRegex = /^(01|\+201)[0-9]{8,10}$/;
      if (!mobileRegex.test(identifier.trim())) {
        return isRTL ? 'أدخل رقم موبايل صحيحًا' : 'Enter a valid mobile number';
      }
    }

    if (password.length < 6) {
      return isRTL
        ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
        : 'Password must be at least 6 characters';
    }

    return '';
  };

  /**
   * Handles form submission and authentication
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

    // Dispatch login action
    const result = await dispatch(
      login({
        email: identifier.trim(),
        password: password,
      })
    );

    // Check if login was successful
    if (login.fulfilled.match(result)) {
      // Fetch cart after successful login
      dispatch(fetchCart());

      // Show success message
      const successMessage = isRTL
        ? `مرحبًا ${result.payload.name}!`
        : `Welcome back, ${result.payload.name}!`;

      alert(successMessage);

      // Navigate to home page
      navigate('/');
    }
  };

  /**
   * Handles input change events with type safety
   */
  const handleIdentifierChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
    // Clear errors when user starts typing
    if (validationError) setValidationError('');
    if (authError) dispatch(clearError());
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear errors when user starts typing
    if (validationError) setValidationError('');
    if (authError) dispatch(clearError());
  };

  /**
   * Toggles between email and mobile login modes
   */
  const handleModeChange = (newMode: LoginMode) => {
    setMode(newMode);
    setIdentifier('');
    setValidationError('');
    dispatch(clearError());
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Split auth layout: image + form (no header/footer) */}
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Visual side */}
        <aside className="relative hidden md:block">
          <img
            src={IMG.bannerWide}
            alt="Skincare visual"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)',
            }}
          />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="text-3xl font-black tracking-tight">SAFSAFAH</div>
            <p className="mt-1 text-sm opacity-90">
              {isRTL
                ? 'دخول سريع لإدارة طلباتك وتتبع الشحن.'
                : 'Sign in to manage orders and track delivery.'}
            </p>
          </div>
        </aside>

        {/* Form side */}
        <main className="flex flex-col">
          {/* Simple top bar with language switch */}
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
            {/* Wider container on desktop */}
            <div className="w-full max-w-xl md:max-w-[42rem] mx-auto px-5">
              <h1 className="text-2xl md:text-3xl font-extrabold">
                {isRTL ? 'تسجيل الدخول' : 'Sign in'}
              </h1>
              <p className="text-neutral-600 mt-1 mb-6">
                {isRTL
                  ? 'استخدم البريد الإلكتروني أو الموبايل. بدون رمز تحقق.'
                  : 'Use email or mobile. No OTP needed.'}
              </p>

              {/* Mode pills */}
              <div className="inline-flex rounded-2xl border border-neutral-200 p-1 mb-4 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => handleModeChange('email')}
                  disabled={isLoading}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    mode === 'email' ? 'text-white' : ''
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{
                    background: mode === 'email' ? BRAND.primary : 'transparent',
                    color: mode === 'email' ? '#fff' : undefined,
                  }}
                >
                  {isRTL ? 'البريد الإلكتروني' : 'Email'}
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('mobile')}
                  disabled={isLoading}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    mode === 'mobile' ? 'text-white' : ''
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{
                    background: mode === 'mobile' ? BRAND.primary : 'transparent',
                    color: mode === 'mobile' ? '#fff' : undefined,
                  }}
                >
                  {isRTL ? 'الموبايل' : 'Mobile'}
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-neutral-200 p-4 md:p-6 bg-white"
              >
                {/* Two-column on wide screens to feel airier */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Identifier input */}
                  <label className="md:col-span-2">
                    <div className="text-sm font-semibold mb-1">
                      {mode === 'email'
                        ? isRTL
                          ? 'البريد الإلكتروني'
                          : 'Email'
                        : isRTL
                        ? 'رقم الموبايل'
                        : 'Mobile number'}
                    </div>
                    <input
                      value={identifier}
                      onChange={handleIdentifierChange}
                      inputMode={mode === 'email' ? 'email' : 'tel'}
                      placeholder={
                        mode === 'email'
                          ? isRTL
                            ? 'name@example.com'
                            : 'name@example.com'
                          : isRTL
                          ? '01xxxxxxxxx أو +201xxxxxxxxx'
                          : '01xxxxxxxxx or +201xxxxxxxxx'
                      }
                      disabled={isLoading}
                      className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${
                        isRTL ? 'text-right' : ''
                      } ${isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''}`}
                      style={{ outlineColor: BRAND.primary }}
                    />
                  </label>

                  {/* Password input */}
                  <label className="md:col-span-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold mb-1">
                        {isRTL ? 'كلمة المرور' : 'Password'}
                      </div>
                      <a href="/forgot" className="text-xs underline text-neutral-700">
                        {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder={isRTL ? '••••••••' : '••••••••'}
                        disabled={isLoading}
                        className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${
                          isLoading ? 'bg-neutral-50 cursor-not-allowed' : ''
                        }`}
                        style={{ outlineColor: BRAND.primary }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((prev) => !prev)}
                        disabled={isLoading}
                        className={`absolute top-1/2 -translate-y-1/2 text-sm text-neutral-700 ${
                          isRTL ? 'left-3' : 'right-3'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {showPw ? (isRTL ? 'إخفاء' : 'Hide') : isRTL ? 'إظهار' : 'Show'}
                      </button>
                    </div>
                  </label>
                </div>

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
                  className={`w-full mt-4 md:mt-6 px-5 py-3 rounded-2xl text-white font-semibold transition-opacity ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                  style={{ background: BRAND.primary }}
                >
                  {isLoading
                    ? isRTL
                      ? 'جاري تسجيل الدخول...'
                      : 'Signing in...'
                    : isRTL
                    ? 'تسجيل الدخول'
                    : 'Sign in'}
                </button>

                {/* Terms & Privacy */}
                <div className="text-xs text-neutral-600 mt-2">
                  {isRTL
                    ? 'بالمتابعة أنت توافق على الشروط وسياسة الخصوصية.'
                    : 'By continuing you agree to the Terms & Privacy Policy.'}
                </div>
              </form>

              {/* Sign up link */}
              <div className="text-sm text-neutral-700 mt-4">
                {isRTL ? 'لا تملك حسابًا؟' : "Don't have an account?"}{' '}
                <a href="/signup" className="font-semibold" style={{ color: BRAND.primary }}>
                  {isRTL ? 'إنشاء حساب' : 'Create one'}
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Mobile hero image at the top (shows when md:hidden) */}
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
