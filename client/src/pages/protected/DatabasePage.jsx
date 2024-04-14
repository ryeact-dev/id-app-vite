import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import PrintManyTable from '@/features/printing/printing-page-tables/print-many-table/PrintManyTable';
import StudentTable from '@/features/database/student-table/StudentTable';
import DatabaseHeader from '@/features/database/database-header/DatabaseHeader';

export default function DatabasePage() {
  const [tabValue, setTabValue] = useState('student');

  const handleTabValueChange = (tabValue) => {
    setTabValue(tabValue);
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
          <DatabaseHeader />
        </div>

        <TabsContent value='student' className='space-y-4'>
          <StudentTable />
        </TabsContent>

        <TabsContent value='non-student'>
          <PrintManyTable />
        </TabsContent>

        <TabsContent value='validate'>Validation Table</TabsContent>
      </Tabs>
    </div>
  );
}
