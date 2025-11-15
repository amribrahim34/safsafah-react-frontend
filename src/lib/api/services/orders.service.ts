/**
 * Orders Service
 *
 * Handles all order-related API calls including order creation,
 * fetching order history, tracking, and order management.
 */

import { get, post, patch } from '../client';
import type {
  Order,
  CreateOrderRequest,
  CreateOrderApiRequest,
  UpdateOrderRequest,
  OrderFilters,
  OrderSearchResult,
  OrderTracking,
  ApiResponse,
} from '@/types';

export const ordersService = {
  /**
   * Creates a new order
   * @param orderData - Order creation data
   * @returns Created order details
   */
  async createOrder(orderData: CreateOrderApiRequest): Promise<Order> {
    const response = await post<Order, CreateOrderApiRequest>('/orders', orderData);
    return response.data;
  },

  /**
   * Fetches user's order history
   * @param filters - Filtering and pagination options
   * @returns Paginated order list
   */
  async getOrders(filters?: OrderFilters): Promise<OrderSearchResult> {
    const response = await get<OrderSearchResult>('/orders', filters);
    return response.data;
  },

  /**
   * Fetches paginated orders with optional status filter
   * @param page - Page number (0-indexed)
   * @param size - Page size
   * @param status - Optional order status filter
   * @returns Paginated order list with metadata
   */
  async getPaginatedOrders(page: number = 0, size: number = 10, status?: string): Promise<any> {
    const params: any = { page, size };
    if (status) params.status = status;
    const response = await get<any>('/orders/paginated', params);
    // The get() function already returns response.data from axios
    // Your API returns the full object: { status, orders, pagination, message }
    return response;
  },

  /**
   * Fetches a single order by ID
   * @param orderId - The order ID
   * @returns Order details
   */
  async getOrder(orderId: string): Promise<Order> {
    const response = await get<Order>(`/orders/${orderId}`);
    return response.data;
  },

  /**
   * Updates an order (e.g., cancel, update status)
   * @param orderId - The order ID to update
   * @param updateData - Order update data
   * @returns Updated order
   */
  async updateOrder(orderId: string, updateData: Partial<UpdateOrderRequest>): Promise<Order> {
    const response = await patch<Order, Partial<UpdateOrderRequest>>(
      `/orders/${orderId}`,
      updateData
    );
    return response.data;
  },

  /**
   * Cancels an order
   * @param orderId - The order ID to cancel
   * @param reason - Cancellation reason
   * @returns Updated order
   */
  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    const response = await post<Order>(`/orders/${orderId}/cancel`, {
      cancellationReason: reason,
    });
    return response.data;
  },

  /**
   * Fetches order tracking information
   * @param orderId - The order ID
   * @returns Tracking details
   */
  async getOrderTracking(orderId: string): Promise<OrderTracking> {
    const response = await get<OrderTracking>(`/orders/${orderId}/tracking`);
    return response.data;
  },

  /**
   * Initiates a return for an order
   * @param orderId - The order ID
   * @param reason - Return reason
   * @param items - Items to return (optional, all items if not specified)
   * @returns Updated order with return information
   */
  async initiateReturn(
    orderId: string,
    reason: string,
    items?: Array<{ productId: string; quantity: number }>
  ): Promise<Order> {
    const response = await post<Order>(`/orders/${orderId}/return`, {
      reason,
      items,
    });
    return response.data;
  },

  /**
   * Downloads order invoice
   * @param orderId - The order ID
   * @returns Invoice URL or blob
   */
  async downloadInvoice(orderId: string): Promise<string> {
    const response = await get<{ url: string }>(`/orders/${orderId}/invoice`);
    return response.data.url;
  },

  /**
   * Submits a review for an order
   * @param orderId - The order ID
   * @param rating - Order rating (1-5)
   * @param comment - Review comment
   * @returns Success response
   */
  async submitOrderReview(
    orderId: string,
    rating: number,
    comment: string
  ): Promise<ApiResponse<void>> {
    return await post<void>(`/orders/${orderId}/review`, {
      rating,
      comment,
    });
  },

  /**
   * Gets order statistics for the current user
   * @returns Order statistics
   */
  async getOrderStatistics(): Promise<{
    totalOrders: number;
    totalSpent: number;
    pendingOrders: number;
    completedOrders: number;
  }> {
    const response = await get<{
      totalOrders: number;
      totalSpent: number;
      pendingOrders: number;
      completedOrders: number;
    }>('/orders/statistics');
    return response.data;
  },
};
