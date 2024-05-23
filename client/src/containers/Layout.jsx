import Header from '@/common/header/Header';
import LoadingSpinner from '@/common/loading-spinner/LoadingSpinner';
import { Suspense, useEffect, useRef } from 'react';
import { Navigate, Outlet, useRouteLoaderData } from 'react-router-dom';

// import { useGetCurrentUserData } from '@/hooks/users';

export default function Layout() {
  const mainContentRef = useRef(null);

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, []); // put the pathlocation to compare

  // RENDER SECTION
  return (
    <main ref={mainContentRef}>
      <div className='space-y-4'>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>
      <div>Footer</div>
    </main>
  );
}
