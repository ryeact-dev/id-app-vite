import {
  LuAppWindow,
  LuCalendarCheck,
  LuCalendarCheck2,
  LuCalendarClock,
  LuCalendarDays,
  LuComputer,
  LuFiles,
  LuFileStack,
  LuFileText,
  LuLayoutDashboard,
  LuMonitor,
  LuUsers,
  LuUsers2,
} from 'react-icons/lu';

const routes = [
  {
    path: '',
    name: 'Laboratory',
    submenu: [
      // {
      //   path: '/app/dashboard',
      //   icon: <LuLayoutDashboard size={15} />,
      //   name: 'Dashboard',
      // },
      {
        path: '/app/lab-scheduler',
        icon: <LuCalendarClock size={15} />,
        name: 'Schedule',
      },
      {
        path: '/app/subject-utilizations',
        icon: <LuLayoutDashboard size={15} />,
        name: 'Subject Utilizations',
      },
      {
        path: '/app/lab-utilization',
        icon: <LuCalendarCheck size={15} />,
        name: 'Class Utilization',
      },
    ],
  },
  {
    path: '', //no url needed as this has submenu
    name: 'Reports', // name that appear in Sidebar
    submenu: [
      {
        path: '/app/reports-utilizations-weekly',
        icon: <LuFileText size={15} />,
        name: 'Utilizations - Weekly',
      },
      {
        path: '/app/reports-utilizations-term',
        icon: <LuFiles size={15} />,
        name: 'Utilzations - Term',
      },
      {
        path: '/app/reports-utilizations-weekly-instructor',
        icon: <LuUsers size={15} />,
        name: 'Instructor Usage',
      },
      {
        path: '/app/reports-utilizations-weekly-laboratory',
        icon: <LuComputer size={15} />,
        name: 'Laboratory Usage',
      },
      // {
      //   path: '/app/reports-list-of-reservations',
      //   icon: <LuCalendarCheck2 size={15} />,
      //   name: 'Reservations',
      // },
      {
        path: '/app/reports-lab-weekly-monitoring',
        icon: <LuMonitor size={15} />,
        name: 'Weekly Monitoring',
      },
    ],
  },
  {
    path: '',
    name: 'Masterlist',
    submenu: [
      {
        path: '/app/students',
        icon: <LuUsers size={15} />,
        name: 'Students',
      },
      {
        path: '/app/subjects',
        icon: <LuFileStack size={15} />,
        name: 'Subjects',
      },
      {
        path: '/app/academic-duration',
        icon: <LuCalendarDays size={15} />,
        name: 'Academic Duration',
      },
    ],
  },
  {
    path: '',
    name: 'Inventory',
    submenu: [
      {
        path: '/app/inventory-hardware',
        icon: <LuComputer size={15} />,
        name: 'Hardware',
      },
      {
        path: '/app/inventory-software',
        icon: <LuAppWindow size={15} />,
        name: 'Software',
      },
    ],
  },
  {
    path: '',
    name: 'Settings',
    submenu: [
      {
        path: '/app/settings-users',
        icon: <LuUsers2 size={15} />,
        name: 'Users',
      },
    ],
  },
];

export default routes;
