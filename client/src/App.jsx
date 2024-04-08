import { RouterProvider } from 'react-router-dom';
import initializeApp from './setup/init';
import { router } from './setup/routes';
import { Toaster } from './common/ui/sonner';

// Initializing different libraries
initializeApp();

export default function App() {
  return (
    <main className='font-sans overflow-auto h-full min-h-screen w-full flex flex-col justify-between'>
      <RouterProvider router={router} />
      <Toaster richColors position='bottom-left' visibleToasts={5} />
    </main>
  );
}
