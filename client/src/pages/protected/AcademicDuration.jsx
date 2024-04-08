import { useEffect } from 'react';
import { headerStore } from '@/store';
import AcademicDuration from '@/features/masterlist/academicDuration/AcademicDuration';
import { Navigate } from 'react-router-dom';
import { useGetCurrentUserData } from '@/hooks/users';

function InternalPage() {
  const { currentUser } = useGetCurrentUserData();
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const pageContent =
    currentUser.role === 'Admin' ? (
      <AcademicDuration />
    ) : (
      <Navigate to='/app/lab-scheduler' replace={true} />
    );

  useEffect(() => {
    setPageTitle({ title: 'Settings - Academic Duration' });
  }, []);

  return pageContent;
}

export default InternalPage;
