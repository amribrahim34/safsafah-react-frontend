import React from "react";

export default function VisionMission({ brand, t }) {
  return (
    <section className="py-6 md:py-10 grid md:grid-cols-2 gap-4">
      <div className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-neutral-50">
        <div className="text-sm font-semibold opacity-70">{t.visionLabel}</div>
        <h3 className="mt-1 text-lg md:text-xl font-extrabold">{t.visionText}</h3>
      </div>
      <div className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-white">
        <div className="text-sm font-semibold opacity-70">{t.missionLabel}</div>
        <p className="mt-1 text-neutral-800 leading-relaxed">{t.missionText}</p>
      </div>
    </section>
  );
}
