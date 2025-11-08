/**
 * Authentication API Types
 *
 * Type definitions for authentication-related API requests and responses.
 */

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * User registration request payload
 */
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone?: string;
}

/**
 * Authentication response from login/register
 * Matches the actual backend API response
 */
export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  name: string;
  type: string; // e.g., "Bearer"
}

/**
 * Refresh token request payload
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Forgot password request payload
 */
export interface ForgotPasswordRequest {
  email: string;
}

/**
 * Reset password request payload
 */
export interface ResetPasswordRequest {
  token: string;
  password: string;
  passwordConfirmation: string;
}
