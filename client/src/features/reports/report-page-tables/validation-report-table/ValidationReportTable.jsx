import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import { Badge } from '@/common/ui/badge';
import { Button } from '@/common/ui/button';
import { Card, CardContent, CardFooter } from '@/common/ui/card';
import { Input } from '@/common/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

import { Search } from 'lucide-react';

const DUMMY_DATA = [
  {
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
    validationDate: 'Sep 09, 2023',
    validatedBy: [
      {
        fullName: 'Stap Morning',
      },
    ],
  },
  {
    studentRef: [
      {
        idNumber: 147466,
        lastName: 'Ayotnom',
        firstName: 'Nayr',
        middleInitial: 'E',
        birthDate: 'Jan 09, 1990',
        address: '123 Main St. Anytown USA',
        program: 'BS - Tourism Management',
        deparment: 'Dept. of Business Administration Education',
      },
    ],
    validationDate: 'Sep 09, 2023',
    validatedBy: [
      {
        fullName: 'Stap Afternoon',
      },
    ],
  },
  {
    studentRef: [
      {
        idNumber: 47488,
        lastName: 'Oldies',
        firstName: 'Kaayo',
        middleInitial: 'N',
        birthDate: 'Jan 09, 1980',
        address: '123 Main St. Anytown USA',
        program: 'BS - Tourism Management',
        deparment: 'Dept. of Business Administration Education',
      },
    ],
    validationDate: 'Sep 09, 2023',
    validatedBy: [
      {
        fullName: 'Stap Morning',
      },
    ],
  },
];

export default function ValidationReportTable() {
  return (
    <Card>
      <div className='flex items-center justify-between gap-4 p-4'>
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            type='search'
            placeholder='Search ID number...'
            className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
          />
        </div>
      </div>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Validated Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_DATA.map((student) => (
              <TableRow key={student.studentRef[0].idNumber}>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {`${student.studentRef[0].idNumber} - ${student.studentRef[0].firstName} ${student.studentRef[0].middleInitial}. ${student.studentRef[0].lastName}`}
                  </div>
                  <div className='text-xs text-muted-foreground md:inline'>
                    {student.studentRef[0].program}
                  </div>
                </TableCell>

                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {student.validationDate}
                  </div>
                  <div className='text-xs text-muted-foreground md:inline'>
                    {student.validatedBy[0]?.fullName}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <PaginationBlock />
      </CardFooter>
    </Card>
  );
}
