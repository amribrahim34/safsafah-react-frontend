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

export interface ReviewItem {
  id: string;
  author: string;
  cityAr: string;
  cityEn: string;
  rating: number;
  date: string;
  titleAr: string;
  titleEn: string;
  commentAr: string;
  commentEn: string;
  verified: boolean;
  highlightAr?: string;
  highlightEn?: string;
}

export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  category: 'usage' | 'safety' | 'results' | 'shipping';
}

export interface BojAquaFreshProductData {
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
  rating: number;
  ratingCount: number;
  inStock: boolean;
  stockCount: number;
  images: LandingGalleryImage[];
  ingredients: IngredientHighlight[];
  useCases: SkinUseCaseItem[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  highlightsAr: string[];
  highlightsEn: string[];
  safetyBadgesAr: string[];
  safetyBadgesEn: string[];
}
