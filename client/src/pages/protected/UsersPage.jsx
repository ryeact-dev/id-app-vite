import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/ui/tabs';
import PrintManyTable from '@/features/printing/printing-page-tables/print-many-table/PrintManyTable';
import StudentTable from '@/features/database/student-table/StudentTable';
import DatabaseHeader from '@/features/database/database-header/DatabaseHeader';
import UsersHeader from '@/features/users/users-header/UsersHeader';
import UsersTable from '@/features/users/users-table/UsersTable';

export default function UsersPage() {
  const [tabValue, setTabValue] = useState('student');

  const handleTabValueChange = (tabValue) => {
    setTabValue(tabValue);
  };

  return (
    <div className='max-w-7xl mx-auto space-y-4'>
      <div className='flex items-center justify-between'>
        <div></div>
        <UsersHeader />
      </div>
      <UsersTable />
    </div>
  );
}