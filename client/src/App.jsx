import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import initializeApp from './setup/init';
import { Toaster } from 'sonner';

import LoadingSpinner from './common/loadingSpinner/LoadingSpinner';

import { router } from './setup/routes';

// Initializing different libraries
initializeApp();

export default function App() {
  return (
    <main className='font-poppins'>
      <Toaster richColors position='top-center' visibleToasts={5} />
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </main>
  );
}
