/**
 * Addresses Slice
 *
 * Redux Toolkit slice for addresses state management.
 * Handles fetching user addresses from the API.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersService } from '@/lib/api';
import type { AddressResponse } from '@/types';

/**
 * Addresses state interface
 */
export interface AddressesState {
  addresses: AddressResponse[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial addresses state
 */
const initialState: AddressesState = {
  addresses: [],
  isLoading: false,
  error: null,
};

/**
 * Async thunk for fetching user addresses
 */
export const fetchAddresses = createAsyncThunk<
  AddressResponse[],
  void,
  { rejectValue: string }
>(
  'addresses/fetchAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const addresses = await usersService.getAddresses();
      return addresses;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch addresses'
      );
    }
  }
);

/**
 * Addresses slice
 */
const addressesSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    /**
     * Clear addresses error
     */
    clearError: (state) => {
      state.error = null;
    },
    /**
     * Clear addresses data
     */
    clearAddresses: (state) => {
      state.addresses = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
        state.error = null;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch addresses';
      });
  },
});

export const { clearError, clearAddresses } = addressesSlice.actions;
export default addressesSlice.reducer;
