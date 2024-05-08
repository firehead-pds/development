import Signup from './pages/Signup.tsx';
import ContactUs from './pages/ContactUs.tsx';
import {
  createBrowserRouter,
  Link as ReactRouterLink,
  RouterProvider,
} from 'react-router-dom';
import Layout from './pages/Layout.tsx';
import { Link } from '@chakra-ui/react';

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
              Signup
            </Link>
            <Link as={ReactRouterLink} to={'/contact-us'}>
              Contact Us
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
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
