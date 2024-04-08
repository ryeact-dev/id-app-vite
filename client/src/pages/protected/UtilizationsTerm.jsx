import { useEffect } from 'react';
import { headerStore } from '@/store';
import UtilizationsTerm from '@/features/reports/utilizationsTerm/UtilizationsTerm';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({
      title: 'Reports - Utilizations by Term',
    });
  }, []);

  return <UtilizationsTerm />;
}

export default InternalPage;
