'use client';

import { ChangeEvent } from 'react';
import { BRAND } from '@/content/brand';

interface PasswordInputProps {
  value: string;
  isRTL: boolean;
  disabled: boolean;
  showPassword: boolean;
  onChange: (value: string) => void;
  onToggleVisibility: () => void;
}

export default function PasswordInput({
  value,
  isRTL,
  disabled,
  showPassword,
  onChange,
  onToggleVisibility,
}: PasswordInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value);

  return (
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
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={handleChange}
          placeholder="••••••••"
          disabled={disabled}
          className={`w-full rounded-2xl border border-neutral-300 px-3 py-3 ${
            disabled ? 'bg-neutral-50 cursor-not-allowed' : ''
          }`}
          style={{ outlineColor: BRAND.primary }}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          disabled={disabled}
          className={`absolute top-1/2 -translate-y-1/2 text-sm text-neutral-700 ${
            isRTL ? 'left-3' : 'right-3'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {showPassword ? (isRTL ? 'إخفاء' : 'Hide') : isRTL ? 'إظهار' : 'Show'}
        </button>
      </div>
    </label>
  );
}
