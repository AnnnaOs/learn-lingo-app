import { ClockLoader } from 'react-spinners';

import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loaderWrapper}>
      <ClockLoader color="var(--theme-color)" size={80} className={s.loader} />;
    </div>
  );
};

export default Loader;
