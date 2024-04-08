import { RouterProvider } from 'react-router-dom';
import initializeApp from './setup/init';
import { router } from './setup/routes';
import { Toaster } from 'sonner';

// Initializing different libraries
initializeApp();

export default function App() {
  return (
    <main className='font-sans'>
      <RouterProvider router={router} />
      <Toaster richColors position='bottom-left' visibleToasts={5} />
    </main>
  );
}
