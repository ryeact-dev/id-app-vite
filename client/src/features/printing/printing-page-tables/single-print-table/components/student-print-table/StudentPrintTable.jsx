import { Button } from '@/common/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

export default function StudentPrintTable({ DUMMY_DATA }) {
  return (
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
  );
}
