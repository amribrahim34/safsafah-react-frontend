/**
 * SkinConcernsStep Component
 * Second step - Select skin concerns (multiple selection)
 */
import type { SkinConcern } from '@/types';
import { useParams } from 'next/navigation';
import enQuize from '@/locales/en/quize.json';
import arQuize from '@/locales/ar/quize.json';

interface SkinConcernsStepProps {
  skinConcerns: SkinConcern[];
  selectedConcerns: number[];
  onToggle: (concernIds: number[]) => void;
  primaryColor?: string;
}

export default function SkinConcernsStep({
  skinConcerns,
  selectedConcerns,
  onToggle,
  primaryColor,
}: SkinConcernsStepProps) {
  const handleToggle = (concernId: number) => {
    if (selectedConcerns.includes(concernId)) {
      onToggle(selectedConcerns.filter((id) => id !== concernId));
    } else {
      onToggle([...selectedConcerns, concernId]);
    }
  };

  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang = (locale === 'en' || locale === 'ar') ? locale : 'ar';
  const t = lang === 'en' ? enQuize : arQuize;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-1">{t.skinConcerns.title}</h3>
        <p className="text-sm text-neutral-600">{t.skinConcerns.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skinConcerns.map((concern) => {
          const isSelected = selectedConcerns.includes(concern.id);
          const name = lang === 'ar' ? concern.nameAr : concern.nameEn;

          return (
            <button
              key={concern.id}
              onClick={() => handleToggle(concern.id)}
              className={`
                px-4 py-2.5 rounded-full border-2 font-medium transition-all
                ${
                  isSelected
                    ? 'text-white shadow-md'
                    : 'text-neutral-700 border-neutral-200 hover:border-neutral-300'
                }
              `}
              style={
                isSelected
                  ? {
                      backgroundColor: primaryColor,
                      borderColor: primaryColor,
                    }
                  : {}
              }
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
