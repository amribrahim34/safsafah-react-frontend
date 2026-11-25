export interface LandingGalleryImage {
  id: string;
  src: string;
  altAr: string;
  altEn: string;
  captionAr?: string;
  captionEn?: string;
  badgeAr?: string;
  badgeEn?: string;
}

export interface IngredientHighlight {
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: string;
}

export interface SkinUseCaseItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  badgeAr: string;
  badgeEn: string;
}

export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  category: 'usage' | 'safety' | 'results' | 'shipping';
}

export interface DrAlthea345ProductData {
  id: number;
  slug: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  size: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  inStock: boolean;
  stockCount: number;
  images: LandingGalleryImage[];
  ingredients: IngredientHighlight[];
  useCases: SkinUseCaseItem[];
  faqs: FAQItem[];
  highlightsAr: string[];
  highlightsEn: string[];
  safetyBadgesAr: string[];
  safetyBadgesEn: string[];
}
