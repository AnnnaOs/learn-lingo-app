import { useSelector } from 'react-redux';

import { useResponsive } from '../../hooks/useResponsive';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import Logo from './Logo/Logo';
import Icon from '../Icon/Icon';
import MobMenu from './MobMenu/MobMenu';
import AuthNav from './AuthNav/AuthNav';
import UserMenu from './UserMenu/UserMenu';
import Navigation from './Navigation/Navigation';
import ThemeToggle from '../ThemeContext/ThemeToggle/ThemeToggle';
import s from './Header.module.css';

const Header = ({ onOpenModal, isMobMenuOpen, setIsMobMenuOpen }) => {
  const { isMobile } = useResponsive();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const closeMobMenu = () => setIsMobMenuOpen(false);
  const toggleMobMenu = () => {
    setIsMobMenuOpen(prev => !prev);
  };

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.wrap}>
          <Logo />

          {!isMobile && <Navigation />}
          {!isMobile && (
            <>
              {!isLoggedIn ? (
                <div className={s.authNav}>
                  <ThemeToggle />
                  <AuthNav onOpenModal={onOpenModal} />
                </div>
              ) : (
                <UserMenu themeToggle={<ThemeToggle />} />
              )}
            </>
          )}

          {isMobile && (
            <button
              type="button"
              className={s.mobMenuBtn}
              onClick={toggleMobMenu}
              aria-label={`${isMobMenuOpen ? 'hide' : 'show'} mobile menu`}
            >
              <Icon name="mob-menu" className={s.iconBurger} />
            </button>
          )}
        </div>
      </div>

      {isMobile && (
        <MobMenu
          isOpen={isMobMenuOpen}
          onOpenModal={onOpenModal}
          closeMobMenu={closeMobMenu}
          themeToggle={<ThemeToggle />}
        />
      )}
    </header>
  );
};

export default Header;
