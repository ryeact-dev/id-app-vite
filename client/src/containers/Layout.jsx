import Footer from '@/common/footer/Footer';
import Header from '@/common/header/Header';
import LoadingSpinner from '@/common/loading-spinner/LoadingSpinner';
import { useCurrentUser } from '@/hooks/user.hook';
import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// import { useGetCurrentUserData } from '@/hooks/users';

export default function Layout() {
  const mainContentRef = useRef(null);
  const navigate = useNavigate();

  const { isLoading, data: currentUser } = useCurrentUser();

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current?.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, []); // put the pathlocation to compare

  if (!isLoading && !currentUser?.userInfo) {
    return navigate('/login', { replace: true });
  }

  // RENDER SECTION
  return (
    <main
      ref={mainContentRef}
      className='min-h-screen flex flex-col justify-between items-stretch'
    >
      <div className='space-y-4'>
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
