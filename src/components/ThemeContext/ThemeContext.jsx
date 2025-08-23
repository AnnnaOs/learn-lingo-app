import { createContext, useContext, useEffect, useState } from 'react';

import { themes } from '../../services/themes';

const ThemeContext = createContext();

const THEME_KEY = 'app-theme';
const defaultThemeKey = 'yellow';

export const ThemeProvider = ({ children }) => {
  const [themeKey, setThemeKey] = useState(() => {
    return localStorage.getItem(THEME_KEY) || defaultThemeKey;
  });

  const theme = themes[themeKey];

  const setTheme = newKey => {
    if (themes[newKey]) {
      setThemeKey(newKey);
      localStorage.setItem(THEME_KEY, newKey);
      document.documentElement.setAttribute('data-theme', themes[newKey].name);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.name);
  }, [theme.name]);

  return (
    <ThemeContext.Provider value={{ themeKey, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
