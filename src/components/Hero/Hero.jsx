import { Link } from 'react-router-dom';

import { useTheme } from '../ThemeContext/ThemeContext';

import s from './Hero.module.css';

const Hero = () => {
  const { theme } = useTheme();
  const { heroImg, heroImg2x } = theme;

  return (
    <section className={s.hero}>
      <div className={s.heroContainer}>
        <div className={s.wrap}>
          <div className={s.textContent}>
            <h1 className={s.title}>
              Unlock your potential with the best{' '}
              <i className={s.titleItalic}>language</i> tutors
            </h1>
            <p className={s.subtitle}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <Link className={s.btn} to="/teachers">
              Get started
            </Link>
          </div>
          <div className={s.imgContent}>
            <img
              src={heroImg}
              srcSet={`${heroImg2x} 2x`}
              alt="girl with laptop"
              className={s.image}
              width="568"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
