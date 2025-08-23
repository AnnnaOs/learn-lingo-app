import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectAllTeachers } from '../redux/teachers/selectors';

export const useFilterOptions = (filters) => {
  const allTeachers = useSelector(selectAllTeachers);

  const filteredTeachers = useMemo(() => {
    return allTeachers.filter(t => {
      const matchLanguage = filters.language ? t.languages.includes(filters.language) : true;
      const matchLevel = filters.level ? t.levels.includes(filters.level) : true;
      const matchPrice = filters.price ? t.price_per_hour === Number(filters.price) : true;
      return matchLanguage && matchLevel && matchPrice;
    });
  }, [allTeachers, filters]);

  const languageOptions = useMemo(() => {
    const languages = new Set();
    filteredTeachers.forEach(t => t.languages?.forEach(l => languages.add(l)));
    return [...languages].map(l => ({ value: l, label: l }));
  }, [filteredTeachers]);

  const levelOptions = useMemo(() => {
    const levels = new Set();
    filteredTeachers.forEach(t => t.levels?.forEach(l => levels.add(l)));
    return [...levels].map(l => ({ value: l, label: l }));
  }, [filteredTeachers]);

  const priceOptions = useMemo(() => {
    const prices = new Set();
    filteredTeachers.forEach(t => prices.add(t.price_per_hour));
    return [...prices]
      .sort((a, b) => a - b)
      .map(p => ({ value: p, label: `${p}` }));
  }, [filteredTeachers]);

  return {
    filteredTeachers,
    languageOptions,
    levelOptions,
    priceOptions,
  };
};