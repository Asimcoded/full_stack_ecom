// router.js
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NewPassword from '@/pages/NewPassword';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import { createBrowserRouter } from 'react-router';
import { tokenProtectedLoader } from './loaderRoute/tokenProtectedLoader';
import Failed from '@/pages/Failed';
import { authProtectedLoader } from './loaderRoute/authProtectedLoader.ts';
import RootLayout from '@/layouts/Root.layout.tsx';
import AuthLayout from '@/layouts/Auth.layout.tsx';
import DashboardLayout from '@/layouts/Dasboard.layout.tsx';
import { roleProtectedLoader } from './loaderRoute/roleProtectedLoader.ts';
import Dashboard from '@/pages/Dashboard.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'failed',
        element: <Failed />,
      },
    ],
  },
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        element: <Login />,
        loader: authProtectedLoader,
      },
      {
        path: 'register',
        element: <Register />,
        loader: authProtectedLoader,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
        loader: authProtectedLoader,
      },
      {
        path: 'reset-password/:token',
        element: <NewPassword />,
        loader: tokenProtectedLoader,
      },
    ],
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    loader: roleProtectedLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
