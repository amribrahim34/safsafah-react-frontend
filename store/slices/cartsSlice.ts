
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { cartService } from '@/lib/api';
import type { CartResponse, AddToCartRequest } from '@/types';
import { logout } from './authSlice';
import type { LocalCartItem } from '@/lib/localStorageManager';
import type { RootState } from '@/store';

interface CartState {
  cart: CartResponse | null;
  localItems: LocalCartItem[];
  loadingProductId: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  localItems: [],
  loadingProductId: null,
  isLoading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await cartService.getCart();
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch cart');
  }
});

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

export const syncGuestCart = createAsyncThunk(
  'cart/syncGuest',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const localItems = state.cart.localItems;
      if (localItems.length === 0) return null;
      const response = await cartService.syncCart(localItems);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sync cart');
    }
  }
);

const cartsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCart: (state) => {
      state.cart = null;
    },
    setCart: (state, action: PayloadAction<CartResponse>) => {
      state.cart = action.payload;
    },
    setLocalCartItems: (state, action: PayloadAction<LocalCartItem[]>) => {
      state.localItems = action.payload;
    },
    addLocalCartItem: (state, action: PayloadAction<number>) => {
      const existing = state.localItems.find((i) => i.productId === action.payload);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.localItems.push({ productId: action.payload, quantity: 1 });
      }
    },
    removeLocalCartItem: (state, action: PayloadAction<number>) => {
      state.localItems = state.localItems.filter((i) => i.productId !== action.payload);
    },
    updateLocalCartItemQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const item = state.localItems.find((i) => i.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearLocalCart: (state) => {
      state.localItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
        state.loadingProductId = Number(action.meta.arg.productId);
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loadingProductId = null;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingProductId = null;
        state.error = action.payload as string || 'Failed to add item to cart';
      })
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
      .addCase(syncGuestCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(syncGuestCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.cart = action.payload;
        }
        state.localItems = [];
        state.error = null;
      })
      .addCase(syncGuestCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to sync cart';
      })
      .addCase(logout.fulfilled, (state) => {
        state.cart = null;
        state.localItems = [];
        state.loadingProductId = null;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const {
  clearError,
  clearCart,
  setCart,
  setLocalCartItems,
  addLocalCartItem,
  removeLocalCartItem,
  updateLocalCartItemQuantity,
  clearLocalCart,
} = cartsSlice.actions;

export default cartsSlice.reducer;
