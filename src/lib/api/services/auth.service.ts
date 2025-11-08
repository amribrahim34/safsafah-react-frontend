/**
 * Authentication Service
 *
 * Handles all authentication-related API calls including login, registration,
 * password reset, and token management.
 */

import { post } from '../client';
import { tokenManager } from '../client';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ApiResponse,
} from '@/types';

export const authService = {
  /**
   * Authenticates a user with email and password
   * @param credentials - User email and password
   * @returns Authentication response with user data and token
   * @note Token storage is handled by Redux slice
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await post<AuthResponse, LoginRequest>('/auth/login', credentials);
    return response;
  },

  /**
   * Registers a new user account
   * @param userData - User registration information
   * @returns Authentication response with user data and token
   * @note Token storage is handled by Redux slice
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await post<AuthResponse, RegisterRequest>('/auth/register', userData);
    return response;
  },

  /**
   * Logs out the current user
   * Clears tokens and optionally notifies the backend
   */
  async logout(): Promise<void> {
    try {
      // Optionally call logout endpoint to invalidate token on server
      await post('/auth/logout');
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local tokens
      tokenManager.clearTokens();
    }
  },


  /**
   * Initiates password reset process
   * @param email - User's email address
   * @returns Success message
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<void>> {
    return await post<void, ForgotPasswordRequest>('/auth/forgot-password', data);
  },

  /**
   * Resets user password with reset token
   * @param data - Reset token and new password
   * @returns Success message
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<void>> {
    return await post<void, ResetPasswordRequest>('/auth/reset-password', data);
  },

  /**
   * Verifies if user is authenticated
   * @returns True if user has a valid token
   */
  isAuthenticated(): boolean {
    return !!tokenManager.getToken();
  },

  /**
   * Gets the current authentication token
   * @returns The auth token or null
   */
  getToken(): string | null {
    return tokenManager.getToken();
  },
};
