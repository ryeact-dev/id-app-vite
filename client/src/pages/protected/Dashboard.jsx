import { useEffect } from 'react';
import { headerStore } from '@/store';
import Dashboard from '@/features/dashboard/Dashboard';
import { useGetCurrentUserData } from '@/hooks/users';
import { Navigate } from 'react-router-dom';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);
  const { currentUser } = useGetCurrentUserData();

  useEffect(() => {
    setPageTitle({ title: 'Dashboard' });
  }, []);

  if (currentUser.role !== 'Admin')
    return <Navigate to='/app/lab-scheduler' replace={true} />;

  return <Dashboard currentUser={currentUser} />;
}

export default InternalPage;
