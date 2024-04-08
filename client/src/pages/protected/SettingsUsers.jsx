import { useEffect } from 'react';
import { headerStore } from '@/store';
import ListOfUsers from '@/features/settings/listOfUsers/ListOfUsers';
import { Navigate } from 'react-router-dom';
import { useGetCurrentUserData } from '@/hooks/users';

function InternalPage() {
  const { currentUser } = useGetCurrentUserData();
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const pageContent =
    currentUser.role === 'Admin' ? (
      <ListOfUsers />
    ) : (
      <Navigate to='/app/lab-scheduler' replace={true} />
    );

  useEffect(() => {
    setPageTitle({ title: 'Settings - Users' });
  }, []);

  return pageContent;
}

export default InternalPage;
