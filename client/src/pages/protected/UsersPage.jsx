import ModalContainer from '@/containers/ModalContainer';
import UsersHeader from '@/features/users/users-header/UsersHeader';
import UsersTable from '@/features/users/users-table/UsersTable';
import { useCurrentUser } from '@/hooks/user.hook';
import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    fullname: '',
  });

  const page = searchParams.get('page') || 1;
  const fullName = searchParams.get('fullname');

  const { isLoading, data: currentUser } = useCurrentUser();

  const [isOpen, setIsopen] = useState(false);
  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  if (!isLoading && !currentUser) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <div className='flex items-center justify-between'>
        <div></div>
        <UsersHeader
          setModalSetting={setModalSetting}
          setIsopen={setIsopen}
          setSearchParams={setSearchParams}
        />
      </div>
      <UsersTable
        currentUser={currentUser}
        fullName={fullName}
        setModalSetting={setModalSetting}
        setIsopen={setIsopen}
      />

      {/* Modal Container */}
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsopen}
          modalSetting={modalSetting}
        />
      )}
    </div>
  );
}
