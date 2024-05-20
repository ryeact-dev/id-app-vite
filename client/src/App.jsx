import { RouterProvider } from 'react-router-dom';
import initializeApp from './setup/init';
import { router } from './setup/routes';
import { Toaster } from 'sonner';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense(
  'Ngo9BigBOggjHTQxAR8/V1NBaF1cWWhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjXH5XcnZQRmJUVEVzWg=='
);

// Initializing different libraries
initializeApp();

export default function App() {
  return (
    <main className='flex flex-col h-full justify-between min-h-screen font-sans'>
      <RouterProvider router={router} />
      <Toaster richColors position='bottom-left' visibleToasts={5} />
    </main>
  );
}
