import { Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <>
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
    </>
  );
}
