import Header from '@/common/header/Header';
import LoadingSpinner from '@/common/loading-spinner/LoadingSpinner';
import { Suspense, useEffect, useRef } from 'react';
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
    <>
      <main className='space-y-4' ref={mainContentRef}>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <div>Footer</div>
    </>
  );
}
