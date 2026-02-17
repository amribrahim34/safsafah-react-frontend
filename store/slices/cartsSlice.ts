
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '@/lib/api';
import type { CartResponse, AddToCartRequest } from '@/types';
import { logout } from './authSlice';

/**
 * Cart state interface
 */
interface CartState {
  cart: CartResponse | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial state
 */
const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

/**
 * Async thunk for fetching cart
 */
export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await cartService.getCart();
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch cart');
  }
});

/**
 * Async thunk for adding item to cart
 */
export const addToCart = createAsyncThunk(
  'cart/addItem',
  async (item: AddToCartRequest, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(item);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add item to cart');
    }
  }
);

/**
 * Async thunk for updating cart item quantity
 */
export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ itemId, quantity }: { itemId: number; quantity: number }, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCartItem(itemId.toString(), quantity);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update cart item');
    }
  }
);

/**
 * Async thunk for removing item from cart
 */
export const removeFromCart = createAsyncThunk(
  'cart/removeItem',
  async (itemId: number, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(itemId.toString());
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to remove item from cart');
    }
  }
);

/**
 * Async thunk for applying promo code
 */
export const applyPromoCode = createAsyncThunk(
  'cart/applyPromoCode',
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await cartService.applyPromoCode(code);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to apply promo code');
    }
  }
);

/**
 * Async thunk for removing promo code
 */
export const removePromoCode = createAsyncThunk(
  'cart/removePromoCode',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.removePromoCode();
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to remove promo code');
    }
  }
);

/**
 * Cart slice
 */
const cartsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      /**
       * Clear any errors
       */
      clearError: (state) => {
        state.error = null;
      },
      /**
       * Clear cart
       */
      clearCart: (state) => {
        state.cart = null;
      },
    },
    extraReducers: (builder) => {
        builder
          // Fetch cart cases
          .addCase(fetchCart.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(fetchCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
            state.error = null;
          })
          .addCase(fetchCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to fetch cart';
          })
          // Add to cart cases
          .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
            state.error = null;
          })
          .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to add item to cart';
          })
          // Update cart item cases
          .addCase(updateCartItem.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(updateCartItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
            state.error = null;
          })
          .addCase(updateCartItem.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to update cart item';
          })
          // Remove from cart cases
          .addCase(removeFromCart.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(removeFromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
            state.error = null;
          })
          .addCase(removeFromCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to remove item from cart';
          })
          // Apply promo code cases
          .addCase(applyPromoCode.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(applyPromoCode.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
            state.error = null;
          })
          .addCase(applyPromoCode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to apply promo code';
          })
          // Remove promo code cases
          .addCase(removePromoCode.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(removePromoCode.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cart = action.payload;
            state.error = null;
          })
          .addCase(removePromoCode.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string || 'Failed to remove promo code';
          })
          // Clear cart on logout
          .addCase(logout.fulfilled, (state) => {
            state.cart = null;
            state.isLoading = false;
            state.error = null;
          });
      },

});

export const { clearError, clearCart } = cartsSlice.actions;

export default cartsSlice.reducer;

