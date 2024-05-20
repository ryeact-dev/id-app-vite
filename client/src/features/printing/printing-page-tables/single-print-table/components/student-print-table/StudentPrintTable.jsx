import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import PrintTableOptions from '../print-table-options/PrintTableOptions';

export default function StudentPrintTable({ listOfStudents }) {
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
                <PrintTableOptions
                  printedDate={printInfo.printedDate}
                  student={printInfo.student}
                  releasedDate={printInfo.releasedDate}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
