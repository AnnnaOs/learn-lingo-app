import { auth } from './firebaseConfig';
import { refreshUser } from '../redux/auth/operations';

let intervalId = null;

export const autoRefreshToken = () => {
  return (dispatch) => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
      const user = auth.currentUser;
      if (user) {
        dispatch(refreshUser())
          .unwrap()
          .catch(error => {
            console.error("Error refreshing token:", error);
          });
      }
    }, 30 * 60 * 1000);
  };
};

export const stopAutoRefreshToken = () => {
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
};