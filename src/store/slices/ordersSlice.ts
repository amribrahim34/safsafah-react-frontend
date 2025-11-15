/**
 * Orders Slice
 *
 * Redux Toolkit slice for orders state management.
 * Handles fetching orders, creating orders, and order tracking.
 */

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { ordersService } from '@/lib/api';
import type {
  Order,
  CreateOrderApiRequest,
  OrderFilters,
  OrderSearchResult,
} from '@/types';

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
