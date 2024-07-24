import { useAppSelector } from '../../../app/hook.ts';
import { selectHasAdminPermissionForWing } from '../../../features/auth/authSlice.ts';
import {
  Link as ReactRouterLink,
  useNavigate,
  useParams,
} from 'react-router-dom';
import GenerateInviteCode from './components/GenerateInviteCode.tsx';
import { Link } from '@chakra-ui/react';

export default function Wing() {
  const { wingId } = useParams();
  const navigate = useNavigate();

  if (!wingId) {
    console.error('Could not load wing id.');
    navigate('/app/dashboard');
    return;
  }

  const hasAdminPermission = useAppSelector((state) =>
    selectHasAdminPermissionForWing(state, +wingId),
  );

  return (
    <>
      {hasAdminPermission && <GenerateInviteCode />}{' '}
      {hasAdminPermission && (
        <Link as={ReactRouterLink} to={'grids'}>
          Grids
        </Link>
      )}
      <Link as={ReactRouterLink} to={`friends`}>
        Friends
      </Link>
    </>
  );
}
