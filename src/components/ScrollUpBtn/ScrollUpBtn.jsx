import { useEffect, useState } from 'react';

import Icon from '../Icon/Icon';
import s from './ScrollUpBtn.module.css';

const ScrollUpBtn = ({ hide }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (hide) return null;

  return (
    <button
      className={`${s.btn} ${isVisible ? s.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <Icon name="arrow-up" className={s.icon} />
    </button>
  );
};

export default ScrollUpBtn;
