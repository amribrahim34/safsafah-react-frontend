/**
 * Beauty Profile Service
 *
 * Handles all beauty profile and questionnaire-related API calls.
 */

import { get, post, put } from '../client';
import type {
  BeautyQuestionnaireResponse,
  BeautyProfileResponse,
  CreateBeautyProfileRequest,
  UpdateBeautyProfileRequest,
} from '@/types/api/beauty-profile.types';
import type {
  BeautyQuestionnaireOptions,
  BeautyProfile,
} from '@/types/models/beauty-profile';

export const beautyProfileService = {
  /**
   * Fetches beauty questionnaire options
   * Returns all available skin types, concerns, and ingredients
   * @returns Beauty questionnaire options
   */
  async getQuestionnaireOptions(): Promise<BeautyQuestionnaireOptions> {
    const response = await get<BeautyQuestionnaireResponse>('/beauty-questionnaire');

    // Handle different response structures
    if ('data' in response && response.data) {
      return (response as any).data;
    }

    // If the API returns data directly wrapped
    return response as unknown as BeautyQuestionnaireOptions;
  },

  /**
   * Creates a new beauty profile
   * @param profileData - Beauty profile data
   * @returns Created beauty profile
   */
  async createBeautyProfile(
    profileData: CreateBeautyProfileRequest
  ): Promise<BeautyProfile> {
    const response = await post<BeautyProfileResponse>('/beauty-profile', profileData);

    // Handle different response structures
    if ('beautyProfile' in response) {
      return (response as any).beautyProfile;
    }

    if ('data' in response && response.data) {
      return (response as any).data;
    }

    return response as unknown as BeautyProfile;
  },

  /**
   * Fetches the user's current beauty profile
   * @returns User's beauty profile
   */
  async getBeautyProfile(): Promise<BeautyProfile> {
    const response = await get<BeautyProfileResponse>('/beauty-profile');

    // Handle different response structures
    if ('beautyProfile' in response) {
      return (response as any).beautyProfile;
    }

    if ('data' in response && response.data) {
      return (response as any).data;
    }

    return response as unknown as BeautyProfile;
  },

  /**
   * Updates the user's beauty profile
   * @param profileData - Updated profile data
   * @returns Updated beauty profile
   */
  async updateBeautyProfile(
    profileData: UpdateBeautyProfileRequest
  ): Promise<BeautyProfile> {
    const response = await put<BeautyProfileResponse>('/beauty-profile', profileData);

    // Handle different response structures
    if ('beautyProfile' in response) {
      return (response as any).beautyProfile;
    }

    if ('data' in response && response.data) {
      return (response as any).data;
    }

    return response as unknown as BeautyProfile;
  },
};
