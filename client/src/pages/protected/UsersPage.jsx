import ModalContainer from '@/containers/ModalContainer';
import UsersHeader from '@/features/users/users-header/UsersHeader';
import UsersTable from '@/features/users/users-table/UsersTable';
import { useCurrentUser } from '@/hooks/user.hook';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function UsersPage() {
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
        <UsersHeader setModalSetting={setModalSetting} setIsopen={setIsopen} />
      </div>
      <UsersTable
        currentUser={currentUser}
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
