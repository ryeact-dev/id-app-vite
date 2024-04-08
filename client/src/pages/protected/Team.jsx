import { useEffect } from 'react';
import Team from '@/features/settings/team';
import ErrorPage from './404';
import { headerStore } from '@/store';
import { useGetCurrentUserData } from '@/hooks/users';

function InternalPage() {
  const { currentUser } = useGetCurrentUserData();
  const setPageTitle = headerStore((state) => state.setPageTitle);

  const isAllowed =
    currentUser.role === 'admin' || currentUser.role === 'event-manager';
  const pageContent = isAllowed ? <Team /> : <ErrorPage />;
  const pageTitle = isAllowed ? 'Settings' : 'Not Authorize';

  useEffect(() => {
    setPageTitle({ title: pageTitle });
  }, []);

  return pageContent;
}

export default InternalPage;
