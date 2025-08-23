import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addFavoriteToFirebase,
  removeFavoriteFromFirebase,
  getFavoritesFromFirebase,
} from '../../services/favoritesFirebase';

export const loadFavorites = createAsyncThunk(
  'favorites/loadFavorites',
  async (uid, { rejectWithValue }) => {
    try {
      const ids = await getFavoritesFromFirebase(uid);
      return ids;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  'favorites/addFavorite',
  async ({ uid, teacherId }, { rejectWithValue }) => {
    try {
      await addFavoriteToFirebase(uid, teacherId);
      return teacherId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFavorite = createAsyncThunk(
  'favorites/removeFavorite',
  async ({ uid, teacherId }, { rejectWithValue }) => {
    try {
      await removeFavoriteFromFirebase(uid, teacherId);
      return teacherId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);