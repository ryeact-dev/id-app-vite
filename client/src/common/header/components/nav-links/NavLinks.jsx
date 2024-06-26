import {
  FileText,
  LayoutDashboard,
  Package2,
  Printer,
  Settings,
  Database,
  Users,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className='size-4' strokeWidth={2} />,
  },
  {
    title: 'Print & Validate',
    path: '/printing',
    icon: <Printer className='size-4' strokeWidth={2} />,
  },
  {
    title: 'Database',
    path: '/database',
    icon: <Database className='size-4' strokeWidth={2} />,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <FileText className='size-4' strokeWidth={2} />,
  },
  {
    title: 'Academic Settings',
    path: '/settings',
    icon: <Settings className='size-4' strokeWidth={2} />,
  },
  {
    title: 'Users',
    path: '/users',
    icon: <Users className='size-4' strokeWidth={2} />,
  },
];

export default function NavLinks() {
  return (
    <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-2 md:text-sm'>
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `${
              isActive
                ? 'bg-primary rounded-md text-background text-white'
                : 'nav-link'
            } relative font-semibold text-center my-auto w-fit`
          }
        >
          <div className='flex gap-1 items-center justify-center py-1 px-3'>
            {link.icon} {link.title}
          </div>
        </NavLink>
      ))}
    </nav>
  );
}
