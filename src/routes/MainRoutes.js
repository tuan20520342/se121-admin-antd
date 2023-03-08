import MainLayout from '../layouts/MainLayout';
import TestPage from '~/pages/test';
import NotFoundPage from '~/pages/NotFound';
import StaffsPage from '~/pages/StaffsPage';

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <TestPage />,
    },
    {
      path: '/staffs',
      element: <StaffsPage />,
    },
    {
      path: '/products',
      element: <TestPage />,
    },
    {
      path: '/wishlist',
      element: <TestPage />,
    },
    {
      path: '/cart',
      element: <TestPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
    {
      path: '/contact',
      element: <TestPage />,
    },
    {
      path: '/checkout',
      element: <TestPage />,
    },
    {
      path: '/shop',
      element: <TestPage />,
    },
    {
      path: '/product/:id',
      element: <TestPage />,
    },
  ],
};

export default MainRoutes;
