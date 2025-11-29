/**
 * Products Slice
 *
 * Redux Toolkit slice for products state management.
 * Handles fetching, filtering, and pagination of products.
 */

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { productsService } from '@/lib/api';
import type { Product, ProductFilters, ProductSearchResult } from '@/types';

/**
 * Products state interface
 */
export interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  total: number;
  page: number;
  limit: number;
  facets: {
    brands: string[];
    categories: string[];
    tags: string[];
    skinTypes: string[];
    priceRange: {
      min: number;
      max: number;
    };
  };
  filters: ProductFilters;
  isLoading: boolean;
  isLoadingProduct: boolean;
  error: string | null;
}

/**
 * Initial products state
 */
const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  total: 0,
  page: 1,
  limit: 10,
  facets: {
    brands: [],
    categories: [],
    tags: [],
    skinTypes: [],
    priceRange: { min: 0, max: 0 },
  },
  filters: {
    page: 1,
    limit: 10,
  },
  isLoading: false,
  isLoadingProduct: false,
  error: null,
};

/**
 * Async thunk for fetching products
 */
export const fetchProducts = createAsyncThunk<
  ProductSearchResult,
  ProductFilters | undefined,
  { rejectValue: string }
>('products/fetchProducts', async (filters, { rejectWithValue }) => {
  try {
    const response = await productsService.getProducts(filters);
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products');
  }
});

/**
 * Async thunk for fetching a single product by ID
 */
export const fetchProductById = createAsyncThunk<
  Product,
  string | number,
  { rejectValue: string }
>('products/fetchProductById', async (productId, { rejectWithValue }) => {
  try {
    const response = await productsService.getProduct(productId);
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product');
  }
});

/**
 * Products slice
 */
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    /**
     * Clear any errors
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Set filters
     */
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    /**
     * Reset filters to initial state
     */
    resetFilters: (state) => {
      state.filters = { page: 1, limit: 10 };
    },

    /**
     * Clear products list
     */
    clearProducts: (state) => {
      state.products = [];
      state.total = 0;
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.facets = action.payload.facets;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch products';
      });

    // Fetch single product
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoadingProduct = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.error = action.payload || 'Failed to fetch product';
      });
  },
});

/**
 * Export actions
 */
export const { clearError, setFilters, resetFilters, clearProducts } = productsSlice.actions;

/**
 * Export reducer
 */
export default productsSlice.reducer;
