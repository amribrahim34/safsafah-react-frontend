'use client';

interface TermsCheckboxProps {
  checked: boolean;
  isRTL: boolean;
  disabled: boolean;
  onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({ checked, isRTL, disabled, onChange }: TermsCheckboxProps) {
  return (
    <label className="flex items-center gap-2 mt-4 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={disabled ? 'cursor-not-allowed' : ''}
      />
      <span>
        {isRTL
          ? 'أوافق على الشروط وسياسة الخصوصية'
          : 'I agree to the Terms & Privacy Policy'}
      </span>
    </label>
  );
}
