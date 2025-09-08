import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import { getErrorMessage } from '../services/firebaseErrors';
import { loadFavorites } from '../redux/favorites/operations';
import { loginUser, registerUser } from '../redux/auth/operations';

export const useFormSubmit = (type, onClose, reset, closeMobMenu) => {
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      if (type === 'login') {
        const userData = await dispatch(loginUser(data)).unwrap();
        dispatch(loadFavorites(userData.user.uid));
        toast.success('Welcome back!');
      } else if (type === 'register') {
        await dispatch(registerUser(data)).unwrap();
        toast.success('Account created successfully!');
      } else if (type === 'booking') {
        toast.success('Thank you for your inquiry. We’ll contact you shortly.');
      }

      reset();
      onClose();

      if (closeMobMenu) closeMobMenu();
    } catch (error) {
      console.error('Form submit error:', error);

      if (error?.code) {
        toast.error(getErrorMessage(error.code));
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return { onSubmit };
};