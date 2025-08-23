import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { registerUser, loginUser, logoutUser, refreshUser } from './operations';

const initialState = {
  user: { name: null, email: null, uid: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const handleAuthFulfilled = (state, { payload }) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
  state.isRefreshing = false;
  state.isLoading = false;
  state.error = null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = { name: null, email: null, uid: null };
      state.token = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
      state.isLoading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logoutUser.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled, refreshUser.fulfilled), handleAuthFulfilled)
      .addMatcher(isAnyOf(registerUser.pending, loginUser.pending, logoutUser.pending), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isAnyOf(registerUser.rejected, loginUser.rejected, logoutUser.rejected, refreshUser.rejected), (state, { payload, error }) => {
        state.user = { name: null, email: null, uid: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = payload || error.message;
      });
  },
});

export const { resetAuthState, clearError } = authSlice.actions;
export default authSlice.reducer;