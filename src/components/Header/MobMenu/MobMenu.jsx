import clsx from 'clsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../../redux/auth/selectors';

import Icon from '../../Icon/Icon';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import Navigation from '../Navigation/Navigation';
import ThemeToggle from '../../ThemeContext/ThemeToggle/ThemeToggle';
import s from './MobMenu.module.css';

const MobMenu = ({ isOpen, onOpenModal, closeMobMenu, themeToggle }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeMobMenu();
    }
  };

  return (
    <div
      className={clsx(s.backdrop, { [s.open]: isOpen })}
      onClick={handleBackdropClick}
    >
      <div className={clsx(s.mobMenu, { [s.open]: isOpen })}>
        <button
          className={s.closeBtn}
          onClick={closeMobMenu}
          aria-label="Close mobile menu"
        >
          <Icon name="close-btn" className={s.icon} />
        </button>
        <div className={s.mobMenuContainer}>
          {isLoggedIn ? (
            <UserMenu themeToggle={themeToggle} closeMobMenu={closeMobMenu} />
          ) : (
            <div className={s.mobAuthNav}>
              <ThemeToggle />
              <AuthNav onOpenModal={onOpenModal} afterAuth={closeMobMenu} />
            </div>
          )}
          <Navigation closeMobMenu={closeMobMenu} />
        </div>
      </div>
    </div>
  );
};
export default MobMenu;
