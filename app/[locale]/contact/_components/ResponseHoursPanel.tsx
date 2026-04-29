interface ResponseHoursPanelTranslations {
  title: string;
  hours: string;
  tipsTitle: string;
  tips: string[];
}

interface ResponseHoursPanelProps {
  t: ResponseHoursPanelTranslations;
}

export default function ResponseHoursPanel({ t }: ResponseHoursPanelProps) {
  return (
    <div className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-neutral-50">
      <div className="text-lg font-extrabold">{t.title}</div>
      <p className="text-neutral-700 mt-1 text-sm">{t.hours}</p>
      <hr className="my-4" />
      <div className="text-lg font-extrabold">{t.tipsTitle}</div>
      <ul className="list-disc ms-5 text-sm text-neutral-700 mt-1 space-y-1">
        {t.tips.map((tip, i) => (
          <li key={i}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
