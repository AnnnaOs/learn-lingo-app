import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchTeachersFromDB } from '../../services/firebaseApi';

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async (_, { rejectWithValue }) => {
    try {
      const { teachers } = await fetchTeachersFromDB({ all: true });
      return teachers;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);