/**
 * Orders Slice
 *
 * Redux Toolkit slice for orders state management.
 * Handles fetching orders, creating orders, and order tracking.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersService } from '@/lib/api';
import type {
  Order,
  CreateOrderApiRequest,
  OrderFilters,
  OrderSearchResult,
} from '@/types';

/**
 * Paginated order item from API
 */
export interface PaginatedOrderItem {
  id: number;
  userId: number;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  address: {
    id: number;
    user_id: number;
    name: string | null;
    latitude: number;
    longitude: number;
    details: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
  };
  items: Array<{
    id: number;
    orderId: number;
    quantity: number;
    unitPrice: number;
    total: number;
    product: {
      id: number;
      nameAr: string;
      nameEn: string;
      descriptionAr: string;
      descriptionEn: string;
      categoryId: number;
      brandId: number;
      price: number;
      sku: string;
      createdAt: string;
      updatedAt: string;
      image: string;
    };
    createdAt: string;
    updatedAt: string;
  }>;
}

/**
 * Paginated orders response (Laravel paginator format)
 */
export interface PaginatedOrdersResponse {
  data: PaginatedOrderItem[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}

/**
 * Orders state interface
 */
export interface OrdersState {
  orders: Order[];
  total: number;
  page: number;
  limit: number;
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  // Paginated orders
  paginatedOrders: PaginatedOrderItem[];
  pagination: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
  } | null;
}

/**
 * Initial orders state
 */
const initialState: OrdersState = {
  orders: [],
  total: 0,
  page: 1,
  limit: 10,
  currentOrder: null,
  isLoading: false,
  error: null,
  paginatedOrders: [],
  pagination: null,
};

/**
 * Async thunk for creating an order
 */
export const createOrder = createAsyncThunk<Order, CreateOrderApiRequest, { rejectValue: string }>(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await ordersService.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create order');
    }
  }
);

/**
 * Async thunk for fetching orders
 */
export const fetchOrders = createAsyncThunk<
  OrderSearchResult,
  OrderFilters | undefined,
  { rejectValue: string }
>('orders/fetchOrders', async (filters, { rejectWithValue }) => {
  try {
    const response = await ordersService.getOrders(filters);
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch orders');
  }
});

/**
 * Async thunk for fetching single order
 */
export const fetchOrder = createAsyncThunk<Order, string, { rejectValue: string }>(
  'orders/fetchOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await ordersService.getOrder(orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch order');
    }
  }
);

/**
 * Async thunk for cancelling an order
 */
export const cancelOrder = createAsyncThunk<
  Order,
  { orderId: string; reason?: string },
  { rejectValue: string }
>('orders/cancelOrder', async ({ orderId, reason }, { rejectWithValue }) => {
  try {
    const response = await ordersService.cancelOrder(orderId, reason);
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to cancel order');
  }
});

/**
 * Async thunk for fetching paginated orders
 */
export const fetchPaginatedOrders = createAsyncThunk<
  PaginatedOrdersResponse,
  { page?: number; size?: number; status?: string },
  { rejectValue: string }
>('orders/fetchPaginatedOrders', async ({ page = 0, size = 10, status }, { rejectWithValue }) => {
  try {
    const response = await ordersService.getPaginatedOrders(page, size, status);
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch paginated orders');
  }
});

/**
 * Orders slice
 */
const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    /**
     * Clear any errors
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Clear current order
     */
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    /**
     * Reset filters
     */
    resetFilters: (state) => {
      state.page = 1;
      state.limit = 10;
    },
  },
  extraReducers: (builder) => {
    // Create order
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
        // Add to list if it exists
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to create order';
      });

    // Fetch orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch orders';
      });

    // Fetch single order
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch order';
      });

    // Cancel order
    builder
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to cancel order';
      });

    // Fetch paginated orders
    builder
      .addCase(fetchPaginatedOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paginatedOrders = action.payload.data;
        const { meta, links } = action.payload;
        state.pagination = {
          currentPage: meta.current_page,
          lastPage: meta.last_page,
          perPage: meta.per_page,
          total: meta.total,
          hasNext: links.next !== null,
          hasPrevious: links.prev !== null,
        };
        state.error = null;
      })
      .addCase(fetchPaginatedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch paginated orders';
      });
  },
});

/**
 * Export actions
 */
export const { clearError, clearCurrentOrder, resetFilters } = ordersSlice.actions;

/**
 * Export reducer
 */
export default ordersSlice.reducer;
