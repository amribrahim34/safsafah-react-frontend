import React from "react";

export default function ResultsMeta({ lang, count, total }) {
  return (
    <div className="mb-3 text-sm text-neutral-600">
      {lang === "ar" ? `يُعرض ${count} من ${total}` : `Showing ${count} of ${total}`}
    </div>
  );
}
