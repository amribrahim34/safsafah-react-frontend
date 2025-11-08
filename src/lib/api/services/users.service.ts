/**
 * Users Service
 *
 * Handles all user-related API calls including profile management,
 * address management, and user preferences.
 */

import { get, post, put, patch, del } from '../client';
import type {
  User,
  Address,
  ApiResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  NotificationPreferences,
} from '@/types';

export const usersService = {
  /**
   * Fetches the current user's profile
   * @returns User profile data
   */
  async getProfile(): Promise<User> {
    const response = await get<User>('/users/me');
    return response.data;
  },

  /**
   * Updates the current user's profile
   * @param profileData - Profile update data
   * @returns Updated user profile
   */
  async updateProfile(profileData: UpdateProfileRequest): Promise<User> {
    const response = await patch<User, UpdateProfileRequest>('/users/me', profileData);
    return response.data;
  },

  /**
   * Changes user password
   * @param passwordData - Current and new password
   * @returns Success response
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<ApiResponse<void>> {
    return await post<void, ChangePasswordRequest>('/users/me/change-password', passwordData);
  },

  /**
   * Fetches user's saved addresses
   * @returns List of addresses
   */
  async getAddresses(): Promise<Address[]> {
    const response = await get<Address[]>('/users/me/addresses');
    return response.data;
  },

  /**
   * Adds a new address
   * @param address - Address data
   * @returns Created address
   */
  async addAddress(address: Omit<Address, 'id'>): Promise<Address> {
    const response = await post<Address>('/users/me/addresses', address);
    return response.data;
  },

  /**
   * Updates an existing address
   * @param addressId - The address ID
   * @param address - Updated address data
   * @returns Updated address
   */
  async updateAddress(addressId: string, address: Partial<Address>): Promise<Address> {
    const response = await put<Address>(`/users/me/addresses/${addressId}`, address);
    return response.data;
  },

  /**
   * Deletes an address
   * @param addressId - The address ID to delete
   * @returns Success response
   */
  async deleteAddress(addressId: string): Promise<void> {
    const response = await del<void>(`/users/me/addresses/${addressId}`);
    return response.data;
  },

  /**
   * Sets an address as default
   * @param addressId - The address ID to set as default
   * @returns Updated address
   */
  async setDefaultAddress(addressId: string): Promise<Address> {
    const response = await post<Address>(`/users/me/addresses/${addressId}/set-default`);
    return response.data;
  },

  /**
   * Uploads user avatar
   * @param file - Avatar image file
   * @returns Updated user with new avatar URL
   */
  async uploadAvatar(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await post<User>('/users/me/avatar', formData);
    return response.data;
  },

  /**
   * Deletes user avatar
   * @returns Updated user without avatar
   */
  async deleteAvatar(): Promise<User> {
    const response = await del<User>('/users/me/avatar');
    return response.data;
  },

  /**
   * Updates user notification preferences
   * @param preferences - Notification preferences
   * @returns Success response
   */
  async updateNotificationPreferences(
    preferences: NotificationPreferences
  ): Promise<ApiResponse<void>> {
    return await patch<void>('/users/me/preferences/notifications', preferences);
  },

  /**
   * Deactivates user account
   * @param reason - Reason for deactivation
   * @returns Success response
   */
  async deactivateAccount(reason?: string): Promise<ApiResponse<void>> {
    return await post<void>('/users/me/deactivate', { reason });
  },
};
