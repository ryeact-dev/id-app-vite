import { useEffect } from 'react';
import { headerStore } from '@/store';
import ListOfLabMonitoringSummaryPage from '@/features/reports/labMonitoringSummary/LaboratoryMonitoringSummaryPage';

function UtilizationsLabMonitoring() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({
      title: 'Reports - Laboratory Monitoring',
    });
  }, []);

  return <ListOfLabMonitoringSummaryPage />;
}

export default UtilizationsLabMonitoring;
