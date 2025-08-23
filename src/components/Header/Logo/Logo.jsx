import { Link } from 'react-router-dom';

import Icon from '../../Icon/Icon';
import s from './Logo.module.css';

const Logo = () => {
  return (
    <Link className={s.logo} to="/">
      <Icon name="logo" className={s.icon} />
      <span className={s.text}>LearnLingo</span>
    </Link>
  );
};

export default Logo;
