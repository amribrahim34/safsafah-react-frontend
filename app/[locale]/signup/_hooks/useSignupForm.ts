'use client';

import { useState, useCallback, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register, clearError } from '@/store/slices/authSlice';
import { fetchCart } from '@/store/slices/cartsSlice';
import { useLocaleRouter, type Locale } from '@/lib/locale-navigation';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^(01|\+201)[0-9]{8,10}$/;
const MIN_PASSWORD_LENGTH = 6;

function validateName(name: string, isRTL: boolean): string {
  if (name.trim().split(' ').length < 2) {
    return isRTL ? 'اكتب الاسم بالكامل' : 'Enter full name';
  }
  return '';
}

function validateEmail(email: string, isRTL: boolean): string {
  if (!EMAIL_REGEX.test(email.trim())) {
    return isRTL ? 'بريد إلكتروني غير صالح' : 'Invalid email';
  }
  return '';
}

function validateMobile(mobile: string, isRTL: boolean): string {
  if (!MOBILE_REGEX.test(mobile.trim())) {
    return isRTL ? 'رقم موبايل غير صالح' : 'Invalid mobile number';
  }
  return '';
}

function validatePassword(password: string, isRTL: boolean): string {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return isRTL ? 'كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters';
  }
  return '';
}

function validateTerms(agree: boolean, isRTL: boolean): string {
  if (!agree) {
    return isRTL ? 'يجب الموافقة على الشروط' : 'You must agree to the terms';
  }
  return '';
}

export function useSignupForm(locale: Locale) {
  const dispatch = useAppDispatch();
  const router = useLocaleRouter();
  const { isLoading, error: authError } = useAppSelector((state) => state.auth);
  const isRTL = locale === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(true);
  const [validationError, setValidationError] = useState('');

  const displayError = validationError || authError;

  const clearErrors = useCallback(() => {
    if (validationError) setValidationError('');
    if (authError) dispatch(clearError());
  }, [validationError, authError, dispatch]);

  const handleNameChange = useCallback((value: string) => {
    setName(value);
    clearErrors();
  }, [clearErrors]);

  const handleEmailChange = useCallback((value: string) => {
    setEmail(value);
    clearErrors();
  }, [clearErrors]);

  const handleMobileChange = useCallback((value: string) => {
    setMobile(value);
    clearErrors();
  }, [clearErrors]);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    clearErrors();
  }, [clearErrors]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleAgreeChange = useCallback((checked: boolean) => {
    setAgree(checked);
    clearErrors();
  }, [clearErrors]);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameError = validateName(name, isRTL);
    if (nameError) { setValidationError(nameError); return; }

    const emailError = validateEmail(email, isRTL);
    if (emailError) { setValidationError(emailError); return; }

    const mobileError = validateMobile(mobile, isRTL);
    if (mobileError) { setValidationError(mobileError); return; }

    const passwordError = validatePassword(password, isRTL);
    if (passwordError) { setValidationError(passwordError); return; }

    const termsError = validateTerms(agree, isRTL);
    if (termsError) { setValidationError(termsError); return; }

    setValidationError('');
    dispatch(clearError());

    const result = await dispatch(
      register({
        name: name.trim(),
        email: email.trim(),
        password,
        passwordConfirmation: password,
        phone: mobile.trim(),
      })
    );

    if (register.fulfilled.match(result)) {
      dispatch(fetchCart());
      router.push('/');
    }
  }, [name, email, mobile, password, agree, isRTL, dispatch, router]);

  return {
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
  } as const;
}
