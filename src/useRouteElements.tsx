import { Suspense, lazy, useContext } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { AppContext } from './context/app.context';
import FormLayout from './layout/FormLayout';
import path from './constant/path';
import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';

const Home = lazy(() => import('~/pages/Home'));
const Verify = lazy(() => import('~/pages/Verify'));
const ForgetPassword = lazy(() => import('~/pages/ForgetPassword'));
const ResetPassword = lazy(() => import('~/pages/ResetPassword'));
const OAuth2Redirect = lazy(() => import('~/pages/OAuth2Redirect'));
const NotFound = lazy(() => import('~/pages/NotFound'));

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    // Public Route
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          )
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    },
    // Rejeted Route
    {
      path: '',
      element: <FormLayout socialOption />,
      children: [
        {
          path: path.login,
          element: (
            <Suspense>
              <Login />
            </Suspense>
          )
        },
        {
          path: path.register,
          element: (
            <Suspense>
              <Register />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <FormLayout />,
      children: [
        {
          path: path.forgetpassword,
          element: (
            <Suspense>
              <ForgetPassword />
            </Suspense>
          )
        },
        {
          path: path.resetpassword,
          element: (
            <Suspense>
              <ResetPassword />
            </Suspense>
          )
        }
      ]
    },
    {
      path: path.verifyInformation,
      element: <Verify />
    }

    // Protected Route
  ]);

  return routeElements;
}
