import ModalContainer from '@/containers/ModalContainer';
import Departments from '@/features/settings/departments/Departments';
import Programs from '@/features/settings/programs/Programs';
import SchoolYear from '@/features/settings/school-year/SchoolYear';
import Semester from '@/features/settings/semester/Semester';
import { useGetAllDepartments } from '@/hooks/department.hook';
import { useGetListOfSchoolYear } from '@/hooks/schoolyear.hook';
import { useCurrentUser } from '@/hooks/user.hook';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function SettingsPage() {
  const { isLoading, data: currentUser } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  const { data: listOfSchoolYear = [] } = useGetListOfSchoolYear();
  const { data: listOfDepartments = [] } = useGetAllDepartments();

  if (!isLoading && !currentUser?.userInfo) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <div className='flex items-start justify-center gap-4'>
        <div className='flex-1 space-y-4'>
          <SchoolYear
            setModalSetting={setModalSetting}
            setIsOpen={setIsOpen}
            listOfSchoolYear={listOfSchoolYear}
          />

          <Departments
            setModalSetting={setModalSetting}
            setIsOpen={setIsOpen}
            listOfDepartments={listOfDepartments}
          />
        </div>
        <div className='flex-1 space-y-4'>
          <Semester
            setModalSetting={setModalSetting}
            setIsOpen={setIsOpen}
            listOfSchoolYear={listOfSchoolYear}
          />
          <Programs
            setModalSetting={setModalSetting}
            setIsOpen={setIsOpen}
            listOfDepartments={listOfDepartments}
          />
        </div>
      </div>

      {/* Modal Container */}
      {isOpen === true && (
        <ModalContainer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalSetting={modalSetting}
        />
      )}
    </div>
  );
}
