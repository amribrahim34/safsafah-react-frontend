/**
 * API Client
 *
 * Axios instance with interceptors for authentication, error handling,
 * and response transformation.
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '@/config';
import type { ApiResponse, ApiError } from '@/types';

/**
 * Custom error class for API errors
 */
export class ApiException extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

/**
 * Token management utilities
 */
export const tokenManager = {
  /**
   * Gets the authentication token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  /**
   * Sets the authentication token in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  },

  /**
   * Removes the authentication token from localStorage
   */
  removeToken(): void {
    localStorage.removeItem('auth_token');
  },

  /**
   * Gets the refresh token from localStorage
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  },

  /**
   * Sets the refresh token in localStorage
   */
  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  },

  /**
   * Removes the refresh token from localStorage
   */
  removeRefreshToken(): void {
    localStorage.removeItem('refresh_token');
  },

  /**
   * Clears all authentication tokens
   */
  clearTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  },
};

/**
 * Creates and configures the axios instance
 */
function createApiClient(): AxiosInstance {
  const client = axios.create({
    baseURL: env.VITE_API_BASE_URL,
    timeout: env.VITE_API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  /**
   * Request interceptor
   * Adds authentication token to requests if available
   */
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenManager.getToken();

      // Ensure headers object exists
      if (!config.headers) {
        config.headers = {} as any;
      }

      // Always set Content-Type and Accept for requests
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
      if (!config.headers['Accept']) {
        config.headers['Accept'] = 'application/json';
      }

      // Add authentication token if available
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development mode
      if (env.VITE_APP_ENV === 'development') {
        console.log('[API Request]', {
          method: config.method?.toUpperCase(),
          url: config.url,
          params: config.params,
          data: config.data,
          headers: config.headers,
        });
      }

      return config;
    },
    (error: AxiosError) => {
      console.error('[API Request Error]', error);
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor
   * Handles successful responses and errors
   */
  client.interceptors.response.use(
    (response) => {
      // Log response in development mode
      if (env.VITE_APP_ENV === 'development') {
        console.log('[API Response]', {
          status: response.status,
          url: response.config.url,
          data: response.data,
        });
      }

      return response;
    },
    async (error: AxiosError<ApiError>) => {
      // Log error in development mode
      if (env.VITE_APP_ENV === 'development') {
        console.error('[API Error]', {
          status: error.response?.status,
          url: error.config?.url,
          message: error.response?.data?.message || error.message,
          errors: error.response?.data?.errors,
        });
      }

      // Handle authentication errors
      if (error.response?.status === 401) {
        // Clear tokens on authentication failure
        tokenManager.clearTokens();

        // Redirect to login page (you may want to use your router here)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }

      // Handle network errors
      if (!error.response) {
        throw new ApiException(
          'Network error. Please check your internet connection.',
          0
        );
      }

      // Transform error response
      const apiError = error.response.data;
      throw new ApiException(
        apiError?.message || 'An unexpected error occurred',
        error.response.status,
        apiError?.errors
      );
    }
  );

  return client;
}

/**
 * The configured API client instance
 */
export const apiClient = createApiClient();

/**
 * Type-safe wrapper for GET requests
 */
export async function get<T>(
  url: string,
  params?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  const response = await apiClient.get<ApiResponse<T>>(url, { params });
  return response.data;
}

/**
 * Type-safe wrapper for POST requests
 */
export async function post<T, D = unknown>(
  url: string,
  data?: D
): Promise<ApiResponse<T>> {
  const response = await apiClient.post<ApiResponse<T>>(url, data);
  return response.data;
}

/**
 * Type-safe wrapper for PUT requests
 */
export async function put<T, D = unknown>(
  url: string,
  data?: D
): Promise<ApiResponse<T>> {
  const response = await apiClient.put<ApiResponse<T>>(url, data);
  return response.data;
}

/**
 * Type-safe wrapper for PATCH requests
 */
export async function patch<T, D = unknown>(
  url: string,
  data?: D
): Promise<ApiResponse<T>> {
  const response = await apiClient.patch<ApiResponse<T>>(url, data);
  return response.data;
}

/**
 * Type-safe wrapper for DELETE requests
 */
export async function del<T>(url: string): Promise<ApiResponse<T>> {
  const response = await apiClient.delete<ApiResponse<T>>(url);
  return response.data;
}
