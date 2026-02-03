// Order and payment related types based on actual usage
import { LocalizedText, Address } from './common';
import { AppliedPromoCode } from './cart';

export type OrderStatus = 'Placed' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Returned' | 'Canceled' | 'Refunded';

export type PaymentMethod = 'card' | 'wallet' | 'cod' | 'bank_transfer' | 'installments';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  estimatedDays: number;
  isFree: boolean;
  minOrderAmount: number;
  isActive: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  img: string;
  name: LocalizedText;
  brand: string;
  sku?: string;
  rating?: number;
  review?: string;
}

export interface OrderTrackingStage {
  status: string;
  description: string;
  timestamp: string;
  location?: string;
  notes?: string;
}

export interface OrderTracking {
  orderId: string;
  trackingNumber?: string;
  carrier?: string;
  carrierUrl?: string;
  stages: OrderTrackingStage[];
  estimatedDelivery?: string;
  actualDelivery?: string;
}

export interface OrderPayment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  transactionId?: string;
  gateway?: string;
  gatewayTransactionId?: string;
  processedAt?: string;
  failureReason?: string;
  metadata?: Record<string, any>;
}

export interface OrderRefund {
  id: string;
  orderId: string;
  amount: number;
  reason: string;
  status: string;
  processedAt: string;
  method: string;
  transactionId?: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress?: Address;
  shippingMethod?: ShippingMethod;
  payment?: OrderPayment;
  tracking?: OrderTracking;
  refunds?: OrderRefund[];
  promoCode?: AppliedPromoCode;
  notes?: string;
  date: string;
  eta?: string;
  returnInfo?: {
    state: string;
    reason?: string;
    date?: string;
  };
  stages: string[];
  imgKey?: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export interface CreateOrderRequest {
  userId: string;
  cartItemIds: string[];
  shippingAddress: Address;
  billingAddress?: Address;
  shippingMethodId: string;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  notes?: string;
}

// Actual API request format for creating orders
export interface CreateOrderApiRequest {
  customerName: string;
  customerAddress?: string;
  customerMobile: string;
  latitude?: string;
  longitude?: string;
  deliveryNotes?: string;
  paymentType: 'CASH_ON_DELIVERY' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'WALLET' | 'BANK_TRANSFER';
  addressId?: number; // Send this when using a saved address
}

export interface UpdateOrderRequest {
  orderId: string;
  status?: OrderStatus;
  notes?: string;
  cancellationReason?: string;
}

export interface OrderFilters {
  userId?: string;
  status?: OrderStatus[];
  dateFrom?: string;
  dateTo?: string;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  [key: string]: unknown; // Index signature for compatibility with Record<string, unknown>
}

export interface OrderSearchResult {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  pendingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  statusBreakdown: Record<string, number>;
  monthlyRevenue: Record<string, number>;
  topProducts: Array<{ productId: string; count: number; revenue: number }>;
}
