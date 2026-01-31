import React from "react";

export default function FilterGroup({ title, open, onToggle, children }) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2 font-semibold"
        type="button"
        aria-expanded={open}
        aria-controls={`fg-${title}`}
      >
        <span>{title}</span>
        <span className="text-neutral-500">{open ? "−" : "+"}</span>
      </button>
      {open && <div id={`fg-${title}`} className="pt-1">{children}</div>}
      <div className="h-px bg-neutral-200 mt-3" />
    </div>
  );
}
