import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import PrintManyTable from '@/features/printing/printing-page-tables/print-many-table/PrintManyTable';
import StudentTable from '@/features/database/student-table/StudentTable';
import DatabaseHeader from '@/features/database/database-header/DatabaseHeader';
import { useCurrentUser } from '@/hooks/user.hook';
import { Navigate, useSearchParams } from 'react-router-dom';
import ModalContainer from '@/containers/ModalContainer';
import { useGetPaginatedStudents } from '@/hooks/student.hook';

export default function DatabasePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data: currentUser } = useCurrentUser();

  const [searchParams, setSearchParams] = useSearchParams({
    query: '',
    page: '1',
    tab: 'student',
  });

  const tabValue = searchParams.get('tab');
  const page = searchParams.get('page');
  const searchQuery = searchParams.get('query');

  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  const { data: listOfStudents = [], isPlaceholderData } =
    useGetPaginatedStudents(searchQuery, Number(page - 1), 2);

  if (!isLoading && !currentUser) {
    return <Navigate to='/login' replace />;
  }

  const handleTabValueChange = (tabValue) => {
    setSearchParams((prev) => {
      prev.set('tab', tabValue);
      return prev;
    });
  };

  const onSearchValueChange = (value) => {
    setSearchParams((prev) => {
      prev.set('query', value);
      return prev;
    });
  };

  const onPageClick = (pageNumber) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber);
      return prev;
    });
  };

  const handleAddEditStudent = (studentData) => {
    const reMapStudentData = {
      ...studentData,
      // Convert to a date object because the date is coming in as a string
      birthDate: new Date(studentData?.birthDate),
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
          <DatabaseHeader
            handleAddEditStudent={handleAddEditStudent}
            onSearchValueChange={onSearchValueChange}
          />
        </div>

        <TabsContent value='student' className='space-y-4'>
          <StudentTable
            handleAddEditStudent={handleAddEditStudent}
            listOfStudents={listOfStudents}
            page={page}
            onPageClick={onPageClick}
            isPlaceholderData={isPlaceholderData}
          />
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
