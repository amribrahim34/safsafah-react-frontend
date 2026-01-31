/**
 * Types Index
 *
 * Main export point for all application types.
 * Organized into:
 * - models: Domain models (Product, User, Order, etc.)
 * - api: API-related types (requests, responses, errors)
 * - services: Service-specific types
 */

// Export all model types
export * from './models';

// Export all API types
export * from './api';

// Export all service types
export * from './services';

// Re-export commonly used types for convenience
export type {
  Language,
  LocalizedText,
  Address,
  AddressResponse,
  ApiResponse,
  PaginationParams,
} from './models/common';

export type { Brand } from './models/brand';

export type {
  Product,
  ProductFilters,
  ProductSearchResult,
} from './models/product';

export type {
  User,
  UserTier,
} from './models/user';

export type { CartItem } from './models/cart';

export type {
  Order,
  OrderStatus,
  PaymentMethod,
  CreateOrderRequest,
  CreateOrderApiRequest,
} from './models/order';

export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from './api/auth.types';

export type { ApiError, HttpMethod } from './api/common.types';
