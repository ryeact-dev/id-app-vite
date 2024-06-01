import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/ui/table';
import PrintTableOptions from '../print-table-options/PrintTableOptions';
import { format } from 'date-fns';

export default function StudentPrintTable({
  listOfStudents,
  activeSem,
  setModalSetting,
  setIsOpen,
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Print Type</TableHead>
          <TableHead>Printed Date</TableHead>
          <TableHead>Released Date</TableHead>
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
                  {`${printInfo.student.studentIdNumber} - ${printInfo.student.firstName} ${printInfo.student.middleInitial} ${printInfo.student.lastName}`}
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.student.program.programName}
                </div>
              </TableCell>

              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>{printInfo.printType}</div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.reprintReason || ''}
                </div>
              </TableCell>

              <TableCell className='font-medium'>
                <div className='font-medium -mb-1'>
                  {printInfo.printedDate
                    ? format(new Date(printInfo.printedDate), 'MMM dd, yyyy')
                    : 'Not Printed'}
                </div>
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.printedBy?.fullName || ''}
                </div>
              </TableCell>

              <TableCell>
                <div className='font-medium -mb-1'>
                  {printInfo.releasedDate
                    ? format(new Date(printInfo.releasedDate), 'MMM dd, yyyy')
                    : 'Not Release'}
                </div>{' '}
                <div className='hidden text-xs text-muted-foreground md:inline'>
                  {printInfo.releasedBy?.fullName || ''}
                </div>
              </TableCell>

              <TableCell>
                <PrintTableOptions
                  printInfo={printInfo}
                  activeSem={activeSem}
                  student={printInfo.student}
                  setModalSetting={setModalSetting}
                  setIsOpen={setIsOpen}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
