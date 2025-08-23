import { useResponsive } from '../../../hooks/useResponsive';

import Icon from '../../Icon/Icon';
import s from './AuthNav.module.css';

const AuthNav = ({ onOpenModal, afterAuth }) => {
  const { isMobile } = useResponsive();

  const handleLoginClick = () => {
    onOpenModal('login', { closeMobMenu: afterAuth });
  };

  const handleRegisterClick = () => {
    onOpenModal('register', { closeMobMenu: afterAuth });
  };

  return (
    <div className={s.authNav}>
      <button type="button" className={s.loginBtn} onClick={handleLoginClick}>
        <Icon name="login" className={s.icon} />
        <span className={s.tooltip}>Log in</span>
      </button>

      {isMobile ? (
        <button
          type="button"
          className={s.mobRegisterBtn}
          onClick={handleRegisterClick}
        >
          <Icon name="register" className={s.icon} />
          <span className={s.tooltip}>Registration</span>
        </button>
      ) : (
        <button
          type="button"
          className={s.registerBtn}
          onClick={handleRegisterClick}
        >
          Registration
        </button>
      )}
    </div>
  );
};

export default AuthNav;
