/**
 * Beauty Profile Types
 *
 * Type definitions for beauty questionnaire and profile data.
 */

/**
 * Skin Type Model
 */
export interface SkinType {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Skin Concern Model
 */
export interface SkinConcern {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

/**
 * Active Ingredient Model
 */
export interface ActiveIngredient {
  id: number;
  nameAr: string;
  nameEn: string;
}

/**
 * Beauty Questionnaire Options Response
 */
export interface BeautyQuestionnaireOptions {
  skinTypes: SkinType[];
  skinConcerns: SkinConcern[];
  activeIngredients: ActiveIngredient[];
}

/**
 * Beauty Profile Model
 */
export interface BeautyProfile {
  id: number;
  userId: number;
  skinType: SkinType;
  skinConcerns: SkinConcern[];
  allergies: string;
  preferredIngredients: ActiveIngredient[];
  avoidedIngredients: ActiveIngredient[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Beauty Profile Create Request
 */
export interface CreateBeautyProfileRequest {
  skinTypeId: number;
  skinConcernIds: number[];
  allergies?: string;
  preferredIngredientIds?: number[];
  avoidedIngredientIds?: number[];
}

/**
 * Beauty Profile Update Request
 */
export interface UpdateBeautyProfileRequest extends Partial<CreateBeautyProfileRequest> {}
