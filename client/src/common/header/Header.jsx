import { NavLink, Navigate } from 'react-router-dom';
import { CircleUser, Menu, Package2 } from 'lucide-react';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import NavLinks from './components/nav-links/NavLinks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/user.hook';
import { useState } from 'react';
import ModalContainer from '@/containers/ModalContainer';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  const { isLoading, data: currentUser } = useCurrentUser();

  const handleLogout = () => {
    const modalData = {
      confirmationType: 'logout-user',
      title: 'Logout User?',
      size: 'max-w-md',
      modalType: 'confirmation',
      payload: null,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  const handleUpdatePassword = () => {
    const modalData = {
      confirmationType: null,
      title: 'Update Password',
      size: 'max-w-xl',
      modalType: 'update-password',
      payload: null,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <header className='sticky top-0 border-b bg-background/70 z-50 backdrop-blur-sm w-full'>
      <div className='flex items-center gap-4 px-4 h-16 mx-auto md:px-0 max-w-7xl'>
        <div className='flex-1'>
          <NavLink
            to='#'
            className='flex items-center gap-2 text-lg font-semibold md:text-base'
          >
            <Package2 className='h-6 w-6' />
            <p>UMTC ID</p>
            <span className='sr-only'>Acme Inc</span>
          </NavLink>
        </div>
        {currentUser?.userInfo && (
          <>
            <NavLinks />
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='shrink-0 md:hidden'
                >
                  <Menu className='h-5 w-5' />
                  <span className='sr-only'>Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side='left'>
                <nav className='grid gap-6 text-lg font-medium'>
                  <NavLink
                    to='#'
                    className='flex items-center gap-2 text-lg font-semibold'
                  >
                    <Package2 className='h-6 w-6' />
                    <span className='sr-only'>Acme Inc</span>
                  </NavLink>
                  <NavLink to='#' className='hover:text-foreground'>
                    Dashboard
                  </NavLink>
                  <NavLink
                    to='#'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to='#'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to='#'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Customers
                  </NavLink>
                  <NavLink
                    to='#'
                    className='text-muted-foreground hover:text-foreground'
                  >
                    Analytics
                  </NavLink>
                </nav>
              </SheetContent>
            </Sheet> */}

            <div className='flex flex-1 items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='secondary'
                    size='icon'
                    className='rounded-full'
                  >
                    <CircleUser className='h-5 w-5' />
                    <span className='sr-only'>Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuLabel>
                    <>
                      <p>{currentUser?.userInfo.fullName}</p>
                      <p className='text-xs font-normal'>
                        {currentUser?.userInfo.role}
                      </p>
                    </>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleUpdatePassword}>
                    Change Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      {/* Modal Container */}
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalSetting={modalSetting}
        />
      )}
    </header>
  );
}
