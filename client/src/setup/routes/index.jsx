import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/containers/Layout';
import {
  DashboardPage,
  DatabasePage,
  LoginPage,
  PrintingPage,
  ReportsPage,
  SettingsPage,
} from './lazyComponents';
import UsersPage from '@/pages/protected/UsersPage';
import ErrorBoundary from '@/pages/ErrorBoundary';
import { getCurrentUser } from '@/api/user.api';
import RootContainer from '@/pages/RootContainer';
import { Suspense } from 'react';
import LoadingSpinner from '@/common/loading-spinner/LoadingSpinner';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'printing', element: <PrintingPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'database', element: <DatabasePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'users', element: <UsersPage /> },
      // { path: 'login', element: <LoginPage /> },
    ],
  },
]);
