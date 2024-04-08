import { useEffect } from 'react';
import UtilizationsWeekly from '@/features/reports/utilizationsWeekly/UtilizationsWeekly';
import { headerStore } from '@/store';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: 'Reports - Weekly Utilizations' });
  }, []);

  return <UtilizationsWeekly />;
}

export default InternalPage;
