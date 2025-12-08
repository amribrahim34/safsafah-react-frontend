/**
 * Beauty Profile API Types
 *
 * API response types for beauty questionnaire endpoints.
 */

import type {
  BeautyQuestionnaireOptions,
  BeautyProfile,
  CreateBeautyProfileRequest,
  UpdateBeautyProfileRequest,
} from '../models/beauty-profile';

/**
 * Beauty Questionnaire Options API Response
 */
export interface BeautyQuestionnaireResponse {
  status: 'success' | 'error';
  data: BeautyQuestionnaireOptions;
  message: string;
}

/**
 * Beauty Profile API Response
 */
export interface BeautyProfileResponse {
  status: 'success' | 'error';
  beautyProfile: BeautyProfile;
  message: string;
}

/**
 * Export request types for convenience
 */
export type { CreateBeautyProfileRequest, UpdateBeautyProfileRequest };
