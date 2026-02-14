/**
 * Authentication API Types
 *
 * Type definitions for authentication-related API requests and responses.
 */

import type { AddressResponse } from '../models/common';

/**
 * Login request payload
 * Supports login via email or mobile number
 */
export interface LoginRequest {
  email?: string;
  mobile?: string;
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
  user: {
    id: number;
    name: string;
    email: string;
    mobile: string;
    points: number;
    addresses: AddressResponse[];
  };
  token: string;
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
