import { createSlice } from '@reduxjs/toolkit';

import { logoutUser } from '../auth/operations';
import { loadFavorites, addFavorite, removeFavorite } from './operations';

const initialState = {
  favoriteItems: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favoriteItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFavorites.fulfilled, (state, { payload }) => {
        state.favoriteItems = payload;
      })
      .addCase(addFavorite.fulfilled, (state, { payload }) => {
        if (!state.favoriteItems.includes(payload)) {
          state.favoriteItems.push(payload);
        }
      })
      .addCase(removeFavorite.fulfilled, (state, { payload }) => {
        state.favoriteItems = state.favoriteItems.filter(id => id !== payload);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.favoriteItems = [];
      });
  },
});

export const { setUserId, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;