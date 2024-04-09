import PaginationBlock from '@/common/pagination-block/PaginationBlock';
import { Badge } from '@/common/ui/badge';
import { Button } from '@/common/ui/button';
import { Card, CardContent, CardFooter } from '@/common/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

const DUMMY_DATA = [
  {
    idNumber: 147489,
    lastName: 'Montoya',
    firstName: 'Ryan',
    middleInitial: 'P',
    birthDate: 'Jan 09, 1990',
    program: 'BS - Tourism Management',
    deparment: 'Dept. of Business Administration Education',
    address:
      'Prk. Tae, Bario Patay, Brgy. Canocotan, Tagum City, Davao Del Norte',
    guardian: 'Mr. John Doe',
    guardianContact: '09123456789',
    createBy: [
      {
        fullName: 'Stap Morning',
      },
    ],
    createdDate: 'Aug 09, 2019',
    infoUpdate: [
      {
        fullName: 'Stap Morning',
        updateDate: 'Sep 09, 2022',
      },
      {
        fullName: 'Stap Afternoon',
        updateDate: 'Sep 09, 2021',
      },
    ],
  },
  {
    idNumber: 143255,
    lastName: 'Ayotnom',
    firstName: 'Nayr',
    middleInitial: 'E',
    birthDate: 'Jan 09, 1980',
    address:
      'Prk. Tae, Bario Patay, Brgy. Canocotan, Tagum City, Davao Del Norte',
    program: 'BS - Criminology',
    deparment: 'Dept. of Criminal Justice Education',
    guardian: 'Mr. Exodiac Doe',
    guardianContact: '09123456789',
    createBy: [
      {
        fullName: 'Stap Afternoon',
      },
    ],
    createdDate: 'Sep 09, 2020',
    infoUpdate: [
      {
        fullName: 'Stap Morning',
        updateDate: 'July 09, 2022',
      },
      {
        fullName: 'Stap Afternoon',
        updateDate: 'Sep 09, 2021',
      },
    ],
  },
  {
    idNumber: 95532,
    lastName: 'Oldies',
    firstName: 'Nako',
    middleInitial: 'E',
    birthDate: 'Jan 09, 1950',
    address:
      'Prk. Tae, Bario Patay, Brgy. Canocotan, Tagum City, Davao Del Norte',
    program: 'BSED - Mathematics',
    deparment: 'Dept. of Teacher Education',
    guardian: 'Mr. John David',
    guardianContact: '09123456789',
    createBy: [
      {
        fullName: 'Stap Morning',
      },
    ],
    createdDate: 'Sep 09, 2018',
    infoUpdate: [],
  },
];

export default function StudentTable() {
  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>BirthDate</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Guardian</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Updated By</TableHead>
              <TableHead>
                Actions
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_DATA.map((student) => (
              <TableRow key={student.idNumber}>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{`${student.idNumber} - ${student.firstName} ${student.middleInitial}. ${student.lastName}`}</div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.program}
                  </div>
                </TableCell>

                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{student.birthDate}</div>{' '}
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium w-48 leading-5'>
                    {student.address}
                  </div>{' '}
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{student.guardian}</div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.guardianContact}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {student.createBy[0].fullName}
                  </div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.createdDate}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {student.infoUpdate[0]?.fullName || 'No updates'}
                  </div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.infoUpdate[0]?.updateDate || ''}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button size='sm' variant='outline'>
                      Edit
                    </Button>
                    {/* <Button size='sm'>Print</Button> */}
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
