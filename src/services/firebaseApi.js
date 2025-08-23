import {
  ref,
  get,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';

import { database } from './firebaseConfig';

export const fetchTeachersFromDB = async ({ lastKey = null, limit = 4, all = false } = {}) => {
  try {
    const teachersRef = ref(database, 'teachers');

    let teachersQuery;

    if (all) {
      teachersQuery = teachersRef;
    } else {
      teachersQuery = lastKey
        ? query(teachersRef, orderByKey(), startAfter(lastKey), limitToFirst(limit))
        : query(teachersRef, orderByKey(), limitToFirst(limit));
    }

    const snapshot = await get(teachersQuery);

    if (!snapshot.exists()) return { teachers: [], lastKey: null };

    const data = snapshot.val();
    const teachersArray = Object.entries(data).map(([id, teacher]) => ({
      id,
      ...teacher,
    }));

    const newLastKey =
      !all && teachersArray.length > 0
        ? teachersArray[teachersArray.length - 1].id
        : null;

    return { teachers: teachersArray, lastKey: newLastKey };
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return { teachers: [], lastKey: null };
  }
};

export const fetchAllFilterValues = async () => {
  try {
    const snapshot = await get(ref(database, 'teachers'));
    const data = snapshot.val();

    if (!data) {
      return {
        teachers: [],
        options: {
          languageOptions: [],
          levelOptions: [],
          priceOptions: [],
        },
      };
    }

    const teachers = Object.entries(data).map(([id, teacher]) => ({
      id,
      ...teacher,
    }));

    const languages = new Set();
    const levels = new Set();
    const prices = new Set();

    teachers.forEach(t => {
      t.languages?.forEach(l => languages.add(l));
      t.levels?.forEach(l => levels.add(l));
      if (t.price_per_hour) prices.add(t.price_per_hour);
    });

    const options = {
      languageOptions: [...languages].map(l => ({ value: l, label: l })),
      levelOptions: [...levels].map(l => ({ value: l, label: l })),
      priceOptions: [...prices]
        .sort((a, b) => a - b)
        .map(p => ({ value: p, label: `${p}` })),
    };

    return { teachers, options };
  } catch (error) {
    console.error('Error fetching filter values:', error);
    return {
      teachers: [],
      options: {
        languageOptions: [],
        levelOptions: [],
        priceOptions: [],
      },
    };
  }
};