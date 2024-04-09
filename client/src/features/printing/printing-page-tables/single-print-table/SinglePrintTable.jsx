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
      <div className='flex items-center p-4'>
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
              <TableHead>Released Date</TableHead>
              <TableHead>Printed Date</TableHead>
              <TableHead>Print Type</TableHead>
              <TableHead>
                Actions
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_DATA.map((student) => (
              <TableRow key={student.studentRef[0].idNumber}>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {`${student.studentRef[0].idNumber} - ${student.studentRef[0].firstName} ${student.studentRef[0].middleInitial}. ${student.studentRef[0].lastName}`}
                  </div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.studentRef[0].program}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='font-medium -mb-1'>
                    {student?.releasedDate || 'Not Release'}
                  </div>{' '}
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.releasedBy[0]?.fullName || ''}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {student.printedDate || 'Not Printed'}
                  </div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.printedBy[0]?.fullName || ''}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{student.printType}</div>{' '}
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.reprintReason || ''}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button size='sm' variant='outline'>
                      Edit
                    </Button>
                    <Button size='sm' className='w-16'>
                      {student.printedDate ? ' Reprint' : ' Print'}
                    </Button>
                    <Button
                      size='sm'
                      disabled={student.releasedDate}
                      variant='secondary'
                    >
                      Release
                    </Button>
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
