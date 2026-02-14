'use client';

import { BRAND } from '@/content/brand';
import type { LoginMode } from '../_hooks/useLoginForm';

interface LoginModePillsProps {
  mode: LoginMode;
  isRTL: boolean;
  disabled: boolean;
  onModeChange: (mode: LoginMode) => void;
}

const MODE_OPTIONS: { value: LoginMode; labelAr: string; labelEn: string }[] = [
  { value: 'email', labelAr: 'البريد الإلكتروني', labelEn: 'Email' },
  { value: 'mobile', labelAr: 'الموبايل', labelEn: 'Mobile' },
];

export default function LoginModePills({ mode, isRTL, disabled, onModeChange }: LoginModePillsProps) {
  return (
    <div className="inline-flex rounded-2xl border border-neutral-200 p-1 mb-4 bg-neutral-50">
      {MODE_OPTIONS.map(({ value, labelAr, labelEn }) => {
        const isActive = mode === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onModeChange(value)}
            disabled={disabled}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{
              background: isActive ? BRAND.primary : 'transparent',
              color: isActive ? '#fff' : undefined,
            }}
          >
            {isRTL ? labelAr : labelEn}
          </button>
        );
      })}
    </div>
  );
}
