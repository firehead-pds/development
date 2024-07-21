import PublicRoute from './guards/PublicRoute.tsx';
import Signup from './pages/public/Signup.tsx';
import ContactUs from './pages/public/ContactUs.tsx';
import Login from './pages/public/Login.tsx';
import WelcomePage from './pages/public/WelcomePage.tsx';
import PageLoader from './components/UI/PageLoader.tsx';
import ProtectedRoute from './guards/ProtectedRoute.tsx';
import Dashboard from './pages/app/Dashboard.tsx';
import Wing from './pages/app/Wing.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './app/hook.ts';
import { logOut, setCredentials } from './features/auth/authSlice.ts';
import { useRefreshQuery } from './features/auth/authApiSlice.ts';
import { useEffect } from 'react';
import MembershipProtectedRoute from './guards/MembershipProtectedRoute.tsx';

export default function App() {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useRefreshQuery();

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data));
    } else if (error) {
      dispatch(logOut());
    }
  }, [data, error, dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <PublicRoute />,
      children: [
        {
          path: '/',
          element: <WelcomePage />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
        {
          path: '/contact-us',
          element: <ContactUs />,
        },
        {
          path: '/login',
          element: <Login />,
        },
      ],
    },
    {
      path: '/app',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />,
        },
        {
          path: 'wing/:wingId',
          element: <MembershipProtectedRoute />,
          children: [
            {
              path: '',
              element: <Wing />,
            },
          ],
        },
      ],
    },
  ]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
