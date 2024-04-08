import { lazy } from 'react';

export const Dashboard = lazy(() => import('@/pages/protected/Dashboard.jsx'));

// LABORATORY ROUTES
export const LabScheduler = lazy(() =>
  import('@/pages/protected/LabScheduler')
);
export const LabUtilization = lazy(() =>
  import('@/pages/protected/LabUtilization')
);

export const SubjectUtilizations = lazy(() =>
  import('@/pages/protected/SubjectUtilizations')
);

export const Reservations = lazy(() => import('@/pages/protected/404'));

// REPORTS ROUTES
export const UtilizationsWeekly = lazy(() =>
  import('@/pages/protected/UtilizationsWeekly')
);
export const UtilizationsTerm = lazy(() =>
  import('@/pages/protected/UtilizationsTerm')
);
export const ListOfReservations = lazy(() =>
  import('@/pages/protected/ListOfReservations')
);
export const LabWeeklyMonitoring = lazy(() =>
  import('@/pages/protected/LabMonitoringSummary')
);
export const UtilizationsLabMonitoring = lazy(() =>
  import('@/pages/protected/UtilizationsLabMonitoring')
);
export const WeeklyReportByInstructor = lazy(() =>
  import('@/pages/protected/UtilizationsWeeklyByInstructor')
);
export const WeeklyReportByLaboratory = lazy(() =>
  import('@/pages/protected/UtilizationsWeeklyByLaboratory')
);

// MASTERLIST ROUTES
export const ListOfStudents = lazy(() =>
  import('@/pages/protected/ListOfStudents')
);
export const ListOfSubjects = lazy(() =>
  import('@/pages/protected/ListOfSubjects')
);
export const AddStudentsToSubject = lazy(() =>
  import('@/pages/protected/Classlist')
);
export const AcademicDuration = lazy(() =>
  import('@/pages/protected/AcademicDuration')
);

// INVENTORY ROUTES
export const Hardware = lazy(() =>
  import('@/pages/protected/InventoryHardware')
);
export const Software = lazy(() =>
  import('@/pages/protected/InventorySoftware')
);

// SETTINGS ROUTES
export const SettingsUsers = lazy(() =>
  import('@/pages/protected/SettingsUsers')
);
export const Page404 = lazy(() => import('@/pages/protected/404'));
// const Team = lazy(() => import("../../pages/protected/Team"));
