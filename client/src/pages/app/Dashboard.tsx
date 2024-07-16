import { useAppSelector } from '../../app/hook.ts';
import { selectCurrentUser } from '../../features/auth/authSlice.ts';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

export default function Dashboard() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      {user?.firstName}

      <Link as={ReactRouterLink} to={'/app/wing'}>
        Wings Storage
      </Link>
    </>
  );
}
