import { useEffect } from 'react';
import { headerStore } from '@/store';
import Utilization from '@/features/laboratory/utilization/Utilization';
import { Navigate } from 'react-router-dom';
import { LIST_OF_ALLOWED_USERS } from '@/globals/initialValues';
import { useGetCurrentUserData } from '@/hooks/users';

function LabUtilization() {
  const { currentUser } = useGetCurrentUserData();
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isUserAllowed = LIST_OF_ALLOWED_USERS.includes(currentUser.role);

  const pageContent = isUserAllowed ? (
    <Utilization />
  ) : (
    <Navigate to='/app/lab-scheduler' replace={true} />
  );

  useEffect(() => {
    setPageTitle({ title: 'Laboratory - Class Utilization' });
  }, []);

  return pageContent;
}

export default LabUtilization;
