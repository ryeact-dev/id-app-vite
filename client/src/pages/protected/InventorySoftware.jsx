import { useEffect } from 'react';
import Software from '@/features/inventory/software/Software';
import { headerStore } from '@/store';
import { Navigate } from 'react-router-dom';
import { LIST_OF_ALLOWED_USERS } from '@/globals/initialValues';
import { useGetCurrentUserData } from '@/hooks/users';

function InternalPage() {
  const { currentUser } = useGetCurrentUserData();
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isUserAllowed = LIST_OF_ALLOWED_USERS.includes(currentUser.role);

  const pageContent = isUserAllowed ? (
    <Software />
  ) : (
    <Navigate to='/app/lab-scheduler' replace={true} />
  );

  useEffect(() => {
    setPageTitle({ title: 'Inventory - Software' });
  }, []);

  return pageContent;
}

export default InternalPage;
