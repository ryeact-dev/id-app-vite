import { RouterProvider } from 'react-router-dom';
import initializeApp from './setup/init';
import { Toaster } from 'sonner';

import { router } from './setup/routes';

// Initializing different libraries
initializeApp();

export default function App() {
  return (
    <main className='font-sans overflow-auto h-full min-h-screen w-full flex flex-col justify-between'>
      <Toaster richColors position='top-center' visibleToasts={5} />
      <RouterProvider router={router} />
    </main>
  );
}
