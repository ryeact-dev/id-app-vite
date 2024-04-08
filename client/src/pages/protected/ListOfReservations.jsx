import { useEffect } from 'react';
import ListOfReservations from '@/features/reports/listOfReservations/ListOfReservations';
import { headerStore } from '@/store';

function InternalPage() {
  const setPageTitle = headerStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle({ type: 'SET_TITLE', title: 'Reports - Reservations' });
  }, []);

  return <ListOfReservations />;
}

export default InternalPage;
