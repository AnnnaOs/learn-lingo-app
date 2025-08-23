import clsx from 'clsx';
import { useState, useRef, useEffect } from 'react';

import { themes } from '../../../services/themes';
import { useTheme } from '../ThemeContext';

import Icon from '../../Icon/Icon';
import s from './ThemeToggle.module.css';

const ThemesToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, themeKey } = useTheme();
  const containerRef = useRef(null);

  const handleChange = key => {
    setTheme(key);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={s.themesContainer}>
      <button onClick={() => setIsOpen(prev => !prev)} className={s.themesBtn}>
        <Icon name="paint" className={s.icon} />
        <span className={s.tooltip}>Change theme</span>
      </button>
      {isOpen && (
        <ul className={s.list}>
          {Object.entries(themes).map(([key, { color }]) => (
            <li key={key} className={s.item}>
              <button
                className={clsx(s.itemBtn, {
                  [s.active]: key === themeKey,
                })}
                style={{ backgroundColor: color }}
                onClick={() => handleChange(key)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemesToggle;
