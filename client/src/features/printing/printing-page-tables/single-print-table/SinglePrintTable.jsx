import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import { Button } from '@/common/ui/button';
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

const DUMMY_DATA = [
  {
    printedDate: 'Sep 09, 2023',
    printedBy: [
      {
        fullName: 'Stap Morning',
      },
    ],
    printType: 'Reprint',
    releasedDate: 'Sep 09, 2023',
    releasedBy: [
      {
        fullName: 'Stap Morning',
      },
    ],
    reprintReason: 'Lost ID',
    studentRef: [
      {
        idNumber: 147489,
        lastName: 'Montoya',
        firstName: 'Ryan',
        middleInitial: 'P',
        birthDate: 'Jan 09, 1990',
        address: '123 Main St. Anytown USA',
        program: 'BS - Tourism Management',
        deparment: 'Dept. of Business Administration Education',
      },
    ],
  },
  {
    printedDate: 'Sep 09, 2023',
    printedBy: [
      {
        fullName: 'Stap Morning',
      },
    ],
    printType: 'New ID',
    reprintReason: null,
    releasedDate: null,
    releasedBy: [],
    studentRef: [
      {
        idNumber: 143255,
        lastName: 'Ayotnom',
        firstName: 'Nayr',
        middleInitial: 'E',
        birthDate: 'Jan 09, 1980',
        address: '123 Main St. Anytown USA',
        program: 'BS - Criminology',
        deparment: 'Dept. of Criminal Justice Education',
      },
    ],
  },
  {
    printedDate: null,
    printedBy: [],
    printType: 'New ID',
    reprintReason: null,
    releasedDate: null,
    releasedBy: [],
    studentRef: [
      {
        idNumber: 95532,
        lastName: 'Oldies',
        firstName: 'Nako',
        middleInitial: 'E',
        birthDate: 'Jan 09, 1950',
        address: '123 Main St. Anytown USA',
        program: 'BSED - Mathematics',
        deparment: 'Dept. of Teacher Education',
      },
    ],
  },
];

export default function SinglePrintTable() {
  return (
    <Card>
      <div className='flex items-center justify-between'>
        <CardHeader className='space-y-0'>
          <CardTitle>Printed ID Transactions</CardTitle>
          <CardDescription>List of Printed ID per transaction</CardDescription>
        </CardHeader>
        <div className='m-4 flex items-center gap-2'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search ID number...'
              className='pl-8 sm:w-[200px]'
            />
          </div>
          <Button type='button' className='font-semibold'>
            Add Student
          </Button>
        </div>
      </div>
      <CardContent>
        <StudentPrintTable DUMMY_DATA={DUMMY_DATA} />
      </CardContent>
      <CardFooter>
        <PaginationBlock />
      </CardFooter>
    </Card>
  );
}
