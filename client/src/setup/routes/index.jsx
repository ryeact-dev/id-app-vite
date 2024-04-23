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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'printing', element: <PrintingPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'database', element: <DatabasePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);
