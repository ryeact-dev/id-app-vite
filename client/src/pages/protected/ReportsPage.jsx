import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import ReportHeader from '@/features/reports/report-header/ReportHeader';
import PrintReportTable from '@/features/reports/report-page-tables/print-report-table/PrintReportTable';
import ValidationReportTable from '@/features/reports/report-page-tables/validation-report-table/ValidationReportTable';
import { useCurrentUser } from '@/hooks/user.hook';
import { Navigate, useSearchParams } from 'react-router-dom';
import { subMonths } from 'date-fns';

export default function ReportsPage() {
  const [date, setDate] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  const [searchParams, setSearchParams] = useSearchParams({
    page: '1',
    tab: 'print',
  });

  const tabValue = searchParams.get('tab');
  const page = searchParams.get('page');

  const { isLoading, data: currentUser } = useCurrentUser();

  const onPageClick = (pageNumber) => {
    setSearchParams((prev) => {
      prev.set('page', pageNumber);
      return prev;
    });
  };

  const handleTabValueChange = (tabValue) => {
    setSearchParams((prev) => {
      prev.set('tab', tabValue);
      prev.set('page', '1');
      return prev;
    });
  };

  if (!isLoading && !currentUser?.userInfo) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <Tabs defaultValue={tabValue}>
        <div className='flex items-center justify-between'>
          <TabsList className='grid grid-cols-2 w-[30%] bg-accent/10'>
            <TabsTrigger
              value='print'
              onClick={() => handleTabValueChange('print')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Print
            </TabsTrigger>

            <TabsTrigger
              value='validate'
              onClick={() => handleTabValueChange('validate')}
              className='data-[state=active]:bg-accent/90 data-[state=active]:text-white'
            >
              Validate
            </TabsTrigger>
          </TabsList>
          <ReportHeader date={date} setDate={setDate} />
        </div>

        <TabsContent value='print' className='space-y-4'>
          <PrintReportTable page={page} onPageClick={onPageClick} date={date} />
        </TabsContent>

        <TabsContent value='validate'>
          <ValidationReportTable
            page={page}
            onPageClick={onPageClick}
            date={date}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
