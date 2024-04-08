import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

// import { useGetCurrentUserData } from '@/hooks/users';

export default function Layout() {
  const mainContentRef = useRef(null);
  // const { currentUser } = useGetCurrentUserData();

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, []); // put the pathlocation to compare

  // RENDER SECTION
  return (
    <main
      className='overflow-auto pt-8 px-2 sm:px-6 h-full min-h-screen'
      ref={mainContentRef}
    >
      <Outlet />
    </main>
  );
}
