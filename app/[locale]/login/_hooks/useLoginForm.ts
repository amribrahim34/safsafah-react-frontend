'use client';

import { useState, useCallback, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, clearError } from '@/store/slices/authSlice';
import { fetchCart } from '@/store/slices/cartsSlice';
import { useLocaleRouter, type Locale } from '@/lib/locale-navigation';

type LoginMode = 'email' | 'mobile';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^(01|\+201)[0-9]{8,10}$/;
const MIN_PASSWORD_LENGTH = 6;

function validateIdentifier(mode: LoginMode, value: string, isRTL: boolean): string {
  if (mode === 'email' && !EMAIL_REGEX.test(value.trim())) {
    return isRTL ? 'أدخل بريدًا إلكترونيًا صحيحًا' : 'Enter a valid email address';
  }
  if (mode === 'mobile' && !MOBILE_REGEX.test(value.trim())) {
    return isRTL ? 'أدخل رقم موبايل صحيحًا' : 'Enter a valid mobile number';
  }
  return '';
}

function validatePassword(password: string, isRTL: boolean): string {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters';
  }
  return '';
}

export function useLoginForm(locale: Locale) {
  const dispatch = useAppDispatch();
  const router = useLocaleRouter();
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);
  const isRTL = locale === 'ar';

  const [mode, setMode] = useState<LoginMode>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState('');

  const displayError = validationError || authError;

  const clearErrors = useCallback(() => {
    if (validationError) setValidationError('');
    if (authError) dispatch(clearError());
  }, [validationError, authError, dispatch]);

  const handleModeChange = useCallback((newMode: LoginMode) => {
    setMode(newMode);
    setIdentifier('');
    setValidationError('');
    dispatch(clearError());
  }, [dispatch]);

  const handleIdentifierChange = useCallback((value: string) => {
    setIdentifier(value);
    clearErrors();
  }, [clearErrors]);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    clearErrors();
  }, [clearErrors]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const identifierError = validateIdentifier(mode, identifier, isRTL);
    if (identifierError) {
      setValidationError(identifierError);
      return;
    }

    const passwordError = validatePassword(password, isRTL);
    if (passwordError) {
      setValidationError(passwordError);
      return;
    }

    setValidationError('');
    dispatch(clearError());

    const credentials =
      mode === 'email'
        ? { email: identifier.trim(), password }
        : { mobile: identifier.trim(), password };

    const result = await dispatch(login(credentials));

    if (login.fulfilled.match(result)) {
      dispatch(fetchCart());
      router.push('/');
    }
  }, [mode, identifier, password, isRTL, dispatch, router]);

  return {
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
  } as const;
}

export type { LoginMode };
