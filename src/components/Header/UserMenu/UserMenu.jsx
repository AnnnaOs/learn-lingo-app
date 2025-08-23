import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../../redux/auth/operations';
import { selectUser, selectIsLoggedIn } from '../../../redux/auth/selectors';

import Icon from '../../Icon/Icon';
import s from './UserMenu.module.css';

const UserMenu = ({ themeToggle, closeMobMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const displayName = user?.name || 'User';

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');

    if (!confirmed) return;

    toast.promise(dispatch(logoutUser()).unwrap(), {
      loading: 'Logging out...',
      success: 'Logged out successfully!',
      error: 'Logout failed. Try again.',
    });

    if (closeMobMenu) closeMobMenu();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className={s.userMenuContainer}>
      <h3 className={s.userName}>{displayName}</h3>
      <div className={s.separator}></div>
      <ul className={s.listBtn}>
        <li className={s.itemBtn}>{themeToggle}</li>
        <li className={s.itemBtn}>
          {isLoggedIn && (
            <NavLink to="/favorites" onClick={closeMobMenu} className={s.btn}>
              <Icon name="heart" className={s.icon} />
              <span className={s.tooltip}>Favorites</span>
            </NavLink>
          )}
        </li>
        <li className={s.itemBtn}>
          <button className={s.btn} type="button" onClick={handleLogout}>
            <Icon name="login" className={s.icon} />
            <span className={s.tooltip}>Log out</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
