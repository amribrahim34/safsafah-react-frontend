import React from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
}

export default function FormInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  type = "text",
  inputMode,
  className = "",
}: FormInputProps) {
  return (
    <label className="block mb-3">
      <div className="text-sm font-semibold mb-1">{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        inputMode={inputMode}
        className={`w-full rounded-2xl border px-3 py-2 ${
          error ? "border-red-500" : "border-neutral-300"
        } ${className}`}
        placeholder={placeholder}
      />
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </label>
  );
}
