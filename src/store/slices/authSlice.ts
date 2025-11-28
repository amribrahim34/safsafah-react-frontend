/**
 * Auth Slice
 *
 * Redux Toolkit slice for authentication state management.
 * Handles login, register, logout, and token management.
 */

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authService, tokenManager, usersService } from '@/lib/api';
import type {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '@/types';

/**
 * Auth state interface
 */
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Initial auth state
 */
const initialState: AuthState = {
  user: null,
  token: tokenManager.getToken(),
  isAuthenticated: !!tokenManager.getToken(),
  isLoading: false,
  error: null,
};

/**
 * Async thunk for user login
 */
export const login = createAsyncThunk<AuthResponse, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

/**
 * Async thunk for user registration
 */
export const register = createAsyncThunk<AuthResponse, RegisterRequest, { rejectValue: string }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed');
    }
  }
);

/**
 * Async thunk for user logout
 */
export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
    }
  }
);

/**
 * Async thunk for fetching user profile
 */
export const fetchUserProfile = createAsyncThunk<any, void, { rejectValue: string }>(
  'auth/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.getProfileMe();
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user profile');
    }
  }
);

/**
 * Auth slice
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Clear any auth errors
     */
    clearError: (state) => {
      state.error = null;
    },

    /**
     * Set user data (e.g., after profile update)
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    /**
     * Restore auth state from storage (on app init)
     */
    restoreAuth: (state) => {
      const token = tokenManager.getToken();

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        // Map API response to user object
        state.user = {
          id: action.payload.id.toString(),
          name: action.payload.name,
          email: action.payload.email,
          phone: '',
          tier: 'Bronze',
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        // Store token in localStorage
        tokenManager.setToken(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        // Map API response to user object
        state.user = {
          id: action.payload.id.toString(),
          name: action.payload.name,
          email: action.payload.email,
          phone: '',
          tier: 'Bronze',
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;

        // Store token in localStorage
        tokenManager.setToken(action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear tokens from localStorage
        tokenManager.clearTokens();

        // Reset to initial state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state) => {
        // Even if logout API fails, clear local state and tokens
        tokenManager.clearTokens();

        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      });

    // Fetch User Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        // Map API response to user object
        state.user = {
          id: action.payload.id.toString(),
          name: action.payload.name,
          email: action.payload.email,
          phone: action.payload.mobile || '',
          tier: 'Bronze',
          points: action.payload.points || 0,
          addresses: action.payload.addresses || [],
        };
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user profile';
      });
  },
});

/**
 * Export actions
 */
export const { clearError, setUser, restoreAuth } = authSlice.actions;

/**
 * Export reducer
 */
export default authSlice.reducer;
