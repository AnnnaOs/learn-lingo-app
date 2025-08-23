import clsx from 'clsx';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import {
  addFavorite,
  removeFavorite,
} from '../../../redux/favorites/operations';
import { selectIsLoggedIn, selectUserId } from '../../../redux/auth/selectors';
import { selectFavoritesId } from '../../../redux/favorites/selectors';

import Icon from '../../Icon/Icon';
import s from './FavoriteBtn.module.css';

const FavoriteBtn = ({ teacherId }) => {
  const dispatch = useDispatch();
  const uid = useSelector(selectUserId);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favoritesId = useSelector(selectFavoritesId);
  const isFavorite = favoritesId.includes(teacherId);

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to use this feature.');
      return;
    }

    if (!uid) {
      toast.error('User ID not found. Please log in again.');
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite({ uid, teacherId }));
      toast('❎ Removed from favorites!');
    } else {
      dispatch(addFavorite({ uid, teacherId }));
      toast('✅ Added to favorites!');
    }
  };

  return (
    <button
      className={clsx(s.heartBtn, { [s.active]: isFavorite })}
      onClick={toggleFavorite}
    >
      <Icon name={isFavorite ? 'heart-color' : 'heart'} className={s.icon} />
    </button>
  );
};

export default FavoriteBtn;
