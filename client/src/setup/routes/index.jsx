import { createBrowserRouter } from 'react-router-dom';

import Layout from '@/containers/Layout';
import {
  DashboardPage,
  PrintingPage,
  ReportsPage,
  SettingsPage,
} from './lazyComponents';

export const router = createBrowserRouter([
  // { path: '/login', element: <Login /> },
  {
    path: '/',
    // loader: () => getCurrentUserData(),
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'printing', element: <PrintingPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
