import PaginationBlock from '@/common/pagination-block/PaginationBlock';
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
import { addDays, format } from 'date-fns';
import { PenBox } from 'lucide-react';

export default function StudentTable({
  handleAddEditStudent,
  listOfStudents,
  page,
  onPageClick,
  isPlaceholderData,
}) {
  return (
    <Card>
      <CardContent className='mt-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>BirthDate</TableHead>
              <TableHead>Guardian</TableHead>
              <TableHead>Guardian Address</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Updated By</TableHead>
              <TableHead>
                Actions
                <span className='sr-only'>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listOfStudents?.paginatedStudents?.map((student) => (
              <TableRow key={student.studentIdNumber}>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{`${student.studentIdNumber} - ${student.firstName} ${student.middleInitial} ${student.lastName}`}</div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.program.programName}
                  </div>
                </TableCell>

                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {format(new Date(student.birthDate), 'MMM dd, yyyy')}
                  </div>{' '}
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>{student.guardian}</div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.guardianContact}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium w-48 leading-4'>
                    {student.address}
                  </div>{' '}
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {student.user.fullName}
                  </div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {/* OBSERVE THE DATE IF CORRECT */}
                    {format(
                      addDays(new Date(student.user.createdAt), -1),
                      'MMM dd, yyyy'
                    )}
                  </div>
                </TableCell>
                <TableCell className='font-medium'>
                  <div className='font-medium -mb-1'>
                    {student.studentUpdate[0]?.user.fullName || 'No updates'}
                  </div>
                  <div className='hidden text-xs text-muted-foreground md:inline'>
                    {student.studentUpdate.length > 0
                      ? format(
                          new Date(student.studentUpdate[0]?.updatedDate),
                          'MMM dd, yyyy'
                        )
                      : ''}
                  </div>
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => handleAddEditStudent(student)}
                    >
                      <PenBox className='size-4 mr-1' /> Edit
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
        <PaginationBlock
          studentsCount={listOfStudents?.studentsCount}
          totalStudents={listOfStudents?.totalStudents}
          hasMore={listOfStudents?.hasMore}
          page={page}
          onPageClick={onPageClick}
          isPlaceholderData={isPlaceholderData}
        />
      </CardFooter>
    </Card>
  );
}
