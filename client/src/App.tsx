import Signup from './pages/Signup.tsx';
import ContactUs from './pages/ContactUs.tsx';
import Login from './pages/Login.tsx';
import {
  createBrowserRouter,
  Link as ReactRouterLink,
  RouterProvider,
} from 'react-router-dom';
import Layout from './pages/Layout.tsx';
import { Link } from '@chakra-ui/react';
import { useAppDispatch } from './hook.ts';
import { logOut, setCredentials } from './features/auth/authSlice.ts';
import { useRefreshQuery } from './features/auth/authApiSlice.ts';
import { useEffect } from 'react';

export default function App() {
  const dispatch = useAppDispatch();
  const { data, error } = useRefreshQuery();

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
      element: <Layout />,
      children: [
        {
          path: '/',
          element: (
            <>
              <Link as={ReactRouterLink} to={'/signup'}>
                Sign-Up
              </Link>
              <Link as={ReactRouterLink} to={'/contact-us'}>
                Contact Us
              </Link>
              <Link as={ReactRouterLink} to={'/login'}>
                Login
              </Link>
            </>
          ),
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
