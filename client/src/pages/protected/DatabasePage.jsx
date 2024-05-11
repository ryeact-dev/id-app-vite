import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import PrintManyTable from '@/features/printing/printing-page-tables/print-many-table/PrintManyTable';
import StudentTable from '@/features/database/student-table/StudentTable';
import DatabaseHeader from '@/features/database/database-header/DatabaseHeader';
import { useCurrentUser } from '@/hooks/user.hook';
import { Navigate } from 'react-router-dom';
import ModalContainer from '@/containers/ModalContainer';

export default function DatabasePage() {
  const [tabValue, setTabValue] = useState('student');
  const { isLoading, data: currentUser } = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
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

  const handleTabValueChange = (tabValue) => {
    setTabValue(tabValue);
  };

  const handleAddEditStudent = (studentData) => {
    const reMapStudentData = {
      ...studentData,
      // Convert to a date object because the date is coming in as a string
      birthDate: new Date(studentData.birthDate),
    };

    const payload = studentData ? reMapStudentData : null;

    const modalData = {
      confirmationType: null,
      title: 'Student Details',
      size: 'max-w-2xl',
      modalType: 'add-student',
      payload,
    };

    setModalSetting(modalData);
    setIsOpen(true);
  };

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <Tabs defaultValue={tabValue}>
        <div className='flex items-center justify-between'>
          <TabsList className='grid grid-cols-2 w-[30%] bg-accent/10'>
            <TabsTrigger
              value='student'
              onClick={() => handleTabValueChange('student')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Student
            </TabsTrigger>
            <TabsTrigger
              value='non-student'
              onClick={() => handleTabValueChange('non-student')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Non-Student
            </TabsTrigger>
          </TabsList>
          <DatabaseHeader handleAddEditStudent={handleAddEditStudent} />
        </div>

        <TabsContent value='student' className='space-y-4'>
          <StudentTable handleAddEditStudent={handleAddEditStudent} />
        </TabsContent>

        <TabsContent value='non-student'>
          <PrintManyTable />
        </TabsContent>

        <TabsContent value='validate'>Validation Table</TabsContent>
      </Tabs>

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
