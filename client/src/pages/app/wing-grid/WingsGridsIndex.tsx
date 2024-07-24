import { Link as ReactRouterLink } from 'react-router-dom';
import { Link } from '@chakra-ui/react';

export default function WingsGridsIndex() {
  return (
    <>
      <Link as={ReactRouterLink} to={'create'}>
        Create Grid
      </Link>
    </>
  );
}
