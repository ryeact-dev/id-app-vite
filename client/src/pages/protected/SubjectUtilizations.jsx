import { useEffect } from 'react';
import { headerStore } from '@/store';
import SubjectUtilizations from '@/features/laboratory/subejctUitilizations/SubjectUtilizations';
import { useGetCurrentUserData } from '@/hooks/users';

function InternalPage() {
  const { currentUser } = useGetCurrentUserData();

  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: 'Laboratory - Subject Utilizations' });
  }, []);

  return <SubjectUtilizations currentUser={currentUser} />;
}

export default InternalPage;
