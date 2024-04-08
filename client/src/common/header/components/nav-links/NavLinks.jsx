import {
  FileText,
  LayoutDashboard,
  Package2,
  Printer,
  Settings,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const NAV_LINKS = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <LayoutDashboard className='size-4' />,
  },
  {
    title: 'Printing',
    path: '/printing',
    icon: <Printer className='size-4' />,
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <FileText className='size-4' />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings className='size-4' />,
  },
];

export default function NavLinks() {
  return (
    <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
      <NavLink
        to='#'
        className='flex items-center gap-2 text-lg font-semibold md:text-base'
      >
        <Package2 className='h-6 w-6' />
        <span className='sr-only'>Acme Inc</span>
      </NavLink>

      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `${
              isActive ? 'bg-primary rounded-md text-background ' : ''
            } min-w-24 max-w-fit font-semibold px-3 py-1 text-center my-auto flex gap-1 items-center justify-center `
          }
        >
          {link.icon} {link.title}
        </NavLink>
      ))}
    </nav>
  );
}
