import { Button } from '@/common/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';

export default function StudentPrintTable({ listOfStudents, setModalSetting }) {
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
        {listOfStudents?.map((printInfo) => {
          return (
            <TableRow key={printInfo.id}>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  {`${printInfo.student.studentIdNumber} - ${printInfo.student.firstName} ${printInfo.student.middleInitial}. ${printInfo.student.lastName}`}
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.student.program.programName}
                </div>
              </TableCell>
              <TableCell>
                <div className='font-medium -mb-1'>
                  {printInfo?.releasedDate || 'Not Release'}
                </div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.releasedBy?.fullName || ''}
                </div>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  {printInfo.printedDate || 'Not Printed'}
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.printedBy?.fullName || ''}
                </div>
              </TableCell>
              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  {printInfo.printType || 'New ID'}
                </div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.reprintReason || ''}
                </div>
              </TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button size='sm' variant='outline'>
                    Edit
                  </Button>
                  <Button size='sm' className='w-16'>
                    {printInfo.printedDate ? 'Reprint' : 'Print'}
                  </Button>
                  <Button
                    size='sm'
                    disabled={printInfo.releasedDate}
                    variant='secondary'
                  >
                    Release
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
