/**
 * Common API Types
 *
 * Shared type definitions used across all API services.
 */

/**
 * API error response structure
 */
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

/**
 * HTTP methods supported by the API
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Request configuration options
 */
export interface RequestConfig {
  requiresAuth?: boolean;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
}
