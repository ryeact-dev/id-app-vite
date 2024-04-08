import { Suspense, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from '@/setup/routes';
import SuspenseContent from './SuspenseContent';
import { headerStore } from '@/store';
import { Page404 } from '@/setup/routes/routeComponents';

function PageContent() {
  const mainContentRef = useRef(null);
  const pageTitle = headerStore((state) => state.pageTitle);

  return (
    <main
      className='overflow-auto pt-8 px-2 sm:px-6 h-full min-h-screen max-h-screen scrollbar force-overflow bg-base-300'
      id='scroll-bar-design'
      ref={mainContentRef}
    >
      <Suspense fallback={<SuspenseContent />}>
        {/* ReactTSParticles is an animated background */}
        {/* <ReactTSParticles styleClass="h-full w-full absolute translate-z-0" /> */}
        <Routes>
          {routes.map((route, key) => {
            return (
              <Route
                key={key}
                exact={true}
                path={`${route.path}`}
                element={<route.component />}
              />
            );
          })}

          {/* Redirecting unknown url to 404 page */}
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Suspense>
      <div className='h-24'></div>
    </main>
  );
}

export default PageContent;
