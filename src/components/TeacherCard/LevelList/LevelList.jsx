import clsx from 'clsx';

import s from './LevelList.module.css';

const LevelList = ({ levels, selectedLevel }) => {
  return (
    <ul className={s.levelList}>
      {levels.map(level => (
        <li
          key={level}
          className={clsx(s.levelItem, {
            [s.activeLevel]: selectedLevel === level,
          })}
        >
          {`#${level}`}
        </li>
      ))}
    </ul>
  );
};

export default LevelList;
