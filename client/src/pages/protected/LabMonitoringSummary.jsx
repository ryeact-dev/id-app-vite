import { useEffect } from 'react';
import { headerStore } from '@/store';
import LaboratoryMonitoringSummary from '@/features/reports/labMonitoringSummary/LaboratoryMonitoringSummary';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: 'Reports - Weekly Monitoring' });
  }, []);

  return <LaboratoryMonitoringSummary />;
}

export default InternalPage;
