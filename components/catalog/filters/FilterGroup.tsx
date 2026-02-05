import React from "react";

interface FilterGroupProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export default function FilterGroup({ title, open, onToggle, children }: FilterGroupProps) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 font-semibold text-neutral-900 hover:text-neutral-700 transition-colors"
        type="button"
        aria-expanded={open}
        aria-controls={`fg-${title}`}
      >
        <span>{title}</span>
        <span className="text-neutral-500 text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div id={`fg-${title}`} className="pt-2">{children}</div>}
      <div className="h-px bg-neutral-200 mt-3" />
    </div>
  );
}
