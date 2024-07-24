import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hook.ts';
import {
  selectCurrentUser,
  selectUserIsPartOfWing,
} from '../features/auth/authSlice.ts';

export default function MembershipProtectedRoute() {
  const user = useAppSelector(selectCurrentUser);

  const { wingId } = useParams();

  if (wingId && user) {
    const wing = useAppSelector((state) =>
      selectUserIsPartOfWing(state, +wingId),
    );

    return wing ? <Outlet /> : <Navigate to={'/app/dashboard'} />;
  }
}
