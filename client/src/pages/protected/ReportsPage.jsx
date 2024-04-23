import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import ReportHeader from '@/features/reports/report-header/ReportHeader';
import PrintReportTable from '@/features/reports/report-page-tables/print-report-table/PrintReportTable';
import ValidationReportTable from '@/features/reports/report-page-tables/validation-report-table/ValidationReportTable';
import { useCurrentUser } from '@/hooks/user.hook';
import { Navigate } from 'react-router-dom';

export default function ReportsPage() {
  const [tabValue, setTabValue] = useState('print');
  const { isLoading, data: currentUser } = useCurrentUser();

  if (!isLoading && !currentUser) {
    return <Navigate to='/login' replace />;
  }
  const handleTabValueChange = (tabValue) => {
    setTabValue(tabValue);
  };

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
          <ReportHeader />
        </div>

        <TabsContent value='print' className='space-y-4'>
          <PrintReportTable />
        </TabsContent>

        <TabsContent value='validate'>
          <ValidationReportTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
