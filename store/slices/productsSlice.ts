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
  catalogFilters: {
    categories: any[];
    brands: any[];
  };
  // Individual filter lists
  categories: any[];
  brands: any[];
  skinTypes: any[];
  skinConcerns: any[];
  activeIngredients: any[];
  filters: ProductFilters;
  isLoading: boolean;
  isLoadingProduct: boolean;
  isLoadingCatalogFilters: boolean;
  isLoadingFilters: boolean;
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
  limit: 12,
  catalogFilters: {
    categories: [],
    brands: [],
  },
  categories: [],
  brands: [],
  skinTypes: [],
  skinConcerns: [],
  activeIngredients: [],
  filters: {
    page: 1,
    limit: 12,
  },
  isLoading: false,
  isLoadingProduct: false,
  isLoadingCatalogFilters: false,
  isLoadingFilters: false,
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
 * Async thunk for fetching catalog filter options
 */
export const fetchCatalogFilters = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>('products/fetchCatalogFilters', async (_, { rejectWithValue }) => {
  try {
    const response = await productsService.getCatalogFilters();
    return response;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch catalog filters');
  }
});

/**
 * Async thunk for fetching all filter options
 */
export const fetchAllFilters = createAsyncThunk<
  {
    activeIngredients: any[];
    brands: any[];
    categories: any[];
    skinConcerns: any[];
    skinTypes: any[];
  },
  void,
  { rejectValue: string }
>('products/fetchAllFilters', async (_, { rejectWithValue }) => {
  try {
    const [activeIngredients, brands, categories, skinConcerns, skinTypes] = await Promise.all([
      productsService.getActiveIngredients(),
      productsService.getBrands(),
      productsService.getCategories(),
      productsService.getSkinConcerns(),
      productsService.getSkinTypes(),
    ]);
    
    return {
      activeIngredients,
      brands,
      categories,
      skinConcerns,
      skinTypes,
    };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch filters');
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

    // Fetch catalog filters
    builder
      .addCase(fetchCatalogFilters.pending, (state) => {
        state.isLoadingCatalogFilters = true;
        state.error = null;
      })
      .addCase(fetchCatalogFilters.fulfilled, (state, action) => {
        state.isLoadingCatalogFilters = false;
        state.catalogFilters = {
          categories: action.payload.categories || [],
          brands: action.payload.brands || [],
        };
        state.error = null;
      })
      .addCase(fetchCatalogFilters.rejected, (state, action) => {
        state.isLoadingCatalogFilters = false;
        state.error = action.payload || 'Failed to fetch catalog filters';
      });

    // Fetch all filters
    builder
      .addCase(fetchAllFilters.pending, (state) => {
        state.isLoadingFilters = true;
        state.error = null;
      })
      .addCase(fetchAllFilters.fulfilled, (state, action) => {
        state.isLoadingFilters = false;
        state.activeIngredients = action.payload.activeIngredients || [];
        state.brands = action.payload.brands || [];
        state.categories = action.payload.categories || [];
        state.skinConcerns = action.payload.skinConcerns || [];
        state.skinTypes = action.payload.skinTypes || [];
        state.catalogFilters = {
          categories: action.payload.categories || [],
          brands: action.payload.brands || [],
        };
        state.error = null;
      })
      .addCase(fetchAllFilters.rejected, (state, action) => {
        state.isLoadingFilters = false;
        state.error = action.payload || 'Failed to fetch filters';
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
