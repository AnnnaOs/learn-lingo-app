import { useState } from 'react';

import Icon from '../Icon/Icon';
import LevelList from './LevelList/LevelList';
import ReadMoreBtn from './ReadMoreBtn/ReadMoreBtn';
import FavoriteBtn from './FavoriteBtn/FavoriteBtn';
import s from './TeacherCard.module.css';

const TeacherCard = ({ teacher, onOpenModal, selectedLevel }) => {
  const [isActiveReadMore, setIsActiveReadMore] = useState(false);

  const {
    name,
    surname,
    languages,
    rating,
    levels,
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info,
    conditions,
  } = teacher;

  return (
    <div className={s.cardWrap}>
      <div className={s.avatarBlock}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={s.image}
          width={96}
          height={96}
        />
        <Icon name="online" className={s.pointIcon} />
      </div>

      <div className={s.contentBlock}>
        <div className={s.infoTop}>
          <div className={s.titleWrap}>
            <p className={s.features}>Languages</p>
            <p className={s.teacherName}>{`${name} ${surname}`}</p>
          </div>

          <ul className={s.infoTopList}>
            <li className={s.infoTopItem}>
              <Icon name="book-open" className={s.bookIcon} /> Lessons online
            </li>
            <li className={s.infoTopItem}>Lessons done: {lessons_done}</li>
            <li className={s.infoTopItem}>
              <Icon name="star" className={s.starIcon} /> Rating: {rating}
            </li>
            <li className={s.infoTopItem}>
              Price / 1 hour: <span className={s.price}>{price_per_hour}$</span>
            </li>
          </ul>

          <FavoriteBtn teacherId={teacher.id} />
        </div>

        <div className={s.infoMain}>
          <ul className={s.infoMainList}>
            <li className={s.infoMainItem}>
              <p className={s.features}>
                Speaks: <span>{languages.join(', ')}</span>
              </p>
            </li>
            <li className={s.infoMainItem}>
              <p className={s.features}>
                Lesson Info: <span>{lesson_info}</span>
              </p>
            </li>
            <li className={s.infoMainItem}>
              <p className={s.features}>
                Conditions: <span>{conditions.join(' ')}</span>
              </p>
            </li>
          </ul>

          <ReadMoreBtn
            teacher={teacher}
            isActive={isActiveReadMore}
            setIsActive={setIsActiveReadMore}
          />
        </div>

        <LevelList levels={levels} selectedLevel={selectedLevel} />

        {isActiveReadMore && (
          <button
            className={s.bookLessonBtn}
            type="button"
            onClick={() => onOpenModal('booking', teacher)}
          >
            Book trial lesson
          </button>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
