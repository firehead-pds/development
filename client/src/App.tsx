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
import { useAppDispatch, useAppSelector } from './hook.ts';
import { selectLog } from './loginSlice.ts';
import { logout } from './loginSlice.ts';

export default function App() {
  const log = useAppDispatch();
  const logged = useAppSelector(selectLog);

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
              {logged ? (
                <>
                  <Link
                    onClick={() => {
                      log(logout());
                    }}
                  >
                    Log-Out
                  </Link>
                </>
              ) : (
                <>
                  <Link as={ReactRouterLink} to={'/login'}>
                    Log-In
                  </Link>
                </>
              )}
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
