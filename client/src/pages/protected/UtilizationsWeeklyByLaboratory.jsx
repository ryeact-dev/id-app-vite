import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { headerStore } from '@/store';
import { USER_ONLY_FOR_VIEWING_AND_ACKNOWLEDGE } from '@/globals/initialValues';
import UtilizationsWeeklyByLaboratory from '@/features/reports/utilizationsWeeklyByLaboratory/UtilizationsWeeklyByLaboratory';
import { useGetCurrentUserData } from '@/hooks/users';

function InternalPage() {
  const { currentUser } = useGetCurrentUserData();
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({
      title: 'Reports - Laboratory Weekly Utilizations',
    });
  }, []);

  const isUserAllowed = !USER_ONLY_FOR_VIEWING_AND_ACKNOWLEDGE.includes(
    currentUser.role
  );

  if (isUserAllowed) return <Navigate to='/app/lab-scheduler' replace={true} />;

  return <UtilizationsWeeklyByLaboratory />;
}

export default InternalPage;
