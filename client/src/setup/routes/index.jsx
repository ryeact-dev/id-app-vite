// All components mapping with path for internal routes

import {
  AcademicDuration,
  AddStudentsToSubject,
  Dashboard,
  Hardware,
  LabScheduler,
  LabUtilization,
  ListOfReservations,
  ListOfStudents,
  ListOfSubjects,
  Page404,
  SettingsUsers,
  Software,
  UtilizationsTerm,
  UtilizationsWeekly,
  LabWeeklyMonitoring,
  UtilizationsLabMonitoring,
  WeeklyReportByInstructor,
  WeeklyReportByLaboratory,
  SubjectUtilizations,
} from './routeComponents';

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },

  // LABORATORY
  {
    path: '/lab-scheduler',
    component: LabScheduler,
  },
  {
    path: '/lab-utilization',
    component: LabUtilization,
  },

  {
    path: '/subject-utilizations',
    component: SubjectUtilizations,
  },

  // REPORTS
  {
    path: '/reports-utilizations-weekly',
    component: UtilizationsWeekly,
  },
  {
    path: '/reports-utilizations-term',
    component: UtilizationsTerm,
  },
  {
    path: '/reports-list-of-reservations',
    component: ListOfReservations,
  },
  {
    path: '/reports-lab-weekly-monitoring',
    component: LabWeeklyMonitoring,
  },
  {
    path: '/reports-utilizations-weekly/monitoring/:subjectId',
    component: UtilizationsLabMonitoring,
  },
  {
    path: '/reports-utilizations-weekly-instructor',
    component: WeeklyReportByInstructor,
  },
  {
    path: 'reports-utilizations-weekly-laboratory',
    component: WeeklyReportByLaboratory,
  },

  // MASTERLIST
  {
    path: '/students',
    component: ListOfStudents,
  },
  {
    path: '/subjects',
    component: ListOfSubjects,
  },
  {
    path: '/subjects/:subjectId',
    component: AddStudentsToSubject,
  },
  {
    path: '/academic-duration',
    component: AcademicDuration,
  },

  // INVENTORY
  {
    path: '/inventory-hardware',
    component: Hardware,
  },
  {
    path: '/inventory-software',
    component: Software,
  },

  // SETTINGS
  {
    path: '/settings-users',
    component: SettingsUsers,
  },

  {
    path: '/404',
    component: Page404,
  },
  // {
  //   path: "/forgot-password",
  //   component: ForgotPassword,
  // },
];

export default routes;
