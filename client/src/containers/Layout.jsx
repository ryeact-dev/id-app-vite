import { lazy } from 'react';
import ModalLayout from './ModalLayout';
import Header from './header/Header';
import { useGetCurrentUserData } from '@/hooks/users';
// import PageContent from './PageContent';
// import LeftSidebar from './LeftSidebar';

const LeftSidebar = lazy(() => import('./LeftSidebar'));
const PageContent = lazy(() => import('./PageContent'));

export default function Layout() {
  const { currentUser } = useGetCurrentUserData();

  // RENDER SECTION
  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <article
        className={`drawer overflow-x-auto overflow-y-hidden max-h-screen`}
      >
        <input id='my-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content'>
          <Header currentUser={currentUser} />
          <PageContent />
        </div>
        <div className='drawer-side z-30'>
          <label
            htmlFor='my-drawer'
            aria-label='close sidebar'
            // className={`drawer-overlay ${toggleSidebar && '!bg-neutral/10'}`}
            className={`drawer-overlay hover:cursor-default`}
          ></label>
          <ul className='menu w-56 shrink-0 min-h-screen bg-base-100 text-neutral p-0 flex flex-col justify-between'>
            {/* Sidebar content here */}
            <LeftSidebar currentUser={currentUser} />
          </ul>
        </div>
      </article>
      {/* Modal layout container */}
      <ModalLayout />
    </>
  );
}
