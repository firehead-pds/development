import { useAppSelector } from '../app/hook.ts';
import { selectCurrentUser } from '../features/auth/authSlice.ts';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const user = useAppSelector(selectCurrentUser);

  return user ? <Outlet /> : <Navigate to={'/login'} />;
}
