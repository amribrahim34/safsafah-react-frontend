import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistService } from '@/lib/api';
import type { WishlistItemResponse } from '@/types';

/**
 * Wishlist state interface
 */
interface WishlistState {
  items: number[]; // Array of product IDs in wishlist
  isLoading: boolean;
  error: string | null;
  loadingProductId: number | null; // Track which product is being added/removed
}

/**
 * Initial state
 */
const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
  loadingProductId: null,
};

/**
 * Async thunk for adding product to wishlist
 */
export const addToWishlist = createAsyncThunk(
  'wishlist/addItem',
  async (productId: number, { rejectWithValue }) => {
    try {
      const response = await wishlistService.addToWishlist(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add item to wishlist');
    }
  }
);

/**
 * Async thunk for removing product from wishlist
 */
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeItem',
  async (productId: number, { rejectWithValue }) => {
    try {
      await wishlistService.removeFromWishlist(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to remove item from wishlist');
    }
  }
);

/**
 * Wishlist slice
 */
const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    /**
     * Clear any errors
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Clear wishlist
     */
    clearWishlist: (state) => {
      state.items = [];
    },
    /**
     * Set wishlist items (for initialization)
     */
    setWishlistItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to wishlist cases
      .addCase(addToWishlist.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.loadingProductId = action.meta.arg;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!state.items.includes(action.payload.productId)) {
          state.items.push(action.payload.productId);
        }
        state.error = null;
        state.loadingProductId = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to add item to wishlist';
        state.loadingProductId = null;
      })
      // Remove from wishlist cases
      .addCase(removeFromWishlist.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.loadingProductId = action.meta.arg;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(id => id !== action.payload);
        state.error = null;
        state.loadingProductId = null;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to remove item from wishlist';
        state.loadingProductId = null;
      });
  },
});

export const { clearError, clearWishlist, setWishlistItems } = wishlistSlice.actions;

export default wishlistSlice.reducer;
