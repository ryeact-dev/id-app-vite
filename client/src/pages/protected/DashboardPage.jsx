import { useCurrentUser } from '@/hooks/user.hook';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { isLoading, data: currentUser } = useCurrentUser();

  if (!isLoading && !currentUser?.userInfo) {
    return <Navigate to='/login' replace />;
  }

  return <div>Dashboard Page</div>;
}
