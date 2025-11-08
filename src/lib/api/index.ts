/**
 * API Module Index
 *
 * Main export point for the API module.
 * Provides access to the API client, services, and utilities.
 *
 * @example
 * // Import services
 * import { authService, productsService } from '@/lib/api';
 *
 * @example
 * // Import client utilities
 * import { apiClient, tokenManager } from '@/lib/api';
 *
 * @example
 * // Import types
 * import type { ApiException } from '@/lib/api';
 */

// Export API client and utilities
export { apiClient, tokenManager, ApiException } from './client';
export { get, post, put, patch, del } from './client';

// Export all services
export * from './services';
