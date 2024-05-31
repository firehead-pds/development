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

export default function App() {
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
