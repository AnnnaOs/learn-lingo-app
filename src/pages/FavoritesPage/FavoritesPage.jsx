import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchTeachers } from '../../redux/teachers/operations';
import { selectAllTeachers } from '../../redux/teachers/selectors';
import { selectFavoritesId } from '../../redux/favorites/selectors';

import TeacherCard from '../../components/TeacherCard/TeacherCard';

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const allTeachers = useSelector(selectAllTeachers);
  const favoritesId = useSelector(selectFavoritesId);

  useEffect(() => {
    if (allTeachers.length === 0) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, allTeachers.length]);

  const favorites = allTeachers.filter(teacher =>
    favoritesId.includes(teacher.id)
  );

  const { onOpenModal } = useOutletContext();

  if (favorites.length === 0) {
    return (
      <section className="teachersPage">
        <div className="container">
          <p className="notFoundText">No favorites yet</p>
        </div>
      </section>
    );
  }

  return (
    <section className="teachersPage">
      <div className="container">
        <p className="notFoundText">Your favorites</p>
        <ul className="teachersList">
          {favorites.map(teacher => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onOpenModal={onOpenModal}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FavoritesPage;
