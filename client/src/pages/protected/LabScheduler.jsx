import { useEffect } from 'react';
import { headerStore } from '@/store';
import LaboratoryScheduler from '@/features/laboratory/scheduler/Scheduler';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ title: 'Laboratory - Schedule' });
  }, []);

  return <LaboratoryScheduler />;
}

export default InternalPage;
