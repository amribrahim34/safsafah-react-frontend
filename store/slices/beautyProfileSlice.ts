/**
 * Beauty Profile Slice
 *
 * Redux Toolkit slice for beauty profile state management.
 * Handles fetching and updating the user's beauty profile.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { beautyProfileService } from '@/lib/api';
import type { BeautyProfile } from '@/types/models/beauty-profile';

/**
 * Beauty profile state interface
 */
interface BeautyProfileState {
  profile: BeautyProfile | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial state
 */
const initialState: BeautyProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

/**
 * Async thunk for fetching the user's beauty profile
 */
export const fetchBeautyProfile = createAsyncThunk<BeautyProfile, void, { rejectValue: string }>(
  'beautyProfile/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await beautyProfileService.getBeautyProfile();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch beauty profile');
    }
  }
);

/**
 * Beauty profile slice
 */
const beautyProfileSlice = createSlice({
  name: 'beautyProfile',
  initialState,
  reducers: {
    /**
     * Clear any errors
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Clear profile data (e.g. on logout)
     */
    clearBeautyProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeautyProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBeautyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchBeautyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Failed to fetch beauty profile';
      });
  },
});

/**
 * Export actions
 */
export const { clearError, clearBeautyProfile } = beautyProfileSlice.actions;

/**
 * Export reducer
 */
export default beautyProfileSlice.reducer;
