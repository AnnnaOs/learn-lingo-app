import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/selectors';

import Loader from '../components/Loader/Loader';
import Layout from '../components/Layout/Layout';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const TeachersPage = lazy(() => import('../pages/TeachersPage/TeachersPage'));
const FavoritesPage = lazy(() =>
  import('../pages/FavoritesPage/FavoritesPage')
);

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
