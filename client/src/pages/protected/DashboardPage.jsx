import { Card, CardContent, CardHeader } from '@/common/ui/card';
import { useCurrentUser } from '@/hooks/user.hook';
import { Navigate } from 'react-router-dom';

export default function DashboardPage() {
  const { isLoading, data: currentUser } = useCurrentUser();

  if (!isLoading && !currentUser?.userInfo) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <Card>
        <CardHeader>Dashboard Page</CardHeader>
        <CardContent>Coming Soon....</CardContent>
      </Card>
    </div>
  );
}
