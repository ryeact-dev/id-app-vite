import { lazy } from 'react';

export const DashboardPage = lazy(() =>
  import('@/pages/protected/DashboardPage')
);

export const PrintingPage = lazy(() =>
  import('@/pages/protected/PrintingPage')
);

export const ReportsPage = lazy(() => import('@/pages/protected/ReportsPage'));

export const DatabasePage = lazy(() =>
  import('@/pages/protected/DatabasePage')
);

export const SettingsPage = lazy(() =>
  import('@/pages/protected/SettingsPage')
);
