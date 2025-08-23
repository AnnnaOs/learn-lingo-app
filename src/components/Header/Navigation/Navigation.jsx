import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import s from './Navigation.module.css';

const getNavLinkClass = ({ isActive }) => clsx(s.link, isActive && s.active);

const Navigation = ({ closeMobMenu }) => {
  return (
    <nav className={s.nav}>
      <NavLink to="/" onClick={closeMobMenu} className={getNavLinkClass}>
        Home
      </NavLink>

      <NavLink
        to="/teachers"
        onClick={closeMobMenu}
        className={getNavLinkClass}
      >
        Teachers
      </NavLink>
    </nav>
  );
};

export default Navigation;
