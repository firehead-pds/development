import { useAppSelector } from '../../../app/hook.ts';
import { selectHasAdminPermissionForWing } from '../../../features/auth/authSlice.ts';
import { useNavigate, useParams } from 'react-router-dom';
import GenerateInviteCode from './components/GenerateInviteCode.tsx';

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

  return <>{hasAdminPermission && <GenerateInviteCode />}</>;
}
