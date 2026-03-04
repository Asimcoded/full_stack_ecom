// router.js
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NewPassword from '@/pages/NewPassword';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import ResetPassword from '@/pages/ResetPassword';
import {
  createBrowserRouter,
} from 'react-router';
import { tokenProtectedLoader } from './loaderRoute/tokenProtectedLoader';
import Failed from '@/pages/Failed';
import { authProtectedLoader } from './loaderRoute/authProtectedLoader.ts';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    loader : authProtectedLoader
  },{
    path: '/register',
    element: <Register />,
    loader : authProtectedLoader
  },{
    path: '/reset-password',
    element: <ResetPassword />,
    loader : authProtectedLoader

  },{
    path: '/reset-password/:token',
    element: <NewPassword />,
    loader : tokenProtectedLoader
  },
  {
    path: "/",
    element: <Home />,
    // loader: protectedLoader, // 🔥 PROTECTED
  },
  {
    path : '/failed',
    element : <Failed />
  },
  {
    path : '*',
    element : <NotFound />
  }
]);