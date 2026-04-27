/**
 * IngredientsStep Component
 * Third step - Select preferred and avoided ingredients, and allergies
 */

import { useParams } from 'next/navigation';
import { useState } from 'react';



interface IngredientsStepProps {
  ingredients: {
    id: number;
    nameAr: string;
    nameEn: string;
  }[];
  selectedPreferred: number[];
  selectedAvoided: number[];
  allergies: string;
  onPreferredChange: (ids: number[]) => void;
  onAvoidedChange: (ids: number[]) => void;
  onAllergiesChange: (value: string) => void;
  primaryColor: string;
}

export default function IngredientsStep({
  ingredients,
  selectedPreferred,
  selectedAvoided,
  allergies,
  onPreferredChange,
  onAvoidedChange,
  onAllergiesChange,
  primaryColor,
}:IngredientsStepProps ) {
  const [activeTab, setActiveTab] = useState('preferred'); // 'preferred' or 'avoided'

  const translations = {
    title: { ar: 'المكونات والحساسية', en: 'Ingredients & Allergies' },
    description: {
      ar: 'ساعدنا في تخصيص توصياتنا بناءً على تفضيلاتك',
      en: 'Help us personalize recommendations based on your preferences',
    },
    preferred: { ar: 'مكونات مفضلة', en: 'Preferred Ingredients' },
    avoided: { ar: 'مكونات يجب تجنبها', en: 'Ingredients to Avoid' },
    allergiesLabel: { ar: 'الحساسية (اختياري)', en: 'Allergies (Optional)' },
    allergiesPlaceholder: {
      ar: 'مثال: حساسية من العطور، المكسرات...',
      en: 'Example: fragrance sensitivity, nuts...',
    },
    optional: { ar: '(اختياري)', en: '(Optional)' },
  };

  const handlePreferredToggle = (ingredientId : number) => {
    if (selectedPreferred.includes(ingredientId)) {
      onPreferredChange(selectedPreferred.filter((id) => id !== ingredientId));
    } else {
      onPreferredChange([...selectedPreferred, ingredientId]);
    }
  };

  const handleAvoidedToggle = (ingredientId: number) => {
    if (selectedAvoided.includes(ingredientId)) {
      onAvoidedChange(selectedAvoided.filter((id) => id !== ingredientId));
    } else {
      onAvoidedChange([...selectedAvoided, ingredientId]);
    }
  };
  const params = useParams();
  const locale = params?.locale as string | undefined;
  const lang =  (locale === 'en' || locale === 'ar') ? locale : 'ar';


  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-bold mb-1">{translations.title[lang]}</h3>
        <p className="text-sm text-neutral-600">{translations.description[lang]}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('preferred')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'preferred'
              ? 'border-current'
              : 'border-transparent text-neutral-500 hover:text-neutral-700'
          }`}
          style={activeTab === 'preferred' ? { color: primaryColor } : {}}
        >
          {translations.preferred[lang]}
        </button>
        <button
          onClick={() => setActiveTab('avoided')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'avoided'
              ? 'border-current'
              : 'border-transparent text-neutral-500 hover:text-neutral-700'
          }`}
          style={activeTab === 'avoided' ? { color: primaryColor } : {}}
        >
          {translations.avoided[lang]}
        </button>
      </div>

      {/* Preferred Ingredients */}
      {activeTab === 'preferred' && (
        <div className="flex flex-wrap gap-2 min-h-[120px]">
          {ingredients.map((ingredient) => {
            const isSelected = selectedPreferred.includes(ingredient.id);
            const name = lang === 'ar' ? ingredient.nameAr : ingredient.nameEn;

            return (
              <button
                key={ingredient.id}
                onClick={() => handlePreferredToggle(ingredient.id)}
                className={`
                  px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
                  ${
                    isSelected
                      ? 'text-white shadow-sm'
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
      )}

      {/* Avoided Ingredients */}
      {activeTab === 'avoided' && (
        <div className="flex flex-wrap gap-2 min-h-[120px]">
          {ingredients.map((ingredient) => {
            const isSelected = selectedAvoided.includes(ingredient.id);
            const name = lang === 'ar' ? ingredient.nameAr : ingredient.nameEn;

            return (
              <button
                key={ingredient.id}
                onClick={() => handleAvoidedToggle(ingredient.id)}
                className={`
                  px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all
                  ${
                    isSelected
                      ? 'text-white bg-red-500 border-red-500 shadow-sm'
                      : 'text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  }
                `}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}

      {/* Allergies Textarea */}
      <div className="pt-2">
        <label className="block mb-2">
          <span className="text-sm font-medium text-neutral-700">
            {translations.allergiesLabel[lang]}
          </span>
        </label>
        <textarea
          value={allergies}
          onChange={(e) => onAllergiesChange(e.target.value)}
          placeholder={translations.allergiesPlaceholder[lang]}
          rows={3}
          className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
          
        />
      </div>
    </div>
  );
}

