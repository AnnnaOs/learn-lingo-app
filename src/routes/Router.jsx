import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// import Loader from '../components/Loader/Loader';
// import Layout from '../components/Layout/Layout';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const TeachersPage = lazy(() => import('../pages/TeachersPage/TeachersPage'));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage/FavoritesPage'));

const Router = () => (
  <Suspense fallback={<div>loading...</div>}>
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      {/* <Route index element={<Home />} /> */}
      <Route path="/" element={<HomePage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      {/* </Route> */}
    </Routes>
  </Suspense>
);

export default Router;
