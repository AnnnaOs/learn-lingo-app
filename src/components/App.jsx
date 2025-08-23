import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { authStateListener } from '../redux/auth/operations';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import {
  autoRefreshToken,
  stopAutoRefreshToken,
} from '../services/autoRefresh';

import Router from '../routes/Router';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const unsubscribe = dispatch(authStateListener());
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(autoRefreshToken());
    } else {
      dispatch(stopAutoRefreshToken());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <>
      <Router />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            color: 'var(--theme-color)',
            border: '1px solid var(--theme-color)',
            fontSize: '18px',
            fontWeight: 400,
            padding: '12px',
            textAlign: 'center',
          },
        }}
      />
    </>
  );
};

export default App;
