import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';

import PrintManyTable from '@/features/printing/printing-page-tables/print-many-table/PrintManyTable';
import SinglePrintTable from '@/features/printing/printing-page-tables/single-print-table/SinglePrintTable';
import ValidationTable from '@/features/printing/printing-page-tables/validation-table/ValidationTable';
import PrintHeader from '@/features/printing/printing-header/PrintingHeader';
import { useCurrentUser } from '@/hooks/user.hook';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useGetPaginatedPrintedIds } from '@/hooks/printing.hook';
import ModalContainer from '@/containers/ModalContainer';

export default function PrintingPage() {
  const { isLoading, data: currentUser } = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
  const [modalSetting, setModalSetting] = useState({
    modalType: null,
    confirmationType: null,
    title: null,
    payload: null,
    size: null,
  });

  const [searchParams, setSearchParams] = useSearchParams({
    query: '',
    page: '1',
    tab: 'single-print',
  });

  const tabValue = searchParams.get('tab');
  const page = searchParams.get('page');
  const searchQuery = searchParams.get('query');

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

  const { data: listOfPrintedIds = [], isPlaceholderData } =
    useGetPaginatedPrintedIds(searchQuery, Number(page - 1), 2);

  if (!isLoading && !currentUser) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <Tabs defaultValue={tabValue}>
        <div className='flex items-center justify-between'>
          <TabsList className='grid grid-cols-2 w-[30%] bg-accent/10'>
            <TabsTrigger
              value='single-print'
              onClick={() => handleTabValueChange('single-print')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Print
            </TabsTrigger>
            {/* <TabsTrigger
              value='print-many'
              onClick={() => handleTabValueChange('print-many')}
            >
              Print Many
            </TabsTrigger> */}

            <TabsTrigger
              value='validate'
              onClick={() => handleTabValueChange('validate')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Validate
            </TabsTrigger>
          </TabsList>
          <PrintHeader />
        </div>

        <TabsContent value='single-print' className='space-y-4'>
          <SinglePrintTable
            listOfStudents={listOfPrintedIds?.paginatedStudents}
            hasMore={listOfPrintedIds?.hasMore}
            totalStudents={listOfPrintedIds?.totalStudents}
            studentsCount={listOfPrintedIds?.studentsCount}
            isPlaceholderData={isPlaceholderData}
            onPageClick={onPageClick}
            page={page}
            setModalSetting={setModalSetting}
          />
        </TabsContent>

        {/* <TabsContent value='print-many'>
          <PrintManyTable />
        </TabsContent> */}

        <TabsContent value='validate'>
          <ValidationTable />
        </TabsContent>
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
