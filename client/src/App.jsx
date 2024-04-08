import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import initializeApp from './setup/init';
import { Toaster } from 'sonner';
import ErrorBoundary from './pages/ErrorBoundary';
import SkeletonLandingPage from './common/skeletons/SkeletonLandingPage';
import LoadingSpinner from './common/loadingSpinner/LoadingSpinner';
import ProtectedRoute from './common/auth/ProtectedRoute';
import Login from './features/login/Login';
import Layout from './containers/Layout';
import { getCurrentUserData } from './api/users.api';
import RootContainer from './pages/RootContainer';

// Initializing different libraries
initializeApp();

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      loader: () => getCurrentUserData(),
      element: <RootContainer />,
    },
    { path: '/login', element: <Login /> },
    {
      path: '/app/*',
      errorElement: <ErrorBoundary />,
      loader: () => getCurrentUserData(),
      element: (
        <Suspense fallback={<SkeletonLandingPage />}>
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        </Suspense>
      ),
    },
  ]);

  return (
    <main className='font-poppins'>
      <Toaster richColors position='top-center' visibleToasts={5} />
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </main>
  );
}
