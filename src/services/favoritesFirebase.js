import { ref, set, get, remove } from 'firebase/database';

import { database } from './firebaseConfig';

export const addFavoriteToFirebase = async (uid, teacherId) => {
  const refPath = ref(database, `users/${uid}/favorites/${teacherId}`);
  await set(refPath, true);
};

export const removeFavoriteFromFirebase = async (uid, teacherId) => {
  const refPath = ref(database, `users/${uid}/favorites/${teacherId}`);
  await remove(refPath);
};

export const getFavoritesFromFirebase = async (uid) => {
  const refPath = ref(database, `users/${uid}/favorites`);
  const snapshot = await get(refPath);
  if (!snapshot.exists()) return [];
  return Object.keys(snapshot.val());
};