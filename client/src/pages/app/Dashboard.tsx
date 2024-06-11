import { useAppSelector } from '../../app/hook.ts';
import { selectCurrentUser } from '../../features/auth/authSlice.ts';

export default function Dashboard() {
  const user = useAppSelector(selectCurrentUser);

  return <>{user?.firstName}</>;
}
