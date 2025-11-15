import React from "react";

/**
 * Reusable form textarea component with validation support
 */
export default function FormTextarea({
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  className = "",
  minHeight = "80px",
}) {
  return (
    <label className="block mb-3">
      <div className="text-sm font-semibold mb-1">{label}</div>
      <textarea
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full rounded-2xl border px-3 py-2 ${
          error ? "border-red-500" : "border-neutral-300"
        } ${className}`}
        style={{ minHeight }}
        placeholder={placeholder}
      />
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </label>
  );
}
