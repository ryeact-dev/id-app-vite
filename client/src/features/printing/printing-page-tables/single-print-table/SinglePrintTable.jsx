import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/common/ui/card';
import { Input } from '@/common/ui/input';

import { Search } from 'lucide-react';
import StudentPrintTable from './components/student-print-table/StudentPrintTable';

export default function SinglePrintTable({
  listOfStudents,
  hasMore,
  totalStudents,
  studentsCount,
  isPlaceholderData,
  page,
  activeSem,
  onPageClick,
  onSearchValueChange,
  setModalSetting,
  setIsOpen,
}) {
  return (
    <Card>
      <div className='flex items-center justify-between'>
        <CardHeader className='space-y-0'>
          <CardTitle>Printed ID Transactions</CardTitle>
          <CardDescription>List of Printed ID per transaction</CardDescription>
        </CardHeader>
        <div className='m-4 flex items-center gap-2'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground ' />
            <Input
              onChange={onSearchValueChange}
              type='search'
              placeholder='Search ID number...'
              className='pl-8 sm:w-[200px] lg:w-[300px]'
            />
          </div>
        </div>
      </div>
      <CardContent>
        <StudentPrintTable
          activeSem={activeSem}
          listOfStudents={listOfStudents}
          setModalSetting={setModalSetting}
          setIsOpen={setIsOpen}
        />
      </CardContent>
      <CardFooter>
        <PaginationBlock
          studentsCount={studentsCount}
          totalStudents={totalStudents}
          page={page}
          hasMore={hasMore}
          onPageClick={onPageClick}
          isPlaceholderData={isPlaceholderData}
        />
      </CardFooter>
    </Card>
  );
}
