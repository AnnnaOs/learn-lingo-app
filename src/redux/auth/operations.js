import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  getIdToken,
  onAuthStateChanged,
} from 'firebase/auth';

import { auth } from '../../services/firebaseConfig';
import { loadFavorites } from '../favorites/operations';
import { resetAuthState } from './slice';

export const registerUser = createAsyncThunk('auth/register', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    const token = await getIdToken(user, true);

    return {
      user: {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      },
      token,
    };

  } catch (error) {
    return rejectWithValue({ code: error.code, message: error.message });
  }
});

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const token = await getIdToken(user, true);

    return {
      user: {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      },
      token,
    };
  } catch (error) {
    return rejectWithValue({ code: error.code, message: error.message });
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    return rejectWithValue({ code: error.code, message: error.message });
  }
});

export const refreshUser = createAsyncThunk('auth/refreshUser', async (_, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      return rejectWithValue('No user is signed in.');
    }
    const token = await getIdToken(user, true);

    return {
      user: {
        name: user.displayName || "User",
        email: user.email,
        uid: user.uid,
      },
      token,
    };
  } catch (error) {
    return rejectWithValue({ code: error.code, message: error.message });
  }
});

export const authStateListener = () => (dispatch) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(refreshUser()).then(result => {
        if (result.payload?.user?.uid) {
          dispatch(loadFavorites(result.payload.user.uid));
        }
      });
    } else {
      dispatch(resetAuthState());
    }
  });

  return unsubscribe;
};
