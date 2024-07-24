import { useAppSelector } from '../app/hook.ts';
import { selectCurrentUser } from '../features/auth/authSlice.ts';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../pages/public/Layout.tsx';

export default function PublicRoute() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <div>
      {user ? (
        <Navigate to={'/app/dashboard'} />
      ) : (
        <Layout>
          <Outlet />
        </Layout>
      )}
    </div>
  );
}
